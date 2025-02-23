import React, { useState } from "react";
import { TextField, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper } from "@mui/material";


export default function Form({ onSubmit }) {
    const [formData, setFormData] = useState({
        subjectName: "",
        className: "",
        group: "GeneralScience", // Default selection
      });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    if (onSubmit) {
      onSubmit(formData); // Parent component ko data send karega
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: "auto", textAlign: "center" }}>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          label="Subject Name"
          name="subjectName"
          value={formData.subjectName}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          type="number"
          label="Class"
          name="className"
          value={formData.className}
          onChange={handleChange}
          margin="normal"
          required
        />

        <FormControl component="fieldset" margin="normal">
          <FormLabel>Select Group</FormLabel>
          <RadioGroup name="group" value={formData.group} onChange={handleChange}>
            <FormControlLabel value="GeneralScience" control={<Radio />} label="General Science" />
            <FormControlLabel value="Pre-Engineering" control={<Radio />} label="Pre-Engineering" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
          ADD
        </Button>
      </form>
    </Paper>
  );
}
