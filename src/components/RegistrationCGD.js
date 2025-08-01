import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormProduction.css';

const RegistrationCGD = () => {
    const [numGAs, setNumGAs] = useState(5);
    const [formData, setFormData] = useState({
        Organisationname: '',
        category: 'CGD Company of the Year',
        companyName: '',
        mailingAddress: '',
        authorityName: '',
        authorityTitle: '',
        authorityPhone: '',
        authorityEmail: '',
        authoritySignature: '',
        copyApplicantData: false,
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        companyProfile: '',
        approvingAuthoritySignature: '',
        declaration: false,
        comment: '',
        ga10YearMWP: ['', ''],
        ga8YearMWP: ['', ''],
        ga5YearMWP: ['', ''],
        ga3YearMWP: ['', ''],
        gaNoMWP: ['', ''],
        baseDate: ['', '', '', ''],
        startWorkDate: ['', '', '', ''],
        exclusivityPeriod: ['', '', '', ''],
        forceMajeureStart: ['', '', '', ''],
        forceMajeureEnd: ['', '', '', ''],
        pngTotalMWP: [['', ''], ['', ''], ['', ''], ['', '']],
        pngProRatedMWP: [['', ''], ['', ''], ['', ''], ['', '']],
        pngActual: [['', ''], ['', ''], ['', ''], ['', '']],
        pngBilled: [['', ''], ['', ''], ['', ''], ['', '']],
        cngTotalMWP: [['', ''], ['', ''], ['', ''], ['', '']],
        cngProRatedMWP: [['', ''], ['', ''], ['', ''], ['', '']],
        cngActual: [['', ''], ['', ''], ['', ''], ['', '']],
        pipelineTotalMWP: [['', ''], ['', ''], ['', ''], ['', '']],
        pipelineProRatedMWP: [['', ''], ['', ''], ['', ''], ['', '']],
        pipelineActual: [['', ''], ['', ''], ['', ''], ['', '']],
        pngSalesVolume: [['', ''], ['', ''], ['', ''], ['', '']],
        cngSalesVolume: [['', ''], ['', ''], ['', ''], ['', '']],
        cbgIntake: [['', ''], ['', ''], ['', ''], ['', '']],
        fatalities: [['', ''], ['', ''], ['', ''], ['', '']],
        totalHoursWorked: [['', ''], ['', ''], ['', ''], ['', '']],
        lostTimeInjuries: [['', ''], ['', ''], ['', ''], ['', '']],
        totalRecordableIncident: [['', ''], ['', ''], ['', ''], ['', '']],
        safetyAudits: [['', ''], ['', ''], ['', ''], ['', '']],
        attachments1: { description: '', file: null },
        attachments2: { description: '', file: null },
        attachments3: { description: '', file: null },
        attachments4: { description: '', file: null },
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [copyApplicantData, setCopyApplicantData] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const awardTitle = location.state?.awardTitle;

    const addMoreGA = () => {
        setNumGAs(prev => prev + 1);
        setFormData(prev => {
            const newFormData = { ...prev };
            const fields = [
                'baseDate', 'startWorkDate', 'exclusivityPeriod', 'forceMajeureStart', 'forceMajeureEnd',
                'pngTotalMWP', 'pngProRatedMWP', 'pngActual', 'pngBilled',
                'cngTotalMWP', 'cngProRatedMWP', 'cngActual',
                'pipelineTotalMWP', 'pipelineProRatedMWP', 'pipelineActual',
                'pngSalesVolume', 'cngSalesVolume', 'cbgIntake',
                'fatalities', 'totalHoursWorked', 'lostTimeInjuries', 'totalRecordableIncident', 'safetyAudits'
            ];
            fields.forEach(field => {
                if (
                    field === 'baseDate' ||
                    field === 'startWorkDate' ||
                    field === 'exclusivityPeriod' ||
                    field === 'forceMajeureStart' ||
                    field === 'forceMajeureEnd'
                ) {
                    newFormData[field] = [...newFormData[field], ''];
                } else {
                    newFormData[field] = [...newFormData[field], ['', '']];
                }
            });
            return newFormData;
        });
    };

    const handleChange = (name, value, gaIndex = null, yearIndex = null) => {
        if (["Organisationname", "authorityName", "authorityTitle", "contactName"].includes(name)) {
            const isValid = /^[A-Za-z\s]*$/.test(value);
            if (!isValid) return;
        }

        setFormData(prev => {
            if (gaIndex !== null && yearIndex !== null) {
                const updatedArray = [...prev[name]];
                updatedArray[gaIndex] = [...(updatedArray[gaIndex] || ['', ''])];
                updatedArray[gaIndex][yearIndex] = value;
                return { ...prev, [name]: updatedArray };
            } else if (gaIndex !== null) {
                const updatedArray = [...prev[name]];
                updatedArray[gaIndex] = value;
                return { ...prev, [name]: updatedArray };
            } else {
                if (name === 'authorityPhone' || name === 'contactPhone') {
                    const numericValue = value.replace(/\D/g, '').slice(0, 10);
                    if (numericValue.length > 10) {
                        setError('Phone number must not exceed 10 digits.');
                    } else {
                        setError('');
                    }
                    return { ...prev, [name]: numericValue };
                }
                return { ...prev, [name]: value };
            }
        });

        if (name === 'Organisationname' && !value && currentStep === 1) {
            setError('Organisation name is required.');
        } else if (name === 'mailingAddress' && !value.trim() && currentStep === 1) {
            setError('Mailing address is required.');
        } else if (name === 'authorityName' && !value && currentStep === 2) {
            setError('Authority name is required.');
        } else if (name === 'authorityTitle' && !value && currentStep === 2) {
            setError('Authority designation is required.');
        } else {
            setError('');
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.Organisationname?.trim()) errors.Organisationname = 'Organisation name is required';
        if (!formData.authorityName?.trim()) errors.authorityName = 'Authority name is required';
        if (!formData.authorityTitle?.trim()) errors.authorityTitle = 'Authority designation is required';
        if (!formData.contactEmail?.trim()) errors.contactEmail = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(formData.contactEmail)) errors.contactEmail = 'Invalid email format';
        if (!formData.approvingAuthoritySignature) errors.approvingAuthoritySignature = 'Approving authority signature is required';
        return errors;
    };

    const handleAttachmentChange = (key, field, value, event = null) => {
        if (field === 'file' && value) {
            const file = value;
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                setError('Only JPG, PNG, and PDF files are allowed for attachments.');
                if (event) event.target.value = null;
                return;
            }
            if (file.size > maxSizeInBytes) {
                setError('File size must not exceed 5 MB for attachments.');
                if (event) event.target.value = null;
                return;
            }
            setError('');
        }
        setFormData(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
    };

    const nextStep = () => {
        if (currentStep === 1 && !formData.Organisationname) {
            setError('Organisation name is required.');
            return;
        }
        if (currentStep === 1 && !formData.mailingAddress.trim()) {
            setError('Mailing address is required.');
            return;
        }
        if (currentStep === 2 && !formData.authorityName) {
            setError('Authority name is required.');
            return;
        }
        if (currentStep === 2 && !formData.authorityTitle) {
            setError('Authority designation is required.');
            return;
        }
        setError('');
        if (currentStep < 5) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const saveDraft = () => {
        localStorage.setItem('registrationProductionDraft', JSON.stringify({ formData }));
        alert('Draft Saved!');
    };

    const handleApprovingAuthorityChange = (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                setError('Only JPG, PNG, and PDF files are allowed.');
                return;
            }
            if (file.size > maxSizeInBytes) {
                setError('File size must not exceed 5 MB.');
                return;
            }
            setError('');
            setFormData(prev => ({ ...prev, approvingAuthoritySignature: file }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data before submission:', formData);
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setError(Object.values(errors)[0]);
            return;
        }
        if (!formData.declaration) {
            alert('Please accept the declaration before submitting.');
            return;
        }
        if (formData.authorityPhone.length !== 10) {
            setError('Please enter a valid 10-digit authority phone number.');
            return;
        }
        console.log('Form submitted with data:', formData);
        localStorage.setItem('registrationProduction', JSON.stringify({ formData }));
        alert('Registration Submitted Successfully!');
        setIsSubmitted(true);
        setCurrentStep(1);
        setNumGAs(4);
        setFormData({
            Organisationname: '',
            category: 'CGD Company of the Year',
            companyName: '',
            mailingAddress: '',
            authorityName: '',
            authorityTitle: '',
            authorityPhone: '',
            authorityEmail: '',
            authoritySignature: '',
            copyApplicantData: false,
            contactName: '',
            contactPhone: '',
            contactEmail: '',
            companyProfile: '',
            approvingAuthoritySignature: '',
            declaration: false,
            comment: '',
            ga10YearMWP: ['', ''],
            ga8YearMWP: ['', ''],
            ga5YearMWP: ['', ''],
            ga3YearMWP: ['', ''],
            gaNoMWP: ['', ''],
            baseDate: ['', '', '', ''],
            startWorkDate: ['', '', '', ''],
            exclusivityPeriod: ['', '', '', ''],
            forceMajeureStart: ['', '', '', ''],
            forceMajeureEnd: ['', '', '', ''],
            pngTotalMWP: [['', ''], ['', ''], ['', ''], ['', '']],
            pngProRatedMWP: [['', ''], ['', ''], ['', ''], ['', '']],
            pngActual: [['', ''], ['', ''], ['', ''], ['', '']],
            pngBilled: [['', ''], ['', ''], ['', ''], ['', '']],
            cngTotalMWP: [['', ''], ['', ''], ['', ''], ['', '']],
            cngProRatedMWP: [['', ''], ['', ''], ['', ''], ['', '']],
            cngActual: [['', ''], ['', ''], ['', ''], ['', '']],
            pipelineTotalMWP: [['', ''], ['', ''], ['', ''], ['', '']],
            pipelineProRatedMWP: [['', ''], ['', ''], ['', ''], ['', '']],
            pipelineActual: [['', ''], ['', ''], ['', ''], ['', '']],
            pngSalesVolume: [['', ''], ['', ''], ['', ''], ['', '']],
            cngSalesVolume: [['', ''], ['', ''], ['', ''], ['', '']],
            cbgIntake: [['', ''], ['', ''], ['', ''], ['', '']],
            fatalities: [['', ''], ['', ''], ['', ''], ['', '']],
            totalHoursWorked: [['', ''], ['', ''], ['', ''], ['', '']],
            lostTimeInjuries: [['', ''], ['', ''], ['', ''], ['', '']],
            totalRecordableIncident: [['', ''], ['', ''], ['', ''], ['', '']],
            safetyAudits: [['', ''], ['', ''], ['', ''], ['', '']],
            attachments1: { description: '', file: null },
            attachments2: { description: '', file: null },
            attachments3: { description: '', file: null },
            attachments4: { description: '', file: null },
        });
    };

    const handlePrint = () => {
        const printContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h1 style="text-align: center; color: #1e40af;">Registration Form: CGD Company of the Year</h1>
                <h2>Organization & Contact Details</h2>
                <p><strong>Organisation Name:</strong> ${formData.Organisationname || ''}</p>
                <p><strong>Category:</strong> ${formData.category || ''}</p>
                <p><strong>Mailing Address:</strong> ${formData.mailingAddress || ''}</p>
                <h2>Company Details</h2>
                <p><strong>Name of Company:</strong> ${formData.companyName || ''}</p>
                <p><strong>Authority Name:</strong> ${formData.authorityName || ''}</p>
                <p><strong>Authority Title:</strong> ${formData.authorityTitle || ''}</p>
                <p><strong>Authority Phone:</strong> ${formData.authorityPhone || ''}</p>
                <p><strong>Authority Email:</strong> ${formData.authorityEmail || ''}</p>
                <p><strong>Contact Name:</strong> ${formData.contactName || ''}</p>
                <p><strong>Contact Phone:</strong> ${formData.contactPhone || ''}</p>
                <p><strong>Contact Email:</strong> ${formData.contactEmail || ''}</p>
                <p><strong>Company Profile:</strong> ${formData.companyProfile || ''}</p>
                <h2>Quantitative Information - Part 1</h2>
                <h3>General Information</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Unit</th>
                            <th style="border: 1px solid #000; padding: 8px;">2024-25</th>
                            <th style="border: 1px solid #000; padding: 8px;">2023-24</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${part1.slice(0, 5).map(([num, label, unit, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[0] || ''}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[1] || ''}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h3>GA-Specific Information</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Unit</th>
                            ${Array.from({ length: numGAs }, (_, i) => `
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1}</th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${part1.slice(5, 10).map(([num, label, unit, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                                ${Array.from({ length: numGAs }, (_, gaIndex) => `
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex] || ''}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h3>D-PNG Connection</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Unit</th>
                            ${Array.from({ length: numGAs }, (_, i) => `
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2024-25)</th>
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2023-24)</th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${part1.slice(10).map(([num, label, unit, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                                ${Array.from({ length: numGAs }, (_, gaIndex) => `
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[0] || ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[1] || ''}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h2>Quantitative Information - Part 2</h2>
                <h3>CNG Stations</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Unit</th>
                            ${Array.from({ length: numGAs }, (_, i) => `
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2024-25)</th>
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2023-24)</th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${part2.slice(0, 3).map(([num, label, unit, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                                ${Array.from({ length: numGAs }, (_, gaIndex) => `
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[0] || ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[1] || ''}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h3>Inch-km of Pipeline Laid</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Unit</th>
                            ${Array.from({ length: numGAs }, (_, i) => `
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2024-25)</th>
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2023-24)</th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${part2.slice(3, 6).map(([num, label, unit, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                                ${Array.from({ length: numGAs }, (_, gaIndex) => `
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[0] || ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[1] || ''}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h3>Natural Gas Sales & CBG Intake</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Unit</th>
                            ${Array.from({ length: numGAs }, (_, i) => `
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2024-25)</th>
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2023-24)</th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${part2.slice(6, 9).map(([num, label, unit, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                                ${Array.from({ length: numGAs }, (_, gaIndex) => `
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[0] || ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[1] || ''}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h3>Safety</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #000; padding: 8px;">S. No.</th>
                            <th style="border: 1px solid #000; padding: 8px;">Particulars</th>
                            <th style="border: 1px solid #000; padding: 8px;">Unit</th>
                            ${Array.from({ length: numGAs }, (_, i) => `
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2024-25)</th>
                                <th style="border: 1px solid #000; padding: 8px;">GA${i + 1} (2023-24)</th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${part2.slice(9).map(([num, label, unit, key]) => `
                            <tr>
                                <td style="border: 1px solid #000; padding: 8px;">${num}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${label}</td>
                                <td style="border: 1px solid #000; padding: 8px;">${unit}</td>
                                ${Array.from({ length: numGAs }, (_, gaIndex) => `
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[0] || ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${formData[key]?.[gaIndex]?.[1] || ''}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h2>Declaration</h2>
                <p>I declare that the information submitted is true and complete.</p>
            </div>
        `;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    const part1 = [
        ['1.1', 'Number of GAs with 10 year MWP Target', 'No.', 'ga10YearMWP'],
        ['1.2', 'Number of GAs with 8 year MWP Target', 'No.', 'ga8YearMWP'],
        ['1.3', 'Number of GAs with 5 year MWP Target', 'No.', 'ga5YearMWP'],
        ['1.4', 'Number of GAs with 3 year MWP Target', 'No.', 'ga3YearMWP'],
        ['1.5', 'Number of GAs with no MWP Target', 'No.', 'gaNoMWP'],
        ['2.1', 'Base date for evaluation', 'Date', 'baseDate'],
        ['2.2', 'Effective start of work date (Contract Year)', 'Date', 'startWorkDate'],
        ['2.3', 'Exclusivity Period', 'Years', 'exclusivityPeriod'],
        ['2.4', 'Force Majeure start date (if any)', 'Date', 'forceMajeureStart'],
        ['2.5', 'Force Majeure end date (if any)', 'Date', 'forceMajeureEnd'],
        ['3.1', 'Total MWP Target (D-PNG Connection)', 'No.', 'pngTotalMWP'],
        ['3.2', 'Pro-rated MWP Target (D-PNG Connection)', 'No.', 'pngProRatedMWP'],
        ['3.3', 'Actual PNG connections achieved', 'No.', 'pngActual'],
        ['3.4', 'Number of Billed connections in 2024-25 as reported to PNGRB', 'No.', 'pngBilled'],
    ];

    const part2 = [
        ['4.1', 'Total MWP Target (CNG Stations)', 'No.', 'cngTotalMWP'],
        ['4.2', 'Pro-rated MWP Target (CNG Stations)', 'No.', 'cngProRatedMWP'],
        ['4.3', 'Actual no. of CNG stations achieved', 'No.', 'cngActual'],
        ['5.1', 'Total MWP Target (Inch-km of Pipeline laid)', 'No.', 'pipelineTotalMWP'],
        ['5.2', 'Pro-rated MWP Target (Inch-km of Pipeline laid)', 'No.', 'pipelineProRatedMWP'],
        ['5.3', 'Actual inch-km of steel+MDPE pipeline laid', 'No.', 'pipelineActual'],
        ['6.1', 'PNG Sales Volume', 'MMSCM', 'pngSalesVolume'],
        ['6.2', 'CNG Sales Volume', 'MMSCM', 'cngSalesVolume'],
        ['6.3', 'CBG Intake in CGD network', 'MMSCM', 'cbgIntake'],
        ['7.1', 'Number of fatalities', '', 'fatalities'],
        ['7.2', 'Total Hours Worked', '', 'totalHoursWorked'],
        ['7.3', 'Lost Time Injuries', '', 'lostTimeInjuries'],
        ['7.4', 'Total Recordable Incident', '', 'totalRecordableIncident'],
        ['7.5', 'Number of safety audits conducted in 2024-25', '', 'safetyAudits'],
    ];

    const renderStepContent = () => {
        const progress = ((currentStep - 1) / 4) * 100;
        return (
            <div className="form-step">
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                {currentStep === 1 && (
                    <div>
                        <h3 className="step-title">Step 1: Organization Details</h3>
                        <div className="form-group">
                            <label>Organisation Name <span className="text-red">*</span></label>
                            <input
                                type="text"
                                name="Organisationname"
                                value={formData.Organisationname}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                                        handleChange('Organisationname', value);
                                    }
                                }}
                                className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
                            />
                            {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Select Category<span className="text-red">*</span></label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className={`form-input ${!formData.category && currentStep === 1 ? 'has-error' : ''}`}
                            >
                                <option value="">Select Category</option>
                                <option value="Exploration Company of the Year">Exploration Company of the Year</option>
                                <option value="Oil & gas Production Company of the year (<1 MMTOE)">Oil & gas Production Company of the year Less than 1 MTOE</option>
                                <option value="Oil & gas Production Company of the year (>=1 MMTOE)">Oil & gas Production Company of the year More than or equal to 1 MMTOE</option>
                                <option value="Goal Net Zero Company of the Year">Goal Net Zero Company of the Year</option>
                                <option value="Green Hydrogen Company of the Year">Green Hydrogen Company of the Year</option>
                                <option value="Overseas Oil & Gas Company of the Year">Overseas Oil & Gas Company of the Year</option>
                                <option value="Digital Technology Provider of the Year">Digital Technology Provider of the Year</option>
                                <option value="Service Provider of the Year">Service Provider of the Year</option>
                                <option value="Pipeline Transportation Company of the Year">Pipeline Transportation Company of the Year</option>
                                <option value="Oil Marketing Company of the Year">Oil Marketing Company of the Year</option>
                                <option value="Human Resource Management">Human Resource Management</option>
                                <option value="CBG Company of the Year">CBG Company of the Year</option>
                                <option value="CGD Company of the Year">CGD Company of the Year</option>
                                <option value="Best Managed Project of the Year">Best Managed Project of the Year</option>
                                <option value="Refinery of the Year">Refinery of the Year</option>
                                <option value="Innovator of the year (team)">Innovator of the year (team)</option>
                                <option value="Woman Executive of the Year">Woman Executive of the Year</option>
                                <option value="Young Achiever of the Year(Male)">Young Achiever of the Year(Male)</option>
                                <option value="Young Achiever of the Year(Female)">Young Achiever of the Year(Female)</option>
                            </select>
                            {!formData.category && currentStep === 1 && <span className="error-tooltip">Category is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Postal Address <span className="text-red">*</span></label>
                            <textarea
                                name="mailingAddress"
                                value={formData.mailingAddress}
                                onChange={(e) => handleChange('mailingAddress', e.target.value)}
                                className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
                                rows={3}
                                placeholder="Enter Postal address"
                            />
                            {!formData.mailingAddress.trim() && currentStep === 1 && <span className="error-tooltip">Mailing address is required</span>}
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <h3 className="step-title">Step 2: Authority & Contact Details</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="step-section">
                                <h4>Approving Authority</h4>
                                <div className="form-group">
                                    <label>Name <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        name="authorityName"
                                        value={formData.authorityName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                                                handleChange('authorityName', value);
                                            }
                                        }}
                                        className={`form-input ${!formData.authorityName && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Name"
                                    />
                                    {!formData.authorityName && currentStep === 2 && <span className="error-tooltip">Authority name is required</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="authorityTitle"
                                        value={formData.authorityTitle}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
                                                handleChange('authorityTitle', value);
                                            }
                                        }}
                                        className={`form-input ${!formData.authorityTitle && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="Designation"
                                    />
                                    {!formData.authorityTitle && currentStep === 2 && <span className="error-tooltip">Designation is required</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="authorityPhone"
                                        value={formData.authorityPhone}
                                        onChange={(e) => handleChange('authorityPhone', e.target.value)}
                                        className={`form-input ${error ? 'has-error' : ''}`}
                                        placeholder="Phone number"
                                        maxLength={10}
                                    />
                                    {error && <span className="error-tooltip">{error}</span>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="authorityEmail"
                                        value={formData.authorityEmail}
                                        onChange={(e) => handleChange('authorityEmail', e.target.value)}
                                        className={`form-input ${!formData.authorityEmail && currentStep === 2 ? 'has-error' : ''}`}
                                        placeholder="E-mail address"
                                    />
                                    {!formData.authorityEmail && currentStep === 2 && <span className="error-tooltip">Email is required</span>}
                                </div>
                            </div>
                            <div className="step-section">
                                <h4>Contacts (Nodal Officials) <span className="text-red">*</span></h4>
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="copyApplicantData"
                                            checked={copyApplicantData}
                                            onChange={(e) => {
                                                setCopyApplicantData(e.target.checked);
                                                if (e.target.checked) {
                                                    setFormData({
                                                        ...formData,
                                                        contactEmail: formData.authorityEmail || '',
                                                        contactPhone: formData.authorityPhone || '',
                                                    });
                                                } else {
                                                    setFormData({
                                                        ...formData,
                                                        contactEmail: '',
                                                        contactPhone: '',
                                                    });
                                                }
                                            }}
                                            className="form-checkbox"
                                        /> Same as applicant
                                    </label>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[A-Za-z\s]*$/.test(value)) {
                                                handleChange('contactName', value);
                                            }
                                        }}
                                        className="form-input"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={(e) => handleChange('contactPhone', e.target.value)}
                                        className="form-input"
                                        placeholder="Phone number"
                                        maxLength={10}
                                        disabled={copyApplicantData}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={(e) => handleChange('contactEmail', e.target.value)}
                                        className="form-input"
                                        placeholder="E-mail address"
                                        disabled={copyApplicantData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Company Profile and Activities (2024–25)</label>
                            <p className="note">Write-up (max 300 words) — Operations during 2024–25</p>
                            <textarea
                                name="companyProfile"
                                value={formData.companyProfile}
                                onChange={(e) => handleChange('companyProfile', e.target.value)}
                                className="form-textarea"
                                rows={6}
                                maxLength={300}
                            />
                        </div>
                    </div>
                )}
                {currentStep === 3 && (
                    <div>
                        <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
                        <h4>General Information</h4>
                        <table className="quant-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Particulars</th>
                                    <th>Unit</th>
                                    <th>2024-25</th>
                                    <th>2023-24</th>
                                </tr>
                            </thead>
                            <tbody>
                                {part1.slice(0, 5).map(([num, label, unit, key]) => (
                                    <tr key={key}>
                                        <td>{num}</td>
                                        <td>{label}</td>
                                        <td>{unit}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={formData[key][0] || ''}
                                                onChange={(e) => handleChange(key, e.target.value, 0)}
                                                className="form-input"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={formData[key][1] || ''}
                                                onChange={(e) => handleChange(key, e.target.value, 1)}
                                                className="form-input"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h4>GA-Specific Information</h4>
                        <div
                            style={{
                                overflowX: numGAs > 4 ? 'auto' : 'visible',
                                maxWidth: numGAs > 4 ? '100%' : 'none',
                            }}
                        >
                            <table className="quant-table"
                                style={{
                                    minWidth: numGAs > 4 ? `${700 + (numGAs - 5) * 160}px` : '700px'
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Particulars</th>
                                        <th>Unit</th>
                                        {Array.from({ length: numGAs }, (_, i) => (
                                            <th key={i}>{`GA${i + 1}`}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {part1.slice(5, 10).map(([num, label, unit, key]) => (
                                        <tr key={key}>
                                            <td>{num}</td>
                                            <td>{label}</td>
                                            <td>{unit}</td>
                                            {Array.from({ length: numGAs }, (_, gaIndex) => (
                                                <td key={gaIndex}>
                                                    <input
                                                        type={unit === 'Date' ? 'date' : 'text'}
                                                        value={formData[key]?.[gaIndex] || ''}
                                                        onChange={(e) => handleChange(key, e.target.value, gaIndex)}
                                                        className="form-input"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h4>D-PNG Connection</h4>
                        <div
                            style={{
                                overflowX: numGAs > 4 ? 'auto' : 'visible',
                                maxWidth: numGAs > 4 ? '100%' : 'none',
                            }}
                        >
                            <table className="quant-table"
                                style={{
                                    minWidth: numGAs > 4 ? `${700 + (numGAs - 5) * 160}px` : '700px'
                                }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Particulars</th>
                                        <th>Unit</th>
                                        {Array.from({ length: numGAs }, (_, i) => (
                                            <React.Fragment key={i}>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2024-25)`}</th>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2023-24)`}</th>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {part1.slice(10).map(([num, label, unit, key]) => (
                                        <tr key={key}>
                                            <td>{num}</td>
                                            <td style={{ minWidth: '150px' }}
                                            
                                            >{label}</td>
                                            <td>{unit}</td>
                                            {Array.from({ length: numGAs }, (_, gaIndex) => (
                                                <React.Fragment key={gaIndex}>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[0] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[1] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button type="button" onClick={addMoreGA} className="btn btn-primary mt-4">
                            Add More GA
                        </button>
                    </div>

                )}
                {currentStep === 4 && (
                    <div>
                        <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
                        <h4>CNG Stations</h4>
                        <div
                            style={{
                                overflowX: numGAs > 4 ? 'auto' : 'visible',
                                maxWidth: numGAs > 4 ? '100%' : 'none',
                            }}
                        >
                            <table className="quant-table"
                                style={{
                                    minWidth: numGAs > 4 ? `${700 + (numGAs - 5) * 160}px` : '700px'
                                }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Particulars</th>
                                        <th>Unit</th>
                                        {Array.from({ length: numGAs }, (_, i) => (
                                            <React.Fragment key={i}>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2024-25)`}</th>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2023-24)`}</th>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {part2.slice(0, 3).map(([num, label, unit, key]) => (
                                        <tr key={key}>
                                            <td>{num}</td>
                                            <td>{label}</td>
                                            <td>{unit}</td>
                                            {Array.from({ length: numGAs }, (_, gaIndex) => (
                                                <React.Fragment key={gaIndex}>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[0] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[1] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h4>Inch-km of Pipeline Laid</h4>
                        <div
                            style={{
                                overflowX: numGAs > 4 ? 'auto' : 'visible',
                                maxWidth: numGAs > 4 ? '100%' : 'none',
                            }}
                        >
                            <table className="quant-table"
                                style={{
                                    minWidth: numGAs > 4 ? `${700 + (numGAs - 5) * 160}px` : '700px'
                                }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Particulars</th>
                                        <th>Unit</th>
                                        {Array.from({ length: numGAs }, (_, i) => (
                                            <React.Fragment key={i}>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2024-25)`}</th>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2023-24)`}</th>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {part2.slice(3, 6).map(([num, label, unit, key]) => (
                                        <tr key={key}>
                                            <td>{num}</td>
                                            <td>{label}</td>
                                            <td>{unit}</td>
                                            {Array.from({ length: numGAs }, (_, gaIndex) => (
                                                <React.Fragment key={gaIndex}>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[0] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[1] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h4>Natural Gas Sales & CBG Intake</h4>
                        <div
                            style={{
                                overflowX: numGAs > 4 ? 'auto' : 'visible',
                                maxWidth: numGAs > 4 ? '100%' : 'none',
                            }}
                        >
                            <table className="quant-table"
                                style={{
                                    minWidth: numGAs > 4 ? `${700 + (numGAs - 5) * 160}px` : '700px'
                                }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Particulars</th>
                                        <th>Unit</th>
                                        {Array.from({ length: numGAs }, (_, i) => (
                                            <React.Fragment key={i}>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2024-25)`}</th>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2023-24)`}</th>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {part2.slice(6, 9).map(([num, label, unit, key]) => (
                                        <tr key={key}>
                                            <td>{num}</td>
                                            <td>{label}</td>
                                            <td>{unit}</td>
                                            {Array.from({ length: numGAs }, (_, gaIndex) => (
                                                <React.Fragment key={gaIndex}>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[0] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[1] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h4>Safety</h4>
                        <div
                            style={{
                                overflowX: numGAs > 4 ? 'auto' : 'visible',
                                maxWidth: numGAs > 4 ? '100%' : 'none',
                            }}
                        >
                            <table className="quant-table"
                                style={{
                                    minWidth: numGAs > 4 ? `${700 + (numGAs - 5) * 160}px` : '700px'
                                }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Particulars</th>
                                        <th>Unit</th>
                                        {Array.from({ length: numGAs }, (_, i) => (
                                            <React.Fragment key={i}>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2024-25)`}</th>
                                                <th style={{ minWidth: '150px' }}>{`GA${i + 1} (2023-24)`}</th>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {part2.slice(9).map(([num, label, unit, key]) => (
                                        <tr key={key}>
                                            <td>{num}</td>
                                            <td>{label}</td>
                                            <td>{unit}</td>
                                            {Array.from({ length: numGAs }, (_, gaIndex) => (
                                                <React.Fragment key={gaIndex}>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[0] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 0)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={formData[key]?.[gaIndex]?.[1] || ''}
                                                            onChange={(e) => handleChange(key, e.target.value, gaIndex, 1)}
                                                            className="form-input"
                                                        />
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button type="button" onClick={addMoreGA} className="btn btn-primary mt-4">
                            Add More GA
                        </button>
                        <div className="form-group">
                            <label>Comments</label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={(e) => handleChange('comment', e.target.value)}
                                className="form-textarea"
                                maxLength={300}
                                placeholder="Comments in (200 words) against input parameter, if any"
                            />
                        </div>
                    </div>
                )}
                {currentStep === 5 && (
                    <div className="form-step">
                        <h3 className="step-title">Step 5: Attachments & Declaration</h3>
                        <div className="form-group">
                            <label>List of Attachments (Optional):</label>
                            <table className="quant-table">
                                <thead>
                                    <tr>
                                        <th>S. No.</th>
                                        <th>Description</th>
                                        <th>Upload (only jpg, png, pdf, max 5 MB each)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4].map((num) => {
                                        const key = `attachments${num}`;
                                        const attachment = formData[key];
                                        return (
                                            <tr key={key}>
                                                <td>{num}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name={`${key}.description`}
                                                        value={attachment.description}
                                                        onChange={(e) =>
                                                            handleAttachmentChange(key, 'description', e.target.value)
                                                        }
                                                        placeholder="Enter description"
                                                        className="form-input"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        accept=".jpg,.png,.pdf"
                                                        onChange={(e) =>
                                                            handleAttachmentChange(key, 'file', e.target.files[0], e)
                                                        }
                                                        className="form-input mt-4"
                                                    />
                                                    {attachment.file && (
                                                        <p className="file-name">Selected file: {attachment.file.name}</p>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="form-group">
                            <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
                            <div className="form-navigation">
                                <button type="button" onClick={handlePrint} className="btn btn-outline">
                                    Print
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Upload Document with Approving Authority Signature (Director/Board Level)<span className="text-red">*</span>:</label>
                            <input
                                type="file"
                                accept=".jpg,.png,.pdf"
                                onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
                                className="form-input mt-4"
                            />
                            {formData.approvingAuthoritySignature && (
                                <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
                            )}
                            {error && <span className="error-tooltip">{error}</span>}
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="declaration"
                                    checked={formData.declaration}
                                    onChange={(e) => handleChange('declaration', e.target.checked)}
                                    className="form-checkbox"
                                />
                                I declare that the information submitted is true and complete.
                            </label>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="application-form">
            <div className="form-header">
                <h1>Registration Form: CGD Company of the Year</h1>
                <h6>Step {currentStep} of 5</h6>
            </div>
            {error && <div className="error">{error}</div>}
            {isSubmitted ? (
                <div className="thank-you-message">
                    <h2>Thank you for your submission!</h2>
                    <p>Your registration has been successfully submitted.</p>
                    <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {renderStepContent()}
                    {currentStep === 1 && (
                        <div className="form-navigation-step1">
                            <button type="button" onClick={saveDraft} className="btn btn-outline">
                                <Save size={16} /> Save Draft
                            </button>
                            <button type="button" onClick={nextStep} className="btn btn-primary">
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                    {currentStep > 1 && (
                        <div className="form-navigation">
                            <button type="button" onClick={prevStep} className="btn btn-outline">
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button type="button" onClick={saveDraft} className="btn btn-outline">
                                <Save size={16} /> Save Draft
                            </button>
                            {currentStep < 5 && (
                                <button type="button" onClick={nextStep} className="btn btn-primary">
                                    Next <ChevronRight size={16} />
                                </button>
                            )}
                            {currentStep === 5 && (
                                <button type="submit" className="btn btn-success">
                                    Submit
                                </button>
                            )}
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};

export default RegistrationCGD;