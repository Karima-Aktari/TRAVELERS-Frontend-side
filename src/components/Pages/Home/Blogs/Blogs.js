import React from 'react';

const Blogs = () => {
    const spots = [
        {
            img: "https://i.ibb.co/2gwyWqj/blog-0.jpg",
            title: "Swizerland",
        },
        {
            img: "https://i.ibb.co/H22Jp8w/blog-1.jpg",
            title: "Japan ",
        },
        {
            img: "https://i.ibb.co/5nRnx2q/blog-2.jpg",
            title: "Dubai",
        },
        {
            img: "https://i.ibb.co/7SVM3ny/blog-3.jpg",
            title: "France",
        },
        {
            img: "https://i.ibb.co/2PL97Bd/blog-4.jpg",
            title: "Turkey",
        },
    ];



    return (
        <div className="row mx-auto">
            <div className="col-3 bg-dark h-100  py-4">
                {
                    spots?.map((spot) => (
                        <div className="row">
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
            </div>
        </div>
    );
};

export default Blogs;