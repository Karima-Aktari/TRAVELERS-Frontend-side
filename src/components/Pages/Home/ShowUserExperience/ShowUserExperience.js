import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

const ShowUserExperience = ({ userExpo }) => {

    const { _id, img, name, rating } = userExpo;
    console.log(userExpo)
    return (
        <div className='row'>
            <div className='col-md-6'>
                <img src={img} className="w-75 rounded-3" alt="" />
            </div>
            <div className='col-md-6'>
                <h1>{name}</h1>
                <p className=" mb-1 fs-5">
                    <Rating initialRating={rating} emptySymbol="far fa-star text-warning"
                        fullSymbol="fas fa-star text-warning" readonly>
                    </Rating>
                </p>
                <Link to={`/userExperience/${_id}`}><button className="btn btn-info">Details</button></Link>
            </div>
        </div>
    );
};

export default ShowUserExperience;