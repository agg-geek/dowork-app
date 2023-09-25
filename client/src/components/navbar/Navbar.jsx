import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";
import category from "../../data/category.json";

function Navbar() {
    // used to achieve the navbar hover effect
    // which changes from greenish to white when scrolled
    // navbar active when scrolled, will become white    
	const [active, setActive] = useState(false);

    // used for the user menu to open and close user details
	const [open, setOpen] = useState(false);

    // useLocation from react-router-dom
	const { pathname } = useLocation();

	const isActive = () => {
		window.scrollY > 0 ? setActive(true) : setActive(false);
	};

    // used to achieve the navbar hover effect
    // checkout lamadev clean up function
    // why does this have dependency [] ?
	useEffect(() => {
		window.addEventListener("scroll", isActive);

        // clean up function
        // basically to clear the previous event listener
        // we are adding this
        // otherwise the next time we scroll, 
        // another event listener will be added
        // resulting in loads of evt listeners to be added
		return () => {
			window.removeEventListener("scroll", isActive);
		};
	}, []);


    // the currentUser stored in local storage  (in auth)
    // was first saved as JSON string (that's how local storage requires it)
    // hence here we parse it 
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // useNavigate comes from react router dom
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await newRequest.post("/auth/logout");
			localStorage.setItem("currentUser", null);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
			<div className="container">
				<div className="logo">
					<Link className="link" to="/">
						<span className="text">doWork</span>
					</Link>
					<span className="dot">.</span>
				</div>
				<div className="links">
                    <Link className="link" to="/gigs">
						<span className="text">Gigs</span>
					</Link>
                    <a href="#about" className="link">
						<span className="text">About</span>
                    </a>
					{currentUser ? (
                        // used for the user menu to open and close user details
						<div className="user" onClick={() => setOpen(!open)}>
							<img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
							<span>{currentUser.name}</span>
							{open && (
								<div className="options">
									{currentUser.isSeller && (
										<>
											<Link className="link" to="/mygigs">
												My Gigs
											</Link>
											<Link className="link" to="/add">
												Add New Gig
											</Link>
										</>
									)}
									<Link className="link" to="/orders">
										Orders
									</Link>
									<Link className="link" to="/messages">
										Messages
									</Link>
									<Link className="link" onClick={handleLogout}>
										Logout
									</Link>
								</div>
							)}
						</div>
					) : (
						<>
							<Link to="/login" className="link">Sign in</Link>
							<Link className="link" to="/register">
								<button>Join</button>
							</Link>
						</>
					)}
				</div>
			</div>
			{(active || pathname !== "/") && (
				<>
					<hr />
					<div className="menu">
                        {category.map((cat, i) => (
                            <Link key={i} className="link menuLink" to={cat.link}>
                                {cat.title}
                            </Link>
                        ))}
					</div>
					<hr />
				</>
			)}
		</div>
	);
}

export default Navbar;
