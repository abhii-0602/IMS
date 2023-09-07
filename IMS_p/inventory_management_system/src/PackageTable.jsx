import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import PackageEdit from "./PackageEdit";
import moment from "moment";
//import ReactHTMLTableToExcel from "react-html-table-to-excel";
//import XLSX from "xlsx";
import * as XLSX from "xlsx/xlsx";

const PackageTable = () => {
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);

  const getDetails = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7071/api/Package/getAllPackages"
      );

      setDetails(response.data);
      setFilteredDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    filterDetails();
  }, [search, details]);

  const filterDetails = () => {
    const filtered = details.filter((detail) =>
      Object.values(detail)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredDetails(filtered);
  };

  const columns = [
    {
      name: <strong>Package Id</strong>,
      selector: (row) => row.packageId,
      sortable: true,
      center: true,
    },
    {
      name: <strong>Tracking Id</strong>,
      selector: (row) => row.trackingId,
      center: true,
    },
    {
      name: <strong>Date</strong>,
      selector: (row) => row.date,
      sortable: true,
      center: true,
    },
    {
      name: <strong>Sender's Name</strong>,
      selector: (row) => row.senderName,
      center: true,
    },
    {
      name: <strong>Receiver's Name</strong>,
      selector: (row) => row.recieverName,
      center: true,
    },
   
    {
      name: <strong>Action</strong>,
      cell: (row) => (
        <Link to={`/PackageEdit/${row.packageId}`} className="btn-team-edit">
          Edit
        </Link>
      ),
      selector: (row) => row.category?.trim()?.split(" ")?.join(", "),
    },
  ];
  const handleOnExport = () => {

    var workbook = XLSX.utils.book_new(),

      worksheet = XLSX.utils.json_to_sheet(details);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Mysheet1");

    XLSX.writeFile(workbook, "Package_Details.xlsx");

  };

  return (
    <>
      <div className="main">
        <h1>Inventory Management System</h1>

        <DataTable
          title={<strong>Package Details</strong>}
          columns={columns}
          data={filteredDetails}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="900px"
          highlightOnHover
          actions={

            <button className="btn btn-sm btn-success export-btn" onClick={handleOnExport}>

              Export Data

            </button>

          }
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search"
              className="w-25 form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      </div>
    </>
  );
};

export default PackageTable;
