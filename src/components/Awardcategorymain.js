import { useState } from "react";
import "../styles/AwardCategory.css";
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Awardcategorymain = () => {
  const [awardCategories, setAwardCategories] = useState([
    { id: 1, name: "Exploration Company of the Year" },
    { id: 2, name: "Best Start-up in the Energy Sector" },
    { id: 3, name: "Oil & Gas Production Company of the Year" },
    { id: 4, name: "Refinery of the Year" },
    {
      id: 5,
      name: "Service Provider of the Year",
      subCategories: ["EPC Company of the Year"],
    },
    { id: 6, name: "Oil Marketing Company of the Year" },
    { id: 7, name: "Best Managed Project of the Year" },
    { id: 8, name: "Oil & Gas Retailer of the Year" },
    { id: 9, name: "Digitally Advanced company of the Year" },
    { id: 10, name: "Excellence in Human Resource Management - Company of the Year" },
    { id: 11, name: "Digitally Technology Provider of the Year" },
    { id: 12, name: "Sustainably Growing Corporate of the Year" },
    { id: 13, name: "CGD Company of the Year" },
    { id: 14, name: "Woman Executive of the year: Service exp. > 15 yrs" },
    { id: 15, name: "Innovator of the Year (Team)" },
    {
      id: 16,
      name: "Young Achiever of the year in the Oil & Gas Industry",
      subCategories: ["Male", "Female"],
    },
    {
      id: 17,
      name: "Clean Energy Awards",
      subCategories: [
        "Compressed Bio Gas - Company of the year",
        "Initiatives in CCUS - Company of the year",
        "Initiatives in Promoting Hydrogen - Company of the year",
        "Renewable energy generation (Wind & Solar)Energy - Company of the year",
      ],
    },
    { id: 18, name: "Pipeline Transportation Company of the Year" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentCategory, setCurrentCategory] = useState({ name: "", subCategories: [] });
  const [editIndex, setEditIndex] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openAddModal = () => {
    setModalMode("add");
    setCurrentCategory({ name: "", subCategories: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (index) => {
    setModalMode("edit");
    setEditIndex(index);
    setCurrentCategory({
      ...awardCategories[index],
      subCategories: awardCategories[index].subCategories || [], // Default to empty array
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({
      ...prev,
      [name]: name === "subCategories" ? value.split(",") : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      setAwardCategories([...awardCategories, { ...currentCategory, id: Date.now() }]);
    } else {
      const updated = [...awardCategories];
      updated[editIndex] = currentCategory;
      setAwardCategories(updated);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;
    const updated = [...awardCategories];
    updated.splice(index, 1);
    setAwardCategories(updated);
  };

  return (
    <div className="award-category-container">
      <div className="award-category-header">
        <h2>Award Categories</h2>
        <div className="award-actions">
          <button className="action-btn add" onClick={openAddModal} title="Add Category">
            <FaPlus />
          </button>
        </div>
      </div>

      <ul className="award-list">
        {awardCategories.map((category, index) => (
          <li key={category.id} className={`award-item ${expandedItems[category.id] ? "active" : ""}`}>
            <div
              className="award-name"
              onClick={() => toggleExpand(category.id)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              {category.name}
              {category.subCategories && (
                <span>{expandedItems[category.id] ? <FaChevronUp /> : <FaChevronDown />}</span>
              )}
            </div>
            
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{modalMode === "add" ? "Add Award Category" : "Edit Award Category"}</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentCategory.name}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Subcategories (comma-separated):
                <input
                  type="text"
                  name="subCategories"
                  value={currentCategory.subCategories.join(",")}
                  onChange={handleFormChange}
                />
              </label>
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Awardcategorymain;