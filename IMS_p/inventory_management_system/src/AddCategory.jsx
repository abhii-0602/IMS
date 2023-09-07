import axios from "axios";
import { useState, useEffect } from "react";
import PopupComponent from "./PopupComponent";
import DataTable from "react-data-table-component";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const AddCategory = () => {
  const { data, error, mutate } = useSWR("https://localhost:7071/api/Category", fetcher);

  const [category, setCategory] = useState({
    id: 0,
    categoryName: "",
    count: 0,
  });
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupAdded, setShowPopupAdded] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (error) {
      console.error("Error fetching data", error);
    } else if (data) {
      setDetails(data);
      setFilteredDetails(data);
    }
  }, [data, error]);

  function saveData() {
    if (editingId) {
      const updatedCategory = details.find((item) => item.id === editingId);
      axios
        .put(`https://localhost:7071/api/Category/${editingId}`, { categoryName: updatedCategory.categoryName })
        .then((res) => {
          //setShowPopupAdded(true);
          mutate();
          setEditingId(null);
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setShowPopup(true);
          } else {
            console.log(error.message);
          }
        });
    } else {
      axios
        .post("https://localhost:7071/api/Category", category)
        .then((res) => {
          setShowPopupAdded(true);
          mutate();
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setShowPopup(true);
          } else {
            console.log(error.message);
          }
        });
    }
  }

  useEffect(() => {
    const result = details.filter((detail) => {
      return detail.categoryName.toLowerCase().match(search.toLowerCase());
    });
    setFilteredDetails(result);
  }, [search, details]);
  const columns = [
    {
      name: <strong>Category ID</strong>,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: <strong>Category Name</strong>,
      selector: (row) => {
        if (row.id === editingId) {
          return (
            <input
              type="text"
              value={row.categoryName}
              onChange={(e) => {
                const updatedCategory = { ...row, categoryName: e.target.value };
                setDetails((prevState) =>
                  prevState.map((item) => (item.id === editingId ? updatedCategory : item))
                );
              }}
            />
          );
        } else {
          return row.categoryName;
        }
      },
      sortable: true,
    },
    {
      name: <strong>Category Count</strong>,
      selector: (row) => row.count,
    },
    {
      name: <strong>Action</strong>,
      cell: (row) => {
        if (row.id === editingId) {
          return (
            <button onClick={saveData}>Save</button>
          );
        } else {
          return (
            <button onClick={() => handleEdit(row.id)}>Edit</button>
          );
        }
      },
    },
  ];
  
  
  // const columns = [
  //   {
  //     name: <strong>Category ID</strong>,
  //     selector: (row) => row.id,
  //     sortable: true,
  //   },
  //   {
  //     name: <strong>Category Name</strong>,
  //     selector: (row) => {
  //       if (row.id === editingId) {
  //         return (
  //           <div>
  //             <input
  //               type="text"
  //               value={row.categoryName}
  //               onChange={(e) => {
  //                 const updatedCategory = { ...row, categoryName: e.target.value };
  //                 setDetails((prevState) =>
  //                   prevState.map((item) => (item.id === editingId ? updatedCategory : item))
  //                 );
  //               }}
  //             />
  //             <button onClick={saveData}>Save</button>
  //           </div>
  //         );
  //       } else {
  //         return row.categoryName;
  //       }
  //     },
  //     sortable: true,
  //   },
  //   {
  //     name: <strong>Category Count</strong>,
  //     selector: (row) => row.count,
  //   },
  //   {
  //     name: <strong>Action</strong>,
  //     cell: (row) => (
  //       <button onClick={() => handleEdit(row.id)}>Edit</button>
  //     ),
  //   },
  // ];

  function handleEdit(id) {
    setEditingId(id);
  }

  return (

    <>

      <h1>Inventory Management System</h1>

      <div className="container">

          <strong style={{ fontSize: "28px", marginLeft: "-5rem" }}>Category</strong>

          <div className="category-add row" style={{ marginRight: "-200px" }}>

            <div className="col-6">

              <label style={{ marginRight: "5rem" }}>

                <strong>Category name:</strong>

              </label>

              <input

                className="inp"

                style={{

                  width: "25rem",

                  borderRadius: "0.5rem",

                  marginBottom: "1rem",

                  padding: "0.3rem",

                }}

                type="text"

                name="name"

                value={category.categoryName}

                onChange={(e) => {

                  setCategory({ ...category, categoryName: e.target.value });

                }}

              />

            </div>

            <div className="col-6 category-add-btn">

              <div

                className="category-add-div"

                style={{

                  display: "flex",

                  justifyContent: "flex-end",

                  marginRight: "-108px",

                  marginTop: "14px",

                  marginLeft: "60px",

                }}

              >

                <button

                  style={{

                    width: "50%",

                    padding: "7px",

                    marginLeft: "-3px",

                    borderRadius: "11px",

                    paddingTop: "6px",

                  }}

                  className="btn category-save-btn"

                  type="submit"

                  onClick={saveData}

                >

                  Save

                </button>

              </div>

              {showPopupAdded && <PopupComponent message="Category Added!" />}

              {showPopup && <PopupComponent message="Category already exists!" />}

            </div>

          </div>

       

      </div>

      <div>

        <DataTable

          columns={columns}

          data={filteredDetails}

          pagination

          fixedHeader

          fixedHeaderScrollHeight="900px"

          highlightOnHover

          subHeader

          subHeaderComponent={

            <input

              type="text"

              placeholder="search category..."

              className="form-control search-input"

              value={search}

              onChange={(e) => setSearch(e.target.value)}

            ></input>

          }

        />

      </div>

    </>

  );
};

export default AddCategory;
