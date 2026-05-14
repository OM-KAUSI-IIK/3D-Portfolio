import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { cleanupTimelines } from "../utils/GsapScroll";

type ScreenLightMesh = THREE.Mesh & {
  material: THREE.MeshStandardMaterial;
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    let isActive = true;
    if (canvasDiv.current) {
      const canvasElement = canvasDiv.current;
      const rect = canvasElement.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      // Keep the hero model responsive on high-DPI screens.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasElement.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 10.0, 50);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let modelBones: any = {};
      let screenLight: ScreenLightMesh | null = null;
      let mixer: THREE.AnimationMixer;
      let cleanupHover: (() => void) | undefined;
      let resizeHandler: (() => void) | undefined;
      let resizeTimer: number | undefined;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (!isActive) return;
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            cleanupHover = animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          const character = gltf.scene;
          scene.add(character);
          
          modelBones = {};
          character.traverse((node: any) => {
            if (node.isBone || node.type === "Bone") {
              const name = node.name.toLowerCase();
              if (name.includes("head") && !modelBones.head) modelBones.head = node;
              if (name.includes("neck") && !modelBones.neck) modelBones.neck = node;
              if ((name.includes("spine2") || name.includes("spine1") || name.includes("spinetwo")) && !modelBones.spine) modelBones.spine = node;
            }
          });

          // Fallback if still not found
          if (!modelBones.head) modelBones.head = character.getObjectByName("Head") || character.getObjectByName("mixamorigHead");
          
          screenLight =
            (character.getObjectByName("screenlight") as ScreenLightMesh) ||
            null;

          setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, 500);

          resizeHandler = () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
              handleResize(renderer, camera, canvasDiv, character);
            }, 150);
          };
          window.addEventListener("resize", resizeHandler);
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => {
          mouse.x = x;
          mouse.y = y;
        });
      };
      const onMouseLeave = () => {
        mouse.x = 0;
        mouse.y = 0;
      };
      let debounce: number | undefined;
      let activeTouchTarget: HTMLElement | null = null;
      const onTouchMove = (e: TouchEvent) => {
        handleTouchMove(e, (x, y) => {
          mouse.x = x;
          mouse.y = y;
        });
      };
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        activeTouchTarget?.removeEventListener("touchmove", onTouchMove);
        activeTouchTarget = element;
        debounce = setTimeout(() => {
          activeTouchTarget?.addEventListener("touchmove", onTouchMove, {
            passive: true,
          });
        }, 200);
      };

      const onTouchEnd = () => {
        activeTouchTarget?.removeEventListener("touchmove", onTouchMove);
        activeTouchTarget = null;
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse.x = x;
          mouse.y = y;
          interpolation.x = interpolationX;
          interpolation.y = interpolationY;
        });
      };

      document.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let animFrameId: number;
      let isTabVisible = true;

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta(); // Must call every frame to keep clock synced
        if (!isTabVisible) return; // Pause rendering when tab is hidden
        
        if (mixer) {
          mixer.update(delta);
        }

        handleHeadRotation(
          modelBones,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
        
        renderer.render(scene, camera);
      };

      const onVisibilityChange = () => {
        isTabVisible = !document.hidden;
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      animate();
      return () => {
        isActive = false;
        clearTimeout(debounce);
        window.clearTimeout(resizeTimer);
        cancelAnimationFrame(animFrameId);
        cleanupTimelines();
        cleanupHover?.();
        if (resizeHandler) window.removeEventListener("resize", resizeHandler);
        activeTouchTarget?.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        scene.clear();
        renderer.dispose();
        renderer.forceContextLoss();
        if (renderer.domElement.parentNode === canvasElement) {
          canvasElement.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
