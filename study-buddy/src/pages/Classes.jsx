import React from 'react';
import '../styles/Classes.css';
import classesImage from '../assets/Classes1.png';

function Classes() {
  return (
    <div className="classes-page">
      {/* Hero Section */}
      <section className="classes-hero">
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

      {/* Onboarding Help Section (text left, image right) */}
      <section className="scroll-section">
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
      <section className="classes-section">
        <h2>Core CS Courses We Support</h2>
        <div className="course-grid">

          {/* Core Required Courses */}
          <div className="course-card">
            <h3>CS 1720 – Computer Science I</h3>
            <p>Intro to programming using basic logic and syntax. Great place to start your CS journey!</p>
          </div>
          <div className="course-card">
            <h3>CS 2210 – Object-Oriented Programming</h3>
            <p>OOP with Java or C++. Learn how to structure code using classes and methods.</p>
          </div>
          <div className="course-card">
            <h3>CS 2220 – Data Structures</h3>
            <p>Study lists, trees, queues, and more. Core knowledge for technical interviews and real dev work.</p>
          </div>
          <div className="course-card">
            <h3>CS 2230 – Assembly Language & Machine Org</h3>
            <p>Low-level programming and understanding how code works at the hardware level.</p>
          </div>
          <div className="course-card">
            <h3>CS 2310 – Discrete Mathematics</h3>
            <p>Logic, sets, relations, proofs — critical math for all future CS courses.</p>
          </div>
          <div className="course-card">
            <h3>CS 3710 – Software Development</h3>
            <p>Collaborative coding, version control, and building full-scale applications in teams.</p>
          </div>
          <div className="course-card">
            <h3>CS 3720 – Algorithms</h3>
            <p>Advanced sorting, searching, graph algorithms, and runtime analysis.</p>
          </div>
          <div className="course-card">
            <h3>CS 3730 – Compilers & Automata Theory</h3>
            <p>Explore languages, grammars, and the building blocks behind compilers.</p>
          </div>
          <div className="course-card">
            <h3>CS 4105 – Programming Language Structures</h3>
            <p>Explore different paradigms: functional, object-oriented, logical, and more.</p>
          </div>
          <div className="course-card">
            <h3>CS 4110 – Computing Ethics & Social Impact</h3>
            <p>Understand ethical responsibility, data privacy, and the global effect of computing.</p>
          </div>
          <div className="course-card">
            <h3>CS 4120 – Operating Systems</h3>
            <p>Memory management, file systems, scheduling, and how systems interact.</p>
          </div>
          <div className="course-card">
            <h3>CS 4140 – Database Management Systems</h3>
            <p>Intro to SQL, ER diagrams, schema design, and database application development.</p>
          </div>
          <div className="course-card">
            <h3>CS 4980 / 4999 – Senior Project or Thesis</h3>
            <p>Build a project or research topic from scratch and showcase your cumulative CS knowledge.</p>
          </div>

          {/* Electives */}
          <div className="course-card">
            <h3>CS 4265 – Modern Web Technologies</h3>
            <p>Front-end and back-end development including modern tools and frameworks.</p>
          </div>
          <div className="course-card">
            <h3>CS 4205 – Computer Security</h3>
            <p>Learn how to defend and attack networks, and secure systems from real-world threats.</p>
          </div>
          <div className="course-card">
            <h3>CS 4255 – Game Design</h3>
            <p>Design and build interactive games with game engines and programming logic.</p>
          </div>
          <div className="course-card">
            <h3>CS 4425 – Deep Learning</h3>
            <p>Study neural networks, backpropagation, and modern AI models like CNNs and RNNs.</p>
          </div>
          <div className="course-card">
            <h3>CS 4410 – Computer Graphics</h3>
            <p>Learn to generate images using geometric transformations and rendering algorithms.</p>
          </div>
          <div className="course-card">
            <h3>CS 4130 – Linux System Administration</h3>
            <p>Understand how to manage users, services, networking, and files on a Linux system.</p>
          </div>
          <div className="course-card">
            <h3>CS 4245 – Computer Networks</h3>
            <p>Explore protocols, routing, network design, and how computers communicate globally.</p>
          </div>
          <div className="course-card">
            <h3>CS 4250 – Human-Centered Computing</h3>
            <p>Design systems and interfaces that focus on usability and human interaction.</p>
          </div>
          <div className="course-card">
            <h3>CS 4305 – Bioinformatics</h3>
            <p>Analyze biological data using computing methods in genomics and data science.</p>
          </div>
          <div className="course-card">
            <h3>CS 4420 – Applied Machine Learning</h3>
            <p>Apply ML models using real-world data to make predictions and gain insights.</p>
          </div>
          <div className="course-card">
            <h3>CS 4415 – Data Mining</h3>
            <p>Discover patterns and trends from large datasets using statistical and AI techniques.</p>
          </div>
          <div className="course-card">
            <h3>CS 4215 – Parallel Programming</h3>
            <p>Learn to divide tasks among multiple processors to improve performance.</p>
          </div>
          <div className="course-card">
            <h3>CS 4220 – Cloud and Edge Computing</h3>
            <p>Understand the infrastructure and services behind cloud systems and edge devices.</p>
          </div>
          <div className="course-card">
            <h3>CS 4235 – Cellular Networks & Mobile Computing</h3>
            <p>Explore wireless systems, mobile computing, and their underlying technologies.</p>
          </div>
          <div className="course-card">
            <h3>CS 4240 – Software Reverse Engineering</h3>
            <p>Break down programs to understand internal structures and detect vulnerabilities.</p>
          </div>
          <div className="course-card">
            <h3>CS 4435 – NLP & Text Mining</h3>
            <p>Extract knowledge from text using techniques in natural language processing and AI.</p>
          </div>
          <div className="course-card">
            <h3>CS 4440 – Generative AI</h3>
            <p>Use machine learning models to create new content like images, text, and code.</p>
          </div>
        </div>
      </section>

      {/* Helpful Resources & Coursicle - Side by Side */}
      <section className="info-pair-container">
        {/* Course Roadmap Section */}
        <div className="resource-section">
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

        {/* Coursicle Info Section */}
        <div className="coursicle-section">
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
