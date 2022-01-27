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

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>

            <Route path="/dashBoard" element={<PrivateRoute><DashBoard /></PrivateRoute>} >
              <Route path={`/dashBoard/addBlog`} element={<AddBlog />} />
              <Route path={`/dashBoard/makeAdmin`} element={<MakeAdmin />} />
            </Route>

            <Route exact path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
