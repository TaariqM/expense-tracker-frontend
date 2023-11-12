import React from "react";
import { useNavigate } from "react-router-dom";
import "../styling/sign_out_modal.css";

const SignOutModal = ({ isOpen, closeModal, navLinks }) => {
  const navigation = useNavigate();

  const setCurrentValue = (links) => {
    if (links) {
      if (links[0].href) {
        links[0].current = true;
        links[links.length - 1].current = false;
      }
    } else {
      links[links.length - 1].current = false;
    }
  };

  const handleOutsideModalClick = (e) => {
    e.preventDefault();
    closeModal(false);
    setCurrentValue(navLinks);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (e.target.name === "yes") {
      navigation("/");
    } else {
      closeModal(false);
      setCurrentValue(navLinks);
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      onClick={handleOutsideModalClick}
    >
      <div className="modal-overlay">
        <div className="modal-content" onClick={handleContentClick}>
          <div className="sign-out-modal-title-container">
            <h1 className="modal-title">Signing Out?</h1>
          </div>

          <div className="sign-out-modal-button-container">
            <button
              className="sign-out-modal-button"
              name="yes"
              onClick={handleButtonClick}
            >
              Yes
            </button>

            <button
              className="sign-out-modal-button"
              name="no"
              onClick={handleButtonClick}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
