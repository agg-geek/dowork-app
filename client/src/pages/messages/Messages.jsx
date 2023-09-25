// all messages page
// shows all the conversations of a user with other users

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const queryClient = useQueryClient();

    // get all conversations of a person with all other people
    const { isLoading, error, data } = useQuery({
        queryKey: ["conversations"],
        queryFn: () =>
            newRequest.get(`/conversations`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (id) => {
            // update the conversation to make 
            // readBy of both seller and buye rtrue
            return newRequest.put(`/conversations/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["conversations"]);
        },
    });

    const handleRead = (id) => {
        mutation.mutate(id);
    };

    return (
        <div className="messages">
            {isLoading 
            ? "loading"
            : error 
                ? "error"
                : (
                    <div className="container">
                        <div className="title">
                            <h1>Messages</h1>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                                    <th>Last Message</th>
                                    <th>Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {data.map((c) => (
                                <tr
                                    className={
                                        ((currentUser.isSeller && !c.readBySeller) ||
                                            (!currentUser.isSeller && !c.readByBuyer)) &&
                                        "active"
                                    }
                                    // c.id is the conversation id consisting of sellerId + buyerId
                                    key={c.id}
                                >
                                    <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                                    <td>
                                        <Link to={`/message/${c.id}`} className="link">
                                            {/* substring is to only show the first 100 characters so that
                                            the message doesn't overflow 
                                            ?. is used to check if there is a last message, only then show it */}

                                            {c?.lastMessage?.substring(0, 100)}...
                                        </Link>
                                    </td>

                                    {/* moment library is used to calculate the time difference 
                                    between the message time and the current 
                                    to show 1 hour ago, 2 hour ago, etc */}
                                    <td>{moment(c.updatedAt).fromNow()}</td>
                                    <td>
                                        {((currentUser.isSeller && !c.readBySeller) ||
                                            (!currentUser.isSeller && !c.readByBuyer)) && (
                                                <button onClick={() => handleRead(c.id)}>
                                                    Mark as Read
                                                </button>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                )}
        </div>
    );
};

export default Messages;
