import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({
  navigation,
  setNavigation,
  openModal,
  openSignOutModal,
  link,
}) => {
  let classname = {
    selected: "item-selected",
    notSelected: "item-notSelected",
  };

  const urlCheck = () => {
    if (link && navigation[0]?.href) {
      if (link === navigation[0].href) {
        navigation[0].current = true;
      } else {
        navigation[0].current = false;
      }
    }
  };

  urlCheck();
  const navigate = useNavigate();

  const handleClick = (clickedItem, e) => {
    e.preventDefault();
    // Update the state to mark the clicked item as current
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: item.name === clickedItem.name,
      }))
    );

    if (clickedItem.name === "Add Expense Folder") {
      openModal(true);
    }

    if (clickedItem.name === "Dashboard") {
      navigate(navigation[0].href);
    }

    if (clickedItem.name === "Sign Out") {
      openSignOutModal(true);
    }
  };

  return (
    <nav className="navigation-bar-container">
      <div className="navigation-bar">
        <div className="navigation-bar-items-container">
          <div className="navigation-bar-items">
            <div className="navigation-items">
              <div className="items">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={
                      item.current ? classname.selected : classname.notSelected
                    }
                    aria-current={item.current ? "page" : undefined}
                    onClick={(e) => handleClick(item, e)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
