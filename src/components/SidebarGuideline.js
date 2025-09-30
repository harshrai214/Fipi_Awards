import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SidebarGuideline.css';

import GuidelineBestManaged from './Guidelines/GuidelineBestManaged';
import GuidelineYoungAchiever from './Guidelines/GuidelineYoungAchiever';
import GuidelineNetZero from './Guidelines/GuidelineNetZero';
import GuidelineGreenHydrogen from './Guidelines/GuidelineGreenHydrogen';
import GuidelineHRM from './Guidelines/GuidelineHRM';
import GuidelineInnovator from './Guidelines/GuidelineInnovator';
import GuidelineOilGas from './Guidelines/GuidelineOilGas';
import GuidelineOilmarketing from './Guidelines/GuidelineOilmarketing';
import GuidelinePipeline from './Guidelines/GuidelinePipeline';
import GuidelineRefinery from './Guidelines/GuidelineRefinery';
import GuidelineService from './Guidelines/GuidelineService';
import GuidelineWoman from './Guidelines/GuidelineWomen';
import GuidelineExploration from './Guidelines/GuidelineExploration';
import GuidelineOverseas from './Guidelines/GuidelineOverseas';
import GuidelineCBG from './Guidelines/GuidelineCBG';
import GuidelineDigital from './Guidelines/GuidelineDigital';
import GuidelineProduction from './Guidelines/GuidelineProduction';
import GuidelineCGD from './Guidelines/GuidelineCDG';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';

const SidebarGuideline = ({ isOpen, sidebarItems, activeItem, setActiveItem, selectedAwardCategory }) => {
    const navigate = useNavigate();
    const [showGuidelineModall, setShowGuidelineModall] = useState(false);

    const handleItemClick = (id) => {
        if (id === 'Home') {
            navigate('/fipiawards');
        } else if (id === 'Guideline') {
            setShowGuidelineModall(true);
        }
        else if (id === "Sample Draft") {
            const pdfFile = pdfMap[selectedAwardCategory];
            if (pdfFile) {
                // Use the full URL path as explained before
                const pdfUrl = `/fipiawards/pdf/${pdfFile}`;
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.download = pdfFile; // Optional: set a custom file name here
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("No sample draft available for this award.");
            }

        } else {
            setActiveItem((prev) => (prev === id ? null : id));
        }
    };

    const pdfMap = {
        "Best Managed Project of the Year": "Best Managed Project of the Year.pdf",

        "Goal Net Zero Company of the Year": "Goal Net Zero Company of the Year.pdf",
        "Green Hydrogen Company of the Year": "Green Hydrogen Company of the Year.pdf",
        "Service Provider of the Year": "Service Provider of the Year.pdf",
        "Oil & Gas Production Company of the Year (< 1 MMTOE)": "Oil  Gas Production Company of the Year.pdf",
        "Oil & Gas Production Company of the Year (>=1 MMTOE)": "Oil  Gas Production Company of the Year.pdf",
        "Exploration Company of the Year": "Exploration Company of the Year.pdf",
        "Overseas Oil & Gas Company of the Year": "Overseas Oil  Gas Company of the Year.pdf",
        "Digital Technology Provider of the Year": 'Digital Technology Provider of the Year.pdf',
        "Young Achiever of the Year(Female)": "Young Achiever Female.pdf",
        "Young Achiever of the Year(Male)": "Young Achiever Male.pdf",
        "Woman Executive of the Year": "Woman Executive of the year.pdf",

    };

    const guidelineMap = {
        'Best Managed Project of the Year': <GuidelineBestManaged />,
        'Young Achiever of the Year(Female)': <GuidelineYoungAchiever />,
        'Young Achiever of the Year(Male)': <GuidelineYoungAchiever />,
        'Goal Net Zero Company of the Year': <GuidelineNetZero />,
        'Green Hydrogen Company of the Year': <GuidelineGreenHydrogen />,
        'Human Resource Management Company of the Year': <GuidelineHRM />,
        'Innovator of the Year (Team)': <GuidelineInnovator />,
        // 'Oil & gas Production Company of the year More than or equal to 1 MMTOE': <GuidelineOilGas />,
        // 'Oil & gas Production Company of the year Less than 1 MMTOE': <GuidelineOilGas />,
        'Oil Marketing Company of the Year': <GuidelineOilmarketing />,
        'Pipeline Transportation Company of the Year': <GuidelinePipeline />,
        'Refinery of the Year': <GuidelineRefinery />,
        'Service Provider of the Year': <GuidelineService />,
        'Woman Executive of the Year': <GuidelineWoman />,
        'Exploration Company of the Year': <GuidelineExploration />,
        'Overseas Oil & Gas Company of the Year': <GuidelineOverseas />,
        'CBG Company of the Year': <GuidelineCBG />,
        "CGD Company of the Year": <GuidelineCGD />,
        'Digital Technology Provider of the Year': <GuidelineDigital />,
        'Oil & Gas Production Company of the Year (< 1 MMTOE)': <GuidelineProduction />,
        'Oil & Gas Production Company of the Year (>=1 MMTOE)': <GuidelineProduction />,

    };

    const shouldShowGuideline = showGuidelineModall && guidelineMap[selectedAwardCategory];

    const fullSidebarItems = [{ id: 'Home', label: 'Home' }, ...sidebarItems, { id: 'Sample Draft', label: "Sample Application Form" ,key:<DownloadForOfflineRoundedIcon/>}];

    return (
        <div className="sidebarr-container">
            <div className={`sidebarr ${isOpen ? 'open' : ''}`}>
                {Array.isArray(fullSidebarItems) &&
                    fullSidebarItems.map((item) => (
                        <div
                            key={item.id} className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <div
                                className={`navv-item 
                                ${item.id === 'Home' && (activeItem === null || activeItem === 'Home') ? 'home' : ''} 
                                ${activeItem === item.id ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveItem(item.id);
                                    handleItemClick(item.id);
                                }}
                            >
                                <a>{item.label}</a>
                            </div>


                        </div>
                    ))}
            </div>
            {shouldShowGuideline && (
                <div className="modall-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="modall-content bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                        {/* <h2 className="text-xl font-bold mb-4">Guideline: {selectedAwardCategory}</h2> */}
                        <div className="guideline-panel">{guidelineMap[selectedAwardCategory]}</div>
                        <div className="modall-actions flex gap-2 mt-4">
                            <button
                                onClick={() => setShowGuidelineModall(false)}
                                className="btn btn-outline btn-sm px-3 py-1 text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarGuideline;