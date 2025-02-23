import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid } from "@mui/material";
import { toast } from "react-toastify";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomId = location.state?.roomId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    roomId: roomId || "", // Store the booked room ID
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "COSTUMESDETAIL"), formData);
      
      // Update booked rooms in localStorage
      const storedBookedRooms = JSON.parse(localStorage.getItem("bookedRooms")) || [];
      storedBookedRooms.push(roomId);
      localStorage.setItem("bookedRooms", JSON.stringify(storedBookedRooms));

      toast.success('Booking Successful!')
      navigate("/dashboard/service"); // Redirect back to rooms list
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} fullWidth required />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} fullWidth required />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} fullWidth required />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Age" name="age" type="number" value={formData.age} onChange={handleInputChange} fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Stay Nights" name="stayNights" type="number" value={formData.stayNights} onChange={handleInputChange} fullWidth required />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender} onChange={handleInputChange} label="Gender">
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Booking
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookingForm;
