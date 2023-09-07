// Import necessary dependencies and modules
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import categories from "./category";
import SelectInput from "./SelectInput";

// Define the Apackage component
const Apackage = () => {
  // State declarations for different form inputs and states
  const [trackingId, setTrackingId] = useState("");
  const [myCategories, setMyCategories] = useState();
  const mydata = useMemo(() => {
    return new Map();
  }, []);
  const [date, setDate] = useState(new Date());
  const [senderName, setSenderName] = useState("");
  const [recieverName, setRecieverName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [category, setCategory] = useState("");
  const ref = useRef();

  // Fetch the categories and set them in the state when the component mounts
  useEffect(() => {
    setMyCategories(categories);
    return () => setMyCategories([]); // Clean up the state when the component unmounts
  }, [categories]);

  // Event handler to sanitize the trackingId input
  const handleTrackingIdChange = (event) => {
    const sanitizedValue = event.target.value
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .toUpperCase();
    setTrackingId(sanitizedValue);
  };

  // Function to add selected category to mydata Map and update category state
  const addData = (val, id) => {
    mydata.set(id, val);
    var str = "";
    for (const [key, value] of mydata) {
      str += " " + value;
    }
    setCategory(str);
  };

  // Function to remove category from mydata Map and update category state
  const uncheckit = (val, id) => {
    mydata.delete(id);
    var str1 = "";
    for (const [key, value] of mydata) {
      str1 += " " + value;
    }
    setCategory(str1);
  };

  // Submit handler for the form
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://localhost:7071/api/Package/Post", {
        trackingId: trackingId,
        date: new Date(),
        senderName: senderName,
        recieverName: recieverName,
        category: category,
      })
      .then((res) => {
        console.log(res.data);
        setIsSaved(true);
      })
      .catch((err) => console.log(err));
    window.alert("information saved");
  };

  // Check if the form is valid
  const isFormValid = trackingId && senderName && recieverName;

  // Render the component
  return (
    <>
      {/* Heading */}
      <h1>Inventory Management System</h1>

      {/* Form container */}
      <div className="IContainer">
        <div className="innercontainer">
          <form onSubmit={handleSubmit}>
            {/* Tracking ID input */}
            <div>
              <label style={{ marginRight: "4.5rem" }}>
                <strong>Tracking ID: </strong>
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
                value={trackingId}
                onChange={handleTrackingIdChange}
              />
            </div>

            {/* Date input */}
            <div>
              <label style={{ marginRight: "7.5rem" }}>
                <strong>Date:</strong>
              </label>
              <input
                className="inp"
                style={{
                  width: "30rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                type="date"
                value={`${date.getFullYear()}-${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${date.getDate()
                  .toString()
                  .padStart(2, "0")}`}
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </div>

            {/* Sender's Name input */}
            <div>
              <label style={{ marginRight: "2.6rem" }}>
                <strong>Sender's Name:</strong>
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
                value={senderName}
                onChange={(e) =>
                  setSenderName(handleNamechange(e.target.value))
                }
              />
            </div>

            {/* Receiver's Name input */}
            <div>
              <label style={{ marginRight: "2rem" }}>
                <strong>Receiver's Name:</strong>
              </label>
              <input
                className="inp"
                value={recieverName}
                style={{
                  width: "30rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                type="text"
                onChange={(e) =>
                  setRecieverName(handleNamechange(e.target.value))
                }
              />
            </div>

            {/* 
            The following part seems to be commented out
            ...
            */}

            {/* Submit button */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                style={{ width: "20%" }}
                className="btn"
                type="submit"
                disabled={!isFormValid}
              >
                Save
              </button>
            </div>
          </form>

          {/* 
          The isSaved message seems to be commented out
          ...
          */}
        </div>
      </div>
    </>
  );
};

export default Apackage;

// Exported handleNamechange as a named export, we can use this by importing it in any file using the syntax: import { handleNamechange } from './Apackage'

export const handleNamechange = (value) => {
  const changedvalue = value.replace(/[^A-Za-z\s]/g, "");
  return changedvalue;
};
