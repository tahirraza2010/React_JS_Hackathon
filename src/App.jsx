import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./Screens/SignUp";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
// import StudentsAdd from "./Screens/StudentsAdd";
// import StudentsList from "./Screens/StudentsList";
// import TeacherAdd from "./Screens/TeacherAdd";
// import TeacherList from "./Screens/TeacherList";
// import SyllabusAdd from "./Screens/SyllabusAdd";
// import SyllabusList from "./Screens/SyllabusList";
// import SubjectsAdd from "./Screens/SubjectsAdd";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import { ToastContainer } from "react-toastify";
import Home from "./Screens/Home";
import Service from "./Screens/Service";
import Form from "./Screens/Form";
import History from "./Screens/History";
import Constumer from "./Screens/Constumer";
import Rooms from "./Screens/Rooms";
import BookingSystem from "./Screens/BookingSystem";
import Pyment from "./Screens/Pyment";
// import SubjectList from "./Screens/SubjectsList";
// import ClassAdd from "./Screens/ClassAdd";
// import ClassList from "./Screens/ClassList";
// import FeeVoucher from "./Screens/FeeVoucher";
// import FeeSubmition from "./Screens/FeeSubmission";
// import FeeSturcture from "./Screens/FeeStructure";
// import AdmissionForm from "./Screens/AdmissionForm";
// import ExamSchedule from "./Screens/ExamSchedule";
// import ExamResult from "./Screens/ExamResult";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard/>}>
          <Route index element={<Service />} />
          <Route path="history"  element={<History/>}/>
          {/* <Route index element={<StudentsList />} /> */}
            {/* Services */}
            <Route path="service" element={<Service/>} />
            <Route path="bookingForm" element={<Form/>} />

            {/* constumer */}
            <Route path="costumers" element={<Constumer/>} />
            {/* rooms */}
            <Route path="rooms" element={<Rooms/>} />
            {/* booking */}
            <Route path="booking" element={<BookingSystem/>} />
            {/* payment */}
            <Route path="payment" element={<Pyment/>} />
          </Route>
        </Route>

        {/*  Authentication Routes */}
        <Route element={<AuthRoute />}>
        <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/*  404 Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

      <ToastContainer position="top-center" autoClose={5000} />
    </>
  );
};

export default App;
