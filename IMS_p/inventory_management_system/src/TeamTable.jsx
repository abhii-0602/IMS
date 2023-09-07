import axios from "axios";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Teams from "./Teams";
import TeamEdit from "./TeamEdit";

const TeamTable = () => {
  const [search, setSearch] = useState("");
  const [Details, setDetails] = useState([]);
  const [fliteredDetails, setFilteredDetails] = useState([]);
  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7071/api/Team"
      );
      console.log(response)
      setDetails(response.data);
      setFilteredDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: (
        <strong>
          Team Name
        </strong>
      ),
      selector: (row) => row.teamName,
      sortable: true,
    },
    {
      name: (
        <strong>
          Manager Name
        </strong>
      ),
      selector: (row) => row.managerName,
    },
    {
      name: (
        <strong>
          Manager GID
        </strong>
      ),
      selector: (row) => row.managerGID,
      sortable: true,
    },
    {
      name: (
        <strong>
          Manager Email ID
        </strong>
      ),
      selector: (row) => row.managerEmailID,
    },
    {
      name: (
        <strong>
          Edit
        </strong>
      ),
      selector: (row) => (

        <Link to={`/TeamEdit/${row.teamID}`} className="btn-team-edit">
          Edit
        </Link>
      ),
    },
  ];

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    const result = Details.filter((detail) => {
      return detail.teamName.toLowerCase().match(search.toLowerCase());
    });
    setFilteredDetails(result);
  }, [search]);

  return (
    <>
    <h1>Inventory Management System</h1>
      <div className="main"> 
      <div className="col-12">
        <div className="row">
          <div className="col-6">
            <div className="headline">
              <strong style={{ fontSize: '30px', margin: '0.5rem' }}>Teams</strong>
            </div>     
          </div>
          <div className="col-6">
          <div style={{ display: 'flex', justifyContent: 'Right', padding: '1.5rem' }}>
            <button
              className="btn"
              type="submit"
              onClick={() => navigate('/addTeam')}
              style={{ marginLeft: '1rem' }}
            >
              Add Team
            </button>
          </div>
          </div>
        </div>
      </div>
       
      
        <DataTable

          columns={columns}
          data={fliteredDetails}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="900px"
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="search team..."
              className=" w-25 form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          }
        />
      </div>
      
    </>
  );
};

export default TeamTable;
