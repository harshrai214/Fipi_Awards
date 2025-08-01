
// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Form.css';
// import QuantitativeInfoForm from './QuantitativeInfoForm';
// import QuantitativeOilMarketing from './QuantitativeOilMarketing.js';
// import AttachmentList from './AttachmentList.js';
// import "../styles/AttachmentList.css";
// import QuantitativeCBG from './QuantitativeCBG.js';
// import QuantitativeOverseas from './QuantativeOverseas.js';
// import QuantitativeGreenHydrogen from './QuantitativeGreenHydrogen.js';
// import QuantitativePipeline from './QuantitativePipeline.js';
// import QuantitativeHR from './QuantitativeHR.js';
// import QuantitativeService from './QuantitativeService.js';
// import QuantitativeGNZ from './QuantatativeGNZ.js';
// import QuantitativeDigital from './QuantitativeDigital.js';
// import QuantitativeBestManaged from './QuantitaiveBestManaged.js';
// import Sidebar from './Sidebar.js';
// import QuantitativeProduction from './QuantitativeProduction.js';
// import SidebarGuideline from './SidebarGuideline.js';
// import QuantitativeInnovator from './QuantitativeInnovator.js';
// import { useLocation } from 'react-router-dom';



// const RegistrationForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [sidebarItems, setSidebarItems] = useState([]);
//   const [selectedAwardCategory, setSelectedAwardCategory] = useState('');
//   const [activeItem, setActiveItem] = useState(null);
//   const location = useLocation();
// const awardTitle = location.state?.awardTitle || "Registration Form";

//   const [formData, setFormData] = useState({
//     Organisationname: '',
//     category: awardTitle,
//     Firstname: '',
//     Lastname: '',
//     userid: '',
//     companyName: '',
//     mailingAddress: '',
//     innovatortextbox:"",
//     authorityName: '',
//     authorityTitle: '',
//     authorityPhone: '',
//     authorityEmail: '',
//     authoritySignature: '',
//     contactName: '',
//     awardRecipient: '',
//     companyProfile: '',
//     awardJustification: '',
//     oilReserve2024: '', oilReserve2023: '', oilReserve2024Remarks: '', oilReserve2023Remarks: '',
//     gasReserve2024: '', gasReserve2023: '', gasReserve2024Remarks: '', gasReserve2023Remarks: '',
//     totalReserves2024: '', totalReserves2023: '', totalReserves2024Remarks: '', totalReserves2023Remarks: '',
//     findingCost2024: '', findingCost2023: '', findingCost2024Remarks: '', findingCost2023Remarks: '',
//     explWells2024: '', explWells2023: '', explWells2024Remarks: '', explWells2023Remarks: '',
//     hcWells2024: '', hcWells2023: '', hcWells2024Remarks: '', hcWells2023Remarks: '',
//     seismic2DLKM2024: '', seismic2DLKM2024Remarks: '', seismic3DSKM2024: '', seismic3DSKM2024Remarks: '',
//     energyTotal2024: '', energyTotal2024Remarks: '', capexTotal2024: '', capexTotal2024Remarks: '',
//     opexTotal2024: '', opexTotal2024Remarks: '', capexExpl2024: '', capexExpl2024Remarks: '',
//     opexExpl2024: '', opexExpl2024Remarks: '',
//     blocksPartnership2024: '', blocksPartnership2024Remarks: '', blocksStandalone2024: '', blocksStandalone2024Remarks: '',
//     techName1: '', techProvider1: '', techCost1: '', techImpact1: '', techRemarks1: '',
//     techName2: '', techProvider2: '', techCost2: '', techImpact2: '', techRemarks2: '',
//     techName3: '', techProvider3: '', techCost3: '', techImpact3: '', techRemarks3: '',
//     techName4: '', techProvider4: '', techCost4: '', techImpact4: '', techRemarks4: '',
//     techName5: '', techProvider5: '', techCost5: '', techImpact5: '', techRemarks5: '',
//     ProjectName1: '',
//     ProjectName2: '',
//     refinery: '',
//     approvingAuthoritySignature: '',
//     declaration: false,
//     // Fields for QuantitativeOilMarketing
//     domesticVolumeMMT2024: '', domesticVolumeMMT2023: '', domesticVolumeMMT2024Remarks: '', domesticVolumeMMT2023Remarks: '',
//     domesticSalesRevenue2024: '', domesticSalesRevenue2023: '', domesticSalesRevenue2024Remarks: '', domesticSalesRevenue2023Remarks: '',
//     exportVolumeMMT2024: '', exportVolumeMMT2023: '', exportVolumeMMT2024Remarks: '', exportVolumeMMT2023Remarks: '',
//     exportSalesRevenue2024: '', exportSalesRevenue2023: '', exportSalesRevenue2024Remarks: '', exportSalesRevenue2023Remarks: '',
//     domesticMarketShare2024: '', domesticMarketShare2023: '', domesticMarketShare2024Remarks: '', domesticMarketShare2023Remarks: '',
//     retailMS2024: '', retailMS2023: '', retailMS2024Remarks: '', retailMS2023Remarks: '',
//     retailHSD2024: '', retailHSD2023: '', retailHSD2024Remarks: '', retailHSD2023Remarks: '',
//     retailOutlets2024: '', retailOutlets2023: '', retailOutlets2024Remarks: '', retailOutlets2023Remarks: '',
//     salesPerEmployeeTotal2024: '', salesPerEmployeeTotal2023: '', salesPerEmployeeTotal2024Remarks: '', salesPerEmployeeTotal2023Remarks: '',
//     salesPerEmployeeCount2024: '', salesPerEmployeeCount2023: '', salesPerEmployeeCount2024Remarks: '', salesPerEmployeeCount2023Remarks: '',
//     lubricantsSales2024: '', lubricantsSales2023: '', lubricantsSales2024Remarks: '', lubricantsSales2023Remarks: '',
//     fuelsSales2024: '', fuelsSales2023: '', fuelsSales2024Remarks: '', fuelsSales2023Remarks: '',
//     tankageMS2024: '', tankageMS2023: '', tankageMS2024Remarks: '', tankageMS2023Remarks: '',
//     tankageHSD2024: '', tankageHSD2023: '', tankageHSD2024Remarks: '', tankageHSD2023Remarks: '',
//     tankageEthanol2024: '', tankageEthanol2023: '', tankageEthanol2024Remarks: '', tankageEthanol2023Remarks: '',
//     automatedROs2024: '', automatedROs2023: '', automatedROs2024Remarks: '', automatedROs2023Remarks: '',
//     totalROs2024: '', totalROs2023: '', totalROs2024Remarks: '', totalROs2023Remarks: '',
//     nonCashSales2024: '', nonCashSales2023: '', nonCashSales2024Remarks: '', nonCashSales2023Remarks: '',
//     totalSales2024: '', totalSales2023: '', totalSales2024Remarks: '', totalSales2023Remarks: '',
//     gpsTrucks2024: '', gpsTrucks2023: '', gpsTrucks2024Remarks: '', gpsTrucks2023Remarks: '',
//     totalTrucks2024: '', totalTrucks2023: '', totalTrucks2024Remarks: '', totalTrucks2023Remarks: '',
//     complaintsNumber2024: '', complaintsNumber2023: '', complaintsNumber2024Remarks: '', complaintsNumber2023Remarks: '',
//     complaintsTurnaround2024: '', complaintsTurnaround2023: '', complaintsTurnaround2024Remarks: '', complaintsTurnaround2023Remarks: '',
//     evStations2024: '', evStations2023: '', evStations2024Remarks: '', evStations2023Remarks: '',
//     h2Stations2024: '', h2Stations2023: '', h2Stations2024Remarks: '', h2Stations2023Remarks: '',
//     cbgSales2024: '', cbgSales2023: '', cbgSales2024Remarks: '', cbgSales2023Remarks: '',
//     lpgConsumption2024: '', lpgConsumption2023: '', lpgConsumption2024Remarks: '', lpgConsumption2023Remarks: '',
//     biofuelsInvestment2024: '', biofuelsInvestment2023: '', biofuelsInvestment2024Remarks: '', biofuelsInvestment2023Remarks: '',
//     totalCapex2024: '', totalCapex2023: '', totalCapex2024Remarks: '', totalCapex2023Remarks: '',
//     ethanolBlendingActual2024: '', ethanolBlendingActual2023: '', ethanolBlendingActual2024Remarks: '', ethanolBlendingActual2023Remarks: '',
//     ethanolBlendingTarget2024: '', ethanolBlendingTarget2023: '', ethanolBlendingTarget2024Remarks: '', ethanolBlendingTarget2023Remarks: '',
//     fatalities2024: '', fatalities2023: '', fatalities2024Remarks: '', fatalities2023Remarks: '',
//     hoursWorked2024: '', hoursWorked2023: '', hoursWorked2024Remarks: '', hoursWorked2023Remarks: '',
//     // Fields for QuantitativeCBG
//     capex2024: '', capex2023: '', capex2024Remarks: '', capex2023Remarks: '',
//     installedCapacity2024: '', installedCapacity2023: '', installedCapacity2024Remarks: '', installedCapacity2023Remarks: '',
//     actualProduction2024: '', actualProduction2023: '', actualProduction2024Remarks: '', actualProduction2023Remarks: '',
//     fatalAccidentRate2024: '', fatalAccidentRate2023: '', fatalAccidentRate2024Remarks: '', fatalAccidentRate2023Remarks: '',
//     lostTimeInjury2024: '', lostTimeInjury2023: '', lostTimeInjury2024Remarks: '', lostTimeInjury2023Remarks: '',
//     recordableIncidentRate2024: '', recordableIncidentRate2023: '', recordableIncidentRate2024Remarks: '', recordableIncidentRate2023Remarks: '',
//     patentsFiled2024: '', patentsFiled2023: '', patentsFiled2024Remarks: '', patentsFiled2023Remarks: '',
//     patentsNational2024: '', patentsNational2023: '', patentsNational2024Remarks: '', patentsNational2023Remarks: '',
//     patentsInternational2024: '', patentsInternational2023: '', patentsInternational2024Remarks: '', patentsInternational2023Remarks: '',
//     patentsCommercialized2024: '', patentsCommercialized2023: '', patentsCommercialized2024Remarks: '', patentsCommercialized2023Remarks: '',
//     comment: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [copyApplicantData, setCopyApplicantData] = useState(false);

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === 'Organisationname' && !value && currentStep === 1) {
//       setError('Organisation name is required.');
//     } else if (name === 'category' && !value && currentStep === 1) {
//       setError('Category is required.');
//     } else if (name === 'refinery' && !value && formData.category === 'Refinery of the Year' && currentStep === 1) {
//       setError('Please select a refinery.');
//     } else if (name === 'mailingAddress' && !value.trim() && currentStep === 1) {
//       setError('Mailing address is required.');
//     } else {
//       setError('');
//     }
//   };

//   const nextStep = () => {
//     if (currentStep === 1 && !formData.Organisationname) {
//       setError('Organisation name is required.');
//       return;
//     }
//     if (currentStep === 1 && !formData.category) {
//       setError('Category is required.');
//       return;
//     }
//     if (currentStep === 1 && formData.category === 'Refinery of the Year' && !formData.refinery) {
//       setError('Please select a refinery.');
//       return;
//     }
//     if (currentStep === 1 && !formData.mailingAddress.trim()) {
//       setError('Mailing address is required.');
//       return;
//     }
//     setError('');
//     if (currentStep === 1) {
//       if (formData.category === 'Refinery of the Year') {
//         navigate('/RefineryRegistration', { state: { category: formData.category, refinery: formData.refinery, mailingAddress: formData.mailingAddress } });
//       } else {
//         setCurrentStep(2);
//       }
//     } else if (currentStep < 5) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep((prev) => prev - 1);
//   };

//   const saveDraft = () => {
//     localStorage.setItem('registrationDraft', JSON.stringify(formData));
//     alert('Draft Saved!');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.declaration) {
//       alert('Please accept the declaration before submitting.');
//       return;
//     }
//     console.log('Submitted:', formData);
//     localStorage.setItem('registrationForm', JSON.stringify(formData));
//     alert('Registration Submitted Successfully!');
//     setCurrentStep(1);
//     setFormData({
//       Organisationname: '',
//       category: '',
//       Firstname: '',
//       Lastname: '',
//       userid: '',
//       companyName: '',
//       mailingAddress: '',
//       authorityName: '',
//       authorityTitle: '',
//       authorityPhone: '',
//       authorityEmail: '',
//       authoritySignature: '',
//       contactName: '',
//       awardRecipient: '',
//       companyProfile: '',
//       awardJustification: '',
//       oilReserve2024: '', oilReserve2023: '', oilReserve2024Remarks: '', oilReserve2023Remarks: '',
//       gasReserve2024: '', gasReserve2023: '', gasReserve2024Remarks: '', gasReserve2023Remarks: '',
//       totalReserves2024: '', totalReserves2023: '', totalReserves2024Remarks: '', totalReserves2023Remarks: '',
//       findingCost2024: '', findingCost2023: '', findingCost2024Remarks: '', findingCost2023Remarks: '',
//       explWells2024: '', explWells2023: '', explWells2024Remarks: '', explWells2023Remarks: '',
//       hcWells2024: '', hcWells2023: '', hcWells2024Remarks: '', hcWells2023Remarks: '',
//       seismic2DLKM2024: '', seismic2DLKM2024Remarks: '', seismic3DSKM2024: '', seismic3DSKM2024Remarks: '',
//       energyTotal2024: '', energyTotal2024Remarks: '', capexTotal2024: '', capexTotal2024Remarks: '',
//       opexTotal2024: '', opexTotal2024Remarks: '', capexExpl2024: '', capexExpl2024Remarks: '',
//       opexExpl2024: '', opexExpl2024Remarks: '',
//       blocksPartnership2024: '', blocksPartnership2024Remarks: '', blocksStandalone2024: '', blocksStandalone2024Remarks: '',
//       techName1: '', techProvider1: '', techCost1: '', techImpact1: '', techRemarks1: '',
//       techName2: '', techProvider2: '', techCost2: '', techImpact2: '', techRemarks2: '',
//       techName3: '', techProvider3: '', techCost3: '', techImpact3: '', techRemarks3: '',
//       techName4: '', techProvider4: '', techCost4: '', techImpact4: '', techRemarks4: '',
//       techName5: '', techProvider5: '', techCost5: '', techImpact5: '', techRemarks5: '',
//       ProjectName1: '',
//       ProjectName2: '',
//       refinery: '',
//       approvingAuthoritySignature: '',
//       declaration: false,
//       domesticVolumeMMT2024: '', domesticVolumeMMT2023: '', domesticVolumeMMT2024Remarks: '', domesticVolumeMMT2023Remarks: '',
//       domesticSalesRevenue2024: '', domesticSalesRevenue2023: '', domesticSalesRevenue2024Remarks: '', domesticSalesRevenue2023Remarks: '',
//       exportVolumeMMT2024: '', exportVolumeMMT2023: '', exportVolumeMMT2024Remarks: '', exportVolumeMMT2023Remarks: '',
//       exportSalesRevenue2024: '', exportSalesRevenue2023: '', exportSalesRevenue2024Remarks: '', exportSalesRevenue2023Remarks: '',
//       domesticMarketShare2024: '', domesticMarketShare2023: '', domesticMarketShare2024Remarks: '', domesticMarketShare2023Remarks: '',
//       retailMS2024: '', retailMS2023: '', retailMS2024Remarks: '', retailMS2023Remarks: '',
//       retailHSD2024: '', retailHSD2023: '', retailHSD2024Remarks: '', retailHSD2023Remarks: '',
//       retailOutlets2024: '', retailOutlets2023: '', retailOutlets2024Remarks: '', retailOutlets2023Remarks: '',
//       salesPerEmployeeTotal2024: '', salesPerEmployeeTotal2023: '', salesPerEmployeeTotal2024Remarks: '', salesPerEmployeeTotal2023Remarks: '',
//       salesPerEmployeeCount2024: '', salesPerEmployeeCount2023: '', salesPerEmployeeCount2024Remarks: '', salesPerEmployeeCount2023Remarks: '',
//       lubricantsSales2024: '', lubricantsSales2023: '', lubricantsSales2024Remarks: '', lubricantsSales2023Remarks: '',
//       fuelsSales2024: '', fuelsSales2023: '', fuelsSales2024Remarks: '', fuelsSales2023Remarks: '',
//       tankageMS2024: '', tankageMS2023: '', tankageMS2024Remarks: '', tankageMS2023Remarks: '',
//       tankageHSD2024: '', tankageHSD2023: '', tankageHSD2024Remarks: '', tankageHSD2023Remarks: '',
//       tankageEthanol2024: '', tankageEthanol2023: '', tankageEthanol2024Remarks: '', tankageEthanol2023Remarks: '',
//       automatedROs2024: '', automatedROs2023: '', automatedROs2024Remarks: '', automatedROs2023Remarks: '',
//       totalROs2024: '', totalROs2023: '', totalROs2024Remarks: '', totalROs2023Remarks: '',
//       nonCashSales2024: '', nonCashSales2023: '', nonCashSales2024Remarks: '', nonCashSales2023Remarks: '',
//       totalSales2024: '', totalSales2023: '', totalSales2024Remarks: '', totalSales2023Remarks: '',
//       gpsTrucks2024: '', gpsTrucks2023: '', gpsTrucks2024Remarks: '', gpsTrucks2023Remarks: '',
//       totalTrucks2024: '', totalTrucks2023: '', totalTrucks2024Remarks: '', totalTrucks2023Remarks: '',
//       complaintsNumber2024: '', complaintsNumber2023: '', complaintsNumber2024Remarks: '', complaintsNumber2023Remarks: '',
//       complaintsTurnaround2024: '', complaintsTurnaround2023: '', complaintsTurnaround2024Remarks: '', complaintsTurnaround2023Remarks: '',
//       evStations2024: '', evStations2023: '', evStations2024Remarks: '', evStations2023Remarks: '',
//       h2Stations2024: '', h2Stations2023: '', h2Stations2024Remarks: '', h2Stations2023Remarks: '',
//       cbgSales2024: '', cbgSales2023: '', cbgSales2024Remarks: '', cbgSales2023Remarks: '',
//       lpgConsumption2024: '', lpgConsumption2023: '', lpgConsumption2024Remarks: '', lpgConsumption2023Remarks: '',
//       biofuelsInvestment2024: '', biofuelsInvestment2023: '', biofuelsInvestment2024Remarks: '', biofuelsInvestment2023Remarks: '',
//       totalCapex2024: '', totalCapex2023: '', totalCapex2024Remarks: '', totalCapex2023Remarks: '',
//       ethanolBlendingActual2024: '', ethanolBlendingActual2023: '', ethanolBlendingActual2024Remarks: '', ethanolBlendingActual2023Remarks: '',
//       ethanolBlendingTarget2024: '', ethanolBlendingTarget2023: '', ethanolBlendingTarget2024Remarks: '', ethanolBlendingTarget2023Remarks: '',
//       fatalities2024: '', fatalities2023: '', fatalities2024Remarks: '', fatalities2023Remarks: '',
//       hoursWorked2024: '', hoursWorked2023: '', hoursWorked2024Remarks: '', hoursWorked2023Remarks: '',
//       capex2024: '', capex2023: '', capex2024Remarks: '', capex2023Remarks: '',
//       installedCapacity2024: '', installedCapacity2023: '', installedCapacity2024Remarks: '', installedCapacity2023Remarks: '',
//       actualProduction2024: '', actualProduction2023: '', actualProduction2024Remarks: '', actualProduction2023Remarks: '',
//       fatalAccidentRate2024: '', fatalAccidentRate2023: '', fatalAccidentRate2024Remarks: '', fatalAccidentRate2023Remarks: '',
//       lostTimeInjury2024: '', lostTimeInjury2023: '', lostTimeInjury2024Remarks: '', lostTimeInjury2023Remarks: '',
//       recordableIncidentRate2024: '', recordableIncidentRate2023: '', recordableIncidentRate2024Remarks: '', recordableIncidentRate2023Remarks: '',
//       patentsFiled2024: '', patentsFiled2023: '', patentsFiled2024Remarks: '', patentsFiled2023Remarks: '',
//       patentsNational2024: '', patentsNational2023: '', patentsNational2024Remarks: '', patentsNational2023Remarks: '',
//       patentsInternational2024: '', patentsInternational2023: '', patentsInternational2024Remarks: '', patentsInternational2023Remarks: '',
//       patentsCommercialized2024: '', patentsCommercialized2023: '', patentsCommercialized2024Remarks: '', patentsCommercialized2023Remarks: '',
//       comment: '',
//     });
//   };

//   const handleApprovingAuthorityChange = (files) => {
//     setFormData({ ...formData, approvingAuthoritySignature: files[0] });
//   };

//   const handlePrint = () => {
//     const printContent = `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h1 style="text-align: center; color: #1e40af;">Registration Form</h1>
//         <h2>Organization & Contact Details</h2>
//         <p><strong>Organisation Name:</strong> ${formData.Organisationname}</p>
//         <p><strong>Category:</strong> ${formData.category}</p>
//         ${formData.category === 'Refinery of the Year' ? `<p><strong>Refinery:</strong> ${formData.refinery}</p>` : ''}
//         <p><strong>Mailing Address:</strong> ${formData.mailingAddress}</p>
//         <p><strong>First Name:</strong> ${formData.Firstname}</p>
//         <p><strong>Last Name:</strong> ${formData.Lastname}</p>
//         <p><strong>Email Address:</strong> ${formData.userid}</p>
//         ${formData.category === 'Best Managed Project of the Year' ? `
//           <p><strong>Project Name 1:</strong> ${formData.ProjectName1}</p>
//           <p><strong>Project Name 2:</strong> ${formData.ProjectName2}</p>
//         ` : ''}
//         <h2>Company Details</h2>
//         <p><strong>Name of Company:</strong> ${formData.companyName}</p>
//         <p><strong>Authority Name:</strong> ${formData.authorityName}</p>
//         <p><strong>Authority Title:</strong> ${formData.authorityTitle}</p>
//         <p><strong>Authority Phone:</strong> ${formData.authorityPhone}</p>
//         <p><strong>Authority Email:</strong> ${formData.authorityEmail}</p>
//         <p><strong>Contact Name:</strong> ${formData.contactName}</p>
//         <p><strong>Award Recipient:</strong> ${formData.awardRecipient}</p>
//         <p><strong>Company Profile:</strong> ${formData.companyProfile}</p>
//         <p><strong>Award Justification:</strong> ${formData.awardJustification}</p>
//         ${formData.category === 'Exploration Company of the Year' ? `
//           <h2>Quantitative Information - Part 1</h2>
//           <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//             <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th><th>Remarks</th></tr></thead>
//             <tbody>
//               <tr><td>1</td><td>2P Oil reserves accretion (MMT)</td><td>${formData.oilReserve2024}</td><td>${formData.oilReserve2023}</td><td>${formData.oilReserve2024Remarks || ''} ${formData.oilReserve2023Remarks || ''}</td></tr>
//               <tr><td>2</td><td>2P Gas reserves accretion (BCM)</td><td>${formData.gasReserve2024}</td><td>${formData.gasReserve2023}</td><td>${formData.gasReserve2024Remarks || ''} ${formData.gasReserve2023Remarks || ''}</td></tr>
//               <tr><td>3</td><td>Total Reserves Accreted (MTOE)</td><td>${formData.totalReserves2024}</td><td>${formData.totalReserves2023}</td><td>${formData.totalReserves2024Remarks || ''} ${formData.totalReserves2023Remarks || ''}</td></tr>
//               <tr><td>4</td><td>Finding Cost (INR Million)</td><td>${formData.findingCost2024}</td><td>${formData.findingCost2023}</td><td>${formData.findingCost2024Remarks || ''} ${formData.findingCost2023Remarks || ''}</td></tr>
//               <tr><td>5</td><td>Total Number of exploratory wells drilled</td><td>${formData.explWells2024}</td><td>${formData.explWells2023}</td><td>${formData.explWells2024Remarks || ''} ${formData.explWells2023Remarks || ''}</td></tr>
//               <tr><td>6</td><td>Number of Hydrocarbon Bearing wells</td><td>${formData.hcWells2024}</td><td>${formData.hcWells2023}</td><td>${formData.hcWells2024Remarks || ''} ${formData.hcWells2023Remarks || ''}</td></tr>
//             </tbody>
//           </table>
//           <h2>Quantitative Information - Part 2</h2>
//           <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//             <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>Remarks</th></tr></thead>
//             <tbody>
//               <tr><td>7.1</td><td>2D LKM</td><td>${formData.seismic2DLKM2024}</td><td>${formData.seismic2DLKM2024Remarks || ''}</td></tr>
//               <tr><td>7.2</td><td>3D SKM</td><td>${formData.seismic3DSKM2024}</td><td>${formData.seismic3DSKM2024Remarks || ''}</td></tr>
//               <tr><td>8.1</td><td>Total Energy Consumed by the Company (GJ)</td><td>${formData.energyTotal2024}</td><td>${formData.energyTotal2024Remarks || ''}</td></tr>
//               <tr><td>8.2</td><td>Total Capex of the Company (INR Crores)</td><td>${formData.capexTotal2024}</td><td>${formData.capexTotal2024Remarks || ''}</td></tr>
//               <tr><td>8.3</td><td>Total Opex of the Company (INR Crores)</td><td>${formData.opexTotal2024}</td><td>${formData.opexTotal2024Remarks || ''}</td></tr>
//               <tr><td>8.4</td><td>Capex for Exploration (INR Crores)</td><td>${formData.capexExpl2024}</td><td>${formData.capexExpl2024Remarks || ''}</td></tr>
//               <tr><td>8.5</td><td>Opex for Exploration (INR Crores)</td><td>${formData.opexExpl2024}</td><td>${formData.opexExpl2024Remarks || ''}</td></tr>
//               <tr><td>9.1</td><td>Number of Exploratory Blocks acquired through Partnership</td><td>${formData.blocksPartnership2024}</td><td>${formData.blocksPartnership2024Remarks || ''}</td></tr>
//               <tr><td>9.2</td><td>Number of Exploratory Blocks acquired Standalone</td><td>${formData.blocksStandalone2024}</td><td>${formData.blocksStandalone2024Remarks || ''}</td></tr>
//               <tr><td>10</td><td>Technology Name</td><td>${formData.techName1}</td><td>${formData.techRemarks1 || ''}</td></tr>
//               <tr><td></td><td>Technology Provider</td><td>${formData.techProvider1}</td><td></td></tr>
//               <tr><td></td><td>Cost of the Technology (INR Crores)</td><td>${formData.techCost1}</td><td></td></tr>
//               <tr><td></td><td>Areas of Impact</td><td>${formData.techImpact1}</td><td></td></tr>
//             </tbody>
//           </table>
//         ` : formData.category === 'Oil Marketing Company of the Year' ? `
//           <h2>Quantitative Information - Part 1</h2>
//           <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//             <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th><th>Remarks</th></tr></thead>
//             <tbody>
//               <tr><td>1.1.1</td><td>Domestic Sales Volume MMT</td><td>${formData.domesticVolumeMMT2024}</td><td>${formData.domesticVolumeMMT2023}</td><td>${formData.domesticVolumeMMT2024Remarks || ''} ${formData.domesticVolumeMMT2023Remarks || ''}</td></tr>
//               <tr><td>1.1.2</td><td>Domestic Sales Revenue (Rs. Crores)</td><td>${formData.domesticSalesRevenue2024}</td><td>${formData.domesticSalesRevenue2023}</td><td>${formData.domesticSalesRevenue2024Remarks || ''} ${formData.domesticSalesRevenue2023Remarks || ''}</td></tr>
//               <tr><td>1.2.1</td><td>Export Volume MMT</td><td>${formData.exportVolumeMMT2024}</td><td>${formData.exportVolumeMMT2023}</td><td>${formData.exportVolumeMMT2024Remarks || ''} ${formData.exportVolumeMMT2023Remarks || ''}</td></tr>
//               <tr><td>1.2.2</td><td>Export Sales Revenue (Rs. Crores)</td><td>${formData.exportSalesRevenue2024}</td><td>${formData.exportSalesRevenue2023}</td><td>${formData.exportSalesRevenue2024Remarks || ''} ${formData.exportSalesRevenue2023Remarks || ''}</td></tr>
//               <tr><td>2.1</td><td>Domestic Market Share %</td><td>${formData.domesticMarketShare2024}</td><td>${formData.domesticMarketShare2023}</td><td>${formData.domesticMarketShare2024Remarks || ''} ${formData.domesticMarketShare2023Remarks || ''}</td></tr>
//               <tr><td>3.1</td><td>Retail Sales MS (MMT)</td><td>${formData.retailMS2024}</td><td>${formData.retailMS2023}</td><td>${formData.retailMS2024Remarks || ''} ${formData.retailMS2023Remarks || ''}</td></tr>
//               <tr><td>3.2</td><td>Retail Sales HSD (MMT)</td><td>${formData.retailHSD2024}</td><td>${formData.retailHSD2023}</td><td>${formData.retailHSD2024Remarks || ''} ${formData.retailHSD2023Remarks || ''}</td></tr>
//               <tr><td>4</td><td>No. of Retail Outlets</td><td>${formData.retailOutlets2024}</td><td>${formData.retailOutlets2023}</td><td>${formData.retailOutlets2024Remarks || ''} ${formData.retailOutlets2023Remarks || ''}</td></tr>
//               <tr><td>5.1</td><td>Sales per Employee Total Sales (MMT)</td><td>${formData.salesPerEmployeeTotal2024}</td><td>${formData.salesPerEmployeeTotal2023}</td><td>${formData.salesPerEmployeeTotal2024Remarks || ''} ${formData.salesPerEmployeeTotal2023Remarks || ''}</td></tr>
//               <tr><td>5.2</td><td>Sales per Employee No. of Employees</td><td>${formData.salesPerEmployeeCount2024}</td><td>${formData.salesPerEmployeeCount2023}</td><td>${formData.salesPerEmployeeCount2024Remarks || ''} ${formData.salesPerEmployeeCount2023Remarks || ''}</td></tr>
//               <tr><td>6.1</td><td>Sales of Lubricants (MMT)</td><td>${formData.lubricantsSales2024}</td><td>${formData.lubricantsSales2023}</td><td>${formData.lubricantsSales2024Remarks || ''} ${formData.lubricantsSales2023Remarks || ''}</td></tr>
//               <tr><td>6.2</td><td>Sales of Fuels (MS + HSD) (MMT)</td><td>${formData.fuelsSales2024}</td><td>${formData.fuelsSales2023}</td><td>${formData.fuelsSales2024Remarks || ''} ${formData.fuelsSales2023Remarks || ''}</td></tr>
//             </tbody>
//           </table>
//           <h2>Quantitative Information - Part 2</h2>
//           <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//             <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th><th>Remarks</th></tr></thead>
//             <tbody>
//               <tr><td>7.1</td><td>Tankage Capacity MS (MMT)</td><td>${formData.tankageMS2024}</td><td>${formData.tankageMS2023}</td><td>${formData.tankageMS2024Remarks || ''} ${formData.tankageMS2023Remarks || ''}</td></tr>
//               <tr><td>7.2</td><td>Tankage Capacity HSD (MMT)</td><td>${formData.tankageHSD2024}</td><td>${formData.tankageHSD2023}</td><td>${formData.tankageHSD2024Remarks || ''} ${formData.tankageHSD2023Remarks || ''}</td></tr>
//               <tr><td>7.3</td><td>Tankage Capacity Ethanol (MMT)</td><td>${formData.tankageEthanol2024}</td><td>${formData.tankageEthanol2023}</td><td>${formData.tankageEthanol2024Remarks || ''} ${formData.tankageEthanol2023Remarks || ''}</td></tr>
//               <tr><td>8.1</td><td>Total Automated ROs</td><td>${formData.automatedROs2024}</td><td>${formData.automatedROs2023}</td><td>${formData.automatedROs2024Remarks || ''} ${formData.automatedROs2023Remarks || ''}</td></tr>
//               <tr><td>8.1.1</td><td>Total ROs</td><td>${formData.totalROs2024}</td><td>${formData.totalROs2023}</td><td>${formData.totalROs2024Remarks || ''} ${formData.totalROs2023Remarks || ''}</td></tr>
//               <tr><td>8.2</td><td>Total Non-Cash Sales</td><td>${formData.nonCashSales2024}</td><td>${formData.nonCashSales2023}</td><td>${formData.nonCashSales2024Remarks || ''} ${formData.nonCashSales2023Remarks || ''}</td></tr>
//               <tr><td>8.2.1</td><td>Total Sales</td><td>${formData.totalSales2024}</td><td>${formData.totalSales2023}</td><td>${formData.totalSales2024Remarks || ''} ${formData.totalSales2023Remarks || ''}</td></tr>
//               <tr><td>8.3</td><td>GPS Enabled Trucks</td><td>${formData.gpsTrucks2024}</td><td>${formData.gpsTrucks2023}</td><td>${formData.gpsTrucks2024Remarks || ''} ${formData.gpsTrucks2023Remarks || ''}</td></tr>
//               <tr><td>8.3.1</td><td>Total No. of Trucks</td><td>${formData.totalTrucks2024}</td><td>${formData.totalTrucks2023}</td><td>${formData.totalTrucks2024Remarks || ''} ${formData.totalTrucks2023Remarks || ''}</td></tr>
//               <tr><td>9.1</td><td>No. of Complaints</td><td>${formData.complaintsNumber2024}</td><td>${formData.complaintsNumber2023}</td><td>${formData.complaintsNumber2024Remarks || ''} ${formData.complaintsNumber2023Remarks || ''}</td></tr>
//               <tr><td>9.2</td><td>Average Complaint Turnaround Time (Days)</td><td>${formData.complaintsTurnaround2024}</td><td>${formData.complaintsTurnaround2023}</td><td>${formData.complaintsTurnaround2024Remarks || ''} ${formData.complaintsTurnaround2023Remarks || ''}</td></tr>
//               <tr><td>10.1</td><td>Fast Charging EV Stations (No.)</td><td>${formData.evStations2024}</td><td>${formData.evStations2023}</td><td>${formData.evStations2024Remarks || ''} ${formData.evStations2023Remarks || ''}</td></tr>
//               <tr><td>10.2</td><td>H2 Dispensing Stations (No.)</td><td>${formData.h2Stations2024}</td><td>${formData.h2Stations2023}</td><td>${formData.h2Stations2024Remarks || ''} ${formData.h2Stations2023Remarks || ''}</td></tr>
//               <tr><td>10.3</td><td>CBG Sales (MT)</td><td>${formData.cbgSales2024}</td><td>${formData.cbgSales2023}</td><td>${formData.cbgSales2024Remarks || ''} ${formData.cbgSales2023Remarks || ''}</td></tr>
//               <tr><td>11.1</td><td>LPG Per Capita Consumption of PMUY Customers (No.)</td><td>${formData.lpgConsumption2024}</td><td>${formData.lpgConsumption2023}</td><td>${formData.lpgConsumption2024Remarks || ''} ${formData.lpgConsumption2023Remarks || ''}</td></tr>
//               <tr><td>12.1</td><td>Investment in Bio-fuels (Rs. Crores)</td><td>${formData.biofuelsInvestment2024}</td><td>${formData.biofuelsInvestment2023}</td><td>${formData.biofuelsInvestment2024Remarks || ''} ${formData.biofuelsInvestment2023Remarks || ''}</td></tr>
//               <tr><td>12.2</td><td>Total Capex (Rs. Crores)</td><td>${formData.totalCapex2024}</td><td>${formData.totalCapex2023}</td><td>${formData.totalCapex2024Remarks || ''} ${formData.totalCapex2023Remarks || ''}</td></tr>
//               <tr><td>13.1</td><td>Actual Ethanol Blending (%)</td><td>${formData.ethanolBlendingActual2024}</td><td>${formData.ethanolBlendingActual2023}</td><td>${formData.ethanolBlendingActual2024Remarks || ''} ${formData.ethanolBlendingActual2023Remarks || ''}</td></tr>
//               <tr><td>13.2</td><td>Ethanol Blending Target (%)</td><td>${formData.ethanolBlendingTarget2024}</td><td>${formData.ethanolBlendingTarget2023}</td><td>${formData.ethanolBlendingTarget2024Remarks || ''} ${formData.ethanolBlendingTarget2023Remarks || ''}</td></tr>
//               <tr><td>14.1</td><td>No. of Fatalities</td><td>${formData.fatalities2024}</td><td>${formData.fatalities2023}</td><td>${formData.fatalities2024Remarks || ''} ${formData.fatalities2023Remarks || ''}</td></tr>
//               <tr><td>14.2</td><td>Total Hours Worked in Marketing</td><td>${formData.hoursWorked2024}</td><td>${formData.hoursWorked2023}</td><td>${formData.hoursWorked2024Remarks || ''} ${formData.hoursWorked2023Remarks || ''}</td></tr>
//             </tbody>
//           </table>
//         ` : formData.category === 'CBG Company of the Year' ? `
//           <h2>Quantitative Information</h2>
//           <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
//             <thead><tr><th>S. No.</th><th>Particulars</th><th>2024-25</th><th>2023-24</th><th>Remarks</th></tr></thead>
//             <tbody>
//               <tr><td>1</td><td>Absolute CapEx (INR Crores)</td><td>${formData.capex2024}</td><td>${formData.capex2023}</td><td>${formData.capex2024Remarks || ''} ${formData.capex2023Remarks || ''}</td></tr>
//               <tr><td>2</td><td>Installed Capacity (MTPA)</td><td>${formData.installedCapacity2024}</td><td>${formData.installedCapacity2023}</td><td>${formData.installedCapacity2024Remarks || ''} ${formData.installedCapacity2023Remarks || ''}</td></tr>
//               <tr><td>3</td><td>Actual Production (MTPA)</td><td>${formData.actualProduction2024}</td><td>${formData.actualProduction2023}</td><td>${formData.actualProduction2024Remarks || ''} ${formData.actualProduction2023Remarks || ''}</td></tr>
//               <tr><td>4.1</td><td>Fatal Accident Rate {(No. of Fatalities x 10,00,00,000) / Total hour worked}</td><td>${formData.fatalAccidentRate2024}</td><td>${formData.fatalAccidentRate2023}</td><td>${formData.fatalAccidentRate2024Remarks || ''} ${formData.fatalAccidentRate2023Remarks || ''}</td></tr>
//               <tr><td>4.2</td><td>Lost Time Injury Frequency {(No. lost time injuries x 10,00,000) / Total hour worked}</td><td>${formData.lostTimeInjury2024}</td><td>${formData.lostTimeInjury2023}</td><td>${formData.lostTimeInjury2024Remarks || ''} ${formData.lostTimeInjury2023Remarks || ''}</td></tr>
//               <tr><td>4.3</td><td>Total Recordable Incident Rate {(No. of OSHA recordable incidents x 2,00,000) / Total hour worked}</td><td>${formData.recordableIncidentRate2024}</td><td>${formData.recordableIncidentRate2023}</td><td>${formData.recordableIncidentRate2024Remarks || ''} ${formData.recordableIncidentRate2023Remarks || ''}</td></tr>
//               <tr><td>5.1</td><td>Number of Patents Filed</td><td>${formData.patentsFiled2024}</td><td>${formData.patentsFiled2023}</td><td>${formData.patentsFiled2024Remarks || ''} ${formData.patentsFiled2023Remarks || ''}</td></tr>
//               <tr><td>5.2</td><td>Number of Patents Granted – National</td><td>${formData.patentsNational2024}</td><td>${formData.patentsNational2023}</td><td>${formData.patentsNational2024Remarks || ''} ${formData.patentsNational2023Remarks || ''}</td></tr>
//               <tr><td>5.3</td><td>Number of Patents Granted – International</td><td>${formData.patentsInternational2024}</td><td>${formData.patentsInternational2023}</td><td>${formData.patentsInternational2024Remarks || ''} ${formData.patentsInternational2023Remarks || ''}</td></tr>
//               <tr><td>5.4</td><td>Number of Patents Commercialized</td><td>${formData.patentsCommercialized2024}</td><td>${formData.patentsCommercialized2023}</td><td>${formData.patentsCommercialized2024Remarks || ''} ${formData.patentsCommercialized2023Remarks || ''}</td></tr>
//             </tbody>
//           </table>
//         ` : ''}
//         <h2>Step 5: Attachments & Declaration</h2>
//         <p>I declare that the information submitted is true and complete.</p>
//       </div>
//     `;
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   const renderBestProjectSection = () => {
//     const { ProjectName1, ProjectName2 } = formData;

//     if (ProjectName1 && ProjectName2) {
//       return <p className="text-red">You cannot submit more than 2 projects for this award.</p>;
//     }

//     if (!ProjectName1) {
//       return (
//         <div>
//           <label>Project Name 1</label>
//           <textarea
//             name="ProjectName1"
//             value={formData.ProjectName1}
//             onChange={(e) => handleChange('ProjectName1', e.target.value)}
//             className={`form-textarea ${!formData.ProjectName1 && currentStep === 1 && formData.category === 'Best Managed Project of the Year' ? 'has-error' : ''}`}
//             rows={3}
//             maxLength={400}
//             required
//           />
//           <span className="error-tooltip">Project Name 1 is required</span>
//           <label>Write-up (max 50 words)</label>
//           <textarea
//             name="ProjectName1Writeup"
//             value={formData.ProjectName1Writeup || ''}
//             onChange={(e) => handleChange('ProjectName1Writeup', e.target.value)}
//             className="form-textarea"
//             rows={3}
//             maxLength={400}
//             required
//           />
//         </div>
//       );
//     }

//     if (!ProjectName2) {
//       return (
//         <div>
//           <label>Project Name 2</label>
//           <textarea
//             name="ProjectName2"
//             value={formData.ProjectName2}
//             onChange={(e) => handleChange('ProjectName2', e.target.value)}
//             className="form-textarea"
//             rows={3}
//             maxLength={400}
//             required
//           />
//           <label>Write-up (max 50 words)</label>
//           <textarea
//             name="ProjectName2Writeup"
//             value={formData.ProjectName2Writeup || ''}
//             onChange={(e) => handleChange('ProjectName2Writeup', e.target.value)}
//             className="form-textarea"
//             rows={3}
//             maxLength={400}
//             required
//           />
//         </div>
//       );
//     }
//   };

//   const getRefineries = (orgName) => {
//     const refineryData = {

//       "Reliance Industries Limited":['DTA Jamnagar','SEZ Jamnagar'],
//       'Nayara Energy Limited':['Nayara Refinery'],
//       'HPCL–Mittal Energy Limited':['HMEL', 'Bhatinda Refinery'],
//       'Oil and Natural Gas Corporation':['Tatipaka Refinery'],
//       'Mangalore Refinery and Petrochemicals Limited':['MRPL Refinery'],
//       'Numaligarh Refinery Limited':['Numaligarh Refinery'],
//       'Chennai Petroleum Corporation Limited':['Manali Refinery'],
//       'Hindustan Petroleum Corporation Limited':['Mumbai Refinery','Visakhapattnam Refinery'],
//       'Bharat Petroleum Corporation Limited':['Mumbai Refinery','Kochi Refinery','Bina Refinery'],
//       'Indian Oil Corporation Limited':['Barauni Refinery','Gujarat Refinery','Haldia Refinery','Mathura Refinery','Panipat Refinery','Guwahati Refinery','Digboi Refinery','Bongaigoan Refinery','Paradip Refinery']
//     };
//     return refineryData[orgName] || [];
//   };

//   const renderStepContent = () => {
//     const progress = ((currentStep - 1) / 4) * 100;
//     return (
//       <div>
//         <div className="progress-bar">
//           <div className="progress" style={{ width: `${progress}%` }}></div>
//         </div>
//         {currentStep === 1 && (
//           <div className="form-step">
//             <h3 className="step-title">Step 1: Organization Details</h3>
//             <div className="form-group">
//               <label>Organisation Name<span className="text-red">*</span></label>
//               <input
//                 type="text"
//                 name="Organisationname"
//                 value={formData.Organisationname}
//                 onChange={(e) => handleChange('Organisationname', e.target.value)}
//                 className={`form-input ${!formData.Organisationname && currentStep === 1 ? 'has-error' : ''}`}
//               />
//               {!formData.Organisationname && currentStep === 1 && <span className="error-tooltip">Organisation name is required</span>}
//             </div>
//             <div className="form-group">
//               <label>Select Category<span className="text-red">*</span></label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={(e) => handleChange('category', e.target.value)}
//                 className={`form-input ${!formData.category && currentStep === 1 ? 'has-error' : ''}`}
//               >
              
              
//                 <option value="">Select Category</option>
//                 <option value="Exploration Company of the Year">Exploration Company of the Year</option>
//                 <option value="Oil & gas Production Company of the year Less than 1 MMTOE">Oil & gas Production Company of the year Less than 1 MTOE</option>
//                 <option value="Oil & gas Production Company of the year More than or equal to 1 MMTOE">Oil & gas Production Company of the year More than or equal to 1 MMTOE</option>
//                 <option value="Goal Net Zero Company of the Year">Goal Net Zero Company of the Year</option>
//                 <option value="Green Hydrogen Company of the Year">Green Hydrogen Company of the Year</option>
//                 <option value="Overseas Oil & Gas Company of the Year">Overseas Oil & Gas Company of the Year</option>
//                 <option value="Digital Technology Provider of the Year">Digital Technology Provider of the Year</option>
//                 <option value="Service Provider of the Year">Service Provider of the Year</option>
//                 <option value="Pipeline Transportation Company of the Year">Pipeline Transportation Company of the Year</option>
//                 <option value="Oil Marketing Company of the Year">Oil Marketing Company of the Year</option>
//                 <option value="Human Resource Management">Human Resource Management</option>
//                 <option value="CBG Company of the Year">CBG Company of the Year</option>
//                 <option value="CGD Company of the Year">CGD Company of the Year</option>
//                 <option value="Best Managed Project of the Year">Best Managed Project of the Year</option>
//                 <option value="Refinery of the Year">Refinery of the Year</option>
//                 <option value="Innovator of the year (team)">Innovator of the year (team)</option>
//                 <option value="Woman Executive of the Year">Woman Executive of the Year</option>
//                 <option value="Young Achiever of the Year(Male)">Young Achiever of the Year(Male)</option>
//                 <option value="Young Achiever of the Year(Female)">Young Achiever of the Year(Female)</option>

//               </select>

//               {/* SelectedAwardCategory=formData.category */}
//               {!formData.category && currentStep === 1 && <span className="error-tooltip">Category is required</span>}
//             </div>
//             {formData.category === 'Refinery of the Year' && formData.Organisationname && (
//               <div className="form-group">
//                 <label>Select Refinery</label>
//                 <select
//                   name="refinery"
//                   value={formData.refinery}
//                   onChange={(e) => handleChange('refinery', e.target.value)}
//                   className={`form-input ${!formData.refinery && formData.category === 'Refinery of the Year' && currentStep === 1 ? 'has-error' : ''}`}
//                 >
//                   <option value="">Select Refinery</option>
//                   {getRefineries(formData.Organisationname).map((refinery, index) => (
//                     <option key={index} value={refinery}>{refinery}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <div className="form-group">
//               <label>Postal Address <span className="text-red">*</span></label>
//               <textarea
//                 name="mailingAddress"
//                 value={formData.mailingAddress}
//                 onChange={(e) => handleChange('mailingAddress', e.target.value)}
//                 className={`form-textarea ${!formData.mailingAddress.trim() && currentStep === 1 ? 'has-error' : ''}`}
//                 rows={3}
//                 placeholder="Enter Postal address"
//               />
//             </div>
//             {formData.category === 'Best Managed Project of the Year' && renderBestProjectSection()}
//             {formData.category === 'Innovator of the year (team)' &&
//             <div className="form-group">
//               <label>Name of the innovation <span className="text-red">*</span></label>
//               <textarea
//                 name="innovatortextbox"
//                 value={formData.innovatortextbox}
//                 onChange={(e) => handleChange('innovatortextbox', e.target.value)}
//                 className={`form-textarea ${!formData.innovatortextbox.trim() && currentStep === 1 ? 'has-error' : ''}`}
//                 rows={3}
//                 placeholder="Enter Name of Innovation"
//               />
//             </div>
            
//             }
//           </div>
//         )}
//         {currentStep === 2 && (
//           <div className="form-step">
//             <h3 className="step-title">Step 2: Authority & Contact Details</h3>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="step-section">
//                 <h4 className="text-lg font-semibold text-1e40af">Approving Authority</h4>
//                 <div className="form-group">
//                   <label>Details of Approving Authority (Director/Board Level):<span className="text-red">*</span></label>
//                   <input
//                     type="text"
//                     name="authorityName"
//                     value={formData.authorityName}
//                     onChange={(e) => handleChange('authorityName', e.target.value)}
//                     placeholder="Name"
//                     className={`form-input ${currentStep === 2 && !formData.authorityName ? 'has-error' : ''}`}
//                   />
//                   {currentStep === 2 && !formData.authorityName && <span className="error-tooltip">Name is required</span>}
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="authorityTitle"
//                     value={formData.authorityTitle}
//                     onChange={(e) => handleChange('authorityTitle', e.target.value)}
//                     placeholder="Designation"
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="tel"
//                     name="authorityPhone"
//                     value={formData.authorityPhone}
//                     onChange={(e) => handleChange('authorityPhone', e.target.value)}
//                     placeholder="Phone number"
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     name="authorityEmail"
//                     value={formData.authorityEmail}
//                     onChange={(e) => handleChange('authorityEmail', e.target.value)}
//                     placeholder="E-mail address"
//                     className={`form-input ${currentStep === 2 && !formData.authorityEmail ? 'has-error' : ''}`}
//                   />
//                   {currentStep === 2 && !formData.authorityEmail && <span className="error-tooltip">Email is required</span>}
//                 </div>
//                 <div className="form-group">
//                   <label>Signature</label>
//                   <input
//                     type="file"
//                     name="authoritySignature"
//                     onChange={(e) => handleChange('authoritySignature', e.target.value)}
//                     className="form-input"
//                   />
//                 </div>
//               </div>
              
//               <div className="step-section">
//                 <h4 className="text-lg font-semibold text-1e40af">Contacts (Nodal Officials)<span className="text-red">*</span></h4>
//                 <div className="form-group">
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="copyApplicantData"
//                       checked={copyApplicantData}
//                       onChange={(e) => {
//                         setCopyApplicantData(e.target.checked);
//                         if (e.target.checked) {
//                           setFormData({
//                             ...formData,
//                             contactName: `${formData.Firstname} ${formData.Lastname}`,
//                             contactEmail: formData.userid,
//                             contactPhone: formData.authorityPhone,
//                           });
//                         }
//                       }}
//                     /> Same as applicant
//                   </label>
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="contactName"
//                     value={formData.contactName}
//                     onChange={(e) => handleChange('contactName', e.target.value)}
//                     placeholder="Name"
//                     className="form-input"
//                     disabled={copyApplicantData}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="tel"
//                     name="contactPhone"
//                     value={formData.contactPhone}
//                     onChange={(e) => handleChange('contactPhone', e.target.value)}
//                     placeholder="Phone number"
//                     className="form-input"
//                     disabled={copyApplicantData}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     name="contactEmail"
//                     value={formData.contactEmail}
//                     onChange={(e) => handleChange('contactEmail', e.target.value)}
//                     placeholder="E-mail address"
//                     className="form-input"
//                     disabled={copyApplicantData}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Company Profile and Activities (2024–25)</label>
//               <p className="note">Write-up (max 300 words) — Operations during 2024–25</p>
//               <textarea
//                 name="companyProfile"
//                 value={formData.companyProfile}
//                 onChange={(e) => handleChange('companyProfile', e.target.value)}
//                 rows={6}
//                 maxLength={2400}
//                 className="form-textarea"
//               />
//             </div>
//           </div>
//         )}
//         {currentStep === 3 && (
//           <div className="form-step">
//             <h3 className="step-title">Step 3: Quantitative Information Part 1</h3>
//             {formData.category === 'Exploration Company of the Year' ? (
//               <QuantitativeInfoForm formData={formData} handleChange={handleChange} sectionStart={1} sectionEnd={5} />
//             ) : formData.category === 'Oil Marketing Company of the Year' ? (
//               <QuantitativeOilMarketing formData={formData} handleChange={handleChange} sectionStart={1} sectionEnd={6} />
//             ) : formData.category === 'CBG Company of the Year' ? (
//               <QuantitativeCBG formData={formData} handleChange={handleChange} sectionStart={1} sectionEnd={4.3} />
//             ) : formData.category === 'Overseas Oil & Gas Company of the Year' ? (
//               <QuantitativeOverseas formData={formData} handleChange={handleChange} sectionStart={1} sectionEnd={5} />) :
//               formData.category === 'Green Hydrogen Company of the Year' ? (
//                 <QuantitativeGreenHydrogen formData={formData} handleChange={handleChange} sectionStart={1} sectionEnd={7} />) :
//                 formData.category === 'Pipeline Transportation Company of the Year' ? (
//                   <QuantitativePipeline formData={formData} handleChange={handleChange} sectionStart={1} sectionEnd={5} />) :
//                   formData.category === 'Human Resource Management' ? (
//                     <QuantitativeHR formData={formData} handleChange={handleChange} sectionStart={1} sectionEnd={5} />) :
//                     formData.category === 'Service Provider of the Year' ? (
//                       <QuantitativeService formData={formData} handleChange={handleChange} part={1} />) :
//                      formData.category === 'Goal Net Zero Company of the Year' ? (
//                         <QuantitativeGNZ formData={formData} handleChange={handleChange} part={1} />) :
//                      formData.category === 'Digital Technology Provider of the Year' ? (
//                           <QuantitativeDigital formData={formData} handleChange={handleChange} sectionStart={1} />) :
//                      formData.category === 'Best Managed Project of the Year' ? (
//                             <QuantitativeBestManaged formData={formData} handleChange={handleChange} sectionStart={1} />) :
//                      formData.category === ('Oil & gas Production Company of the year Less than 1 MMTOE' || 'Oil & gas Production Company of the year More than or equal to 1 MMTOE') ? (
//                       <QuantitativeProduction formData={formData} handleChange={handleChange} sectionStart={1} />) :
//                       formData.category === 'Innovator of the year (team)' ? (
//                           <QuantitativeInnovator formData={formData} handleChange={handleChange} sectionStart={1} sectionEnd={3}/>) : (
//                               <p className="note">Quantitative information is not applicable for this category.</p>
//                             )}
//           </div>
//         )}
//         {currentStep === 4 && (
//           <div className="form-step">
//             <h3 className="step-title">Step 4: Quantitative Information Part 2</h3>
//             {formData.category === 'Exploration Company of the Year' ? (
//               <QuantitativeInfoForm formData={formData} handleChange={handleChange} sectionStart={7} sectionEnd={9} />
//             ) : formData.category === 'Oil Marketing Company of the Year' ? (
//               <QuantitativeOilMarketing formData={formData} handleChange={handleChange} sectionStart={7} sectionEnd={14} />
//             ) : formData.category === 'CBG Company of the Year' ? (
//               <QuantitativeCBG formData={formData} handleChange={handleChange} sectionStart={5} sectionEnd={6} />
//             ) : formData.category === 'Overseas Oil & Gas Company of the Year' ? (
//               <QuantitativeOverseas formData={formData} handleChange={handleChange} sectionStart={6} sectionEnd={9} />) :
//               formData.category === 'Green Hydrogen Company of the Year' ? (
//                 <QuantitativeGreenHydrogen formData={formData} handleChange={handleChange} sectionStart={8} sectionEnd={12} />) :
//                 formData.category === 'Pipeline Transportation Company of the Year' ? (
//                   <QuantitativePipeline formData={formData} handleChange={handleChange} sectionStart={6} sectionEnd={8} />) :
//                   formData.category === 'Human Resource Management' ? (
//                     <QuantitativeHR formData={formData} handleChange={handleChange} sectionStart={6} sectionEnd={9} />) :
//                     formData.category === 'Service Provider of the Year' ? (
//                       <QuantitativeService formData={formData} handleChange={handleChange} part={2} />)
//                       : formData.category === 'Goal Net Zero Company of the Year' ? (
//                         <QuantitativeGNZ formData={formData} handleChange={handleChange} part={2} />) :
//                         formData.category === 'Digital Technology Provider of the Year' ? (
//                           <QuantitativeDigital formData={formData} handleChange={handleChange} sectionStart={2} />) :
//                           formData.category === 'Best Managed Project of the Year' ? (
//                             <QuantitativeBestManaged formData={formData} handleChange={handleChange} sectionStart={2} />) :
//                             formData.category === ('Oil & gas Production Company of the year Less than 1 MMTOE' || 'Oil & gas Production Company of the year More than or equal to 1 MMTOE') ? (
//                               <QuantitativeProduction formData={formData} handleChange={handleChange} sectionStart={2} />) :
//                                formData.category === 'Innovator of the year (team)' ? (
//                               <QuantitativeInnovator
//                                   formData={formData}
//                                   handleChange={handleChange}
//                                   sectionStart={4}
//                                   sectionEnd={4}
//                               />
//                                 ) : (
//                               <p className="note">Quantitative information is not applicable for this category.</p>
//                             )
//                           }
//           </div>
//         )}
//         {currentStep === 5 && (
//           <div className="form-step">
//             <h3 className="step-title">Step 5: Attachments & Declaration</h3>
//             <AttachmentList formData={formData} handleChange={handleChange} />
//             <div className="form-group">
//               <label>Kindly print the completed application form and upload it with the signature of the approving authority. Without signature of the approving authority, application will not be considered valid.<span className="text-red">*</span></label>
//               <div className="form-navigation">
//                 <button type="button" onClick={handlePrint} className="btn btn-outline">
//                   Print
//                 </button>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Upload Document with Approving Authority Signature (Director/Board Level)<span className="text-red">*</span>:</label>
//               <input
//                 type="file"
//                 accept=".jpg,.png,.pdf"
//                 onChange={(e) => handleApprovingAuthorityChange(e.target.files)}
//                 className="form-input mt-4"
//               />
//               {formData.approvingAuthoritySignature && (
//                 <p className="file-name">Selected file: {formData.approvingAuthoritySignature.name}</p>
//               )}
//             </div>
//             <div className="form-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="declaration"
//                   checked={formData.declaration}
//                   onChange={(e) => handleChange('declaration', e.target.checked)}
//                   className="form-checkbox"
//                 />
//                 I declare that the information submitted is true and complete.
//               </label>
//               <div className="notes">
//                 <p>Notes/ Definition:</p>
//                 <ol type="a">
//                   <li> INR / USD as on 31.03.2025 (85.424)</li>
//                   <li> 1 Tonne of oil equivalent to 7.5 bbl of oil</li>
//                   <li> MTOE: Million Tonne of Oil Equivalent. For this calculation 1 BCM of natural gas is equivalent to 1 MMT of Oil</li>
//                   <li> Finding cost (INR/MTOE): Cost of finding oil and gas reserves added via exploration drilling activities, exclusive of land acquisition cost: (total cost incurred (INR)/ reserves added (oil + oil eq. gas reserves) (MTOE)</li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (

//     <div >
//      <SidebarGuideline
//         isOpen={true}
//         sidebarItems={[
//           { id: 'Guideline', label: 'Guideline' }
//         ]}
//         activeItem={activeItem}
//         setActiveItem={setActiveItem}
//         selectedAwardCategory={formData.category}
//       />
//       <div className="application-form">

//         <div className="form-header">
//           <h1>Registration Form : {awardTitle}</h1>
//           <p>Step {currentStep} of 5</p>
//         </div>
//         {error && <div className="error">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           {renderStepContent()}

//          {currentStep === 1 && (
//         <div className="form-navigation-step1">
//         <button type="button" onClick={saveDraft} className="btn btn-outline">
//         <Save size={16} /> Save Draft
//         </button>
//             <button type="button" onClick={nextStep} className="btn btn-primary">
//       Next <ChevronRight size={16} />
//     </button>
//       </div>
//          )}
      

//     <div className="form-navigation">
//   {/* Previous Button */}
//   {currentStep > 1 && (
//     <button type="button" onClick={prevStep} className="btn btn-outline">
//       <ChevronLeft size={16} /> Previous
//     </button>
    
//   )}
//   {currentStep > 1 && (
//         <button type="button" onClick={saveDraft} className="btn btn-outline">
//       <Save size={16} /> Save Draft
//      </button>)}


//   {/* Next Button (Only on steps 2 to 4) */}
//   {currentStep < 5 && currentStep > 1 && (
//     <button type="button" onClick={nextStep} className="btn btn-primary">
//       Next <ChevronRight size={16} />
//     </button>
//   )}

//   {/* Submit Button (Only on step 5) */}
//   {currentStep === 5 && (
//     <button type="submit" className="btn btn-success">
//       Submit
//     </button>
//   )}
// </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
