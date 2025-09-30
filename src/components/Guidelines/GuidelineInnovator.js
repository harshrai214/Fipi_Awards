import React from "react";
import "../../styles/SidebarGuideline.css"; // Update the path if needed

const GuidelineInnovator = () => {
  return (
    <div className="guideline-container">
      <h2 className="guideline-heading">Evaluation Guidelines – Innovator Company of the Year (Team) </h2>
      <br />
      <p>
        <strong>Objective:</strong> To recognize and honor the Innovator of the Year (Team) in India for the impact of their innovation in the assessment year.
      </p>
      <br />
      <p>
        <strong>Eligibility Criteria:</strong>
      </p>
      <ul>
        <li>The award is open to all organisations operating in India in the energy sector.</li>
        <li>Participants must adhere to the FIPI Awards Scheme Terms & Conditions.</li>
        <li>Performance data is subjectively evaluated based on the responses received in the nominations.</li>
      </ul>

      <p>
        <strong>Key Parameters & Their Descriptions:</strong> The following evaluation parameters are assessed based on the nominations. Descriptions implied or used across sheets as follows in seriatim:
      </p>

      <div className="guideline-table-container">
        <table className="guideline-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Evaluation Parameter</th>
            </tr>
          </thead>
          <tbody>
            {/* Section 1: Tangible Benefits of the Innovation */}
            <tr>
              <td>1.</td>
              <td>Tangible Benefits of the Innovation</td>
            </tr>
            <tr>
              <td>1.1</td>
              <td>Brief Description</td>
            </tr>
            <tr>
              <td>1.2</td>
              <td>Quantifiable Impact</td>
            </tr>
            <tr>
              <td>1.3</td>
              <td>Novelty and Uniqueness</td>
            </tr>
            <tr>
              <td>1.4</td>
              <td>Scalability</td>
            </tr>
            <tr>
              <td>1.5</td>
              <td>Replicability</td>
            </tr>
            <tr>
              <td>1.6</td>
              <td>Adaptability</td>
            </tr>

            {/* Section 2: Intangible Impact */}
            <tr>
              <td>2.</td>
              <td>Intangible Impact</td>
             </tr>
             <tr> 
              <td>2.1</td>
              <td>Intangible Benefits</td>
            </tr>

            {/* Section 3: Patents */}
            <tr>
              <td>3.</td>
              <td>Patents</td>
            </tr>
            <tr>
              <td>3.1</td>
              <td>Number of Patents Filed</td>
            </tr>
            <tr>
              <td>3.2</td>
              <td>Number of Patents Granted</td>
            </tr>
             <tr>
              <td>4</td>
              <td>Miscellaneous </td>
            </tr>
            <tr>
              <td>4.1</td>
              <td>Team Composition & Collaboration </td>
            </tr>
            <tr>
              <td>4.2</td>
              <td>External Partnerships  </td>
            </tr>
             <tr>
              <td>4.3</td>
              <td>Recognition</td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default GuidelineInnovator;