import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';

const UserExperience = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();

    const onSubmit = (data) => {
        data.status = "pending";
        data.date = new Date().toLocaleDateString();
        axios.post('https://limitless-castle-21515.herokuapp.com/userExperience', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Added Successfully');
                    reset();
                }
            })
    }


    return (
        <div>
            <h2>Share Your Experience Here.</h2>

            <form className="py-2 my-4" onSubmit={handleSubmit(onSubmit)}>
                <input className="w-50 text-center rounded-3 py-2 border-0" defaultValue={user.displayName} {...register("name")} /><br />

                <input className="w-50 text-center rounded-3 my-3 py-2 border-0" defaultValue={user.email} {...register("email", { required: true })} /><br />

                <input className="w-50 text-center rounded-3 py-2 border-0" placeholder="Photo" {...register("img")} /><br />

                <input className="w-50 text-center rounded-3 my-3 py-2 border-0" placeholder="Rating" type="number"{...register("rating", { required: true, min: "0", max: "5" })} /><br />

                <input className="w-50 text-center rounded-3 py-2 border-0" placeholder="Location" type="text"{...register("location")} /><br />

                <input className="w-50 text-center rounded-3 my-3 py-2 border-0" placeholder="Expense" type="number"{...register("expense")} /><br />

                <input className="w-50 text-center rounded-3 py-3 border-0" placeholder="Description"  {...register("description")} /><br />

                <input className="px-4 my-2 rounded-pill" type="submit" />
            </form>
        </div>
    );
};

export default UserExperience;