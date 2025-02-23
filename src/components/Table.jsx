import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export default function Table({ collectionName }) {
  const [rows, setRows] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // Other student data
        }));
        setRows(data);
      } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
      }
    };

    if (collectionName) {
      fetchData();
    }
  }, [collectionName]); // Added collectionName as a dependency

  // Define columns
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "dob", headerName: "Date of Birth", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "qualification", headerName: "Class", width: 150 },
  ];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } }, // Corrected pagination setup
        }}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
