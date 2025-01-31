import { useState } from "react";
import styleModulesList from "./modulesList.module.css";
import useGetModules from "../../utils/Hooks/ModulesHooks/useGetModules";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import Bootstrap icons

export function ModulesList() {
  const { modules } = useGetModules(); // Assuming this hook fetches the module data
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Delete confirmation modal state
  const [currentModule, setCurrentModule] = useState(null); // To store the module being edited
  const [moduleToDelete, setModuleToDelete] = useState(null); // Store module to delete

  const sortedModules = [...modules]
    .sort((a, b) => {
      const order = { Beginner: 1, Intermediate: 2, Technical: 3 };
      return order[a.difficulty] - order[b.difficulty];
    })
    .filter((module) =>
      module.module_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleEdit = (moduleId) => {
    // Set current module and show the modal for editing
    const module = modules.find((module) => module._id === moduleId);
    setCurrentModule(module);
    setShowModal(true);
  };

  const handleDelete = (moduleId) => {
    // Set the module to delete and show confirmation modal
    setModuleToDelete(moduleId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    // Add your delete logic here
    console.log(`Delete module with ID: ${moduleToDelete}`);
    setShowDeleteConfirmation(false);
    setModuleToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setModuleToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
    setCurrentModule(null); // Reset current module
  };

  const handleAddModule = () => {
    setCurrentModule(null); // No module selected for adding
    setShowModal(true); // Show modal for adding
  };

  return (
    <div className={styleModulesList.mainContent}>
      <div className={styleModulesList.card}>
        <div className={styleModulesList.searchBarContainer}>
          <input
            type="text"
            className={styleModulesList.searchBar}
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={styleModulesList.addModuleButton}
            onClick={handleAddModule}
          >
            Add Module
          </button>
        </div>
        <div className={styleModulesList.tableContainer}>
          <table className={styleModulesList.table}>
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Description</th>
                <th>Difficulty</th>
                <th>Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {sortedModules.map((module) => (
                <tr key={module._id}>
                  <td>{module.module_name}</td>
                  <td>{module.module_description}</td>
                  <td>{module.difficulty}</td>
                  <td>
                    {/* Action buttons */}
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(module._id)}
                    >
                      <FaEdit /> {/* Edit icon */}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(module._id)}
                    >
                      <FaTrash /> {/* Delete icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay for Add/Edit */}
      {showModal && (
        <div className={styleModulesList.modalOverlay}>
          <div className={styleModulesList.modal}>
            <h2>{currentModule ? "Edit Module" : "Add Module"}</h2>
            <form>
              {/* Add input fields for module details here */}
              <input
                type="text"
                placeholder="Module Name"
                defaultValue={currentModule ? currentModule.module_name : ""}
              />
              <textarea
                placeholder="Module Description"
                defaultValue={currentModule ? currentModule.module_description : ""}
              />
              <select
                defaultValue={currentModule ? currentModule.difficulty : "Beginner"}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Technical">Technical</option>
              </select>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Overlay for Delete Confirmation */}
      {showDeleteConfirmation && (
        <div className={styleModulesList.modalOverlay}>
          <div className={styleModulesList.modal}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this module?</p>
            <div>
              <button onClick={handleConfirmDelete}>Yes, Delete</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
