import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Btn = ({ route }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}>
      <Button onClick={() => navigate(route)} variant="contained">Add</Button>
    </div>
  );
};

export default Btn;
