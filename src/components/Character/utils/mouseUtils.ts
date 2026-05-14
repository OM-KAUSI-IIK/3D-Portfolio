import * as THREE from "three";

export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number
  ) => void
) => {
  // On mobile touch end, return to center much faster to avoid "chaotic" lingering
  setTimeout(() => {
    setMousePosition(0, 0, 0.05, 0.05);
  }, 100);
};

export const handleHeadRotation = (
  bones: { head?: THREE.Object3D; neck?: THREE.Object3D; spine?: THREE.Object3D },
  mouseX: number,
  mouseY: number,
  interpolationX: number,
  interpolationY: number,
  lerp: (x: number, y: number, t: number) => number
) => {
  if (!bones || Object.keys(bones).length === 0) return;

  const isMobile = window.innerWidth <= 768;

  // Rotation limits - much stricter on mobile to prevent "chaotic" wide swings
  const rotationLimits = isMobile ? {
    head: { y: Math.PI / 20, x: Math.PI / 30 },  // Very subtle on mobile
    neck: { y: Math.PI / 24, x: Math.PI / 36 },  
    spine: { y: Math.PI / 40, x: Math.PI / 60 }  
  } : {
    head: { y: Math.PI / 8, x: Math.PI / 12 },  
    neck: { y: Math.PI / 12, x: Math.PI / 16 },  
    spine: { y: Math.PI / 20, x: Math.PI / 30 }  
  };

  // Smoothing - slower on mobile to feel "heavier" and less jittery
  const smoothing = isMobile ? 0.03 : 0.08;

  // Scale down interaction as user scrolls
  const scrollFactor = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.8));
  
  // On mobile, we almost disable the follow entirely when scrolling 
  // to avoid it fighting with the user's thumb movement
  const intensity = isMobile 
    ? (0.01 + 0.99 * scrollFactor) * (window.scrollY > 10 ? 0.1 : 1.0)
    : (0.05 + 0.95 * scrollFactor);

  // Apply rotations
  if (bones.head) {
    bones.head.rotation.y = lerp(bones.head.rotation.y, mouseX * rotationLimits.head.y * intensity, smoothing);
    bones.head.rotation.x = lerp(bones.head.rotation.x, -mouseY * rotationLimits.head.x * intensity, smoothing);
  }
  
  if (bones.neck) {
    bones.neck.rotation.y = lerp(bones.neck.rotation.y, mouseX * rotationLimits.neck.y * intensity, smoothing);
    bones.neck.rotation.x = lerp(bones.neck.rotation.x, -mouseY * rotationLimits.neck.x * intensity, smoothing);
  }
  
  if (bones.spine) {
    bones.spine.rotation.y = lerp(bones.spine.rotation.y, mouseX * rotationLimits.spine.y * intensity, smoothing);
    bones.spine.rotation.x = lerp(bones.spine.rotation.x, -mouseY * rotationLimits.spine.x * intensity, smoothing);
  }
};
