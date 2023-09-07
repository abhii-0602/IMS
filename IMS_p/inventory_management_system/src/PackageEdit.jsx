import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PackageEdit = () => {
  const { packageId } = useParams();
  const [packageDetails, setPackageDetails] = useState({
    packageId,
    trackingId: "",
    date: new Date(),
    senderName: "",
    recieverName: "",
    
  });
  const [isEmptyField, setIsEmptyField] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  useEffect(() => {
    fetchPackageDetails();
  }, [packageId]);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7071/api/Package/getPackagesById/${packageId}`
      );
      console.log(response.data); // Check the response data in the console
      const packageData = response.data;
      setPackageDetails({
        ...packageData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (isFieldEmpty()) {
      setIsEmptyField(true);
      return;
    }

    try {
      await axios.put(
        `https://localhost:7071/api/Package/Put/${packageId}`,
        packageDetails
      );

      setIsUpdateSuccess(true);
      setIsEmptyField(false);
      window.alert("information saved")
    } catch (error) {
      console.log(error);
    }
  };

  const isFieldEmpty = () => {
    return (
      !packageDetails.trackingId ||
      !packageDetails.date ||
      !packageDetails.senderName ||
      !packageDetails.recieverName 
       
    );
  };

  return (
    <>
      <h1>Inventory Management System</h1>
      <div className="IContainer">
        <div className="innercontainer">
          <form>
            <div className="form">
              <label htmlFor="packageId" style={{ marginLeft: "3rem" }}>
                Package ID:
              </label>
              <input
                style={{
                  width: "30rem",
                  marginLeft: "4rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                id="packageId"
                type="text"
                value={packageDetails.packageId}
                readOnly
              />
            </div>
            <div className="form">
              <label htmlFor="trackingId" style={{ marginLeft: "3rem" }}>
                Tracking Id:
              </label>
              <input
                style={{
                  width: "30rem",
                  marginLeft: "4rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                id="trackingId"
                type="text"
                value={packageDetails.trackingId}
                onChange={(e) =>
                  setPackageDetails((prevDetails) => ({
                    ...prevDetails,
                    trackingId: e.target.value,
                  }))
                }
                className={isEmptyField && !packageDetails.trackingId ? "invalid" : ""}
              />
              
            </div>
            <div className="form">
              <label htmlFor="date" style={{ marginLeft: "3rem" }}>
                Date:
              </label>
              <input
                style={{
                  width: "30rem",
                  marginLeft: "6.7rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                id="date"
                type="datetime2"
                value={packageDetails.date}
                readOnly
                onChange={(e) =>
                  setPackageDetails((prevDetails) => ({
                    ...prevDetails,
                    date: new Date(e.target.value),
                   
                  }))
                }
              />
            </div>
            <div className="form">
              <label htmlFor="senderName" style={{ marginLeft: "3rem" }}>
                Sender's Name:
              </label>
              <input
                style={{
                  width: "30rem",
                  marginLeft: "2.4rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                id="senderName"
                type="text"
                value={packageDetails.senderName}
                onChange={(e) =>
                  setPackageDetails((prevDetails) => ({
                    ...prevDetails,
                    senderName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form">
              <label htmlFor="receiverName" style={{ marginLeft: "3rem" }}>
                Receiver Name:
              </label>
              <input
                style={{
                  width: "30rem",
                  marginLeft: "2.4rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                }}
                id="receiverName"
                type="text"
                value={packageDetails.recieverName}
                onChange={(e) =>
                  setPackageDetails((prevDetails) => ({
                    ...prevDetails,
                    recieverName: e.target.value,
                  }))
                }
              />
            </div>
            
          </form>
          <div className="button-class">
            {/* {isUpdateSuccess && (
              
            )} */}
            <button onClick={handleSave}>Save</button>
          </div>
          {/* {isEmptyField && (
            window.alert("please enter all the field")
          )} */}
          {/* {!packageDetails.trackingId && 
          window.alert("please enter the trackingID")} */}
        </div>
      </div>

      <style>
        {`
        .invalid {
          border: 2px solid red;
        }
        
        .error-message {
          color: red;
         
          display: flex;
          justify-content: flex;
          align-self:baseline ;
          margin-top: 1rem;
        }
        
        .IContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        
        .innercontainer {
          background: #f5f5f5;
          padding: 2rem;
          border-radius: 0.5rem;
        }
        
        .form {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .form span {
          margin-right: 1rem;
        }
        
        .button-class {
          display: flex;
          justify-content: flex-end;
          align-self:flex-end ;
          margin-top: 1rem;
        }
        
        .button-class button {
          margin-left: 1rem;
        }
        
        .success-message {
          color: green;
        }
        `}
      </style>
    </>
  );
};

export default PackageEdit;
