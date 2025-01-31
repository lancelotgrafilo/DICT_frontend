import { useState, useEffect } from "react";
import styleModulesList from "./modulesList.module.css";
import useGetModules from "../../utils/Hooks/ModulesHooks/useGetModules";
import usePostModule from "../../utils/Hooks/ModulesHooks/usePostModule";
import useDeleteModule from "../../utils/Hooks/ModulesHooks/useDeleteModule";
import useUpdateModule from "../../utils/Hooks/ModulesHooks/useUpdateModule";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

export function ModulesList() {
  const { modules, refetch } = useGetModules();
  const { postModule, loading: postLoading, error: postError, success: postSuccess } = usePostModule();
  const { deleteModule, loading: deleteLoading, error: deleteError, success: deleteSuccess } = useDeleteModule();
  const { updateModule, loading: updateLoading, error: updateError, success: updateSuccess } = useUpdateModule();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  const sortedModules = [...modules]
    .sort((a, b) => {
      const order = { Beginner: 1, Intermediate: 2, Technical: 3 };
      return order[a.difficulty] - order[b.difficulty];
    })
    .filter((module) =>
      module.module_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDifficulty ? module.difficulty === selectedDifficulty : true)
    );

  useEffect(() => {
    if (postSuccess) {
      toast.success("New module successfully added!");
      refetch();
    }
    if (postError) {
      toast.error(`Error: ${postError}`);
    }
  }, [postSuccess, postError, refetch]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Module successfully updated!");
      refetch();
    }
    if (updateError) {
      toast.error(`Error: ${updateError}`);
    }
  }, [updateSuccess, updateError, refetch]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Module successfully deleted!");
      refetch();
    }
    if (deleteError) {
      toast.error(`Error: ${deleteError}`);
    }
  }, [deleteSuccess, deleteError, refetch]);

  const handleEdit = (moduleId) => {
    const module = modules.find((module) => module._id === moduleId);
    setCurrentModule(module);
    setShowModal(true);
  };

  const handleDelete = (moduleId) => {
    setModuleToDelete(moduleId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteModule(moduleToDelete);
    setShowDeleteConfirmation(false);
    setModuleToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setModuleToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentModule(null);
  };

  const handleAddModule = () => {
    setCurrentModule(null);
    setShowModal(true);
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
      updateModule(currentModule._id, moduleData);
    } else {
      postModule(moduleData);
    }
    setShowModal(false);
  };

  const handleView = (moduleId) => {
    const module = modules.find((module) => module._id === moduleId);
    if (module) {
      toast.info(`Viewing Module: ${module.module_name}`);
    }
  };

  return (
    <div className={styleModulesList.mainContent}>
      <div className={styleModulesList.card}>
        {/* Search, Dropdown, and Add Module Button */}
        <div className={styleModulesList.searchBarContainer} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <input
            type="text"
            className={styleModulesList.searchBar}
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => {
              let sanitizedInput = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
              sanitizedInput = sanitizedInput.slice(0, 50);
              setSearchTerm(sanitizedInput);
            }}
          />
          <select
            value={selectedDifficulty}
            style={{ width: "30%" }}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="form-select"
          >
            <option value="">Category Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Technical">Technical</option>
          </select>
          <button className={styleModulesList.btn_add} onClick={handleAddModule} style={{display: "flex", alignItems: "center", gap: "5px" }}>
            <FaPlus /> Add Module
          </button>
        </div>

        {/* Modules Table */}
        <div className={styleModulesList.tableContainer}>
          <table className={styleModulesList.table}>
            <thead>
              <tr>
                <th style={{ width: "20%", textAlign: "center", verticalAlign: "middle" }}>Module Name</th>
                <th style={{ width: "40%", textAlign: "center", verticalAlign: "middle" }}>Description</th>
                <th style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>Difficulty</th>
                <th style={{ width: "25%", textAlign: "center", verticalAlign: "middle" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedModules.length > 0 ? (
                sortedModules.map((module) => (
                  <tr key={module._id}>
                    <td>{module.module_name}</td>
                    <td>{module.module_description}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>{module.difficulty}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                      <button className={styleModulesList.btn_primary} onClick={() => handleView(module._id)}>
                        <FaEye /> View
                      </button>
                      <button className={styleModulesList.btn_submit} onClick={() => handleEdit(module._id)}>
                        <FaEdit /> Edit
                      </button>
                      <button className={styleModulesList.btn_cancel} onClick={() => handleDelete(module._id)}>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "10px", color: "gray" }}>
                    No Modules Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className={styleModulesList.modalOverlay}>
          <div className={styleModulesList.modal}>
            <h2>{currentModule ? "Edit Module" : "Add Module"}</h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

              <input
                type="text"
                name="module_name"
                placeholder="Module Name"
                defaultValue={currentModule?.module_name || ""}
                required
              />

              <textarea
                name="module_description"
                placeholder="Module Description"
                defaultValue={currentModule?.module_description || ""}
                required
              />

              <select name="difficulty" defaultValue={currentModule?.difficulty || ""} required>
                <option value="">Category Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Technical">Technical</option>
              </select>

              <div className={styleModulesList.buttonContainer}>
                {/* Cancel Button First */}
                <button type="button" className={styleModulesList.modal_btn_cancel} onClick={handleCloseModal}>
                  Cancel
                </button>
                {/* Submit Button Second */}
                <button type="submit" className={styleModulesList.modal_btn_primary}>
                  {currentModule ? "Update" : "Add"} Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className={styleModulesList.modalOverlay}>
          <div className={styleModulesList.modal}>
            <h2>Are you sure you want to delete this module?</h2>
            <div className={styleModulesList.buttonContainer}>
              {/* Cancel Button */}
              <button type="button" className={styleModulesList.modal_btn_cancel} onClick={handleCancelDelete}>
                Cancel
              </button>
              {/* Confirm Delete Button */}
              <button type="button" className={styleModulesList.modal_btn_primary} onClick={handleConfirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
