import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <header className="header">
        <h1 className="pageTitle">Inventory Management System</h1>
      </header>

      <div className="buttonContainer">
        <div className="buttonBox">
          <ul className="buttonList">
            <li>
              <button
                onClick={() => navigate("/AddPackage")}
                type="button"
                className="btn btn-lg"
              >
                Add Package
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/viewPackage")}
                type="button"
                className="btn btn-lg"
              >
                View Package
              </button>
            </li>

            <li>
              <button type="button" className="btn btn-lg">
                Add Component
              </button>
            </li>

            <li>
              <button type="button" className="btn btn-lg">
                View Component
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/viewAllTeams")}
                type="button"
                className="btn btn-lg"
              >
                Teams
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/addViewCategory")}
                type="button"
                className="btn btn-lg"
              >
                Add/View Category
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
