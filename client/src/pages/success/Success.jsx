// payment success page

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const payment_intent = params.get("payment_intent");

    useEffect(() => {
        const makeRequest = async () => {
            try {
                // calls the confirm method in order controller
                // which makes the isCompleted field set to payment_intent
                // ie isCompleted = true is payment intent is true
                await newRequest.put("/orders", { payment_intent });
                setTimeout(() => {
                    navigate("/orders");
                }, 5000);
            } catch (err) {
                console.log(err);
            }
        };

        makeRequest();
    }, []);

    return (
        <div>
            Payment successful. You are being redirected to the orders page. Please do
            not close the page
        </div>
    );
};

export default Success;
