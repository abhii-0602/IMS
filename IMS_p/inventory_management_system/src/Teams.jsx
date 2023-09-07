import React from "react";
import { useState } from "react";
import axios from "axios";

const Teams = () => {
  const [team, setTeam] = useState({
    teamName: '', 
    managerName: '', 
    managerGID: '', 
    managerEmailID: ''
  });

  function saveData() {
    axios
      .post("https://localhost:7071/api/Team", team)
      .then((res) => {
        alert(res.data);
      });
  }

  return (
    <>
      <h1>Inventory Management System</h1>
      <body>
        <div className="IContainer">
          <div className="innercontainer">
            <div className="team-add">
            <div>
              <label style={{ marginRight: "5rem" }}>
                <strong>
                   Team name: 
                </strong>
              </label>

              <input
                className="inp"
                style={{
                  width: "30rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                type="text"
                name="name"
                value={team.teamName}
                onChange={(e) => {
                  setTeam({...team, teamName: e.target.value});
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "3.2rem" }}>
                <strong>
                  Manager Name: 
                </strong>
              </label>

              <input
                className="inp"
                style={{
                  width: "30rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                type="text"
                name="manager"
                value={team.managerName}
                onChange={(e) => {
                  setTeam({...team, managerName: e.target.value});
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "4.2rem" }}>
                <strong>
                  Manager GID:
                </strong>
              </label>

              <input
                className="inp"
                style={{
                  width: "30rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                type="text"
                name="manager"
                value={team.managerGID}
                onChange={(e) => {
                  setTeam({...team, managerGID: e.target.value});

                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "2rem" }}>
                <strong>
                  Manager Email ID: 
                </strong>
              </label>

              <input
                className="inp"
                style={{
                  width: "30rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                type="text"
                name="manager"
                value={team.managerEmailID}
                onChange={(e) => {
                  setTeam({...team, managerEmailID: e.target.value});
                }}
              />
            </div>

            <div style={{ display: "flex",justifyContent: "flex-end",}}>
              <button style={{width: '20%'}} className="btn" type="submit" onClick={saveData}>
                Save
              </button>
            </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Teams;
