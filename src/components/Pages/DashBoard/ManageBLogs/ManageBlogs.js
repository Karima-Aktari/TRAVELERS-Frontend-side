import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const ManageBlogs = () => {
    const [userExperience, setUserExperience] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const { isLoading } = useAuth();

    //UserExperience
    useEffect(() => {
        fetch('https://limitless-castle-21515.herokuapp.com/userExperience')
            .then(res => res.json())
            .then(data => setUserExperience(data));
    }, [])
    //Update orders
    const handleApproved = (id) => {
        const proceed = window.confirm('Are you sure to Approve the Blog?');
        if (proceed) {
            const url = `https://limitless-castle-21515.herokuapp.com/userExperience/${id}`
            fetch(url, {
                method: "PUT",
                headers: { "content-type": "application.json" },
                body: JSON.stringify()
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount) {
                        alert('Approved completed') &&
                            setUserExperience(data)
                    }

                })
        }
    }
    // Delete uersExperience
    const handleDelete = id => {
        const proceed = window.confirm('Are You Sure To DELETE?');
        if (proceed) {
            const url = `https://limitless-castle-21515.herokuapp.com/deleteExperience/${id}`
            fetch(url, {
                method: "DELETE",
                headers: { "content-type": "application.json" }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert('DELETE Successful')
                        const remaining = userExperience.filter(service => service._id !== id);
                        setUserExperience(remaining);
                    }

                })
        }
    }

    //Admin Blog
    useEffect(() => {
        fetch('https://limitless-castle-21515.herokuapp.com/addBlog')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, [])

    // Delete AdminBlog
    const handleBlogDelete = (id) => {
        const proceed = window.confirm('Are You Sure To DELETE?');
        if (proceed) {
            const url = `https://limitless-castle-21515.herokuapp.com/deleteBlog/${id}`
            fetch(url, {
                method: "DELETE",
                headers: { "content-type": "application.json" }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert('DELETE Successful')
                        const remaining = blogs.filter(service => service._id !== id);
                        setBlogs(remaining);
                    }

                })
        }
    }

    // Spinner setting
    if (isLoading) {
        return <Spinner animation="border" variant="warning" />
    };


    return (
        <div>
            <div className="row bg-light h-100 mx-auto ">
                <div>
                    <h1>Travelers Experience.</h1>
                    <div className='row mx-auto'>
                        {
                            userExperience?.map(userExpo => <div className=" p-3" key={userExpo._id}>
                                <div className=" row border rounded-3 py-4 bg-info">
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <img src={userExpo?.img} className="w-75 rounded-3" alt="" />
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-6 align-items-center'>
                                        <h5>{userExpo?.name}</h5>
                                        <h6>Date:-{userExpo?.date}</h6>
                                        <Link to={`/dashBoard/updateBlog/${userExpo._id}`}><button className="btn bg-warning mx-2 px-2">Update</button></Link>

                                        <button onClick={() => handleApproved(userExpo._id)} className="btn bg-warning mx-2 px-2">{userExpo.status}</button>
                                        <button onClick={() => handleDelete(userExpo._id)} className="btn btn-danger px-4">Delete</button>
                                    </div>

                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <hr></hr>
                <div className='p-4'>
                    <h1>Admin Blog</h1>
                    <div className='row mx-auto'>

                        {
                            blogs?.map(blog => <div className=" p-3" key={blog._id}>
                                <div className=" row border rounded-3 py-4 bg-info">
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <img src={blog?.img} className="w-75 rounded-3" alt="" />
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-6 align-items-center'>
                                        <h5>{blog?.name}</h5>
                                        <h6>Date:-{blog?.date}</h6>
                                        <button className="btn bg-warning mx-2 px-2">Update</button>
                                        <button onClick={() => handleBlogDelete(blog._id)} className="btn btn-danger px-4">Delete</button>
                                    </div>

                                </div>
                            </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBlogs;