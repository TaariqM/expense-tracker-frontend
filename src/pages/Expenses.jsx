import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ExpensesModal from "./ExpensesModal";
import EditExpenseModal from "./EditExpenseModal";
import SignOutModal from "./SignOutModal";
import NavigationBar from "./NavigationBar";
import sumOfTotalExpenses from "../calculation/SumOfTotalExpenses";
import "../styling/expenses.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [expensefolderName, setExpenseFolderName] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModelOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState({});
  const [navigation, setNavigation] = useState([]);

  const location = useLocation();
  const expFolderId = location.pathname.split("/")[3];
  const userId = location.pathname.split("/")[1];

  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleRowClick = (e, item) => {
    e.preventDefault();
    setIsEditModalOpen(true);
    setExpenseToEdit(item);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const expenseFolderData = await axios.get(
          "http://localhost:8800/api/v1/expenseFolder/" +
            userId +
            "/" +
            expFolderId
        );
        setExpenseFolderName(expenseFolderData.data[0].name);

        const allExpenses = await axios.get(
          "http://localhost:8800/api/v1/expense/" + userId + "/" + expFolderId
        );
        setExpenses(allExpenses.data); // the axios responses are usually in a 'data' property

        const userData = await axios.get(
          "http://localhost:8800/api/v1/user/" + userId
        );

        setNavigation([
          {
            name: "Dashboard",
            href: `/dashboard/${
              userData.data[0].user_id
            }/${userData.data[0].first_name.toLowerCase()}${"-"}${userData.data[0].last_name.toLowerCase()}`,
            current: true,
          },
          {
            name: "Sign Out",
            href: "",
            current: false,
          },
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [userId, expFolderId]);

  return (
    <div className="container">
      <div className="main-table-container">
        <NavigationBar
          navigation={navigation}
          setNavigation={setNavigation}
          openSignOutModal={setIsSignOutModelOpen}
          link={location.pathname}
        />
        <div className="header-btn-section">
          <div className="header-section">
            <h1>{expensefolderName}</h1>
          </div>

          <div className="btn-section">
            <button className="add-expense-btn" onClick={handleClick}>
              Add Expense
            </button>
          </div>
        </div>

        <div className="table-section-container">
          <table>
            <thead>
              <tr>
                <th>
                  <div>Name</div>
                </th>
                <th>
                  <div>Amount</div>
                </th>
                <th>
                  <div>Category</div>
                </th>
                <th>
                  <div>Description</div>
                </th>
                <th>
                  <div>Date</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.expense_id}
                  onClick={(e) => handleRowClick(e, expense)}
                >
                  <td>{expense.title}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>{expense.category}</td>
                  <td>{expense.desc}</td>
                  <td>{new Date(expense.date).toISOString().split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="total-amount-container">
        <div className="total-header">
          <h1>Total Amount: </h1>
        </div>

        <div className="total-amount">
          <h2>${sumOfTotalExpenses(expenses).toFixed(2)}</h2>
        </div>
      </div>

      {isModalOpen && (
        <ExpensesModal
          isOpen={isModalOpen}
          closeModal={setIsModalOpen}
          userId={userId}
          expenseFolderId={expFolderId}
          navLink={location.pathname}
        />
      )}

      {isEditModalOpen && (
        <EditExpenseModal
          isOpen={isEditModalOpen}
          closeModal={setIsEditModalOpen}
          userId={userId}
          expenseFolderId={expFolderId}
          navLink={location.pathname}
          expense={expenseToEdit}
        />
      )}

      {isSignOutModalOpen && (
        <SignOutModal
          isOpen={isSignOutModalOpen}
          closeModal={setIsSignOutModelOpen}
          navLinks={navigation}
        />
      )}
    </div>
  );
};

export default Expenses;
