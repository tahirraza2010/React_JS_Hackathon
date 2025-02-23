import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Card, CardContent, Typography, Grid, Box, Button } from "@mui/material";
import { toast } from "react-toastify";

const Constumer = () => {
  const [bookings, setBookings] = useState([]);
  const [role, setRole] = useState("");

  // Fetch booking data from Firestore
  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "COSTUMESDETAIL"));
      
      // Map the bookings data to an array
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // 🔹 Firestore document ID (required for deletion)
        ...doc.data(), // Document data (name, email, etc.)
      }));
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      toast.error("Error fetching data!");
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    setRole(userData.role || "consumer"); // Default role: consumer
    fetchBookings(); // Fetch bookings data on component mount
  }, []);


  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
        Customer Details
      </Typography>

      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {booking.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {booking.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {booking.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gender: {booking.gender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Room ID: {booking.roomId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stay Nights: {booking.stayNights}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Constumer;
