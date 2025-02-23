import React, { useState } from "react";
import { Container, TextField, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from "@mui/material";


export default function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    qualification: "",
    gender: "",
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
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
        
        <TextField required fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField required fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField required fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField required fullWidth label="Phone Number" name="phone" type="number" value={formData.phone} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField required fullWidth label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} />
        <TextField required fullWidth label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} margin="normal" variant="outlined" />

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        <Button  fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}
