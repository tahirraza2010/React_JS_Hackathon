import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const [rooms, setRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [role, setRole] = useState(""); // Store user role
  const [open, setOpen] = useState(false); // Modal state for adding room
  const [newRoom, setNewRoom] = useState({ name: "", description: "", price: "", imgSrc: "" });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the rooms data!", error);
      });

    const storedBookedRooms = JSON.parse(localStorage.getItem("bookedRooms")) || [];
    setBookedRooms(storedBookedRooms);

    const userData = JSON.parse(localStorage.getItem("user")) || {};
    setRole(userData.role || "Costumer"); 
  }, []);

  // Handle room booking
  const handleBooking = (roomId) => {
    navigate(`/dashboard/bookingForm`, { state: { roomId } });
  };

  // Delete Room (Only for Admins)
  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`http://localhost:3000/rooms/${roomId}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  // Open and Close Add Room Dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  // Submit new room
  const handleAddRoom = async () => {
    try {
      const response = await axios.post("http://localhost:3000/rooms", newRoom);
      setRooms([...rooms, response.data]);
      setNewRoom({ name: "", description: "", price: "", imgSrc: "" });
      handleClose();
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
        Our Rooms
      </Typography>

      {/* Show Add Room button for Admins */}
      {role === "Admin" && (
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Room
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {rooms.map((room) => (
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

                {/* Show Book Now button for Consumers */}
                {role === "Costumer" && (
                  <Button
                    onClick={() => handleBooking(room.id)}
                    fullWidth
                    variant="contained"
                    color={bookedRooms.includes(room.id) ? "secondary" : "primary"}
                    disabled={bookedRooms.includes(room.id)}
                  >
                    {bookedRooms.includes(room.id) ? "Booked" : "Book Now"}
                  </Button>
                )}

                {/* Show Delete button for Admins */}
                {role === "Admin" && (
                    <>
                    <Button
                    onClick={() => handleBooking(room.id)}
                    fullWidth
                    variant="contained"
                    color={bookedRooms.includes(room.id) ? "secondary" : "primary"}
                    disabled={bookedRooms.includes(room.id)}
                  >
                    {bookedRooms.includes(room.id) ? "Booked" : "Book Now"}
                  </Button>
                  <Button
                    onClick={() => handleDelete(room.id)}
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ marginTop: 1 }}
                  >
                    Delete Room
                  </Button>
                    </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Room Form Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Room</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Room Name" fullWidth margin="normal" value={newRoom.name} onChange={handleInputChange} />
          <TextField name="description" label="Description" fullWidth margin="normal" value={newRoom.description} onChange={handleInputChange} />
          <TextField name="price" label="Price" fullWidth margin="normal" type="number" value={newRoom.price} onChange={handleInputChange} />
          <TextField name="imgSrc" label="Image URL" fullWidth margin="normal" value={newRoom.imgSrc} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddRoom} color="primary">
            Add Room
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Service;
