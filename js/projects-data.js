/**
 * projects-data.js
 * Contains structured portfolio project data for dynamic rendering and interactive modals.
 */

const PORTFOLIO_PROJECTS = [
  {
    id: "ai-study-copilot",
    title: "AI Study CoPilot",
    subtitle: "RAG-Powered Smart Document Analyzer & Flashcard Generator",
    category: "ai",
    categoryLabel: "AI / ML & Full-Stack",
    featured: true,
    badge: "Hackathon Winner",
    shortDescription: "An intelligent study platform utilizing retrieval-augmented generation (RAG) to convert complex lecture slides, textbook PDFs, and audio recordings into interactive summaries, practice quizzes, and spaced-repetition flashcards.",
    longDescription: `
      AI Study CoPilot is a comprehensive learning assistant developed to combat academic cognitive overload. 
      Users can upload any PDF, lecture slide deck, or YouTube lecture link. The platform extracts vector embeddings using OpenAI / HuggingFace models, stores them in Pinecone, and delivers contextual Q&A alongside automated flashcard decks.
      
      The application features a real-time spaced repetition algorithm (SM-2 based) and synthetic test generation to test comprehension before midterms and finals.
    `,
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "LangChain", "Pinecone", "Tailwind CSS"],
    highlights: [
      "Processes 200+ page textbook PDFs in under 4 seconds using chunked async indexing",
      "Interactive conversational tutor with zero hallucination rate via strict grounding",
      "Export directly to Anki, Quizlet, or Markdown formats",
      "Awarded 1st place in AI Education Track at TreeHacks 2025"
    ],
    githubUrl: "https://github.com/alexrivera-dev/ai-study-copilot",
    liveDemoUrl: "https://ai-study-copilot-demo.example.com",
    metrics: "2,400+ Active Student Users",
    icon: "fa-solid fa-brain",
    colorGradient: "linear-gradient(135deg, #6366f1, #a855f7)"
  },
  {
    id: "campus-event-nexus",
    title: "Campus Event Nexus",
    subtitle: "Real-Time Student Life & Ticketing Ecosystem",
    category: "web",
    categoryLabel: "Full-Stack Web App",
    featured: true,
    badge: "Campus Favorite",
    shortDescription: "A centralized real-time web portal for university clubs to host events, manage RSVPs, broadcast instant notifications, and scan QR-code digital tickets.",
    longDescription: `
      Campus Event Nexus solves the fragmented communication across 120+ campus student organizations. 
      Built with a high-throughput Node.js microservices backend and a React single-page frontend, the platform supports real-time seat reservations, QR check-ins, interactive campus map pins, and calendar synchronization.
      
      Features an administrative dashboard with live analytics on student attendance, peak engagement hours, and demographic reach.
    `,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Leaflet Maps", "Redis"],
    highlights: [
      "Sub-50ms live synchronization using Socket.io cluster",
      "Dynamic QR ticketing system with anti-screenshot security tokens",
      "Adopted by 45+ official university student organizations",
      "Handled 8,000+ RSVPs during annual Spring Fest without downtime"
    ],
    githubUrl: "https://github.com/alexrivera-dev/campus-event-nexus",
    liveDemoUrl: "https://campus-events-nexus.example.com",
    metrics: "12,000+ Tickets Issued",
    icon: "fa-solid fa-calendar-days",
    colorGradient: "linear-gradient(135deg, #06b6d4, #3b82f6)"
  },
  {
    id: "clouddrop-vault",
    title: "CloudDrop Secure Vault",
    subtitle: "End-to-End Encrypted P2P File Transfer Protocol",
    category: "systems",
    categoryLabel: "Systems & Security",
    featured: true,
    badge: "Open Source",
    shortDescription: "A zero-knowledge peer-to-peer file sharing protocol operating entirely in the browser using WebRTC data channels and client-side AES-GCM 256-bit cryptography.",
    longDescription: `
      CloudDrop eliminates file size limits and server storage fees by establishing direct encrypted WebRTC data channels between browsers. 
      Files are encrypted locally on the sender's device using ephemeral keys generated with the Web Crypto API, streamed in binary chunks over WebRTC, and decrypted exclusively on the recipient's machine.
      
      The signaling server only negotiates SDP handshakes and never touches or logs file content, ensuring 100% privacy and zero-knowledge transmission.
    `,
    technologies: ["WebRTC", "TypeScript", "Node.js", "Web Crypto API", "Docker", "Tailwind CSS"],
    highlights: [
      "Zero server-side bandwidth cost via direct peer mesh connectivity",
      "Client-side 256-bit AES-GCM encryption with SHA-256 integrity checksums",
      "Supports multi-gigabyte transfers with automatic chunk resuming",
      "Featured on GitHub trending in developer tools"
    ],
    githubUrl: "https://github.com/alexrivera-dev/clouddrop-vault",
    liveDemoUrl: "https://clouddrop-vault.example.com",
    metrics: "50TB+ Data Transferred",
    icon: "fa-solid fa-shield-halved",
    colorGradient: "linear-gradient(135deg, #10b981, #06b6d4)"
  },
  {
    id: "healthpulse-iot",
    title: "HealthPulse Telemetry",
    subtitle: "Biometric Stream Processing & Anomaly Forecasting",
    category: "ai",
    categoryLabel: "IoT & Predictive ML",
    featured: false,
    badge: "Research Project",
    shortDescription: "A real-time health telemetry dashboard that ingests wearable sensor streams and performs edge anomaly detection using Long Short-Term Memory (LSTM) networks.",
    longDescription: `
      Developed as part of undergraduate biomedical engineering research, HealthPulse captures continuous ECG, SpO2, and heart rate variability metrics. 
      Data is streamed over MQTT into a TimescaleDB time-series database. An inference pipeline running lightweight PyTorch ONNX models flags sudden arrhythmias and abnormal spikes with 94.8% precision.
    `,
    technologies: ["Python", "PyTorch", "Flask", "TimescaleDB", "Chart.js", "MQTT", "Docker"],
    highlights: [
      "94.8% anomaly detection accuracy on MIT-BIH Arrhythmia benchmark",
      "Low-latency real-time visualization updating at 30 FPS using canvas rendering",
      "Configurable emergency alert webhooks to caregivers and physicians"
    ],
    githubUrl: "https://github.com/alexrivera-dev/healthpulse-iot",
    liveDemoUrl: "https://healthpulse-demo.example.com",
    metrics: "94.8% ML Precision",
    icon: "fa-solid fa-heart-pulse",
    colorGradient: "linear-gradient(135deg, #ec4899, #f43f5e)"
  },
  {
    id: "visionnav-robot",
    title: "VisionNav Autonomous Bot",
    subtitle: "Computer Vision & 2D SLAM Robot Simulation",
    category: "systems",
    categoryLabel: "Robotics & CV",
    featured: false,
    badge: "Robotics Lab",
    shortDescription: "A 2D autonomous ground robot simulator implementing real-time obstacle avoidance, A* pathfinding, and LiDAR point-cloud mapping using OpenCV and C++.",
    longDescription: `
      VisionNav simulates autonomous navigation in dynamic unknown environments. 
      The simulator models noisy sensor inputs (virtual ultrasonic + 360 LiDAR) and applies probabilistic occupancy grid mapping (SLAM) alongside an optimized A* algorithm for real-time trajectory re-planning.
    `,
    technologies: ["C++", "Python", "OpenCV", "NumPy", "Pygame", "CMake"],
    highlights: [
      "Real-time sensor fusion with dynamic obstacle avoidance at 60 FPS",
      "Implemented custom Extended Kalman Filter (EKF) for sensor noise filtering",
      "Benchmarked against standard ROS navigation stack"
    ],
    githubUrl: "https://github.com/alexrivera-dev/visionnav-sim",
    liveDemoUrl: "https://visionnav-sim.example.com",
    metrics: "60 FPS Real-Time Sim",
    icon: "fa-solid fa-robot",
    colorGradient: "linear-gradient(135deg, #f59e0b, #d97706)"
  },
  {
    id: "fintrack-analytics",
    title: "FinTrack Wealth Analytics",
    subtitle: "AI Expense Forecasting & Budget Optimization Engine",
    category: "web",
    categoryLabel: "FinTech Web App",
    featured: false,
    badge: "Personal Project",
    shortDescription: "A full-stack personal finance application that securely synchronizes bank transactions, automatically classifies spending patterns, and predicts month-end cashflow.",
    longDescription: `
      FinTrack empowers students and young professionals to take command of their financial trajectory. 
      Features automated receipt OCR, recurring subscription detection, interactive budgeting charts, and predictive cash flow regression models to forecast savings 6 months into the future.
    `,
    technologies: ["React", "TypeScript", "Django", "PostgreSQL", "Scikit-Learn", "Chart.js"],
    highlights: [
      "Automated transaction category classification with 93% accuracy",
      "Interactive SVG cashflow waterfall diagrams and budget breakdown graphs",
      "Plaid API sandbox integration for mock bank synchronization"
    ],
    githubUrl: "https://github.com/alexrivera-dev/fintrack-analytics",
    liveDemoUrl: "https://fintrack-analytics.example.com",
    metrics: "$150k+ Tracked Spend",
    icon: "fa-solid fa-chart-line",
    colorGradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)"
  }
];

if (typeof window !== "undefined") {
  window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;
}
