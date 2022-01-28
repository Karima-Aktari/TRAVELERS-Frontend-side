import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, Link, Outlet } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Footer from '../../../Shared/Footer/Footer';
import Navigation from '../../../Shared/Navigation/Navigation';
import './DashBoard.css';

const DashBoard = () => {
    const { admin, logout } = useAuth();
    return (
        <div>
            <Navigation></Navigation>
            <div className="row mx-auto dashBoard-height ms-0">
                <div className="col-12 col-md-2 bg-light text-dark">
                    <nav className=" bg-secondary py-5">
                        <NavLink to="/dashBoard" className="py-5">DashBoard</NavLink>

                        {
                            admin && <div className="py-3">
                                <Link to={`/dashBoard/addBlog`}>
                                    <li className="py-3">Add EBlog</li>
                                </Link>
                                <Link to={`/dashBoard/manageBlog`}>
                                    <li className="py-4">All Blog Collections</li>
                                </Link>
                                <Link to={`/dashBoard/makeAdmin`}>
                                    <li className="py-3">Add Admin</li>
                                </Link>
                            </div>
                        }

                        <div className="py-3">
                            {/* <Link to={`/dashBoard/payment`}>
                            <li> Payment</li>
                        </Link> */}

                            <Link to={`/dashBoard/userExperience`}>
                                <li className="py-2">UserExperience</li>
                            </Link>
                        </div>
                        <div><Button onClick={logout} variant="dark">Logout</Button> </div>
                    </nav>

                </div>
                <div className="col-12 col-md-10 bg-light text-success">
                    <div>
                        <h1 className="">DashBoard</h1>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default DashBoard;