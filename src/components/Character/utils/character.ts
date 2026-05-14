import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const MODEL_PATH = "/models/Final_model.glb?v=1";
const TARGET_MODEL_HEIGHT = 14.9;
const TARGET_FOOT_Y = 0;

const fitCharacterToViewport = (character: THREE.Object3D) => {
  const bounds = new THREE.Box3().setFromObject(character);
  if (bounds.isEmpty()) return;

  const size = bounds.getSize(new THREE.Vector3());
  if (size.y > 0) {
    const scaleFactor = TARGET_MODEL_HEIGHT / size.y;
    character.scale.multiplyScalar(scaleFactor);
    character.updateWorldMatrix(true, true);
  }

  const fittedBounds = new THREE.Box3().setFromObject(character);
  if (fittedBounds.isEmpty()) return;

  const center = fittedBounds.getCenter(new THREE.Vector3());
  character.position.x -= center.x;
  character.position.z -= center.z;
  character.position.y += TARGET_FOOT_Y - fittedBounds.min.y;
  character.updateWorldMatrix(true, true);
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async () => {
    try {
      return new Promise<GLTF | null>((resolve, reject) => {
        let character: THREE.Object3D;
        loader.load(
          MODEL_PATH,
          async (gltf) => {
            character = gltf.scene;
            fitCharacterToViewport(character);
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: THREE.Object3D) => {
              const mesh = child as THREE.Mesh;
              if (mesh.isMesh) {
                const material = mesh.material;

                // Change clothing colors to match site theme
                if (material && !Array.isArray(material)) {
                  if (mesh.name === "BODY.SHIRT") {
                    const newMat =
                      material.clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#8B4513");
                    mesh.material = newMat;
                  } else if (mesh.name === "Pant") {
                    const newMat =
                      material.clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000");
                    mesh.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const rightFoot = character.getObjectByName("footR");
            const leftFoot = character.getObjectByName("footL");
            if (rightFoot) rightFoot.position.y = TARGET_FOOT_Y;
            if (leftFoot) leftFoot.position.y = TARGET_FOOT_Y;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { loadCharacter };
};

export default setCharacter;
