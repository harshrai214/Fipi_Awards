// "use client";
// import { useState } from "react";
// import "../styles/CallCenter.css";

// const CallCenter = () => {
//   const [activeTab, setActiveTab] = useState("support");
//   const [ticketForm, setTicketForm] = useState({
//     subject: "",
//     category: "technical",
//     priority: "medium",
//     description: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTicketForm({ ...ticketForm, [name]: value });
//   };

//   const handleSubmitTicket = (e) => {
//     e.preventDefault();
//     // In a real app, you would submit the ticket to your backend
//     setSuccessMessage("Support ticket submitted successfully! Our team will contact you shortly.");
//     setTicketForm({
//       subject: "",
//       category: "technical",
//       priority: "medium",
//       description: "",
//     });
//     setTimeout(() => setSuccessMessage(""), 3000);
//   };

//   const supportTeam = [
//     {
//       id: 1,
//       name: "Shijo Sebastian",
//       email: "fipiawards@fipi.org.in",
//       phone: "011 40886021, 011 40886017",
//       // role: "Support Specialist", // Added for rendering
//       availability: "9 AM - 6 PM IST", // Added for rendering
//     },
//   ];

//   const faqs = [
//     {
//       id: 1,
//       question: "How do I reset my password?",
//       answer:
//         "To reset your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password.",
//     },
//     {
//       id: 2,
//       question: "How can I submit a new award application?",
//       answer:
//         "To submit a new award application, navigate to the Award Category page, select the relevant category, and click on the 'Apply' button. Fill out the required information and submit the form.",
//     },
//     {
//       id: 3,
//       question: "Can I edit my application after submission?",
//       answer:
//         "Yes, you can edit your application until the submission deadline. Navigate to the Application Received page, find your application, and click on the 'Edit' button.",
//     },
//     {
//       id: 4,
//       question: "How are award winners selected?",
//       answer:
//         "Award winners are selected by a panel of industry experts based on the criteria specified for each award category. The evaluation process includes reviewing the submitted materials and may involve interviews or presentations.",
//     },
//     {
//       id: 5,
//       question: "When will the award ceremony take place?",
//       answer:
//         "The award ceremony is scheduled for December 2025. Check the Settings page for the exact date in the General Settings section.",
//     },
//   ];

//   return (
//     <div className="call-center-container">
//       {successMessage && <div className="alert alert-success">{successMessage}</div>}

//       <div className="tabs">
//         {/* <button
//           className={`tab-btn ${activeTab === "support" ? "active" : ""}`}
//           onClick={() => setActiveTab("support")}
//         >
//           Support Ticket
//         </button> */}
//         <button
//           className={`tab-btn ${activeTab === "team" ? "active" : ""}`}
//           onClick={() => setActiveTab("team")}
//         >
//           Support Team
//         </button>
//         {/* <button
//           className={`tab-btn ${activeTab === "faq" ? "active" : ""}`}
//           onClick={() => setActiveTab("faq")}
//         >
//           FAQs
//         </button> */}
//       </div>

//       <div className="content-wrapper">
//         {/* {activeTab === "support" && (
//           <div className="section support-section">
//             <h3>Support Ticket</h3>
//             <p>Fill out the form below to submit a support ticket. Our team will respond to your inquiry as soon as possible.</p>
//             <form onSubmit={handleSubmitTicket} className="ticket-form">
//               <div className="form-group">
//                 <label htmlFor="subject">Subject</label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   className="form-control"
//                   value={ticketForm.subject}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Brief description of your issue"
//                 />
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="category">Category</label>
//                   <select
//                     id="category"
//                     name="category"
//                     className="form-control"
//                     value={ticketForm.category}
//                     onChange={handleInputChange}
//                   >
//                     <option value="technical">Technical Issue</option>
//                     <option value="account">Account Management</option>
//                     <option value="application">Award Application</option>
//                     <option value="general">General Inquiry</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="priority">Priority</label>
//                   <select
//                     id="priority"
//                     name="priority"
//                     className="form-control"
//                     value={ticketForm.priority}
//                     onChange={handleInputChange}
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                     <option value="urgent">Urgent</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   className="form-control"
//                   value={ticketForm.description}
//                   onChange={handleInputChange}
//                   required
//                   rows="5"
//                   placeholder="Please provide details about your issue or question"
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="attachment">Attachment (Optional)</label>
//                 <input type="file" id="attachment" name="attachment" className="form-control" />
//                 <small>Max file size: 5MB. Supported formats: PDF, JPG, PNG</small>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Submit Ticket
//               </button>
//             </form>
//           </div>
//         )} */}

//         {activeTab === "team" && (
//           <div className="section team-section">
//             <h3>Support Team</h3>
//             <p>Contact our support team directly for immediate assistance.</p>
//             <div className="team-grid">
//               {supportTeam.map((member) => (
//                 <div key={member.id} className="team-card">
//                   <div className="team-avatar">{member.name.charAt(0)}</div>
//                   <h4 className="team-name">{member.name}</h4>
                 
//                   <div className="team-contact">
//                     <div className="contact-item">
//                       <span className="contact-label">Email:</span>
//                       <a href={`mailto:${member.email}`} className="contact-value">
//                         {member.email}
//                       </a>
//                     </div>
//                     <div className="contact-item">
//                       <span className="contact-label">Phone:</span>
//                       <a href={`tel:${member.phone.replace(/\s+/g, "")}`} className="contact-value">
//                         {member.phone}
//                       </a>
//                     </div>
//                     <div className="contact-item">
//                       <span className="contact-label">Available:</span>
//                       <span className="contact-value">{member.availability || "N/A"}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "faq" && (
//           <div className="section faq-section">
//             <h3>FAQs</h3>
//             <p>Find answers to common questions about the FIPI Award system.</p>
//             <div className="faq-list">
//               {faqs.map((faq) => (
//                 <div key={faq.id} className="faq-item">
//                   <h4 className="faq-question">{faq.question}</h4>
//                   <p className="faq-answer">{faq.answer}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="faq-footer">
//               <p>Can't find what you're looking for? Submit a support ticket or contact our support team directly.</p>
//               <button className="btn btn-primary" onClick={() => setActiveTab("support")}>
//                 Submit a Ticket
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CallCenter;

"use client";
import { useState } from "react";
import "../styles/CallCenter.css";

const CallCenter = () => {
  const [activeTab, setActiveTab] = useState("team");

  const supportTeam = [
    {
      id: 1,
      name: "Shijo Sebastian",
      email: "  fipiawards@fipi.org.in",
      phone: "  011 40886021, 011 40886017",
      availability: "9 AM - 6 PM IST",
    },
  ];

  return (
    <div className="call-center-container">
      <div className="tabs">

      </div>

      <div className="content-wrapper">
        {activeTab === "team" && (
          <div className="support team-section">
            <h3>Support Team</h3>
            <p>Contact our support team directly for immediate assistance.</p>
            <div className="team-grid">
              {supportTeam.map((member) => (
                <div key={member.id} className="team-card">
                  <div className="team-avatar">{member.name.charAt(0)}</div>
                  <h4 className="team-name">{member.name}</h4>
                  <div className="team-contact">
                    <div className="contact-item">
                      <span className="contact-label">Email:</span>
                      <a
                        href={`mailto:${member.email}`}
                        className="contact-value"
                      >
                        {member.email}
                      </a>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Phone:</span>
                      <a
                        href={`tel:${member.phone.replace(/\s+/g, "")}`}
                        className="contact-value"
                      >
                        {member.phone}
                      </a>
                    </div>
                    <div className="contact-item">
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallCenter;




