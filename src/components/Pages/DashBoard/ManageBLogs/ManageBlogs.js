import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import useAuth from '../../../Hooks/useAuth';

const ManageBlogs = () => {
    const [userExperience, setUserExperience] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const { isLoading } = useAuth();

    //UserExperience
    useEffect(() => {
        fetch('http://localhost:5000/userExperience')
            .then(res => res.json())
            .then(data => setUserExperience(data));
    }, [])
    //Update orders
    const handleUpdate = (id) => {
        const proceed = window.confirm('Are you sure to shipped the order?');
        if (proceed) {
            const url = `http://localhost:5000/userExperience/${id}`
            fetch(url, {
                method: "PUT",
                headers: { "content-type": "application.json" },
                body: JSON.stringify()
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount) {
                        alert('Approved completed')
                    }

                })
        }
    }
    // Delete uersExperience
    const handleDelete = id => {
        const proceed = window.confirm('Are You Sure To DELETE?');
        if (proceed) {
            const url = `http://localhost:5000/deleteExperience/${id}`
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
        fetch('http://localhost:5000/addBlog')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, [])

    // Delete AdminBlog
    const handleBlogDelete = id => {
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
                                        <button onClick={() => handleUpdate(userExpo._id)} className="btn bg-warning mx-2 px-2">{userExpo.status}</button>
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