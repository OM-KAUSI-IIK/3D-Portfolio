import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const onClick = () => handleClick(container);
          container.addEventListener("click", onClick);
          cleanupFns.push(() => container.removeEventListener("click", onClick));
        }
      });
    }
    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);
  return (
    <div className="whatIDO" id="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>FULL-STACK DEV</h3>
              <h4>MERN Stack & API Engineering</h4>
              <p>
                Building scalable, production-ready full-stack applications using
                the MERN stack. From RESTful APIs and real-time WebSocket systems
                to dynamic React UIs—I ship complete products end to end.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React.js</div>
                <div className="what-tags">Node.js & Express</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">REST APIs</div>
                <div className="what-tags">WebSocket</div>
                <div className="what-tags">Flask & Django</div>
                <div className="what-tags">Supabase</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AGENTIC AI</h3>
              <h4>Autonomous Agents & LLM Engineering</h4>
              <p>
                Designing intelligent multi-agent systems using LangChain,
                CrewAI, AutoGen & LangGraph. From prompt engineering to
                tool-calling agents and RAG pipelines—I build AI that reasons
                and acts autonomously.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">LangChain</div>
                <div className="what-tags">CrewAI</div>
                <div className="what-tags">AutoGen</div>
                <div className="what-tags">LangGraph</div>
                <div className="what-tags">n8n Workflows</div>
                <div className="what-tags">Prompt Engineering</div>
                <div className="what-tags">ReAct & CoT</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DATA & ML</h3>
              <h4>Analysis, Modeling & Insights</h4>
              <p>
                Transforming complex experimental datasets into actionable
                insights using Python data science stack. Building ML pipelines
                from preprocessing and model selection to production inference
                APIs with scikit-learn.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">Pandas & NumPy</div>
                <div className="what-tags">scikit-learn</div>
                <div className="what-tags">Matplotlib</div>
                <div className="what-tags">SciPy</div>
                <div className="what-tags">Tableau & PowerBI</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
