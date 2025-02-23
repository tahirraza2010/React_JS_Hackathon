import * as React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice"; // Redux action
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("Costumer"); // Default to "User"

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const Uid = userCredential.user.uid;
      const userData = { email, name, role };

      // Store in Firestore based on role
      const collectionName = role === "Admin" ? "admins" : "costumer";
      await setDoc(doc(db, collectionName, Uid), userData);

      // Save user to Redux state
      dispatch(setUser(userData));

      toast.success("SignUp Successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <Typography variant="h4">Sign Up</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Full Name" fullWidth onChange={(e) => setName(e.target.value)} required />
        <TextField label="Email" type="email" fullWidth onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} required />
        
        {/* Role Selection Dropdown */}
        <FormControl fullWidth>
          <InputLabel>Select Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="Costumer">Costumer</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" fullWidth>
          Sign Up
        </Button>
      </Box>
    </Stack>
  );
}
