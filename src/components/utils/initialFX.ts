import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function initialFX() {
  const splits: SplitText[] = [];

  const ctx = gsap.context(() => {
    document.body.style.overflowY = "auto";
    const activeSmoother = ScrollSmoother.get();
    if (activeSmoother) activeSmoother.paused(false);
    
    const mainEl = document.getElementsByTagName("main")[0];
    if (mainEl) mainEl.classList.add("main-active");
    
    gsap.to("body", {
      backgroundColor: "#0a0e17",
      duration: 0.5,
      delay: 1,
    });

    const landingText = new SplitText(
      [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
      {
        type: "chars,lines",
        linesClass: "split-line",
      }
    );
    splits.push(landingText);

    gsap.fromTo(
      landingText.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      [".landing-info-h2", ".landing-info-subtitle"],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
        y: 0,
        delay: 0.8,
        stagger: 0.08,
      }
    );
    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0.1,
      }
    );

  });

  return { ctx, splits };
}
