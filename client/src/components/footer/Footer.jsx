import React from "react";
import "./Footer.scss";

function Footer() {
    return (
        <div className="footer" id="about">
            <div className="container">
                <div className="top">
                    <div className="item">
                        <h2>Categories</h2>
                        <span>Graphics & Design</span>
                        <span>Digital Marketing</span>
                        <span>Writing & Translation</span>
                        <span>Video & Animation</span>
                        <span>Music & Audio</span>
                        <span>Programming & Tech</span>
                        <span>Data</span>
                        <span>Business</span>
                        <span>Lifestyle</span>
                        <span>Photography</span>
                        <span>Sitemap</span>
                    </div>
                    <div className="item">
                        <h2>Community</h2>
                        <span>Customer Success Stories</span>
                        <span>Community hub</span>
                        <span>Forum</span>
                        <span>Events</span>
                        <span>Blog</span>
                        <span>Influencers</span>
                        <span>Affiliates</span>
                        <span>Podcast</span>
                        <span>Invite a Friend</span>
                        <span>Become a Seller</span>
                        <span>Community Standards</span>
                    </div>
                    <div className="item">
                        <h2>Support</h2>
                        <span>Help & Support</span>
                        <span>Trust & Safety</span>
                        <span>Selling on doWork</span>
                        <span>Buying on doWork</span>
                    </div>
                    <div className="item">
                        <h2>About</h2>
                        <span>Press & News</span>
                        <span>Partnerships</span>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Intellectual Property Claims</span>
                        <span>Investor Relations</span>
                        <span>Contact Sales</span>
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <h2>doWork</h2>
                        <span>© doWork International Ltd. 2023</span>
                    </div>
                    <div className="right">
                        <div className="social">
                            <img src="/img/twitter.png" alt="" />
                            <img src="/img/facebook.png" alt="" />
                            <img src="/img/linkedin.png" alt="" />
                            <img src="/img/pinterest.png" alt="" />
                            <img src="/img/instagram.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
