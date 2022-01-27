import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ShowUserExperience from '../ShowUserExperience/ShowUserExperience';

const Blogs = () => {
    const [spots, setSpots] = useState([]);
    const [userExperience, setUserExperience] = useState([]);

    //Show spots
    useEffect(() => {
        fetch('https://limitless-castle-21515.herokuapp.com/spots')
            .then(res => res.json())
            .then(data => setSpots(data));
    }, [spots])

    console.log(spots);
    //UserExperience
    useEffect(() => {
        fetch('http://localhost:5000/userExperience')
            .then(res => res.json())
            .then(data => setUserExperience(data));
    }, [])

    console.log(userExperience);

    return (
        <div className="row mx-auto">
            <div className="col-3 bg-dark h-100 py-4">
                {
                    spots?.map((spot) => (
                        <div className="row" key={spot._id}>
                            <div className="col-11 text-light">
                                <img src={spot?.img} className="img-fluid rounded-3 " alt="" />
                                <h1>{spot?.title}</h1>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className="col-9 bg-light h-100">
                <h1>This is Blog.</h1>
                <div className='row mx-auto'>
                    {
                        userExperience?.map(userExpo => <ShowUserExperience
                            key={userExpo._id}
                            userExpo={userExpo}>
                        </ShowUserExperience>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Blogs;