// import React, { useState } from 'react';
// import { Search, Download, Eye, MessageSquare, Check, X, ChevronDown } from 'lucide-react';
// import '../styles/AdminDashboard.css';

// const AdminDashboard = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [categoryFilter, setCategoryFilter] = useState('All');

//   const applications = [
//     {
//       id: 1,
//       applicantName: 'Harsh Rai',
//       organization: 'Raygain Technologies Private Limited',
//       category: 'Young Achiever of the Year(Male)',
//       status: 'Submitted',
//       submittedDate: '2025-02-09',

//     },
//     {
//       id: 2,
//       applicantName: 'Arushi Anand',
//       organization: 'Raygain Technologies Private Limited',
//       category: 'Human Resource Management',
//       status: 'Draft',
//       submittedDate: '2025-02-09',

//     },
//     {
//       id: 3,
//       applicantName: 'Adarsh Chaudhary',
//       organization: 'Raygain Technologies Private Limited',
//       category: 'Best Managed Project of the Year',
//       status: 'Submitted',
//       submittedDate: '2025-02-09',

//     },

//   ];

//   const filteredApplications = applications.filter((app) => {
//   const matchesSearch =
//     app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     app.organization.toLowerCase().includes(searchTerm.toLowerCase());

//   const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
//   const matchesCategory = categoryFilter === 'All' || app.category === categoryFilter;

//   return matchesSearch && matchesStatus && matchesCategory;
// });


//   const supportTeam = [
//     {

//       name: "Shijo Sebastian",
//       email: "fipiawards@fipi.org.in",
//       phone: "011 40886021, 011 40886017",

//     },

//   ];


// const awardCategories = [
//   {
//     id: 1,
//     name: "Exploration Company of the Year",
//     objective:
//       "The “Exploration Company of the Year” award is given in recognition of leadership and excellence in performance in Exploration for Oil and Gas in India during 2024-25.",
//     description:
//       "Open to Indian Companies engaged in Exploration of Oil & Gas in India as an Operator. Entries from Exploration & Production (E&P) of hydrocarbons companies and E&P divisions of integrated companies will be considered. Only 1 nomination from an organization duly endorsed by concerned Director / Board Level Executive will be considered."
//   },
//   {
//     id: 2,
//     name: "Oil & Gas Production Company of the Year (< 1 MMTOE)",
//     objective:
//       "Award for leadership and excellence in Production for Oil and Gas in India during 2024-25.",
//     description:
//       "Open to Indian Companies engaged in Production of Oil & Gas in India as an Operator. Includes Exploration & Production companies and E&P divisions of integrated companies. Only 1 nomination per organization, endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 3,
//     name: "Oil & Gas Production Company of the Year (>= 1 MMTOE)",
//     objective:
//       "Award for leadership and excellence in Production for Oil and Gas in India during 2024-25.",
//     description:
//       "Open to Indian Companies engaged in Production of Oil & Gas in India as an Operator. Includes Exploration & Production companies and E&P divisions of integrated companies. Only 1 nomination per organization, endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 4,
//     name: "Goal Net Zero Company of the Year",
//     objective:
//       "Recognizes the most effective company in reducing carbon footprint and improving energy efficiency.",
//     description:
//       "Open to all Energy Companies operating in India. Information must pertain to work in India (not overseas). Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 5,
//     name: "Green Hydrogen Company of the Year",
//     objective:
//       "Recognizes significant contributions towards initiatives in promoting Green Hydrogen.",
//     description:
//       "Open to all Energy Companies operating in India. Information must pertain to work in India (not overseas). Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 6,
//     name: "Overseas Oil & Gas Company of the Year",
//     objective:
//       "Recognizes leadership and excellence in exploration and production of Oil & Gas in Overseas Countries during 2024-25.",
//     description:
//       "Open to Indian Companies engaged in Exploration & Production of Oil & Gas overseas. Includes E&P companies and E&P divisions of integrated companies. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 7,
//     name: "Digital Technology Provider of the Year",
//     objective:
//       "Recognizes leadership in implementing cutting-edge digital technologies in the Oil & Gas sector.",
//     description:
//       "Open to any company with a presence in India implementing digital technologies in Oil & Gas. Performance during 2024-25 will be considered. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 8,
//     name: "Service Provider of the Year",
//     objective:
//       "Recognizes contributions by Service Providers in the Oil & Gas sector delivered efficiently, safely, and sustainably.",
//     description:
//       "Open to all Oil & Gas Service Providers operating in India. Company must provide services to upstream, midstream, or downstream operators and have an establishment in India. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 9,
//     name: "Pipeline Transportation Company of the Year",
//     objective:
//       "Recognizes leadership and excellence in transporting crude oil, petroleum products, and natural gas through pipelines in India.",
//     description:
//       "Open to companies owning and operating interstate pipelines in India. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 10,
//     name: "Oil Marketing Company of the Year",
//     objective:
//       "Recognizes leadership and excellence in marketing and retailing of petroleum products (non-polymer hydrocarbons).",
//     description:
//       "Open to all oil marketing and retailing companies operating in India. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 11,
//     name: "Human Resource Management Company of the Year",
//     objective:
//       "Recognizes excellence in Human Resource Management practices across the entire company.",
//     description:
//       "Open to all Oil & Gas companies operating in India. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 12,
//     name: "CBG Company of the Year",
//     objective:
//       "Recognizes the best initiatives in Compressed Bio-Gas (CBG) in capacity expansion, capex utilization, R&D, and patents filed during 2024–25.",
//     description:
//       "Open to all Indian energy companies in Compressed Bio-Gas (CBG). Overseas projects are excluded. Performance will be evaluated against FY2023–24. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 13,
//     name: "CGD Company of the Year",
//     objective:
//       "Recognizes the best-performing City Gas Distribution (CGD) company for excellence in infrastructure, operations, customer service, and safety.",
//     description:
//       "Open to all Indian energy companies in CGD. Evaluated against FY2023–24 performance and MWP targets. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 14,
//     name: "Best Managed Project of the Year",
//     objective:
//       "Awarded to the best managed Oil & Gas project completed in India during 2024–25.",
//     description:
//       "Open to Oil & Gas projects in India (including biofuels, carbon recycling, renewables). Project must be commissioned in 2024–25 with budget ≥ INR 500 Cr. Max 2 nominations per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 15,
//     name: "Refinery of the Year",
//     objective:
//       "Recognizes leadership & excellence in refining of petroleum in India.",
//     description:
//       "Open to individual crude oil refineries operating in India. Companies are encouraged to nominate each refinery separately. Only 1 nomination per organization endorsed by Director / Board Level Executive."
//   },
//   {
//     id: 16,
//     name: "Woman Executive of the Year",
//     objective:
//       "Honors a woman achiever in Oil & Gas for leadership, mentorship, and professionalism.",
//     description:
//       "Candidates must have >15 years of service experience. Max 2 nominations per organization endorsed by CMD/MD (PSUs) or CEO (private companies). Endorsement letter required."
//   },
//   {
//     id: 17,
//     name: "Young Achiever of the Year (Female)",
//     objective:
//       "Recognizes exceptional contributions by a young female professional in Oil & Gas.",
//     description:
//       "Candidate must be ≤40 years old. Max 3 nominations per organization endorsed by Director (HR) (PSUs) or CEO (private companies). Endorsement letter required."
//   },
//   {
//     id: 18,
//     name: "Young Achiever of the Year (Male)",
//     objective:
//       "Recognizes exceptional contributions by a young male professional in Oil & Gas.",
//     description:
//       "Candidate must be ≤40 years old. Max 3 nominations per organization endorsed by Director (HR) (PSUs) or CEO (private companies). Endorsement letter required."
//   },
//   {
//     id: 19,
//     name: "Innovator of the Year (Team)",
//     objective:
//       "Recognizes outstanding innovation by a team in India’s energy sector during the assessment year.",
//     description:
//       "Open to all organizations in India’s energy sector. Performance evaluated subjectively from nomination responses. Max 5 nominations per organization endorsed by Director / Board Level Executive."
//   }
// ];


//   return (
//     <div className="admin-dashboard">
//       {/* Header */}
//       <div className="dashboard-header">
//         <h1 className="dashboard-title">Admin Dashboard</h1>
//         <p className="dashboard-subtitle">Manage award applications and review submissions</p>
//       </div>

//       {/* KPI Cards */}
//       <div className="kpi-grid grid grid-cols-4">
//         <div className="kpi-card card">
//           <div className="kpi-content">
//             <div className="kpi-info">
//               <p className="kpi-label">Total Applications</p>
//               <p className="kpi-value">156</p>
//             </div>
//             <div className="kpi-icon primary">
//               <Eye size={24} />
//             </div>
//           </div>
//           <div className="kpi-trend">
//             <span className="trend-positive">↗ 12% from last month</span>
//           </div>
//         </div>

//         <div className="kpi-card card">
//           <div className="kpi-content">
//             <div className="kpi-info">
//               <p className="kpi-label">Pending Review</p>
//               <p className="kpi-value warning">23</p>
//             </div>
//             <div className="kpi-icon warning">
//               <MessageSquare size={24} />
//             </div>
//           </div>
//           <div className="kpi-trend">
//             <span className="trend-warning">Requires attention</span>
//           </div>
//         </div>

//         <div className="kpi-card card">
//           <div className="kpi-content">
//             <div className="kpi-info">
//               <p className="kpi-label">Approved</p>
//               <p className="kpi-value success">89</p>
//             </div>
//             <div className="kpi-icon success">
//               <Check size={24} />
//             </div>
//           </div>
//           <div className="kpi-trend">
//             <span className="trend-positive">57% approval rate</span>
//           </div>
//         </div>

//         <div className="kpi-card card">
//           <div className="kpi-content">
//             <div className="kpi-info">
//               <p className="kpi-label">Rejected</p>
//               <p className="kpi-value danger">44</p>
//             </div>
//             <div className="kpi-icon danger">
//               <X size={24} />
//             </div>
//           </div>
//           <div className="kpi-trend">
//             <span className="trend-negative">28% rejection rate</span>
//           </div>
//         </div>
//       </div>

//       <div className="filters-section card">
//         <div className="filters-content">
//           <div className="search-filters">
//             <div className="search-container">
//               <Search size={16} className="search-icon" />
//               <input
//                 type="text"
//                 placeholder="Search applicants or organizations..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//             </div>

//             <div className="filter-selects">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="form-select"
//               >
//                 <option value="All">All Statuses</option>
//                 <option value="Draft">Draft</option>
//                 <option value="Submitted">Submitted</option>

//               </select>

//               <select
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 className="form-select"
//               >
//                 <option value="All">All Categories</option>
//                 <option value="Exploration Company of the Year">Exploration Company of the Year</option>
//                  <option value="Oil & Gas Production Company of the Year (< 1 MMTOE)">Oil & Gas Production Company of the Year less than MMTOE</option>
//                  <option value="Oil & Gas Production Company of the Year (>= 1 MMTOE)">Oil & gas Production Company of the year More than or equal to 1 MMTOE</option>
//                  <option value="Goal Net Zero Company of the Year">Goal Net Zero Company of the Year</option>
//                  <option value="Green Hydrogen Company of the Year">Green Hydrogen Company of the Year</option>
//                  <option value="Overseas Oil & Gas Company of the Year">Overseas Oil & Gas Company of the Year</option>
//                  <option value="Digital Technology Provider of the Year">Digital Technology Provider of the Year</option>
//                  <option value="Service Provider of the Year">Service Provider of the Year</option>
//                  <option value="Pipeline Transportation Company of the Year">Pipeline Transportation Company of the Year</option>
//                  <option value="Oil Marketing Company of the Year">Oil Marketing Company of the Year</option>
//                  <option value="Human Resource Management">Human Resource Management</option>
//                  <option value="CBG Company of the Year">CBG Company of the Year</option>
//                  <option value="CGD Company of the Year">CGD Company of the Year</option>
//                  <option value="Best Managed Project of the Year">Best Managed Project of the Year</option>
//                  <option value="Refinery of the Year">Refinery of the Year</option>
//                  <option value="Innovator of the year (team)">Innovator of the year (team)</option>
//                  <option value="Woman Executive of the Year">Woman Executive of the Year</option>
//                  <option value="Young Achiever of the Year(Male)">Young Achiever of the Year(Male)</option>
//                  <option value="Young Achiever of the Year(Female)">Young Achiever of the Year(Female)</option>
//               </select>
//             </div>
//           </div>

//           <div className="export-buttons">
//             <button className="btn btn-outline">
//               <Download size={16} />
//               Export PDF
//             </button>
//             <button className="btn btn-success">
//               <Download size={16} />
//               Export XLS
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="applications-section">
//         <div className="card">
//           <div className="card-header">
//             <div className="section-header">
//               <h2 className="section-title">Awards Categories</h2>
//             </div>
//           </div>
//           <div className="applications-list">
//             {awardCategories.map((category) => (
//               <div key={category.id} className="application-item">
//                 <div className="application-header">
//                   <div className="application-info">
//                     <div className="application-details">
//                       <h3 className="application-title">{category.name}</h3>
//                       <p className="application-meta">{category.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>


//       <div className="notifications-section">
//         <div className="card">
//           <div className="card-header">
//             <div className="section-header">
//               <h2 className="section-title">Contact Support</h2>
//             </div>
//           </div>
//           <div className="notifications-list">
//             {supportTeam.map((member) => (
//               <div key={member.id} className="notification-item">
//                 <p className="notification-message">
//                   <strong>{member.name}</strong> - {member.role}
//                 </p>
//                 <p className="notification-time">
//                   Email: <a href={`mailto:${member.email}`}>{member.email}</a> <br/> Phone: <a href={`tel:${member.phone.replace(/\s+/g, '')}`}>{member.phone}</a>
//                 </p>

//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState } from 'react';
import { Search, Download, Eye, MessageSquare, Check, X,Paperclip } from 'lucide-react';
// import DownloadExcelFromTemplate from './DownloadExcelFromTemplate';
import '../styles/AdminDashboard.css';
import SearchIcon from '@mui/icons-material/Search';
import GHscoretable from './Tables/GHscoretable';
import { Navigate, useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState("All");

  const [visibleCount, setVisibleCount] = useState(12);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const applications = [
    {
      id: 1,
      applicantName: 'Harsh Rai',
      organization: 'Raygain Technologies Private Limited',
      category: 'Young Achiever of the Year (Male)',
      status: 'Submitted',

    },
    {
      id: 2,
      applicantName: 'Arushi Anand',
      organization: 'Raygain Technologies Private Limited',
      category: 'Human Resource Management',
      status: 'Draft',
    },
    {
      id: 3,
      applicantName: 'Adarsh Chaudhary',
      organization: 'Raygain Technologies Private Limited',
      category: 'Best Managed Project of the Year',
      status: 'Submitted',
    },
    {
      id:4,
      // applicantName:"Oil & Gas Production Company of the Year (>= 1 MMTOE)",
      organization:"Bharat Petroleum Corp. Limited",
      category:"CGD Company of the Year",
      status:"Submitted"
    },
  {
      id:5,
      applicantName:"Kavita Devi",
      organization:"ASAP Fluids Private Limited",
      category:"Green Hydrogen Company of the Year",
      status:"Draft"
    },
  {
      id:6,
      applicantName:"Surendra Sharma",
      organization:"Axens India (P) Limited",
      category:"Service Provider of the Year",
      status:"Draft"
    },
  {
      id:7,
      applicantName:"Sunidhi Tomar",
      organization:"Bliss Anand Private Limited",
      category:"Young Achiever of the Year (Female)",
      status:"Submitted"
    }
  ,
{
      id:8,
      applicantName:"Surendra Sharma",
      organization:"Axens India (P) Limited",
      category:"Service Provider of the Year",
      status:"Draft"
    },
  {
      id:9,
      applicantName:"Surendra Sharma",
      organization:"Axens India (P) Limited",
      category:"Service Provider of the Year",
      status:"Draft"
    },
  {
      id:10,
      applicantName:"Surendra Sharma",
      organization:"Axens India (P) Limited",
      category:"Service Provider of the Year",
      status:"Draft"
    },
  {
      id:11,
      applicantName:"Surendra Sharma",
      organization:"Axens India (P) Limited",
      category:"Service Provider of the Year",
      status:"Draft"
    },
  {
      id:12,
      applicantName:"Surendra Sharma",
      organization:"Axens India (P) Limited",
      category:"Service Provider of the Year",
      status:"Draft"
    },
  {
      id:13,
      applicantName:"Surendra Sharma",
      organization:"Axens India (P) Limited",
      category:"Service Provider of the Year",
      status:"Draft"
    },{
      id:14,
      applicantName:"Surendra Sharma",
      organization:"Axens India (P) Limited",
      category:"Service Provider of the Year",
      status:"Draft"
    },];

  const totalApplications = applications.length;
  const draftCount = applications.filter(app => app.status === 'Draft').length;
  const submittedCount = applications.filter(app => app.status === 'Submitted').length;

  const awardCategories = [
    { id: 1, name: "Exploration Company of the Year" },
    { id: 2, name: "Oil & Gas Production Company of the Year (< 1 MMTOE)" },
    { id: 3, name: "Oil & Gas Production Company of the Year (>= 1 MMTOE)" },
    { id: 4, name: "Goal Net Zero Company of the Year" },
    { id: 5, name: "Green Hydrogen Company of the Year" },
    { id: 6, name: "Overseas Oil & Gas Company of the Year" },
    { id: 7, name: "Digital Technology Provider of the Year" },
    { id: 8, name: "Service Provider of the Year" },
    { id: 9, name: "Pipeline Transportation Company of the Year" },
    { id: 10, name: "Oil Marketing Company of the Year" },
    { id: 11, name: "Human Resource Management" },
    { id: 12, name: "CBG Company of the Year" },
    { id: 13, name: "CGD Company of the Year" },
    { id: 14, name: "Best Managed Project of the Year" },
    { id: 15, name: "Refinery of the Year" },
    { id: 16, name: "Woman Executive of the Year" },
    { id: 17, name: "Young Achiever of the Year (Female)" },
    { id: 18, name: "Young Achiever of the Year (Male)" },
    { id: 19, name: "Innovator of the Year (Team)" },
    
  ];

  const ORGANISATION_OPTIONS = [
    "Adani Welspun Exploration Limited",
    "ASAP Fluids Private Limited",
    "Axens India (P) Limited",
    "Baker Hughes",
    "Bharat Petroleum Corp. Limited",
    "Bliss Anand Private Limited",
    "BP Exploration (Alpha) Limited",
    "Cairn Oil & Gas, Vedanta Limited",
    "Central U.P. Gas Limited",
    "Chennai Petroleum Corp. Limited",
    "Dynamic Drilling & Services Pvt. Limited",
    "Engineers India Limited",
    "Ernst & Young LLP",
    "ExxonMobil Gas (India) Pvt. Limited",
    "FMC Technologies India Private Limited",
    "GAIL (India) Limited",
    "Goa Natural Gas Private Limited",
    "GSPC LNG Limited",
    "Hindustan Petroleum Corporation Limited",
    "HPCL-Mittal Energy Limited",
    
    "IMC Limited",
    "Indian Gas Exchange Limited",
    "Indian Oil Corporation Limited",
    "Indian Strategic Petroleum Reserves Limited",
    "IndianOil Adani Ventures Limited",
    "Indraprastha Gas Limited",
    "Indradhanush Gas Grid Limited",
    "IRM Energy Private Limited",
    "Jindal Drilling & Industries Limited",
    "LanzaTech Private Limited",
    "Larsen & Toubro Ltd.",
    "Mangalore Refinery & Petrochemicals Limited",
    "Marine Solutionz Ship Management Private Limited",
    "Nayara Energy Limited",
    "Numaligarh Refinery Limited",
    "Oil & Natural Gas Corporation Limited",
    "Oil India Limited",
    "Petronet LNG Limited",
    "Petronet MHB Limited",
    "Pipeline Infrastructure Limited",
    "Reliance BP Mobility Limited",
    "Reliance Industries Limited",
    "S&P Global Commodity Insights",
    "Seros Energy Private Limited",
    "Shell Companies in India",
    "Siemens Limited",
    "SLB",
    "South Asia Gas Enterprise Pvt. Limited",
    "Sun Petrochemicals Private Limited",
    "THINK Gas Distribution Pvt. Ltd.",
    "Topso A/S",
    "TotalEnergies Gas & Power Projects India Pvt. Ltd.",
    "VCS Quality Services Private Limited",
    "Other",
  ];

  const supportTeam = [
    {
      id: 1,
      name: "Shijo Sebastian",
      email: "fipiawards@fipi.org.in",
      phone: "011 40886021, 011 40886017",
      role: "Support"
    },
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
app.organization.toLowerCase().includes(searchTerm.toLowerCase()) 
  // app.organization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || app.category === categoryFilter;
    const matchesCompany = companyFilter === 'All' || app.organization === companyFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesCompany;
  });


const navigate=useNavigate();
  const handleEyeClick = () => {
    setCompanyFilter("All");
    setStatusFilter("All");
    setCategoryFilter("All");
  };
  const handledraftclick=()=>{
    setStatusFilter("Draft");
  }
  const handlesubmitclick=()=>{
    setStatusFilter("Submitted");
  }

const handlexport = () => {
  if (categoryFilter === "Green Hydrogen Company of the Year") {
    navigate("/GHscoretable");
  } else if (categoryFilter === "CBG Company of the Year") {
    navigate("/CBGscoretable");
  } 
  else if (categoryFilter === "Oil & Gas Production Company of the Year (< 1 MMTOE)") {
    navigate("/Prodscoretable");
  }
  else if (categoryFilter === "Oil & Gas Production Company of the Year (>= 1 MMTOE)") {
    navigate("/Prodscoretable");
  }
  else if (categoryFilter === "Refinery of the Year") {
    navigate("/Refineryscoretable");
  }
  else if (categoryFilter === "Goal Net Zero Company of the Year") {
    navigate("/GNZscoretable");
  }
  else if (categoryFilter === "Overseas Oil & Gas Company of the Year") {
    navigate("/Overseasscoretable");
  }
  else if (categoryFilter === "Best Managed Project of the Year") {
    navigate("/BMPscoretable");
  }
  else if (categoryFilter === "Human Resource Management") {
    navigate("/HRMscoretable");
  }
  else if (categoryFilter === "Service Provider of the Year") {
    navigate("/Sptable");
  }
  else {
    alert("Export not available for this category yet!");
  }
};

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Panel</h1>
        <p className="dashboard-subtitle">The Federation of Indian Petroleum Industry (FIPI)</p>
      </div>
      <div className="kpi-gridd grid grid-cols-4">
        <div className="kpi-card card">
          <div className="kpi-content">
            <div className="kpi-info">
              <p className="kpi-label">Total Applications</p>
              <p className="kpi-value">{totalApplications}</p>
            </div>

            <div className="kpi-icon primary" onClick={() => handleEyeClick()}>
              <Eye size={24} />
            </div>

          </div>
          <div className="kpi-trend">
            <span className="trend-positive">All Categories</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-content">
            <div className="kpi-info">
              <p className="kpi-label">Submitted</p>
              <p className="kpi-value success">{submittedCount}</p>
            </div>
            <div className="kpi-icon success"onClick={() => handlesubmitclick()}>
              <Check size={24} />
            </div>
          </div>
          <div className="kpi-trend">
            <span className="trend-positive"> Submitted Successfully</span>
          </div>
        </div>
        <div className="kpi-card card">
          <div className="kpi-content">
            <div className="kpi-info">
              <p className="kpi-label">Drafts</p>
              <p className="kpi-value warning">{draftCount}</p>
            </div>
            <div className="kpi-icon warning" onClick={() => handledraftclick()} >
              <MessageSquare size={24} />
            </div>
          </div>
          <div className="kpi-trend">
            <span className="trend-warning">Save as Draft</span>
          </div>
        </div>
        <div className="kpi-card card">
          <div className="kpi-content">
            <div className="kpi-info">
              <p className="kpi-label">Total Registrations</p>
              <p className="kpi-value danger">0</p>
            </div>
            <div className="kpi-icon danger">
              <Paperclip size={24} />
            </div>
          </div>
          <div className="kpi-trend">
            <span className="trend-negative">application</span>
          </div>
        </div>
      </div>
      
      <div className="filters-section card">
        <div className="filters-content">
          <div className="search-filters">
            <div className="search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search applicants or organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-inputt"
              />
            </div>

            <div className="filter-selects">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
              >
                <option value="All">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="form-select"
              >
                <option value="All">All Categories</option>
                {awardCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="form-select"
              >
                <option value="All">All Companies</option>
                {ORGANISATION_OPTIONS.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>

            </div>
          </div>

          <div className="export-buttons">
            {categoryFilter !== "All" && companyFilter === "All" && (
              <button className="btn btn-success"  onClick={() => handlexport()}>
                <Download size={16} />
                Export XLS 

              </button>
            )}
          </div>


        </div>
      </div>

      {/* <div className="applications-card-list">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <div key={app.id} className="application-card">           
              <div className="application-card-header">
                {app.organization}
              </div>
              <p className='para'>
                <strong>Category:</strong> {app.category}<br /><br />

                <strong>Status:</strong>{" "}
                <span
                  className={`application-status ${app.status.toLowerCase()
                    }`}
                >
                  {app.status}
                </span>
              </p>
              <div className="application-buttons">
                <button className="application-btn pdf">
                  <Download size={16} /> PDF
                </button>

              </div>
            </div>
          ))
        ) : (
          <p>No applications found</p>
        )}
      </div> */}

      <div className="applications-card-list">
        {filteredApplications.length > 0 ? (
          filteredApplications.slice(0, visibleCount).map((app) => (
            <div key={app.id} className="application-card">
              <div className="application-card-header">{app.organization}</div>
              <p className="para">
                <strong>Category:</strong> {app.category}
                <br />
                <br />
                <strong>Status:</strong>{" "}
                <span
                  className={`application-status ${app.status.toLowerCase()}`}
                >
                  {app.status}
                </span>
              </p>
              <div className="application-buttons">
                <button className="application-btn pdf">
                  <Download size={16} /> PDF
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No applications found</p>
        )}
      </div>

      {/* Show More button */}
      {visibleCount < filteredApplications.length && (
        <div className="show-more-container">
          <button className="show-more-btn" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}

      {/* <div className="applications-section">
        <div className="card">
          <div className="card-header">
            <h2 className="section-title">Award Categories</h2>
          </div>
          <div className="applications-list">
            {awardCategories.map((category) => (
              <div key={category.id} className="application-item">
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="notifications-section">
        <div className="card-support">
          <div className="card-header">
            <h2 className="section-title">Contact Support</h2>
          </div>
          <div className="notifications-list">
            {supportTeam.map((member) => (
              <div key={member.id} className="notification-item">
                <p>
                  <strong>{member.name}</strong> - {member.role}
                </p>
                <p>
                  Email: <a href={`mailto:${member.email}`}>{member.email}</a>
                  <br />
                  Phone: <a href={`tel:${member.phone.replace(/\s+/g, '')}`}>{member.phone}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
