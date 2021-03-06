import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Spinner } from 'react-bootstrap';
import './AddBlog.css';

const AddBlog = () => {
    const { register, handleSubmit, reset } = useForm();
    const { isLoading } = useAuth();

    const onSubmit = data => {
        data.date = new Date().toLocaleDateString();
        axios.post('https://limitless-castle-21515.herokuapp.com/addBlog', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Added Successfully');
                    reset();
                }
            })
    }

    if (isLoading) {
        return <Spinner animation="border" variant="warning" />
    }

    return (
        <div className="">
            <div className="addBlog">
                <h1 className="text-secondary">Add Experience As a Blog</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("img")} placeholder="Image url" />

                    <input {...register("name", { required: true, maxLength: 20 })} placeholder="Title" />

                    <input {...register("category", { required: true, maxLength: 20 })} placeholder="Category" />

                    <textarea {...register("info")} placeholder="Travelers-Info" />
                    {/* <br /> */}
                    <textarea {...register("address")} placeholder="Location-Address" />

                    <textarea {...register("description")} placeholder="Description" />

                    <input type="number" {...register("price")} placeholder="Price" />

                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddBlog;