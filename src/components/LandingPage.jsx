import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Hotel Management System
          </Typography>
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          <Button color="inherit" onClick={() => navigate("/signup")}>Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container style={{ textAlign: "center", padding: "50px 20px" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Luxury Hotel
        </Typography>
        <Typography variant="h6" paragraph>
          Experience comfort and luxury like never before. Book your stay now!
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => navigate("/login")}>Book Now</Button>
      </Container>

      {/* Services Section */}
      <Container>
        <Typography variant="h4" align="center" gutterBottom>Our Services</Typography>
        <Grid container spacing={3}>
          {[
            { title: "Luxurious Rooms", desc: "Enjoy our comfortable and spacious rooms.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV87g9jYnZ3BdKEumMaBewgkxcpHKkvts7g&s" },
            { title: "Fine Dining", desc: "Taste the best cuisines prepared by top chefs.", img: "https://media.istockphoto.com/id/1081422898/photo/pan-fried-duck.jpg?s=612x612&w=0&k=20&c=kzlrX7KJivvufQx9mLd-gMiMHR6lC2cgX009k9XO6VA=" },
            { title: "Swimming Pool", desc: "Relax in our temperature-controlled pool.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUujIUGKAON29Fgt-b3UzKPJAIN8h0BZb9ng&s" },
          ].map((service, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia component="img" height="140" image={service.img} alt={service.title} />
                <CardContent>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography variant="body2">{service.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
