import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

const ExperienceDetails = () => {
    const { userId } = useParams();
    const [experience, setExperience] = useState({});
    const { isLoading, user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/userExperience/${userId}`)
            .then(res => res.json())
            .then(data => setExperience(data));
    }, [])
    console.log(experience)
    if (isLoading) {
        return <Spinner animation="border" variant="warning" />
    }
    return (
        <div>
            <h1>Details {userId} </h1>
            <div className="p-4 text-info">
                <img src={experience.img} className="img-fluid w-75 rounded-3" alt=""></img>
                <h2>{experience.name}</h2>
                <h4>{experience.email}</h4>
                <h4>{experience.location}</h4>
                <p className="fw-bolder px-4 ">{experience.description}</p>
                <h4>$ {experience.expence}</h4>
                <h4>{experience.date}</h4>
                <p className=" mb-1 fs-5">
                    <Rating initialRating={experience.rating} emptySymbol="far fa-star text-warning"
                        fullSymbol="fas fa-star text-warning" readonly>
                    </Rating>
                </p>
                {/* <Link to={ }><button className="btn btn-info">Details</button></Link> */}
            </div>
        </div>
    );
};

export default ExperienceDetails;