import React, { useState } from 'react';
import { Search, Download, Eye, MessageSquare, Check, X, ChevronDown } from 'lucide-react';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const applications = [
    {
      id: 1,
      applicantName: 'John Doe',
      organization: 'Reliance Industries',
      category: 'Innovation Excellence',
      status: 'Pending Review',
      submittedDate: '2025-01-15',
      score: null,
    },
    {
      id: 2,
      applicantName: 'Jane Smith',
      organization: 'ONGC',
      category: 'Environmental Sustainability',
      status: 'Under Review',
      submittedDate: '2025-01-12',
      score: 85,
    },
    {
      id: 3,
      applicantName: 'Mike Johnson',
      organization: 'Indian Oil Corporation',
      category: 'Safety Leadership',
      status: 'Approved',
      submittedDate: '2025-01-10',
      score: 92,
    },
    {
      id: 4,
      applicantName: 'Sarah Wilson',
      organization: 'Bharat Petroleum',
      category: 'Digital Transformation',
      status: 'Rejected',
      submittedDate: '2025-01-08',
      score: 65,
    },
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || app.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const supportTeam = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Technical Support Lead',
      email: 'john.smith@fipi.org',
      phone: '+91 98765 43210',
      availability: 'Mon-Fri, 9:00 AM - 5:00 PM',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Award Program Specialist',
      email: 'sarah.johnson@fipi.org',
      phone: '+91 98765 43211',
      availability: 'Mon-Fri, 10:00 AM - 6:00 PM',
    },
    {
      id: 3,
      name: 'Raj Patel',
      role: 'IT Support Engineer',
      email: 'raj.patel@fipi.org',
      phone: '+91 98765 43212',
      availability: 'Mon-Fri, 8:00 AM - 4:00 PM',
    },
  ];

  const awardCategories = [
    { id: 1, name: 'Innovation Excellence', description: 'Recognizes groundbreaking innovations in the petroleum industry.' },
    { id: 2, name: 'Environmental Sustainability', description: 'Honors efforts in sustainable and eco-friendly practices.' },
    { id: 3, name: 'Safety Leadership', description: 'Celebrates exemplary safety standards and leadership.' },
    { id: 4, name: 'Digital Transformation', description: 'Awards excellence in digital innovation and technology adoption.' },
    { id: 5, name: 'Young Professional', description: 'Recognizes young talents making significant contributions.' },
    { id: 6, name: 'Corporate Social Responsibility', description: 'Highlights impactful CSR initiatives in the community.' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Manage award applications and review submissions</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid grid grid-cols-4">
        <div className="kpi-card card">
          <div className="kpi-content">
            <div className="kpi-info">
              <p className="kpi-label">Total Applications</p>
              <p className="kpi-value">156</p>
            </div>
            <div className="kpi-icon primary">
              <Eye size={24} />
            </div>
          </div>
          <div className="kpi-trend">
            <span className="trend-positive">↗ 12% from last month</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-content">
            <div className="kpi-info">
              <p className="kpi-label">Pending Review</p>
              <p className="kpi-value warning">23</p>
            </div>
            <div className="kpi-icon warning">
              <MessageSquare size={24} />
            </div>
          </div>
          <div className="kpi-trend">
            <span className="trend-warning">Requires attention</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-content">
            <div className="kpi-info">
              <p className="kpi-label">Approved</p>
              <p className="kpi-value success">89</p>
            </div>
            <div className="kpi-icon success">
              <Check size={24} />
            </div>
          </div>
          <div className="kpi-trend">
            <span className="trend-positive">57% approval rate</span>
          </div>
        </div>

        <div className="kpi-card card">
          <div className="kpi-content">
            <div className="kpi-info">
              <p className="kpi-label">Rejected</p>
              <p className="kpi-value danger">44</p>
            </div>
            <div className="kpi-icon danger">
              <X size={24} />
            </div>
          </div>
          <div className="kpi-trend">
            <span className="trend-negative">28% rejection rate</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section card">
        <div className="filters-content">
          <div className="search-filters">
            <div className="search-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search applicants or organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-selects">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
              >
                <option value="All">All Statuses</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="form-select"
              >
                <option value="All">All Categories</option>
                <option value="Innovation Excellence">Innovation Excellence</option>
                <option value="Environmental Sustainability">Environmental Sustainability</option>
                <option value="Safety Leadership">Safety Leadership</option>
                <option value="Digital Transformation">Digital Transformation</option>
              </select>
            </div>
          </div>

          <div className="export-buttons">
            <button className="btn btn-outline">
              <Download size={16} />
              Export PDF
            </button>
            <button className="btn btn-success">
              <Download size={16} />
              Export XLS
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
    

      {/* Awards Categories */}
      <div className="applications-section">
        <div className="card">
          <div className="card-header">
            <div className="section-header">
              <h2 className="section-title">Awards Categories</h2>
            </div>
          </div>
          <div className="applications-list">
            {awardCategories.map((category) => (
              <div key={category.id} className="application-item">
                <div className="application-header">
                  <div className="application-info">
                    <div className="application-details">
                      <h3 className="application-title">{category.name}</h3>
                      <p className="application-meta">{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="notifications-section">
        <div className="card">
          <div className="card-header">
            <div className="section-header">
              <h2 className="section-title">Contact Support</h2>
            </div>
          </div>
          <div className="notifications-list">
            {supportTeam.map((member) => (
              <div key={member.id} className="notification-item">
                <p className="notification-message">
                  <strong>{member.name}</strong> - {member.role}
                </p>
                <p className="notification-time">
                  Email: <a href={`mailto:${member.email}`}>{member.email}</a> | Phone: <a href={`tel:${member.phone.replace(/\s+/g, '')}`}>{member.phone}</a>
                </p>
                <p className="notification-time">Availability: {member.availability}</p>
              </div>
            ))}
            <div className="notification-item">
              <p className="notification-message">
                <strong>Emergency Support</strong>
              </p>
              <p className="notification-time">
                For urgent issues, call: <a href="tel:+919876543200">+91 98765 43200</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;