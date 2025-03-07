import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { db } from "../FirebaseConfig"; // Firebase config import
import { collection, getDocs } from "firebase/firestore";

const Pyment = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [stayNights, setStayNights] = useState({}); // Store stay nights for each room

  useEffect(() => {
    const storedBookedRooms =
      JSON.parse(localStorage.getItem("bookedRooms")) || [];
    setBookedRooms(storedBookedRooms);

    // Fetch Stay Nights from Firestore
    const fetchStayNights = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "COSTUMESDETAIL"));
        if (!querySnapshot.empty) {
          let nightsData = {};
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            nightsData[data.roomId] = data.stayNights || 1; // Map stayNights with roomId
          });
          setStayNights(nightsData);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchStayNights();

    // Fetch Room Details
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

  useEffect(() => {
    // Calculate total price after stayNights are set
    const total = roomDetails.reduce(
      (sum, room) => sum + room.price * (stayNights[room.id] || 1),
      0
    );
    setTotalPrice(total);
  }, [roomDetails, stayNights]); // Run this effect when roomDetails or stayNights change

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
        <>
          <Grid container spacing={3}>
            {roomDetails.map((room) => (
              <Grid item xs={12} sm={6} md={4} key={room.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={room.imgSrc}
                    alt={room.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {room.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {room.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stay Nights: {stayNights[room.id] || 1}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ marginTop: 2 }}
                    >
                      Price: ${room.price} per night
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total Price Section */}
          <Box
            sx={{
              textAlign: "center",
              marginTop: 4,
              padding: 2,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Total Price: ${totalPrice}
            </Typography>
            <Button
              onClick={() => {
                toast.success("Payment Submitted Successfully!");
              }}
              fullWidth
              variant="contained"
            >
              Payment Submit
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Pyment;
