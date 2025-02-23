import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export default function Table({ collectionName }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(data);
      } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
      }
    };

    if (collectionName) {
      fetchData();
    }
  }, [collectionName]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "subjectName", headerName: "Subject Name", width: 150 },
    { field: "className", headerName: "Class Name", width: 150 },
    { field: "group", headerName: "Group", width: 150 },
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
