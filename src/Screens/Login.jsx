import * as React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { auth, db } from "../FirebaseConfig";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box, Button, Checkbox, FormControlLabel, Divider, FormLabel, FormControl,
  TextField, Typography, Stack, Card as MuiCard, Link
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GoogleIcon, SitemarkIcon } from "../components/CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex", flexDirection: "column", width: "100%", padding: theme.spacing(4),
  maxWidth: "450px", margin: "auto", boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh", padding: theme.spacing(4),
  display: "flex", justifyContent: "center", alignItems: "center",
}));

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveUserToLocal = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userUid = userCredential.user.uid;

      const userRef = await getDoc(doc(db, "costumer", userUid));
      const adminRef = await getDoc(doc(db, "admins", userUid));

      let userData;
      if (userRef.exists()) {
        userData = userRef.data();
      } else if (adminRef.exists()) {
        userData = adminRef.data();
      } else {
        throw new Error("User not found!");
      }

      dispatch(setUser({ uid: userUid, ...userData }));
      saveUserToLocal({ uid: userUid, ...userData });
      console.log(userData.role);
      

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Invalid credentials!");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = await getDoc(doc(db, "users", user.uid));
      const adminRef = await getDoc(doc(db, "admins", user.uid));

      let userData;
      if (userRef.exists()) {
        userData = userRef.data();
      } else if (adminRef.exists()) {
        userData = adminRef.data();
      } else {
        userData = { name: user.displayName, email: user.email, role: "User" };
        await setDoc(doc(db, "users", user.uid), userData);
      }

      dispatch(setUser({ uid: user.uid, ...userData }));
      saveUserToLocal({ uid: user.uid, ...userData });

      toast.success("Google Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Google Login Failed!");
    }
  };

  return (
    <SignInContainer>
      <Card>
        <SitemarkIcon />
        <Typography variant="h4">Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField fullWidth type="email" onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField fullWidth type="password" onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>
          <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained">Sign in</Button>
        </Box>
        <Divider>or</Divider>
        <Button fullWidth variant="outlined" onClick={loginWithGoogle} startIcon={<GoogleIcon />}>
          Sign in with Google
        </Button>
        <Typography textAlign="center">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </Card>
    </SignInContainer>
  );
}
