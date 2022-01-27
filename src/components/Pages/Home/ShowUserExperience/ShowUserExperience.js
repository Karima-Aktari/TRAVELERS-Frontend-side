import React from 'react';
import Rating from 'react-rating';

const ShowUserExperience = ({ userExpo }) => {

    const { img, name, rating } = userExpo;
    return (
        <div>
            <img src={img} className="w-75 rounded-3" alt=""></img>
            <h1>{name}</h1>
            <p className=" mb-1 fs-5">
                <Rating initialRating={rating} emptySymbol="far fa-star text-warning"
                    fullSymbol="fas fa-star text-warning" readonly>
                </Rating>
            </p>
        </div>
    );
};

export default ShowUserExperience;