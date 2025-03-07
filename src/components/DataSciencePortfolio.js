import React, { useState, useEffect } from "react";
import YashImage from "./img/YashImage.jpg";
import yash_resume from "./docs/yash_resume.pdf";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Code,
  Github,
  Linkedin,
  Mail,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Download,
  User,
} from "lucide-react";

// Projects Data with background images
const projectsData = [
  {
    id: 1,
    title: "InsurePredict – Customer Conversion Insights",
    description:
      "Designed and deployed an end-to-end insurance customer prediction system on AWS EC2 using Docker containerization and CI/CD pipelines. Developed a robust Random Forest model achieving 95% overall accuracy, 80% precision, and 90% recall.",
    technologies: ["Python", "Random Forest", "AWS EC2", "Docker", "CI/CD"],
    githubLink:
      "https://github.com/YashMasane/InsurePredict-Customer-Conversion-Insights",
    bgImage:
      "https://media.istockphoto.com/id/886772948/photo/customer-diagram.jpg?s=612x612&w=0&k=20&c=Drhn0AgH-pPEFtc5BMmGs5EfWD9ZsL2FLUIcN9BaiB4=",
  },
  {
    id: 2,
    title: "MoneyMinds – Intelligent AI Agents for Investments",
    description:
      "Engineered a multi-agent AI system integrating specialized tools for comprehensive stock analysis. Processed key financial metrics to reduce analysis time by 40% and deliver actionable investment strategies.",
    technologies: ["Python", "Multi-Agent Systems", "CrewAI", "Gemma-2 LLM"],
    githubLink:
      "https://github.com/YashMasane/MoneyMinds-AI--Intelligent-AI-agents-managing-investments",
    bgImage:
      "https://img.freepik.com/premium-photo/automated-stock-trading-using-artificial-intelligence-neural-networks_117038-36410.jpg",
  },
  {
    id: 3,
    title: "AI-Generated vs Real Image Classifier",
    description:
      "Developed an image classification model using EfficientNetB6 with transfer learning to distinguish between AI-generated and real images, achieving precision of 94.50%, recall of 93.67% and accuracy of 94%. Reduced model size by 20% through hyperparameter tuning, delivering a lighter yet equally efficient alternative to EfficientNetB3. Accelerated training time by 35% with GPU optimization and efficient data pipelines.",
    technologies: ["TensorFlow", "Python", "EfficientNet", "Pandas", "NumPy"],
    githubLink: "https://github.com/YashMasane/Real-vs-AI-generated-image",
    bgImage:
      "https://media.licdn.com/dms/image/v2/D5612AQFD_J-4Xk4hRw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1714241404420?e=2147483647&v=beta&t=EnJzMzdozwnL1sOednfQWCmaUNjGRBXDgGIN1w_UWc8",
  },
  {
    id: 4,
    title: "Comment Toxicity Detector",
    description:
      "Designed a multilabel comment toxicity detection model with TensorFlow, achieving accuracy of 99%, 92.94% precision, and 81.87% recall. Improved classification by 15% using Bidirectional LSTM, significantly reducing false positives. Boosted training efficiency by 40% with GPU optimization and streamlined batching techniques.",
    technologies: ["Python", "Jupyter Notebook", "TensorFlow"],
    githubLink: "https://github.com/YashMasane/Comment-Toxicity-Model",
    bgImage:
      "https://github.com/YashMasane/Comment-Toxicity-Model/raw/main/img/toxic%20comments.webp",
  },
];

// Radar chart data for core skill categories
const radarData = [
  { subject: "Programming", level: 90 },
  { subject: "Machine Learning", level: 90 },
  { subject: "Deep Learning", level: 90 },
  { subject: "NLP", level: 85 },
  { subject: "GenAI", level: 85 },
  { subject: "Data Visualization", level: 80 },
  { subject: "MLOps", level: 75 },
];

// Technology logos for the skills section
const skillsLogos = [
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "MS SQL Server",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  },
  {
    name: "TensorFlow",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "Keras",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  },
  {
    name: "PyTorch",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "scikit-learn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Matplotlib",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  },
  {
    name: "Seaborn",
    logo: "https://cdn.worldvectorlogo.com/logos/seaborn-1.svg",
  },
  {
    name: "Power BI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/1200px-New_Power_BI_Logo.svg.png",
  },
  {
    name: "LangChain",
    logo: "https://blogs.perficient.com/files/lanchain.png",
  },
  {
    name: "Hugging Face",
    logo: "https://dlab.berkeley.edu/sites/default/files/styles/openberkeley_image_full/public/hugging_face_0.png?itok=EcNqVjG9&timestamp=1639512837",
  },
];

const educationData = [
  {
    degree: "M.Sc. in Mathematics and Scientific Computing",
    institution: "Motilal Nehru National Institute of Technology, Allahabad",
    year: "Aug 2022 – May 2024",
    description:
      "Specialized in Mathematics and Scientific Computing (CPI: 7.48)",
  },
  {
    degree: "Bachelor of Science",
    institution: "Nagpur University",
    year: "July 2018 – June 2021",
    description: "Focused on Mathematics, Physics, and Chemistry (CGPA: 8.44)",
  },
];

// NEW: Experience data array
const experienceData = [
  {
    role: "Machine Learning Intern",
    company: "Anubrain Technologies",
    duration: "June 2024 – August 2024",
    description:
      "Worked on developing high-precision machine learning models for real-time data analysis. Assisted in feature engineering and optimization of data pipelines, resulting in a 20% improvement in model performance.",
  },
];

const DataSciencePortfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [typedText, setTypedText] = useState("");
  const roles = [
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Researcher",
  ];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const role = roles[currentRole];
    const typing = setInterval(() => {
      if (currentIndex <= role.length) {
        setTypedText(role.slice(0, currentIndex));
        currentIndex++;
      } else {
        setTimeout(() => {
          const deleting = setInterval(() => {
            if (currentIndex > 0) {
              setTypedText(role.slice(0, currentIndex - 1));
              currentIndex--;
            } else {
              clearInterval(deleting);
              setCurrentRole((prev) => (prev + 1) % roles.length);
            }
          }, 100);
        }, 2000);
        clearInterval(typing);
      }
    }, 200);
    return () => clearInterval(typing);
  }, [currentRole]);

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return (
          <section className="bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-3xl font-bold mb-6 text-left flex items-left justify-left">
              <User className="mr-3" /> About Me
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-left">
              <div>
                <img
                  src={YashImage}
                  alt="Yash Raju Masane"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="text-left">
                <p className="text-lg text-gray-700 mb-6">
                  Hello, I'm Yash Raju Masane – a passionate Data Scientist with
                  a strong foundation in Mathematics and Scientific Computing. I
                  specialize in leveraging advanced machine learning, deep
                  learning, and AI techniques to transform data into actionable
                  insights.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  My journey in data science has been enriched by hands-on
                  experience, including a Machine Learning Internship at
                  Anubrain Technologies where I developed high-precision models
                  and optimized feature selection processes.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Holding an M.Sc. from MNIT Allahabad and a B.Sc. from Nagpur
                  University, I continuously push the envelope in
                  innovation—clearing GATE 2024 and JAM 2022 are testaments to
                  my commitment to excellence.
                </p>
                <div className="mt-8">
                  <a
                    href={yash_resume}
                    download
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition flex items-center justify-center w-64"
                  >
                    <Download className="mr-2" /> Download Resume
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      case "projects":
        return (
          <section className="bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
              <Code className="mr-3" /> Data Science Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="relative group rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all"
                  style={{
                    backgroundImage: `url(${project.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "300px",
                  }}
                >
                  {/* Overlay that changes on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-white group-hover:bg-opacity-90 p-6 flex flex-col justify-end transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-black text-white">
                      {project.title}
                    </h3>
                    <p className="mb-4 group-hover:text-black text-white">
                      <div className="text-left">{project.description}</div>
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.githubLink}
                      className="flex items-center group-hover:text-black text-white border border-white group-hover:border-black px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
                    >
                      <Github className="mr-2" size={18} /> View on GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "experience":
        return (
          <section className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center text-purple-800">
              <TrendingUp className="mr-3" /> Experience
            </h2>
            <div className="relative max-w-4xl mx-auto">
              {experienceData.map((exp, index) => (
                <div key={index} className="mb-10 flex items-center w-full">
                  {index % 2 === 0 ? (
                    <>
                      {/* Left side content */}
                      <div className="w-5/12 text-right pr-4">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                          <h3 className="text-xl font-semibold mb-2 text-purple-900">
                            {exp.role}
                          </h3>
                          <p className="text-purple-700 mb-1">{exp.company}</p>
                          <p className="text-purple-500 mb-3">{exp.duration}</p>
                          <p className="text-gray-700">
                            <div className="text-left">{exp.description}</div>
                          </p>
                        </div>
                      </div>
                      {/* Timeline marker */}
                      <div className="w-1/12 flex justify-center">
                        <div className="z-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full w-12 h-12 border-4 border-white shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      {/* Right spacer */}
                      <div className="w-6/12"></div>
                    </>
                  ) : (
                    <>
                      {/* Left spacer */}
                      <div className="w-6/12"></div>
                      {/* Timeline marker */}
                      <div className="w-1/12 flex justify-center">
                        <div className="z-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full w-12 h-12 border-4 border-white shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      {/* Right side content */}
                      <div className="w-5/12 text-left pl-4">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                          <h3 className="text-xl font-semibold mb-2 text-purple-900">
                            {exp.role}
                          </h3>
                          <p className="text-purple-700 mb-1">{exp.company}</p>
                          <p className="text-purple-500 mb-3">{exp.duration}</p>
                          <p className="text-gray-700">
                            <div className="text-left">{exp.description}</div>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      case "education":
        return (
          <section className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center text-purple-800">
              <GraduationCap className="mr-3" /> Education
            </h2>
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-purple-300"></div>
              {educationData.map((edu, index) => (
                <div key={index} className="mb-10 flex items-center w-full">
                  {index % 2 === 0 ? (
                    <>
                      {/* Left side content */}
                      <div className="w-5/12 text-right pr-4">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                          <h3 className="text-xl font-semibold mb-2 text-purple-900">
                            {edu.degree}
                          </h3>
                          <p className="text-purple-700 mb-1">
                            {edu.institution}
                          </p>
                          <p className="text-purple-500 mb-3">{edu.year}</p>
                          <p className="text-gray-700">{edu.description}</p>
                        </div>
                      </div>
                      {/* Timeline marker */}
                      <div className="w-1/12 flex justify-center">
                        <div className="z-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full w-12 h-12 border-4 border-white shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      {/* Right spacer */}
                      <div className="w-6/12"></div>
                    </>
                  ) : (
                    <>
                      {/* Left spacer */}
                      <div className="w-6/12"></div>
                      {/* Timeline marker */}
                      <div className="w-1/12 flex justify-center">
                        <div className="z-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full w-12 h-12 border-4 border-white shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      {/* Right side content */}
                      <div className="w-5/12 text-left pl-4">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                          <h3 className="text-xl font-semibold mb-2 text-purple-900">
                            {edu.degree}
                          </h3>
                          <p className="text-purple-700 mb-1">
                            {edu.institution}
                          </p>
                          <p className="text-purple-500 mb-3">{edu.year}</p>
                          <p className="text-gray-700">{edu.description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      case "skills":
        return (
          <section className="bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
              <TrendingUp className="mr-3" /> Technical Skills
            </h2>
            <div className="max-w-4xl mx-auto">
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={radarData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Skill Level"
                    dataKey="level"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
                {skillsLogos.map((skill, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-16 h-16 object-contain"
                      title={skill.name}
                    />
                    <p className="mt-2 text-sm text-gray-700">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      default:
        return (
          <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <img
                  src={YashImage}
                  alt="Yash Raju Masane"
                  className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-lg"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">Yash Raju Masane</h1>
              <p className="text-2xl mb-8 h-10">
                I am a <span className="text-blue-600">{typedText}|</span>
              </p>
              <div className="flex justify-center space-x-6">
                <button
                  onClick={() => setActiveSection("about")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition flex items-center"
                >
                  <User className="mr-2" /> About Me
                </button>
                <button
                  onClick={() => setActiveSection("projects")}
                  className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition flex items-center"
                >
                  <Code className="mr-2" /> Projects
                </button>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            Yash Raju Masane
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveSection("home")}
              className="hover:text-blue-600 flex items-center"
            >
              Home
            </button>
            <button
              onClick={() => setActiveSection("about")}
              className="hover:text-blue-600 flex items-center"
            >
              <User className="mr-1" size={16} /> About
            </button>
            <button
              onClick={() => setActiveSection("projects")}
              className="hover:text-blue-600 flex items-center"
            >
              <Code className="mr-1" size={16} /> Projects
            </button>
            <button
              onClick={() => setActiveSection("experience")}
              className="hover:text-blue-600 flex items-center"
            >
              <TrendingUp className="mr-1" size={16} /> Experience
            </button>
            <button
              onClick={() => setActiveSection("skills")}
              className="hover:text-blue-600 flex items-center"
            >
              <TrendingUp className="mr-1" size={16} /> Skills
            </button>
            <button
              onClick={() => setActiveSection("education")}
              className="hover:text-blue-600 flex items-center"
            >
              <GraduationCap className="mr-1" size={16} /> Education
            </button>
            <button
              onClick={() => setActiveSection("blog")}
              className="hover:text-blue-600 flex items-center"
            >
              <BookOpen className="mr-1" size={16} /> Blog
            </button>
          </div>
        </div>
      </nav>

      {renderSection()}

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://github.com/YashMasane"
              className="hover:text-blue-400"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/yashm08/"
              className="hover:text-blue-400"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:masaneyash6@gmail.com"
              className="hover:text-blue-400"
            >
              <Mail size={24} />
            </a>
          </div>
          <p>© 2025 Yash Raju Masane Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DataSciencePortfolio;
