import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const items = Array.from(social.querySelectorAll("span")).map((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      return {
        elem,
        link,
        rect: elem.getBoundingClientRect(),
        mouseX: elem.offsetWidth / 2,
        mouseY: elem.offsetHeight / 2,
        currentX: elem.offsetWidth / 2,
        currentY: elem.offsetHeight / 2,
      };
    });

    const refreshRects = () => {
      items.forEach((item) => {
        item.rect = item.elem.getBoundingClientRect();
        item.mouseX = item.rect.width / 2;
        item.mouseY = item.rect.height / 2;
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      items.forEach((item) => {
        const x = e.clientX - item.rect.left;
        const y = e.clientY - item.rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          item.mouseX = x;
          item.mouseY = y;
        } else {
          item.mouseX = item.rect.width / 2;
          item.mouseY = item.rect.height / 2;
        }
      });
    };

    let frameId = 0;
    const updatePosition = () => {
      items.forEach((item) => {
        item.currentX += (item.mouseX - item.currentX) * 0.12;
        item.currentY += (item.mouseY - item.currentY) * 0.12;

        item.link.style.setProperty("--siLeft", `${item.currentX}px`);
        item.link.style.setProperty("--siTop", `${item.currentY}px`);
      });

      frameId = requestAnimationFrame(updatePosition);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", refreshRects);
    frameId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", refreshRects);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/OM-KAUSI-IIK"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/om-kaushik0103"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="mailto:agomkaushik@gmail.com"
          >
            <MdEmail />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Om_Kaushik_Resume.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
