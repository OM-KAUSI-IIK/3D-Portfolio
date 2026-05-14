import { useEffect } from "react";
import type { MouseEvent } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother | undefined;

const Navbar = () => {
  useEffect(() => {
    const createSmoother = () => {
      if (window.innerWidth <= 1024 || smoother) {
        document.body.style.overflowY = "auto";
        return;
      }

      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 0.9,
        speed: 1,
        effects: false,
        autoResize: true,
        ignoreMobileResize: true,
      });

      smoother.scrollTop(0);
      smoother.paused(!document.querySelector("main.main-active"));
    };

    createSmoother();

    let resizeTimer: number | undefined;
    const resizeFn = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (window.innerWidth <= 1024) {
          if (smoother) {
            smoother.kill();
            smoother = undefined;
          }
          document.body.style.overflowY = "auto";
          ScrollTrigger.refresh();
          return;
        }

        createSmoother();
        ScrollSmoother.refresh(true);
      }, 150);
    };
    window.addEventListener("resize", resizeFn);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeFn);
      if (smoother) smoother.kill();
      smoother = undefined;
    };
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth <= 1024) return;

    const section = event.currentTarget.getAttribute("data-href");
    if (!section || !smoother) return;

    event.preventDefault();
    ScrollTrigger.refresh();
    
    // Using a timeout to ensure the browser has finished any layout shifts 
    // caused by the refresh before we attempt to scroll.
    setTimeout(() => {
      if (smoother) {
        smoother.scrollTo(section, true, "top top");
      }
    }, 10);
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          OK
        </a>
        <a
          href="https://www.linkedin.com/in/om-kaushik0103"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/om-kaushik0103
        </a>
        <span className="navbar-separator">|</span>
        <ul>
          <li>
            <a data-href="#about" href="#about" onClick={handleNavClick}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#whatIDO" href="#whatIDO" onClick={handleNavClick}>
              <HoverLinks text="WHAT I DO" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" onClick={handleNavClick}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" onClick={handleNavClick}>
              <HoverLinks text="CONTACT" />
            </a>
          </li>

        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;

