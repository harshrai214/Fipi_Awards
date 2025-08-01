import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <h2>About</h2>
      <p>
        The Federation of Indian Petroleum Industry (FIPI) is an apex Society of
        entities in the hydrocarbon sector and acts as an industry interface with
        Government and regulatory authorities. It helps in resolution of issues
        and evolution of policies and regulations. It represents the industry on
        Government bodies, committees and task forces and has been submitting
        recommendations to the Government on behalf of the industry on various
        issues.
      </p>
      <p>
        It aims to be the most effective and influential voice of the oil & gas
        industry to facilitate its development as a globally competitive
        industry in India that enjoys the respect and trust of the society.
        Several Government policy initiatives have their genesis in its reports
        and publications, some of which are quoted in documents like the
        Integrated Energy Policy.
      </p>
      <p>
        All major companies operating in the oil & gas sector in India are
        members of FIPI. FIPI organizes seminars, conferences, workshops,
        roundtable meetings and brings out study reports and a quarterly journal.
      </p>
      <div className="highlight">
        <p>For more information, please visit our website <a href="https://www.fipi.org.in" target="_blank" rel="noopener noreferrer">www.fipi.org.in</a></p>
        <p>For Awards related information, please click <a href="https://www.fipi.org.in/awards-page2023.php" target="_blank" rel="noopener noreferrer">https://www.fipi.org.in/awards-page2023.php</a></p>
      </div>
    </div>
  );
};

export default About;