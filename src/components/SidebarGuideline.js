
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css"; // Use the existing Sidebar.css

import GuidelineBestManaged from "./Guidelines/GuidelineBestManaged";
import GuidelineYoungAchiever from "./Guidelines/GuidelineYoungAchiever";
import GuidelineNetZero from "./Guidelines/GuidelineNetZero";
import GuidelineGreenHydrogen from "./Guidelines/GuidelineGreenHydrogen";
import GuidelineHRM from "./Guidelines/GuidelineHRM";
import GuidelineInnovator from "./Guidelines/GuidelineInnovator";
import GuidelineOilGas from "./Guidelines/GuidelineOilGas";
import GuidelineOilmarketing from "./Guidelines/GuidelineOilmarketing";
import GuidelinePipeline from "./Guidelines/GuidelinePipeline";
import GuidelineRefinery from "./Guidelines/GuidelineRefinery";
import GuidelineService from "./Guidelines/GuidelineService";
import GuidelineWoman from "./Guidelines/GuidelineWomen";
import GuidelineExploration from "./Guidelines/GuidelineExploration";
import GuidelineOverseas from "./Guidelines/GuidelineOverseas";
import GuidelineCBG from "./Guidelines/GuidelineCBG";
import GuidelineDigital from "./Guidelines/GuidelineDigital";
const SidebarGuideline = ({
  isOpen,
  sidebarItems,
  activeItem,
  setActiveItem,
  selectedAwardCategory,
}) => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    if (id === "Home") {
      navigate("/fipiawards");
    } else {
      setActiveItem((prev) => (prev === id ? null : id));
    }
  };

  const guidelineMap = {
    "Best Managed Project of the Year": <GuidelineBestManaged />,
    "Young Achiever of the Year(Female)": <GuidelineYoungAchiever />,
    "Young Achiever of the Year(Male)": <GuidelineYoungAchiever />,
    "Goal Net Zero Company of the Year": <GuidelineNetZero />,
    "Green Hydrogen Company of the Year": <GuidelineGreenHydrogen />,
    "Human Resource Management": <GuidelineHRM />,
    "Innovator of the year (team)": <GuidelineInnovator />,
    "Oil & gas Production Company of the year More than or equal to 1 MMTOE": <GuidelineOilGas />,
    "Oil & gas Production Company of the year Less than 1 MMTOE": <GuidelineOilGas />,
    "Oil Marketing Company of the Year": <GuidelineOilmarketing />,
    "Pipeline Transportation Company of the year": <GuidelinePipeline />,
    "Refinery of the Year": <GuidelineRefinery />,
    "Service Provider of the Year": <GuidelineService />,
    "Woman Executive of the Year": <GuidelineWoman />,
    "Exploration Company of the Year": <GuidelineExploration />,
    "Overseas Oil & Gas Company of the Year":<GuidelineOverseas/>,
    "CBG Company of the Year":<GuidelineCBG/>,
    "Digital Technology Provider of the Year":<GuidelineDigital/>,
    "Pipeline Transportation Company of the Year":<GuidelinePipeline/>
  };

  const shouldShowGuideline =
    activeItem === "Guideline" && guidelineMap[selectedAwardCategory];

  // Include Home at the top of the sidebar items
  const fullSidebarItems = [
    { id: "Home", label: "Home" },
    ...sidebarItems,
  ];

  return (
  
    <div className="sidebarr-container">
      <div className={`sidebarr ${isOpen ? 'open' : ''}`}>
        {Array.isArray(fullSidebarItems) &&
          fullSidebarItems.map((item) => (
            <div
              key={item.id}
              className={`nav flex-column nav-pills ${activeItem === item.id ? 'active' : ''}`}
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <div
                className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                <a href={`#${item.id}`}>{item.label}</a>
              </div>
            </div>
          ))}
      </div>

      {shouldShowGuideline && (
        <div className="sidebarr-content">
          <div className="guideline-container">
            {guidelineMap[selectedAwardCategory]}
          </div>
        </div>
      )}
    </div>

  );
};

export default SidebarGuideline;
