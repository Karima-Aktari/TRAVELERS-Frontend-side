import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import './DashBoard.css';

const DashBoard = () => {
    // const { admin } = useAuth();
    return (
        <div>
            <div className="row mx-auto dashBoard-height">
                <div className="col-12 col-md-2 bg-light text-dark">
                    <nav className=" bg-secondary py-5">
                        <NavLink to="/dashBoard" className="py-5">DashBoard</NavLink>

                        <div className="py-3">
                            <Link to={`/dashBoard/addBlog`}>
                                <li className="py-3">Add EBlog</li>
                            </Link>
                            <Link to={`/dashBoard/blogCollections`}>
                                <li className="py-4">All Blog Collections</li>
                            </Link>
                            <Link to={`/dashBoard/makeAdmin`}>
                                <li className="py-3">Add Admin</li>
                            </Link>
                        </div>
                        <div className="py-3">
                            {/* <Link to={`/dashBoard/payment`}>
                            <li> Payment</li>
                        </Link> */}

                            <Link to={`/dashBoard/reviews`}>
                                <li className="py-2">Reviews</li>
                            </Link>
                        </div>
                    </nav>

                </div>
                <div className="col-12 col-md-10 bg-light text-success">
                    <div>
                        <h1 className="">DashBoard</h1>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    );
};

export default DashBoard;