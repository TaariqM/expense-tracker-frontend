import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import ExpenseFolderModal from "./ExpenseFolderModal";
import NavigationBar from "./NavigationBar";
import "../styling/modal.css";
import SignOutModal from "./SignOutModal";

const Dashboard = () => {
  const [navigation, setNavigation] = useState([]);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModelOpen] = useState(false);
  const [expenseFolders, setExpenseFolders] = useState([]);
  const [inputFields, setInputFields] = useState({});
  const [expenseFolder, setExpenseFolder] = useState({});
  const [elementName, setElementName] = useState("edit");

  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.pathname.split("/")[2]; // this will get the id of the user

  // let elementName = {
  //   edit: "edit",
  //   update: "update",
  // }

  const handleCardClick = (folder, e) => {
    e.preventDefault();

    const isButton =
      e.target.tagName === "BUTTON" &&
      ["edit", "delete", "update"].includes(e.target.name);

    const isInput = e.target.tagName === "INPUT";

    if (!isButton && !isInput) {
      navigate(
        `/${userId}/${user.first_name.toLowerCase()}-${user.last_name.toLowerCase()}/${
          folder.expense_folder_id
        }/${folder.name}/expenses`
      );
    }
  };

  const handleButtonClick = async (expId, e) => {
    e.preventDefault();

    if (e.target.name === "edit") {
      setInputFields((prevFields) => ({
        ...prevFields,
        [expId]: !prevFields[expId],
      }));
      setElementName("update");
    }
    if (e.target.name === "update") {
      // console.log(
      //   expenseFolders.find((item) => item.expense_folder_id === expId)
      // );
      try {
        await axios.post(
          "http://localhost:8800/api/v1/expenseFolder/" + expId,
          expenseFolders.find((item) => item.expense_folder_id === expId)
        );
      } catch (err) {
        console.log(err);
      }
      setInputFields((prevFields) => ({
        ...prevFields,
        [expId]: !prevFields[expId],
      }));
      setElementName("edit");
    }

    if (e.target.name === "delete") {
      try {
        await axios.delete(
          "http://localhost:8800/api/v1/expenseFolder/" + expId
        );
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    }
  };

  const handleChange = (folderId, e) => {
    e.preventDefault();
    updateExpenseFolderName(folderId, e.target.value);
  };

  const updateExpenseFolderName = (folderId, newName) => {
    setExpenseFolders((prevExpenseFolders) => {
      return prevExpenseFolders.map((folder) => {
        if (folder.expense_folder_id === folderId) {
          // Update the name property for the target folder
          return { ...folder, name: newName };
        }

        // Return unchanged object for other folders
        return folder;
      });
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await axios.get(
          "http://localhost:8800/api/v1/user/" + userId
        );

        setUser({ ...userData.data[0] }); // the axios responses are usually in a 'data' property

        setNavigation([
          {
            name: "Dashboard",
            href: `/dashboard/${
              userData.data[0].user_id
            }/${userData.data[0].first_name.toLowerCase()}${"-"}${userData.data[0].last_name.toLowerCase()}`,
            current: true,
          },
          {
            name: "Add Expense Folder",
            href: "",
            current: false,
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

    const getExpenseFolderData = async () => {
      try {
        const expenseFolderData = await axios.get(
          "http://localhost:8800/api/v1/expenseFolder/" + userId
        );

        setExpenseFolders(expenseFolderData.data);

        const initialExpenseFolder = {};
        // expenseFolderData.data.forEach((folder) => {
        //   initialExpenseFolder[folder.expense_folder_id] = {
        //     name: folder.name,
        //   };
        // });
        Array.isArray(expenseFolderData.data) &&
          expenseFolderData.data.forEach((folder) => {
            initialExpenseFolder[folder.expense_folder_id] = {
              name: folder.name,
            };
          });

        setExpenseFolder(initialExpenseFolder);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
    getExpenseFolderData();
  }, [userId]);

  useEffect(() => {
    const initialInputFields = {};
    expenseFolders.forEach((expenseFolder) => {
      initialInputFields[expenseFolder.expense_folder_id] = false;
    });
    setInputFields(initialInputFields);
  }, []);

  return (
    <div className={`main ${isModalOpen ? "modal-open" : ""}`}>
      <NavigationBar
        navigation={navigation}
        setNavigation={setNavigation}
        openModal={setIsModalOpen}
        openSignOutModal={setIsSignOutModelOpen}
        link={location.pathname}
      />

      <div className="dashboard-container">
        <div className="dashboard-title-container">
          <h1 className="dashboard-title">{`${user.first_name}${" "}${
            user.last_name
          }${"'s"}${" Dashboard"}`}</h1>
        </div>
      </div>

      {expenseFolders.length === 0 ? (
        <div className="no-expenses">
          <h2>
            Please click the 'Add Expense Folder' button to create an Expense
            Folder
          </h2>
        </div>
      ) : (
        <div className="cards-container">
          {expenseFolders.map((expenseFolder) => (
            <div
              key={expenseFolder.expense_folder_id}
              className="card"
              onClick={(e) => handleCardClick(expenseFolder, e)}
            >
              <div className="card-title-container">
                {inputFields[expenseFolder.expense_folder_id] ? (
                  <div className="input-box-container">
                    <input
                      className="input-box"
                      type="text"
                      name="name"
                      value={
                        expenseFolders.find(
                          (item) =>
                            item.expense_folder_id ===
                            expenseFolder.expense_folder_id
                        ).name
                      }
                      onChange={(e) =>
                        handleChange(expenseFolder.expense_folder_id, e)
                      }
                    />
                  </div>
                ) : (
                  <h2 className="card-title">{expenseFolder.name}</h2>
                )}
              </div>

              <div className="buttons-container">
                <button
                  className="cardBtn"
                  name={elementName}
                  onClick={(e) =>
                    handleButtonClick(expenseFolder.expense_folder_id, e)
                  }
                >
                  {inputFields[expenseFolder.expense_folder_id]
                    ? "Update"
                    : "Edit"}
                </button>
                <button
                  className="cardBtn"
                  name="delete"
                  onClick={(e) =>
                    handleButtonClick(expenseFolder.expense_folder_id, e)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ExpenseFolderModal
          isOpen={isModalOpen}
          closeModal={setIsModalOpen}
          navLinks={navigation}
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

export default Dashboard;
