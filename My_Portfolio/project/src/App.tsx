import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "EE-commerce Application",
    description: "A full-stack ee-commerce platform",
    details: "Built a comprehensive e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product management, cart functionality, and payment integration."
  },
  {
    id: 2,
    title: "M & S Project Webpage",
    description: "Corporate website development",
    details: "Developed a responsive corporate website for M & S project using modern web technologies. Implemented dynamic content management and optimized performance."
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              Rohan Ravi Kumtakar
            </h1>
            <p className="text-xl text-gray-300 mb-8">DevOps Engineer & Server administrator </p>
            <div className="flex justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com"
                target="_blank"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com"
                target="_blank"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:contact@example.com"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-gray-300 text-lg mb-6">
                A highly skilled DevOps Engineer with 3 years of hands-on experience in automating and streamlining operations and processes, focusing on continuous integration and continuous deployment (CI/CD). 
                Proficient in managing cloud infrastructure, implementing infrastructure as code (laC), and optimizing system performance. Experienced in working with tools such as Docker, Kubernetes,
                Jenkins, Terraform, and Ansible. Strong background in scripting and version control, with a solid understanding of cloud platforms like AWS, Azure, and GCP.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden"
            >
              <img
                src="/images/image.jpg"
                alt="Rohan Ravi Kumtakar"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience & Education</h2>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-blue-500 mb-12"
            >
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
              <h3 className="text-2xl font-bold mb-2">DevOps Engineer</h3>
              <p className="text-gray-400">Tata Consultancy Services</p>
              <p className="text-gray-400">February 2022 - Present</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-purple-500"
            >
              <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0"></div>
              <h3 className="text-2xl font-bold mb-2">BSc</h3>
              <p className="text-gray-400">Gas College Karwar</p>
              <p className="text-gray-400">2018 - 2021</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="bg-gray-700 rounded-lg p-6 cursor-pointer hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
                <ExternalLink className="mt-4 w-6 h-6" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 hover:bg-gray-700 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-300 text-lg">{selectedProject.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
