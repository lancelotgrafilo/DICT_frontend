import { useState, useEffect } from "react";
import styleModulesList from "./modulesList.module.css";
import useGetModules from "../../utils/Hooks/ModulesHooks/useGetModules";
import usePostModule from "../../utils/Hooks/ModulesHooks/usePostModule";
import useDeleteModule from "../../utils/Hooks/ModulesHooks/useDeleteModule";
import useUpdateModule from "../../utils/Hooks/ModulesHooks/useUpdateModule";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import Bootstrap icons
import { toast } from "react-toastify";  // Import toastify

export function ModulesList() {
  const { modules, refetch } = useGetModules(); // Hook to fetch modules
  const { postModule, loading: postLoading, error: postError, success: postSuccess } = usePostModule();
  const { deleteModule, loading: deleteLoading, error: deleteError, success: deleteSuccess } = useDeleteModule();
  const { updateModule, loading: updateLoading, error: updateError, success: updateSuccess } = useUpdateModule();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(""); // New state for difficulty filter
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
      module.module_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDifficulty ? module.difficulty === selectedDifficulty : true) // Apply difficulty filter
    );

  useEffect(() => {
    if (postSuccess) {
      toast.success("New module successfully added!");
      refetch(); // Refetch data after adding module
    }
    if (postError) {
      toast.error(`Error: ${postError}`);
    }
  }, [postSuccess, postError, refetch]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Module successfully updated!");
      refetch(); // Refetch data after updating module
    }
    if (updateError) {
      toast.error(`Error: ${updateError}`);
    }
  }, [updateSuccess, updateError, refetch]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Module successfully deleted!");
      refetch(); // Refetch data after deleting module
    }
    if (deleteError) {
      toast.error(`Error: ${deleteError}`);
    }
  }, [deleteSuccess, deleteError, refetch]);

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
    // Call delete hook to delete the module
    deleteModule(moduleToDelete);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const moduleData = {
      module_name: formData.get("module_name"),
      module_description: formData.get("module_description"),
      difficulty: formData.get("difficulty"),
    };

    if (currentModule) {
      // Update the module
      updateModule(currentModule._id, moduleData);
    } else {
      // Add a new module
      postModule(moduleData);
    }
    setShowModal(false); // Close the modal after submission
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
          <select
            className={styleModulesList.difficultySelect}
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)} // Difficulty filter
          >
            <option value="">All Difficulty Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Technical">Technical</option>
          </select>
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="module_name"
                placeholder="Module Name"
                defaultValue={currentModule ? currentModule.module_name : ""}
              />
              <textarea
                name="module_description"
                placeholder="Module Description"
                defaultValue={currentModule ? currentModule.module_description : ""}
              />
              <select
                name="difficulty"
                defaultValue={currentModule ? currentModule.difficulty : "Beginner"}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Technical">Technical</option>
              </select>
              <button type="submit" disabled={postLoading || updateLoading}>
                {currentModule ? "Update" : "Add"} Module
              </button>
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
              <button onClick={handleConfirmDelete} disabled={deleteLoading}>
                Yes, Delete
              </button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
