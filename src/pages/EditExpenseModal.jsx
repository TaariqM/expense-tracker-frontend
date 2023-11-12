import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/edit_expense_modal.css";

const EditExpenseModal = ({
  isOpen,
  closeModal,
  userId,
  expenseFolderId,
  navLink,
  expense,
}) => {
  const [newExpense, setNewExpense] = useState({
    user_Id: userId,
    expenseFolder_Id: expenseFolderId,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    desc: expense.desc,
    date: new Date(expense.date).toISOString().split("T")[0],
  });

  const navigation = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      await axios.post(
        "http://localhost:8800/api/v1/expense/" + expense.expense_id,
        newExpense
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    try {
      await axios.delete(
        "http://localhost:8800/api/v1/expense/" + expense.expense_id
      );
    } catch (err) {
      console.log(err);
    }
  };

  // this function will handle clicks inside the modal content
  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating to the overlay
    console.log(newExpense.date);
    // console.log(expense);
  };

  const handleOutsideModalClick = (e) => {
    e.preventDefault();
    closeModal(false);
    if (navLink) {
      navigation(navLink);
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
            <h1 className="modal-title">Expense</h1>
          </div>

          <div className="modal-form-container">
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="container">
                <label>Name:</label>
                <div className="model-form-input-container">
                  <input
                    type="text"
                    name="title"
                    value={newExpense.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="container">
                <label>Amount:</label>
                <div className="model-form-input-container">
                  <input
                    type="number"
                    name="amount"
                    step=".01"
                    value={newExpense.amount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="container">
                <label>Category:</label>
                <div className="model-form-input-container">
                  <input
                    type="text"
                    name="category"
                    value={newExpense.category}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="container">
                <label>Description:</label>
                <div className="model-form-input-container">
                  <input
                    type="text"
                    name="desc"
                    value={newExpense.desc}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="container">
                <label>Date:</label>
                <div className="model-form-input-container">
                  <input
                    type="date"
                    name="date"
                    value={newExpense.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="edit-modal-button-container">
                <button className="edit-modal-button" type="submit">
                  Update
                </button>

                <button className="edit-modal-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
