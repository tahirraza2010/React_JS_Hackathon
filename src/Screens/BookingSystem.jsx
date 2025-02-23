import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button } from "@mui/material";

const Booking = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);

  useEffect(() => {
    const storedBookedRooms = JSON.parse(localStorage.getItem("bookedRooms")) || [];
    setBookedRooms(storedBookedRooms);

    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rooms");
        const allRooms = response.data;
        const bookedRoomDetails = allRooms.filter((room) =>
          storedBookedRooms.includes(room.id)
        );
        setRoomDetails(bookedRoomDetails);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, []);

  // Function to cancel a booking
  const handleCancelBooking = (roomId) => {
    const updatedBookedRooms = bookedRooms.filter((id) => id !== roomId);

    // Update localStorage
    localStorage.setItem("bookedRooms", JSON.stringify(updatedBookedRooms));

    // Update state to reflect the canceled booking
    setBookedRooms(updatedBookedRooms);
    setRoomDetails((prevDetails) =>
      prevDetails.filter((room) => room.id !== roomId)
    );

    // Optionally: Notify the user about the cancellation
    alert("Booking canceled successfully!");
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
        Booked Rooms
      </Typography>

      {roomDetails.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          No rooms have been booked yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {roomDetails.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="140" image={room.imgSrc} alt={room.name} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {room.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {room.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                    Price: ${room.price} per night
                  </Typography>

                  {/* Cancel Booking Button */}
                  <Button
                    onClick={() => handleCancelBooking(room.id)}
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 2,color:'white',backgroundColor:'red' }}
                  >
                    Cancel Booking
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Booking;
