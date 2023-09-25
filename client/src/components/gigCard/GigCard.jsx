// the individual gig card on the all gigs page

import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {

    {/* this is to show the individual userId (sellerId)
    for the gig since we first need to fetch the 
    userId for each gig, we fetch it and show the data */}
    const { isLoading, error, data } = useQuery({
        queryKey: [item._id], // $[item.userId] or what?
        queryFn: () =>
            newRequest.get(`/users/${item.userId}`).then((res) => {
                return res.data;
            }),
    });

    let stars = Math.round(item.totalStars / item.starNumber);
    return (
        <Link to={`/gig/${item._id}`} className="link">
            <div className="gigCard">
                <img src={item.cover} alt="" />

                {/* this is where the userId data (seller id) 
                fetched from API is begin displayed 
                notice the usage of the data keyword to denote
                data fetched from API using react query*/}
                <div className="info">
                    {isLoading 
                        ? "loading"
                        : error 
                            ? "Cannot load user details!"
                            :   (
                                    <div className="user">
                                        <img src={data.img || "/img/noavatar.jpg"} alt="" />
                                        <span>{data.name}</span>
                                    </div>
                                )}
                    
                    <p>{item.title}</p>
                    <div className="star">
                        <img src="./img/star.png" alt="" />
                        <span>
                            {stars ? (stars > 5 ? 5 : stars) : 0 }
                        </span>
                    </div>
                </div>

                <hr />
                <div className="detail">
                    <img src="./img/heart.png" alt="" />
                    <div className="price">
                        <span>STARTING AT</span>
                        <h2>$ {item.price}</h2>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GigCard;
