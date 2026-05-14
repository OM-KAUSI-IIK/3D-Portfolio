import "./styles/AgenticAI.css";

const skillGroups = [
  {
    category: "Workflow Automation",
    icon: "⚡",
    skills: ["n8n", "Process Automation", "API Orchestration"],
  },
  {
    category: "Agent Frameworks",
    icon: "🤖",
    skills: ["LangChain", "LangGraph", "AutoGen", "CrewAI"],
  },
  {
    category: "LLM & Prompting",
    icon: "🧠",
    skills: [
      "LLM Integration",
      "Prompt Engineering",
      "ReAct",
      "Chain-of-Thought (CoT)",
      "Self-Reflection",
    ],
  },
  {
    category: "Agent Capabilities",
    icon: "🛠️",
    skills: [
      "Tool Calling / Function Calling",
      "Multi-Agent Systems",
      "Agent Collaboration Design",
      "APIs, Databases & Tool Integration",
    ],
  },
  {
    category: "Planning & Reasoning",
    icon: "🎯",
    skills: [
      "Task Decomposition",
      "Goal-Oriented Execution",
      "Autonomous Decision Loops",
    ],
  },
];

const AgenticAI = () => {
  return (
    <div className="agentic-section section-container" id="agentic">
      <div className="agentic-container">
        <div className="agentic-header">
          <h2>
            Agentic <span>AI</span>
            <br />
            <span className="agentic-sub">Skillset</span>
          </h2>
          <p className="agentic-desc">
            Building next-generation autonomous AI systems — from intelligent
            workflow automation to multi-agent orchestration frameworks that
            reason, plan, and act.
          </p>
        </div>

        <div className="agentic-grid">
          {skillGroups.map((group, i) => (
            <div className="agentic-card" key={i}>
              <div className="agentic-card-header">
                <span className="agentic-icon">{group.icon}</span>
                <h3>{group.category}</h3>
              </div>
              <div className="agentic-tags">
                {group.skills.map((skill, j) => (
                  <div className="agentic-tag" key={j}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgenticAI;
