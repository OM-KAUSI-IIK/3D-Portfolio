import * as THREE from "three";
import gsap from "gsap";

export let masterCtx = gsap.context(() => {});

type MaterialMesh = THREE.Mesh & {
  material: THREE.MeshStandardMaterial;
};

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  if (!character) return;

  masterCtx.add(() => {
    let intensity: number = 0;
    // Use gsap ticker instead of raw setInterval to avoid memory leaks
    gsap.timeline({ repeat: -1, repeatDelay: 0.2 }).to(
      {},
      {
        duration: 0.2,
        onUpdate() {
          intensity = Math.random();
        },
      }
    );
    const tl1 = gsap.timeline({
      scrollTrigger: {
        id: "character-landing",
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        id: "character-about",
        trigger: ".about-section",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const tl3 = gsap.timeline({
      scrollTrigger: {
        id: "character-what",
        trigger: ".whatIDO",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const tl4 = gsap.timeline({
      scrollTrigger: {
        id: "character-career",
        trigger: ".career-section",
        start: "top 80%",
        end: "top 40%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    let screenLight: MaterialMesh | undefined;
    let monitor: MaterialMesh | undefined;
    character.children.forEach((object) => {
      if (object.name === "Plane004") {
        object.children.forEach((child) => {
          const mesh = child as MaterialMesh;
          if (!mesh.material) return;

          mesh.material.transparent = true;
          mesh.material.opacity = 0;
          if (mesh.material.name === "Material.018") {
            monitor = mesh;
            mesh.material.color.set("#FFFFFF");
          }
        });
      }
      if (object.name === "screenlight") {
        const mesh = object as MaterialMesh;
        mesh.material.transparent = true;
        mesh.material.opacity = 0;
        mesh.material.emissive.set("#B0F5EA");
        gsap.timeline({ repeat: -1, repeatRefresh: true }).to(mesh.material, {
          emissiveIntensity: () => intensity * 8,
          duration: () => Math.random() * 0.6,
          delay: () => Math.random() * 0.1,
        });
        screenLight = mesh;
      }
    });
    const neckBone = character.getObjectByName("spine005");
    if (window.innerWidth > 1024) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 50 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 65, y: 8.4, duration: 6, delay: 0, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 5, duration: 1 }, 0)
        .to(
          ".character-model",
          { pointerEvents: "none", left: "20%", delay: 0, duration: 6, ease: "power3.inOut" },
          0
        )
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      tl2.to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0);
      if (neckBone) {
        tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
      }
      if (monitor) {
        tl2.to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0);
        tl2.fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        );
      }
      if (screenLight) {
        tl2.to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);
      }

      tl3
        .to(
          ".character-model",
          { y: "0%", left: "55%", duration: 4, ease: "power3.inOut", delay: 0 },
          0
        )
        .to(camera.position, { z: 100, duration: 4, ease: "power2.inOut", delay: 0 }, 0)
        .to(character.rotation, { y: 0, x: -0.04, duration: 4, ease: "power2.inOut" }, 0)
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0);

      if (neckBone) {
        tl3.to(neckBone.rotation, { x: 0, duration: 4, ease: "power2.inOut" }, 0);
      }

      tl4.to(".character-model", { opacity: 0, duration: 4 }, 0);
    } else {
      // Mobile setup: Ensure character is visible and positioned correctly
      gsap.to(".character-model", { opacity: 1, duration: 1 }, 0);
      gsap.to(camera.position, { z: 85, y: 10, duration: 0 }, 0); // Zoom out slightly for mobile
      gsap.to(character.rotation, { y: 0, x: 0, duration: 0 }, 0);
      
      const tM2 = gsap.timeline({
        scrollTrigger: {
          id: "mobile-what",
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  });
}

export function setAllTimeline() {
  masterCtx.add(() => {
    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        id: "career-progress",
        trigger: ".career-section",
        start: "top 30%",
        end: "100% center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    careerTimeline
      .fromTo(
        ".career-timeline",
        { maxHeight: "10%" },
        { maxHeight: "100%", duration: 0.5 },
        0
      )

      .fromTo(
        ".career-timeline",
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0
      )
      .fromTo(
        ".career-info-box",
        { opacity: 0 },
        { opacity: 1, stagger: 0.1, duration: 0.5 },
        0
      )
      .fromTo(
        ".career-dot",
        { animationIterationCount: "infinite" },
        {
          animationIterationCount: "1",
          delay: 0.3,
          duration: 0.1,
        },
        0
      );

    if (window.innerWidth > 1024) {
      careerTimeline.fromTo(
        ".career-section",
        { y: 0 },
        { y: "20%", duration: 0.5, delay: 0.2 },
        0
      );
    } else {
      careerTimeline.fromTo(
        ".career-section",
        { y: 0 },
        { y: 0, duration: 0.5, delay: 0.2 },
        0
      );
    }
  });
}

export function cleanupTimelines() {
  masterCtx.revert();
  masterCtx = gsap.context(() => {});
}
