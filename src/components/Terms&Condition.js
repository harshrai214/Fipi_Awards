import React from 'react';
import "../styles/Terms&Condition.css";

const TermsAndConditions = () => {
  return (
    <div className="container">
      <div className="content-box">
        <h2>Application Process</h2>
        <ul className="terms-list">
          <li>All applications/nominations must be submitted using the prescribed digital application forms online.</li>
          <li>Applicants are required to provide information for the year under review of the award or earlier years as specified. The performance of an applicant during the assessment year would be considered. </li>
          <li>Applications in multiple categories are encouraged; however, each application must be completed separately. Application for each category shall be treated as independent of other application(s) for qualification and evaluation.</li>
          <li>For the purpose of evaluation, information furnished in the application would only be considered. For corporate award categories, applicants are requested to provide link to annual report of their company pertaining to award period. </li>
          <li>Additional supporting material may include videos, brochures, photographs and other documents of the specified type and size. </li>
          <li>Approving authority should be as specified in the digital application platform.</li>
          <li>Young Achiever of the Year Award - maximum 3 nominations each (Young Achiever - male/female categories) from an organization duly endorsed by Director (HR) in case of PSUs and CEOs of private Companies would be considered.</li>
          <li>Woman Executive of the Year Award - Only 2 nominations from an organization duly endorsed by CMD in case of PSUs and CEOs of private Companies would be considered. </li>
          <li>All application/nomination and supporting materials must be submitted by the stipulated timeline. </li>
          <li>Applications can be saved multiple times till submission. Once submitted, it cannot be changed. </li>
          <li>Incomplete entries will not be considered.</li>
        </ul>
        <h2>Evaluation</h2>
        <ul className="terms-list">
          <li>Each award category needs to receive minimum number of entries for further evaluation. In case minimum number of entries are not received for any category by the last date of submission, FIPI reserves the right to drop the specific award category.</li>
          <li>For the purpose of evaluation of quantitative parameters, best applicant against specified parameter shall score maximum and be considered datum for comparison with other entries unless otherwise stated against the parameter.
          </li>
          <li>There is no negative marking</li>
          <li>Evaluation of qualitative parameters is subject to the judgment of the Awards Committee and the Jury.</li>
          <li>The decision of the Jury will be final and binding for all award categories and cannot be appealed in any court of law.</li>
          <li>System will limit the number of words, specified against each qualitative parameter. Applicant is requested to submit the write-ups accordingly.</li>
          <li>In some cases, the Award Committee may call the applicant for a brief interaction at a mutually determined date and time. Applicant will have to bear all the expenses of traveling, boarding & lodging etc.</li>
        </ul>

        <h2>Confidentiality</h2>
        <p>
          FIPI and associated agencies would not be obliged to share any information provided by applicants and/or the evaluation criteria with any agencies or individuals other than those involved or engaged by FIPI, the Awards Committee members and the Jury.
        </p>
        <p>Applicants are requested to specifically identify in the applications, any confidential information they have furnished for due treatment by FIPI and agencies or individuals associated with awards evaluation. All other information received will be treated as fit for dissemination as deemed fit by FIPI.</p>
        <h2>Contact</h2>
        <p>
          For any clarification, applicant may contact FIPI at<br />
          <strong>E-Mail:</strong> <a href="mailto:fipiawards@fipi.org.in">fipiawards@fipi.org.in</a>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;