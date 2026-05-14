import { useCallback, useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "CodeSync Meet",
    category: "Remote Interview Platform",
    tools: "Node.js, Express, React, Clerk Auth, VSCode Editor, WebRTC, TanStack Query",
    images: [
      "/images/prject-images/code/code-1.png",
      "/images/prject-images/code/code-2.png",
    ],
    link: "https://github.com/OM-KAUSI-IIK",
  },
  {
    title: "Medicose Plus",
    category: "AI-Powered Disease Prediction Platform",
    tools: "React (Vite), Flask, MongoDB, Node.js, scikit-learn, JWT Auth, RandomForest ML",
    images: [
      "/images/prject-images/medicose/Screenshot 2026-05-14 112107.png",
      "/images/prject-images/medicose/Screenshot 2026-05-14 112136.png",
      "/images/prject-images/medicose/Screenshot 2026-05-14 112328.png",
      "/images/prject-images/medicose/Screenshot 2026-05-14 112349.png",
    ],
    link: "https://github.com/OM-KAUSI-IIK",
  },
  {
    title: "Civil AI Analytics",
    category: "AI-Powered Civil Engineering Platform",
    tools:
      "AI-powered civil engineering and data analysis platform with RAG, ML estimation, optimization, conversational assistant, and intelligent analytics dashboard.",
    images: [
      "/images/prject-images/civil-gpt/Screenshot 2026-05-14 103504.png",
      "/images/prject-images/civil-gpt/Screenshot 2026-05-14 110656.png",
      "/images/prject-images/civil-gpt/Screenshot 2026-05-14 110723.png",
      "/images/prject-images/civil-gpt/Screenshot 2026-05-14 110817.png",
      "/images/prject-images/civil-gpt/Screenshot 2026-05-14 110843.png",
    ],
    link: "https://github.com/OM-KAUSI-IIK",
  },
  {
    title: "InvestAI Insights",
    category: "AI-Powered Investment Analytics Platform",
    tools:
      "AI-powered investment analytics platform combining stock prediction, mutual fund recommendations, recommendation engine, and real-time financial data analysis for informed decisions.",
    images: [
      "/images/prject-images/stock/srock-1.png",
      "/images/prject-images/stock/stock-2.png",
    ],
    link: "https://github.com/OM-KAUSI-IIK",
  },
  {
    title: "TicketPortal",
    category: "BookMyShow Clone — MERN Stack",
    tools: "MongoDB, Express.js, React.js, Node.js, RESTful APIs, Payment Integration",
    images: [
      "/images/prject-images/ticket/books-1.png",
      "/images/prject-images/ticket/books-2.png",
      "/images/prject-images/ticket/ticket_Justice_League.png",
    ],
    link: "https://github.com/OM-KAUSI-IIK",
  },
  {
    title: "CSIR-CBRI Data Pipeline",
    category: "Research Data Analysis & Automation",
    tools: "Python, Pandas, NumPy, Matplotlib, SciPy, Automated Reporting Dashboards",
    images: ["/images/express.webp", "/images/express.webp", "/images/express.webp"],
    link: "https://github.com/OM-KAUSI-IIK",
  },
];
const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      window.setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-carousel">
          <button
            className="work-carousel-arrow work-carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="work-carousel-arrow work-carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="work-carousel-viewport">
            <div
              className="work-carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div className="work-carousel-slide" key={project.title}>
                  <article className="work-card">
                    <div className="work-card-content">
                      <div className="work-card-info">
                        <div className="work-card-number">
                          <h3>{String(index + 1).padStart(2, "0")}</h3>
                        </div>
                        <div className="work-card-details">
                          <h4>{project.title}</h4>
                          <p className="work-card-category">{project.category}</p>
                          <div className="work-card-tools">
                            <span className="tools-label">Tools & Features</span>
                            <p>{project.tools}</p>
                          </div>
                        </div>
                      </div>
                      <div className="work-card-image">
                        <WorkImage
                          images={project.images}
                          alt={project.title}
                          link={project.link}
                        />
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="work-carousel-dots">
            {projects.map((project, index) => (
              <button
                key={project.title}
                className={`work-carousel-dot ${index === currentIndex ? "work-carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
