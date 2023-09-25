import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import category from "../../data/category.json";

function Home() {
    return (
        <div className="home">
            <Featured />
            <Slide slidesToShow={5} arrowsScroll={5}>
                {category.map((card, i) => (
                    <CatCard key={i} card={card} />
                ))}
            </Slide>
            <div className="features">
                <div className="container">
                    <div className="item">
                        <h1>A whole world of freelance talent at your fingertips</h1>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The best for every budget
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project-based pricing.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Quality work done quickly
                        </div>
                        <p>
                            Find the right freelancer to begin working on your project within
                            minutes.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Protected payments, every time
                        </div>
                        <p>
                            Always know what you'll pay upfront. Your payment isn't released
                            until you approve the work.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            24/7 support
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project-based pricing.
                        </p>
                    </div>
                    <div className="item">
                        <img src="/img/freelance-banner.webp" alt="" />
                    </div>
                </div>
            </div>
            <div className="explore">
                <div className="container">
                    <h1>Explore the marketplace</h1>
                    <div className="items">
                        {category.map((cat, i) => (
                            <Link key={i} className="link" to={cat.link}>
                                <div className="item">
                                    <img src={cat.icon} alt="" />
                                    <div className="line"></div>
                                    <span>{cat.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
