import React from 'react';
import { FileText, Clock, CheckCircle, XCircle, Plus, Bell } from 'lucide-react';
import '../styles/Dashboard.css';
import RegistrationForm from './RegistrationForm';
import RefineryRegistration from './RefineryRegistration';

const ApplicantDashboard = ({ onNavigate }) => {
  const applications = [
    {
      id: 1,
      title: 'Innovation Excellence Award',
      status: 'Draft',
      lastModified: '2025-01-15',
      progress: 60,
    },
    {
      id: 2,
      title: 'Environmental Sustainability Award',
      status: 'Submitted',
      lastModified: '2025-01-10',
      progress: 100,
    },
    {
      id: 3,
      title: 'Safety Leadership Award',
      status: 'Under Review',
      lastModified: '2025-01-05',
      progress: 100,
    },
  ];

  const notifications = [
    {
      id: 1,
      message: 'Your Innovation Excellence Award application has been saved as draft',
      time: '2 hours ago',
      type: 'info',
    },
    {
      id: 2,
      message: 'Environmental Sustainability Award application submitted successfully',
      time: '5 days ago',
      type: 'success',
    },
    {
      id: 3,
      message: 'Safety Leadership Award application is under review',
      time: '1 week ago',
      type: 'warning',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Draft':
        return <FileText size={20} className="status-icon draft" />;
      case 'Submitted':
        return <Clock size={20} className="status-icon submitted" />;
      case 'Under Review':
        return <Clock size={20} className="status-icon under-review" />;
      case 'Approved':
        return <CheckCircle size={20} className="status-icon approved" />;
      case 'Rejected':
        return <XCircle size={20} className="status-icon rejected" />;
      default:
        return <FileText size={20} className="status-icon draft" />;
    }
  };

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
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="dashboard-title">Welcome, John Doe</h1>
        <p className="dashboard-subtitle">Manage your award applications and track their progress</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid grid grid-cols-4">
        <div className="stat-card card">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Total Applications</p>
              <p className="stat-value">3</p>
            </div>
            <FileText size={32} className="stat-icon primary" />
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Draft</p>
              <p className="stat-value">1</p>
            </div>
            <Clock size={32} className="stat-icon secondary" />
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Submitted</p>
              <p className="stat-value">1</p>
            </div>
            <CheckCircle size={32} className="stat-icon success" />
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">Under Review</p>
              <p className="stat-value">1</p>
            </div>
            <Clock size={32} className="stat-icon warning" />
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Applications List */}
        <div className="applications-section">
          <div className="card">
            <div className="card-header">
              <div className="section-header">
                <h2 className="section-title">My Applications</h2>
                <button
                  onClick={() => onNavigate('RegistrationForm')}
                  className="btn btn-primary"
                >
                  <Plus size={16} />
                  Apply Now
                </button>
              </div>
            </div>

            <div className="applications-list">
              {applications.map((app) => (
                <div key={app.id} className="application-item">
                  <div className="application-header">
                    <div className="application-info">
                      {getStatusIcon(app.status)}
                      <div className="application-details">
                        <h3 className="application-title">{app.title}</h3>
                        <p className="application-meta">Last modified: {app.lastModified}</p>
                      </div>
                    </div>
                    <span className={`status-badge status-${app.status.toLowerCase().replace(' ', '-')}`}>
                      {app.status}
                    </span>
                  </div>

                  {app.status === 'Draft' && (
                    <div className="progress-section">
                      <div className="progress-info">
                        <span className="progress-label">Progress</span>
                        <span className="progress-value">{app.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="application-actions">
                    <button className="btn btn-outline btn-sm">View</button>
                    {app.status === 'Draft' && (
                      <button
                        onClick={() => onNavigate('application-form')}
                        className="btn btn-primary btn-sm"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards Categories
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
        </div> */}

        {/* Notifications */}
        <div className="notifications-section">
          <div className="card">
            <div className="card-header">
              <div className="section-header">
                <Bell size={20} />
                <h2 className="section-title">Recent Notifications</h2>
              </div>
            </div>

            <div className="notifications-list">
              {notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <p className="notification-message">{notification.message}</p>
                  <p className="notification-time">{notification.time}</p>
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
    </div>
  );
};

export default ApplicantDashboard;