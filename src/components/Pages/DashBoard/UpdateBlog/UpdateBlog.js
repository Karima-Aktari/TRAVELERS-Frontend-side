import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';


const UpdateBlog = () => {
    const { userId } = useParams();
    const [experience, setExperience] = useState({});
    const [allBlogs, setAllBlogs] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();

    useEffect(() => {
        fetch(`https://limitless-castle-21515.herokuapp.com/userExperience/${userId}`)
            .then(res => res.json())
            .then(data => setExperience(data));
    }, [])

    const handleChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const data = { ...allBlogs };
        data[field] = value;
        setAllBlogs(data);
    }

    const handleUpdateUser = (e) => {


        axios.put(`http://localhost:5000/userExperience/${allBlogs._id}`, allBlogs)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    alert("Blog updated successfully")
                    axios.get('http://localhost:5000/blogs')
                        .then(res => setExperience(res.data))


                }
            })
        e.preventDefault();

    }

    return (
        <div>
            <h1>{userId}</h1>
            <h1>{experience.location}</h1>
            <form className="py-2 my-4" onSubmit={handleSubmit(handleUpdateUser)}>
                <input className="w-50 text-center rounded-3 py-2 border-0" onChange={handleChange} defaultValue={user.displayName} {...register("name")} /><br />

                <input className="w-50 text-center rounded-3 my-3 py-2 border-0" onChange={handleChange} defaultValue={user.email} {...register("email", { required: true })} /><br />

                <input className="w-50 text-center rounded-3 py-2 border-0" onChange={handleChange} defaultValue={experience.img} {...register("img")} /><br />

                <input className="w-50 text-center rounded-3 my-3 py-2 border-0" onChange={handleChange} defaultValue={experience.rating} type="number"{...register("rating", { required: true, min: "0", max: "5" })} /><br />

                <input className="w-50 text-center rounded-3 py-2 border-0" onChange={handleChange} defaultValue={experience.location} type="text"{...register("location")} /><br />

                <input className="w-50 text-center rounded-3 my-3 py-2 border-0" onChange={handleChange} defaultValue={experience.expense} type="number"{...register("expense")} /><br />

                <input className="w-50 text-center rounded-3 py-3 border-0" onChange={handleChange} defaultValue={experience.description}  {...register("description")} /><br />

                <input className="px-4 my-2 rounded-pill" type="submit" />
            </form>
        </div>
    );
};

export default UpdateBlog;