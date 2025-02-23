import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const History = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch booking data from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "COSTUMESDETAIL"));
        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
        Booking History
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

export default History;
