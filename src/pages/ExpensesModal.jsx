import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/modal.css";

const ExpensesModal = ({
  isOpen,
  closeModal,
  userId,
  expenseFolderId,
  navLink,
}) => {
  const [expense, setExpense] = useState({
    user_Id: userId,
    expenseFolder_Id: expenseFolderId,
    title: "",
    amount: null,
    category: "",
    desc: "",
    date: "",
  });

  const navigation = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setExpense((prevExpense) => ({
      ...prevExpense,
      [e.target.name]: e.target.value,
    }));
  };

  // this function will handle clicks inside the modal content
  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating to the overlay
  };

  const handleOutsideModalClick = (e) => {
    e.preventDefault();
    closeModal(false);
    if (navLink) {
      navigation(navLink);
    }
  };

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:8800/api/v1/expense", expense);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      onClick={handleOutsideModalClick}
    >
      <div className="modal-overlay">
        <div className="modal-content" onClick={handleContentClick}>
          <div className="modal-title-container">
            <h1 className="modal-title">New Expense</h1>
          </div>

          <div className="modal-form-container">
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="container">
                <label>Name:</label>
                <div className="model-form-input-container">
                  <input type="text" name="title" onChange={handleChange} />
                </div>
              </div>

              <div className="container">
                <label>Amount:</label>
                <div className="model-form-input-container">
                  <input
                    type="number"
                    name="amount"
                    step=".01"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="container">
                <label>Category:</label>
                <div className="model-form-input-container">
                  <input type="text" name="category" onChange={handleChange} />
                </div>
              </div>

              <div className="container">
                <label>Description:</label>
                <div className="model-form-input-container">
                  <input type="text" name="desc" onChange={handleChange} />
                </div>
              </div>

              <div className="container">
                <label>Date:</label>
                <div className="model-form-input-container">
                  <input type="date" name="date" onChange={handleChange} />
                </div>
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

export default ExpensesModal;
