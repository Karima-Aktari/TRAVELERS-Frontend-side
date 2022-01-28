import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import Navigation from '../../../Shared/Navigation/Navigation';

const AdminBlogDetails = () => {
    const { blogId } = useParams();
    const [blogs, setBlogs] = useState({});
    const { isLoading, user } = useAuth();

    useEffect(() => {
        fetch(`https://limitless-castle-21515.herokuapp.com/addBlog/${blogId}`)
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, [])

    if (isLoading) {
        return <Spinner animation="border" variant="warning" />
    }

    return (
        <div>
            <Navigation></Navigation>
            <h1>Admin Blogs</h1>
            <div className="p-4">
                <img src={blogs.img} className="img-fluid w-75 rounded-3" alt=""></img>
                <h2>{blogs.name}</h2>
                <h4>{blogs.info}</h4>
                <p className="fw-bolder px-4 ">{blogs.description}</p>
                <h4>{blogs.category}</h4>
                <h4>{blogs.date}</h4>
                <h4>$ {blogs.price}</h4>
                <h4>{blogs.address}</h4>
                <Link to={'/dashBoard'}><button className="btn btn-info">DashBoard</button></Link>
            </div>
        </div>
    );
};

export default AdminBlogDetails;