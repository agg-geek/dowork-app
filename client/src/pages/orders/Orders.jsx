import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navigate = useNavigate();
    const { isLoading, error, data } = useQuery({
        queryKey: ["orders"],
        queryFn: () =>
            newRequest
                .get(`/orders`)
                .then(res => res.data)
    });

    // to handle conversation below seller and buyer
    // if there is already a conversation between them, redirect the person there
    // otherwise create a new conversation
    // see conversation route
    const handleContact = async (order) => {
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId + buyerId;

        try {
            const res = await newRequest.get(`/conversations/single/${id}`);
            navigate(`/message/${res.data.id}`);
        } catch (err) {
            if (err.response.status === 404) {
                const res = await newRequest.post(`/conversations/`, {
                    // update seller to .isSeller
                    to: currentUser.isSeller ? buyerId : sellerId,
                });
                // res.data.id is actually the same as sellerId + buyerId
                navigate(`/message/${res.data.id}`);
            }
            // write an else block here
        }
    };

    return (
        <div className="orders">
            {isLoading
                ? "loading"
                : error
                    ? "error"
                    : (
                        <div className="container">
                            <div className="title">
                                <h1>Orders</h1>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Contact</th>
                                    </tr>
                                </thead>
                                {data.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            <img className="image" src={order.img} alt="" />
                                        </td>
                                        <td>{order.title}</td>
                                        <td>{order.price}</td>
                                        <td>
                                            <img
                                                className="message"
                                                src="./img/message.png"
                                                alt=""
                                                onClick={() => handleContact(order)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    )}
        </div>
    );
};

export default Orders;