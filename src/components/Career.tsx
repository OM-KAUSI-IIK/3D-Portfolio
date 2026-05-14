import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analyst</h4>
                <h5>CSIR-CBRI · Roorkee</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designing end-to-end data analysis workflows for high-volume
              experimental datasets using Python (NumPy, Pandas, Matplotlib).
              Automating reporting pipelines and building data-driven dashboards
              to accelerate institutional decision-making. Contributing to the
              official CSIR-CBRI web platform using the MERN stack, improving
              data accessibility and content management.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer Intern</h4>
                <h5>Mapsily</h5>
              </div>
              <h3>Apr–Nov 2025</h3>
            </div>
            <p>
              Architected a responsive React.js dashboard visualizing real-time
              data, slashing data retrieval time by 30%. Crafted reusable React
              components with ARIA standards for WCAG compliance, accelerating
              feature development by 25%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern — Defense Tech</h4>
                <h5>BEL (Bharat Electronics), Kotdwar</h5>
              </div>
              <h3>Jun–Jul 2023</h3>
            </div>
            <p>
              Gained hands-on exposure to advanced defense security systems
              architecture. Participated in full project lifecycle management—
              from conceptualization to deployment—aligned with organizational
              security requirements and defense-tech best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
