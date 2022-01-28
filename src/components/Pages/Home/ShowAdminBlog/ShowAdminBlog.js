import React from 'react';
import { Link } from 'react-router-dom';

const ShowAdminBlog = ({ blog }) => {
    const { _id, img, name } = blog;

    return (
        <div className='row py-3'>
            <div className='col-md-6'>
                <img src={img} className="w-75 rounded-3" alt="" />
            </div>
            <div className='col-md-6'>
                <h1>{name}</h1>

                <Link to={`/addBlog/${_id}`}><button className="btn btn-info">Details</button></Link>
            </div>
        </div>
    )
};

export default ShowAdminBlog;