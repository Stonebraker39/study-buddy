import React, { useEffect } from 'react';
import '../styles/Classes.css';
import classesImage from '../assets/Classes1.png';

function Classes() {

  useEffect(() => {
    const elements = document.querySelectorAll('.animate, .fade-left, .fade-right, .fade-up');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="classes-page">
      {/* Hero Section */}
      <section className="classes-hero animate fade-up">
        <h1>Study Buddy Support CS Classes at NMSU</h1>
        <p>
          Study Buddy is here to help you stay on top of your computer science classes at NMSU. 
          You can connect with other students, join study groups, and get support for core courses. 
          Below is a button that takes you to the official NMSU catalog where you can read more 
          about each CS class and degree requirements.
        </p>
        <a
          href="https://catalogs.nmsu.edu/nmsu/arts-sciences/computer-science/"
          className="btn-maroon"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full NMSU CS Catalog
        </a>
      </section>

      {/* Onboarding Help Section */}
      <section className="scroll-section fade-left">
        <div className="scroll-text">
          <h2>Plan Your CS Study Path</h2>
          <p>
            After signing up, you’ll select your year (Freshman, Sophomore, etc.)
            and the CS classes you're taking. This helps us recommend study groups
            and tools tailored to you. Whether you're tackling your first coding assignment 
            or preparing for upper-division electives, we’ll match you with peers who are on 
            the same path. Study smarter, not harder with <b>Study Buddy.</b>
          </p>
        </div>
        <img
          src={classesImage}
          alt="Study Planning Graphic"
          className="scroll-image"
        />
      </section>

      {/* Core CS Study Tiles */}
      <section className="classes-section animate fade-up">
        <h2>Core CS Courses We Support</h2>
        <div className="course-grid">
          {/* Core Required Courses */}
          {[
            ["CS 1720 – Computer Science I", "Intro to programming using basic logic and syntax. Great place to start your CS journey!"],
            ["CS 2210 – Object-Oriented Programming", "OOP with Java or C++. Learn how to structure code using classes and methods."],
            ["CS 2220 – Data Structures", "Study lists, trees, queues, and more. Core knowledge for technical interviews and real dev work."],
            ["CS 2230 – Assembly Language & Machine Org", "Low-level programming and understanding how code works at the hardware level."],
            ["CS 2310 – Discrete Mathematics", "Logic, sets, relations, proofs — critical math for all future CS courses."],
            ["CS 3710 – Software Development", "Collaborative coding, version control, and building full-scale applications in teams."],
            ["CS 3720 – Algorithms", "Advanced sorting, searching, graph algorithms, and runtime analysis."],
            ["CS 3730 – Compilers & Automata Theory", "Explore languages, grammars, and the building blocks behind compilers."],
            ["CS 4105 – Programming Language Structures", "Explore different paradigms: functional, object-oriented, logical, and more."],
            ["CS 4110 – Computing Ethics & Social Impact", "Understand ethical responsibility, data privacy, and the global effect of computing."],
            ["CS 4120 – Operating Systems", "Memory management, file systems, scheduling, and how systems interact."],
            ["CS 4140 – Database Management Systems", "Intro to SQL, ER diagrams, schema design, and database application development."],
            ["CS 4980 / 4999 – Senior Project or Thesis", "Build a project or research topic from scratch and showcase your cumulative CS knowledge."],
            ["CS 4265 – Modern Web Technologies", "Front-end and back-end development including modern tools and frameworks."],
            ["CS 4205 – Computer Security", "Learn how to defend and attack networks, and secure systems from real-world threats."],
            ["CS 4255 – Game Design", "Design and build interactive games with game engines and programming logic."],
            ["CS 4425 – Deep Learning", "Study neural networks, backpropagation, and modern AI models like CNNs and RNNs."],
            ["CS 4410 – Computer Graphics", "Learn to generate images using geometric transformations and rendering algorithms."],
            ["CS 4130 – Linux System Administration", "Understand how to manage users, services, networking, and files on a Linux system."],
            ["CS 4245 – Computer Networks", "Explore protocols, routing, network design, and how computers communicate globally."],
            ["CS 4250 – Human-Centered Computing", "Design systems and interfaces that focus on usability and human interaction."],
            ["CS 4305 – Bioinformatics", "Analyze biological data using computing methods in genomics and data science."],
            ["CS 4420 – Applied Machine Learning", "Apply ML models using real-world data to make predictions and gain insights."],
            ["CS 4415 – Data Mining", "Discover patterns and trends from large datasets using statistical and AI techniques."],
            ["CS 4215 – Parallel Programming", "Learn to divide tasks among multiple processors to improve performance."],
            ["CS 4220 – Cloud and Edge Computing", "Understand the infrastructure and services behind cloud systems and edge devices."],
            ["CS 4235 – Cellular Networks & Mobile Computing", "Explore wireless systems, mobile computing, and their underlying technologies."],
            ["CS 4240 – Software Reverse Engineering", "Break down programs to understand internal structures and detect vulnerabilities."],
            ["CS 4435 – NLP & Text Mining", "Extract knowledge from text using techniques in natural language processing and AI."],
            ["CS 4440 – Generative AI", "Use machine learning models to create new content like images, text, and code."]
          ].map(([title, desc], idx) => (
            <div className="course-card fade-up" key={idx}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Helpful Resources & Coursicle */}
      <section className="info-pair-container">
        <div className="resource-section animate fade-left">
          <h2><i className="fas fa-map-signs"></i> Other Helpful Resources</h2>
          <p>
            <i className="fas fa-book"></i> Use the NMSU catalog to understand prerequisites, graduation requirements, 
            and concentrations like Cybersecurity, AI, or Software Development. You can also explore elective options 
            and View a Wider World (VWW) courses.
          </p>
          <p>
            <i className="fas fa-users"></i> If you're unsure what to take next, we recommend chatting with your academic advisor and 
            joining Study Buddy groups for peer advice!
          </p>
          <div className="button-wrapper">
            <a
              className="btn-maroon"
              href="https://catalogs.nmsu.edu/nmsu/arts-sciences/computer-science/computer-science-bachelor-science/#roadmaptext"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-road"></i> View CS Roadmap
            </a>
          </div>
        </div>

        <div className="coursicle-section animate fade-right">
          <h2><i className="fas fa-info-circle"></i> Looking for Even More Class Info?</h2>
          <p>
            <i className="fas fa-comments"></i> Sites like <strong>Coursicle</strong> give you a real look into each CS class at NMSU.
            You’ll find professor ratings, past semester history, waitlist availability, and student reviews.
          </p>
          <p>
            <i className="fas fa-lightbulb"></i> It’s perfect for planning electives or upper-level CS classes you're unsure about.
          </p>
          <div className="button-wrapper">
            <a
              className="btn-maroon"
              href="https://www.coursicle.com/nmsu/courses/CS/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-external-link-alt"></i> Explore CS Courses on Coursicle
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Classes;
