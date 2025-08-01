import React, { useState } from 'react';
import "../styles/Sidebar.css";
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import CallCenter from './CallCenter';
import TermsAndConditions from './Terms&Condition';
import ApplicantDashboard from './ApplicantDashboard';
import AdminDashboard from './AdminDashboard';
import "../styles/Terms&Condition.css";
import { useLocation } from 'react-router-dom';

const Sidebar = ({ onLogin, isLoggedIn, userRole, onLogout, onLoginClick, onRegister, onRegisterClick }) => {
  const [activeItem, setActiveItem] = useState("about");
  const [isOpen, setIsOpen] = useState(true);
  const [selectedAward, setSelectedAward] = useState(null);
  const [showAllAwards, setShowAllAwards] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [postLoginAction, setPostLoginAction] = useState(() => { });

  const navigate = useNavigate();
  const [checklistAnswers, setChecklistAnswers] = useState({});

  const sidebarItems = [
    { id: "about", label: "About" },
    { id: "Award Categories", label: "Award Categories" },
    { id: "Jury & Awards Committee", label: "Jury & Awards Committee" },
    { id: "terms", label: "Terms & Conditions" },
    { id: "Support", label: "Support" },
    ...(isLoggedIn ? [{ id: "dashboard", label: "Dashboard" }] : []),
  ];

  const awards = [
    { title: 'Exploration Company of the Year', objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.", eligibility: "FIPI will consider entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies." },
    { title: 'Oil & Gas Production Company of the Year (< 1 MMTOE)', objective: "The “Oil & Gas Production Company of the Year” award is given in recognition of leadership and excellence in performance in Production for Oil and Gas in India during 2024-25.", eligibility: "The award is open to Indian Companies who are engaged in Production of Oil & Gas in India as an Operator. FIPI will consider entries from Exploration & Production of hydrocarbons (E&P) companies and E&P divisions of integrated companies." },
    { title: 'Oil & Gas Production Company of the Year (>= 1 MMTOE)', objective: "The “Oil & Gas Production Company of the Year” award is given in recognition of leadership and excellence in performance in Production for Oil and Gas in India during 2024-25.", eligibility: 'The award is open to Indian Companies who are engaged in Production of Oil & Gas in India as an Operator. FIPI will consider entries from Exploration & Production of hydrocarbons (E&P) companies and E&P divisions of integrated companies.' },
    { title: 'Goal Net Zero Company of the Year', objective: "Goal Net Zero Company of the year Award, recognizes the most effective company in reducing Carbon footprint and improving energy efficiency.", eligibility: "The award is open to all Energy Companies operating in India. The information related to Capital Investments, Installed capacities, R&D centres, Patents etc. should pertains to works carried out in India. Any overseas investments and projects will not be considered for evaluation." },
    { title: 'Green Hydrogen Company of the Year', objective: "Green Hydrogen - Company of the year Award recognizes the significant contributions towards the initiatives in promoting Green Hydrogen.", eligibility: "The award is open to all Energy Companies operating in India." },
    { title: 'Overseas Oil & Gas Company of the Year', eligibility: "The award is open to all Indian Companies who are engaged in the Exploration & Production of Oil & Gas in Overseas Countries. FIPI will consider entries from Exploration & Production of hydrocarbons (E&P) companies and E&P divisions of integrated companies ", objective: "The “Overseas Oil & Gas Company of the Year” award is given in recognition of leadership and excellence in performance in exploration and production of Oil & Gas in Overseas Countries during 2024-25 " },
    { title: 'Digital Technology Provider of the Year', objective: "The award ‘Digital Technology Provider of the Year’ recognizes the leadership in performance of a company in implementing the most cutting-edge digital technologies in Oil & Gas sector. ", eligibility: "The award is open to any company in India, implementing digital technologies in Oil & Gas sector. Performance during the year 2024-25 will be considered for evaluation. ", checklist: [{ label: "Presence in India as a company implementing digital technologies for Oil & Gas Sector", key: "Project" }] },
    { title: 'Service Provider of the Year', objective: "This award is to recognize the activities carried out by Service Providers in the Oil and Gas sector and has contributed significantly, efficiently and in a safe and environment friendly manner.", eligibility: "The award is open to all Oil & Gas Service Providers operating in India providing services to Indian Oil and Gas companies.", checklist: [{ label: "Company should be involved in providing service to one or more of Upstream, Midstream or Downstream companies of Oil and Gas in India.", key: "Service 2025" }, { label: "Company should have an establishment in India ", key: "India origin" }] },
    { title: 'Pipeline Transportation Company of the Year', objective: "‘Pipeline Transportation Company of the Year’ award recognizes leadership and excellence in performance in transporting crude oil, petroleum products and Natural Gas through pipelines in India", eligibility: "The award is open to companies owning and operating pipeline used for interstate transportation of Oil/Petroleum Products/ Natural Gas in India. " },
    { title: 'Oil Marketing Company of the Year', objective: "Oil Marketing Company of the Year recognizes leadership and excellence in marketing and retailing of petroleum products (non-polymer hydrocarbons).", eligibility: "The award is open to all oil marketing and retailing companies operating in India." },
    { title: 'Human Resource Management Company of the Year', objective: "This award recognizes the contribution of company’s Human Resource Management in achieving excellence across the entire spectrum of HR management in the company.", eligibility: "This award is open to all Oil & Gas companies operating in India." },
    { title: 'CBG Company of the Year', objective: "To recognize and honor the company with the best initiatives in Compressed Bio-Gas (CBG) in India for excellence in capacity expansion, capex utilisation, Research & Development and patents filed in this field during the financial year 2024–25. ", eligibility: "The award is open to all energy companies operating in India involved in Compressed Bio-Gas (CBG). Any overseas investments and projects will not be considered for evaluation. " },
    { title: 'CGD Company of the Year', objective: "To recognize and honor the best-performing City Gas Distribution (CGD) company in India for excellence in infrastructure expansion, operational performance, customer service, safety, and overall impact in the CGD sector during the financial year 2024–25.", eligibility: <ul><li>The award is open to all energy companies operating in India involved in City Gas Distribution (CGD)</li><li>Participants must adhere to the FIPI Awards Scheme Terms & Conditions</li><li>Performance data is evaluated based on achievements in FY2024–25 compared to FY2023–24 and aligned against Minimum Work Programme (MWP) targets.</li></ul> },
    { title: 'Best Managed Project of the Year', objective: "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.", eligibility: "The award is open to all Oil & Gas companies operating in India.", checklist: [{ label: 'The project completed in Indian territory, directly contributing to oil and gas value chain including biofuels, carbon recycling and renewables.', key: 'indianTerritoryProject' }, { label: 'Projects commercially completed / commissioned during 2024-25', key: 'completed2024_25' }, { label: 'The budgeted value of the project must be more', key: 'budgetValueHigh' }], note: "It is expected that only best project entry will be submitted however, maximum of 2 entries are permitted per company. All entries must be recommended by the Corporate Office of the company." },
    { title: 'Refinery of the Year', checklist: [{ label: 'Presence in India as an individual crude oil refinery', key: 'presenceInIndia' }, { label: 'Exports finished products', key: 'exportsFinishedProducts' }], objective: "‘The Refinery of the Year’ awards are given in recognition of leadership & excellence in refining of petroleum in India.", eligibility: "The award is open to individual crude oil refineries operating in India. Companies are encouraged to apply for individual refineries separately for their leadership in performance in refining of crude oil in India during the year of award" },
    { title: 'Innovator of the year (team)', objective: "Innovator of the year (Team) Award recognizes the most effective and efficient team in the energy sector.", eligibility: "The award is open to all Energy Companies* operating in India.", note: "The award is open to all Energy Companies operating in India. The information related to Capital Investments, Installed capacities, R&D centres, Patents etc. should pertains to works carried out in India. Any overseas investments and projects will not be considered for evaluation." },
    { title: 'Woman Executive of the Year', objective: "Woman Executive of the Year in Oil and Gas industry honors a woman achiever for what she has done for the business and as a mentor. It is a celebration of courage, grit and professionalism.", eligibility: <ul><li>Service experience greater than 15 yrs</li><li>Only 2 nominations from an organization duly endorsed by CMD/MD in case of PSUs and CEO or equivalent senior executive of private Companies would be considered.</li><li>Endorsement letter from the above-mentioned authorities to be submitted along with the application; failing which, application will not be considered.</li></ul> },
    { title: 'Young Achiever of the Year(Female)', objective: "Young achiever of the Year in the Oil and Gas Industry recognizes exceptional contribution in the line of work that sets one apart from her peers.", eligibility: <ul><li>Candidate not over 40 years of age as on the date of filling the application form </li><li>Only 3 nominations from an organization duly endorsed by Director (HR) in case of PSUs and CEOs of Private Companies would be considered. </li><li>Endorsement letter from Dir (HR) / CEO’s to be submitted along with the application; failing which, application will not be considered</li></ul> },
    { title: 'Young Achiever of the Year(Male)', objective: "Young achiever of the Year in the Oil and Gas Industry recognizes exceptional contribution in the line of work that sets one apart from his peers.", eligibility: <ul><li>Candidate not over 40 years of age as on the date of filling the application form</li><li>Only 3 nominations from an organization duly endorsed by Director (HR) in case of PSUs and CEOs of Private Companies would be considered</li><li>Endorsement letter from Dir (HR)/ CEO’s to be submitted along with the application; failing which, application will not be considered</li></ul> },
  ];

  const boardMembers = [
    { name: 'Shri Anil Razdan', designation: 'Former Secretary, Government of India ' },
    { name: 'Shri B. C. Tripathi', designation: 'Former CMD, GAIL' },
    { name: 'Shri B. Ashok', designation: 'Former Chairman, Indian Oil Corporation Limited.' },
    { name: 'Shri D. K. Sarraf', designation: 'Former CMD, Oil and Natural Gas Corporation' },
    { name: 'Dr. R. K. Malhotra', designation: 'Former Director (R&D), Indian Oil Corporation Limited.' },
  ];

  const data = [
    { name: 'Dr. Anil Kakodkar', position: 'INAE Satish Dhawan Chair of Engineering Eminence, former Chairman, Atomic Energy Commission of India and Secretary to the Government of India, Atomic Research Centre' },
    { name: 'Dr. R. A. Mashelkar', position: 'President of the Global Research Alliance, Chairperson, former Director General, National Innovation Foundation of India, CSIR' },
    { name: 'Shri M. A. Pathan', position: 'Former Chairman, Indian Oil Corporation Limited' },
    { name: 'Shri B. C. Bora', position: 'Former CMD, Oil & Natural Gas Corporation Limited' },
  ];

  const [selectedAwardCategory, setSelectedAwardCategory] = useState('');
  const location = useLocation();
  const awardTitle = location.state?.awardTitle || "Registration Form";

  const handleLearnMore = (award) => {
    setSelectedAward(award);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedAward(prev => {
      const updatedChecklist = Array.isArray(prev.checklist)
        ? prev.checklist.map(item => item.key === name ? { ...item, checked } : item)
        : [];
      return { ...prev, checklist: updatedChecklist };
    });
  };

  const handleApply = (award) => {
    if (!award) {
      console.error("Award is null in handleApply");
      return;
    }
    setSelectedAwardCategory(award.title);
    const navigateToForm = () => {
      switch (award.title) {
        case "Exploration Company of the Year": navigate('/RegistrationExploration', { state: { awardTitle: award.title } }); break;
        case "Oil & Gas Production Company of the Year (< 1 MMTOE)": navigate('/RegistrationProductionlessMMTOE', { state: { awardTitle: award.title } }); break;
        case "Oil & Gas Production Company of the Year (>= 1 MMTOE)": navigate('/RegistrationProductionmoreMMTOE', { state: { awardTitle: award.title } }); break;
        case "Overseas Oil & Gas Company of the Year": navigate('/RegistrationOverseas', { state: { awardTitle: award.title } }); break;
        case "Digital Technology Provider of the Year": navigate('/RegistrationDigital', { state: { awardTitle: award.title } }); break;
        case "Goal Net Zero Company of the Year": navigate('/RegistrationGNZ', { state: { awardTitle: award.title } }); break;
        case "Green Hydrogen Company of the Year": navigate('/RegistrationGH', { state: { awardTitle: award.title } }); break;
        case "Service Provider of the Year": navigate('/RegistrationSP', { state: { awardTitle: award.title } }); break;
        case "Pipeline Transportation Company of the Year": navigate('/RegistrationPipeline', { state: { awardTitle: award.title } }); break;
        case "Oil Marketing Company of the Year": navigate('/RegistrationOM', { state: { awardTitle: award.title } }); break;
        case "Human Resource Management Company of the Year": navigate('/RegistrationHRM', { state: { awardTitle: award.title } }); break;
        case "CBG Company of the Year": navigate('/RegistrationCBG', { state: { awardTitle: award.title } }); break;
        case "Best Managed Project of the Year": navigate('/RegistrationBMP', { state: { awardTitle: award.title } }); break;
        case "Refinery of the Year": navigate('/RegistrationRefinery', { state: { awardTitle: award.title } }); break;
        case "Innovator of the year (team)": navigate('/RegistrationInnovator', { state: { awardTitle: award.title } }); break;
        case "Woman Executive of the Year": navigate('/RegistrationWE', { state: { awardTitle: award.title } }); break;
        case "Young Achiever of the Year(Female)": navigate('/RegistrationYF', { state: { awardTitle: award.title } }); break;
        case "Young Achiever of the Year(Male)": navigate('/RegistrationYM', { state: { awardTitle: award.title } }); break;
        case "CGD Company of the Year": navigate('/RegistrationCGD', { state: { awardTitle: award.title } }); break;
        default: break;
      }
    };

    if (isLoggedIn) {
      navigateToForm();
    } else {
      setLoginType('user');
      setIsLoginModalOpen(true);
      setPostLoginAction(() => navigateToForm);
      onLoginClick('user', navigateToForm);
    }
  };

  const handleStartApplication = () => {
    if (isLoggedIn) {
      navigate('/RegistrationForm');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;
    setChecklistAnswers(prev => ({ ...prev, [name]: checked }));
  };

  const handleLoginSuccess = (role) => {
    onLogin(role);
    setIsLoginModalOpen(false);
    if (postLoginAction) {
      postLoginAction();
      setPostLoginAction(() => { });
    } else if (selectedAward) {
      navigate('/RegistrationForm', { state: { awardTitle: selectedAward.title } });
    } else {
      navigate('/RegistrationForm');
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const renderChecklist = () => {
    if (selectedAward?.checklist?.length > 0) {
      return (
        <div className="checklist-section">
          <div className='h4'>Please apply a tick mark (√) against the applicable box:</div>
          {selectedAward.checklist.map((item, index) => (
            <div className="checkbox-group" key={index}>
              <label>
                <input type="checkbox" name={item.key} checked={checklistAnswers[item.key] || false} onChange={handleChecklistChange} />
                <span className="tick-label">{item.label}</span>
              </label>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderModal = () => {
    if (!selectedAward) return null;
    return (
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="modal-content bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{selectedAward.title}</h2>
          {selectedAward.objective && (
            <div className="modal-section mb-4">
              <h3 className="modal-subhead text-lg font-semibold">Objective</h3>
              <p>{selectedAward.objective}</p>
            </div>
          )}
          {selectedAward.eligibility && (
            <div className="modal-section mb-4">
              <h3 className="modal-subhead text-lg font-semibold">Eligibility</h3>
              <p>{selectedAward.eligibility}</p>
            </div>
          )}
          {renderChecklist()}
          <div className="modal-actions flex gap-2">
            <button onClick={() => handleApply(selectedAward)} className="button button-success button-sm px-3 py-1 text-sm">Apply Now</button>
            <button onClick={() => setSelectedAward(null)} className="button button-outline button-sm px-3 py-1 text-sm">Close</button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'about':
        return (
          <div className="sidebar-content">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical"></div>
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-award" role="tabpanel" aria-labelledby="v-pills-award-tab">
                <div className='content-box'>
                  <h2>About</h2>
                  <p>The FIPI Oil and Gas Awards have been created to recognise the leaders, innovators and pioneers in the oil and gas industry. The objective of the FIPI Oil & Gas Awards is to celebrate the industry's most outstanding achievements. FIPI will select among applicants and reward those companies and individuals who have demonstrated an unparalleled ability to succeed, continually set standards of excellence, and who will be or are the stars of the industry. All companies operating in India, including those who are not members of FIPI, are eligible to apply. In our constant endeavour, every year FIPI revamp the Awards scheme making it more objective by adopting quantitative parameters to the extent possible. To keep up with the changing energy scenario, FIPI has incorporated clean energy awards last year, that recognizes the efforts of organizations in the field of renewables (solar and wind), hydrogen, CBG and CCUs. There are total eighteen categories of awards in which the performance of the prospective awardees will be judged.</p>
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
                </div>
              </div>
            </div>
          </div>
        );

      case 'Award Categories':
        return (
          
          <div className="sidebar-content w-full max-w-full overflow-x-hidden">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical"></div>
            <div className="tab-content w-full max-w-full" id="v-pills-tabContent">
              <div className="tab-pane fade show active w-full max-w-full" id="v-pills-award" role="tabpanel" aria-labelledby="v-pills-award-tab">
                <div className="content-box w-full max-w-full p-4">
                  <br></br>
                  <h2 className="text-2xl font-bold mb-4">Award Categories</h2>
                  <p className="mb-4">The FIPI Oil & Gas Awards have been created to recognize the leaders, innovators, and pioneers in the oil and gas industry. The objective of the FIPI Oil & Gas Awards is to celebrate the industry's most outstanding achievements.</p>
                  <div className="awards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-full overflow-x-auto">
                    {awards.slice(0, showAllAwards ? awards.length : 19).map((award, index) => (
                      <div key={index} className="award-card bg-white shadow-md rounded-lg p-4 w-full max-w-full">
                        <div className="card-body">
                          <div className="award-header">
                            <h3 className="award-title text-lg font-semibold">{award.title}</h3>
                          </div>
                          <div className="award-footer ">
                            <button onClick={() => handleLearnMore(award)} className="button button-primary button-sm px-3 py-1 text-sm">Learn More</button>
                            
                            <button onClick={() => handleApply(award)} className="button button-success button-sm px-3 py-1 text-sm">Apply Now</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedAward && (
                    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="modal-content bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{selectedAward.title}</h2>
                        {selectedAward.objective && (
                          <div className="modal-section mb-4">
                            <h3 className="modal-subhead text-lg font-semibold">Objective</h3>
                            <p>{selectedAward.objective}</p>
                          </div>
                        )}
                        {selectedAward.eligibility && (
                          <div className="modal-section mb-4">
                            <h3 className="modal-subhead text-lg font-semibold">Eligibility</h3>
                            <p>{selectedAward.eligibility}</p>
                          </div>
                        )}
                        {renderChecklist()}
                        <div className="modal-actions flex gap-2">
                          <button onClick={() => handleApply(selectedAward)} className="button button-success button-sm px-3 py-1 text-sm">Apply Now</button>
                          <button onClick={() => setSelectedAward(null)} className="button button-outline button-sm px-3 py-1 text-sm">Close</button>
                        </div>
                      </div>
                    </div>
                  )}
                  {isLoginModalOpen && (
                    <LoginModal type={loginType} onClose={handleCloseLoginModal} onLoginSuccess={handleLoginSuccess} onRegisterClick={onRegisterClick} />
                  )}
                  <div className="cta-section mt-6 w-full max-w-full">
                    <div className="card-container bg-gray-100 p-4 rounded-lg text-center">
                      <h2 className="cta-title text-xl font-bold mb-2">Ready to Apply?</h2>
                      <p className="cta-description text-gray-600 mb-4">Join the prestigious FIPI Awards and showcase your excellence in the oil & gas industry</p>
                      <button onClick={handleStartApplication} className="button button-primary button-lg px-6 py-2 text-sm">Start Your Application</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Jury & Awards Committee':
        return (
          <div className="sidebar-content w-full max-w-full overflow-x-hidden">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical"></div>
            <div className="tab-content w-full max-w-full" id="v-pills-tabContent">
              <div className="tab-pane fade show active w-full max-w-full" id="v-pills-award" role="tabpanel" aria-labelledby="v-pills-award-tab">
                <div className="content-box w-full max-w-full p-4">
              <h2>Jury</h2>
              <div style={{ overflowX: "auto" }}>
              <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                      <td style={{ padding: '15px', width: '29%' }}>{item.name}</td>
                      <td style={{ padding: '15px' }}>{item.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <br></br>
              <h2>Awards Committee</h2>
              <div style={{ overflowX: "auto" }}>
              <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <tbody>
                  {boardMembers.map((member, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                      <td style={{ padding: '20px', textAlign: 'left' }}>{member.name}</td>
                      <td style={{ padding: '20px', textAlign: 'left' }}>{member.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
          </div>
          </div>
        );

      case 'terms':
        return (
          <div className="sidebar-content">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical"></div>
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-award" role="tabpanel" aria-labelledby="v-pills-award-tab"></div>
              <h2>Terms & Conditions</h2>
              <TermsAndConditions />
            </div>
          </div>
        );

    case 'Support':
  return (
    <div className="sidebar-content">
      <div className="content-box">
        <h2>Support</h2>
        <div className="support-main-scroll">
          <CallCenter />
        </div>
      </div>
    </div>
  );


      case 'dashboard':
        return isLoggedIn ? (
          <div className="sidebar-content">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical"></div>
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-award" role="tabpanel" aria-labelledby="v-pills-award-tab"></div>
              <h2>Dashboard</h2>
              {userRole === 'admin' ? <AdminDashboard /> : <ApplicantDashboard onNavigate={navigate} />}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {sidebarItems.map((item) => (
          <div key={item.id} className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <div className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`} onClick={() => setActiveItem(item.id)}>
              <a href={`#${item.id}`}>{item.label}</a>
            </div>
          </div>
        ))}
      </div>
      {renderContent()}
      {isLoginModalOpen && (
        <LoginModal type={loginType} onClose={handleCloseLoginModal} onLoginSuccess={handleLoginSuccess} onRegisterClick={onRegisterClick} />
      )}
    </div>
  );
};

export default Sidebar;