import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/modal.css";

const ExpenseFolderModal = ({ isOpen, closeModal, navLinks }) => {
  const [expenseFolder, setExpenseFolder] = useState({
    folderName: "",
    userId: null,
  });

  const location = useLocation();
  const navigation = useNavigate();
  const currentUserId = location.pathname.split("/")[2].split("#")[0];
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/api/v1/addExpenseFolder",
        expenseFolder
      );
      closeModal(false);
      if (navLinks) {
        if (navLinks[0].href) {
          navigation(navLinks[0].href);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setExpenseFolder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      userId: currentUserId,
    }));
    console.log(expenseFolder);
  };

  const handleOutsideModalClick = (e) => {
    e.preventDefault();
    closeModal(false);
    if (navLinks) {
      if (navLinks[0].href) {
        navLinks[1].current = false;
        navLinks[0].current = true;
        navigation(navLinks[0].href);
      }
    }
  };

  // this function will handle clicks inside the modal content
  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating to the overlay
  };

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      onClick={handleOutsideModalClick}
    >
      <div className="modal-overlay">
        <div className="modal-content" onClick={handleContentClick}>
          <div className="modal-title-container">
            <h1 className="modal-title">Add Expense Folder</h1>
          </div>

          <div className="modal-form-container">
            <form className="modal-form" onSubmit={handleSubmit}>
              <label>Name:</label>
              <div className="model-form-input-container">
                <input type="text" name="folderName" onChange={handleChange} />
              </div>

              <div className="modal-button-container">
                <button className="modal-button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFolderModal;
