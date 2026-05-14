import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              OM
              <br />
              <span>KAUSHIK</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Full-Stack &</h3>
            <h2 className="landing-info-h2">Agentic AI Developer</h2>
            <p className="landing-info-subtitle">AI Engineer</p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
