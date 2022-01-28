import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotFound from './components/Pages/NotFound/NotFound';
import Home from './components/Pages/Home/Home/Home';
import About from './components/Pages/About/About';
import Login from './components/Pages/LoginPage/Login';
import Register from './components/Pages/LoginPage/Register';
import AuthProvider from './components/Context/AuthProvider';
import AddBlog from './components/Pages/DashBoard/AddBlog/AddBlog';
import DashBoard from './components/Pages/DashBoard/DashBoard/DashBoard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MakeAdmin from './components/Pages/DashBoard/MakeAdmin/MakeAdmin';
import UserExperience from './components/Pages/DashBoard/UserExperience/UserExperience';
import ExperienceDetails from './components/Pages/Home/ExperienceDetails/ExperienceDetails';
import ManageBlogs from './components/Pages/DashBoard/ManageBLogs/ManageBlogs';
import AdminRoute from './components/Pages/DashBoard/AdminRoute/Adminaaroute';
import AdminBlogDetails from './components/Pages/Home/AdminBlogDetails/AdminBlogDetails';
import UpdateBlog from './components/Pages/DashBoard/UpdateBlog/UpdateBlog';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>

            <Route path="/dashBoard" element={<PrivateRoute><DashBoard /></PrivateRoute>} >
              <Route path={`/dashBoard/addBlog`} element={<AdminRoute><AddBlog /></AdminRoute>} />
              <Route path={`/dashBoard/manageBlog`} element={<AdminRoute><ManageBlogs /></AdminRoute>} />
              <Route path={`/dashBoard/userExperience`} element={<UserExperience />} />
              <Route path={`/dashBoard/makeAdmin`} element={<AdminRoute><MakeAdmin /></AdminRoute>} />
              <Route path={`/dashBoard/updateBlog/:userId`} element={<AdminRoute><UpdateBlog /></AdminRoute>} />
            </Route>

            <Route exact path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/userExperience/:userId" element={<PrivateRoute><ExperienceDetails /></PrivateRoute>} />
            <Route path="/addBlog/:blogId" element={<PrivateRoute><AdminBlogDetails /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
