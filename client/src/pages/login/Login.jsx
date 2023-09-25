import React, { Children, useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    // used to set the error which is seen 
    // below username and password fields
	const [error, setError] = useState(null);

    // react hook
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await newRequest.post("/auth/login", { username, password });
            // notice that we are storing the res.data as JSON string
            // because that's how local storage requires it
            // can you not move this to the auth controller ? 
			localStorage.setItem("currentUser", JSON.stringify(res.data));

            // move back to home page, navigate was useNavigate() react router dom hook
			navigate("/")
		} catch (err) {
            // used to set the error which is seen 
            // below username password fields
			setError(err.response.data);
		}
	};

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<h1>Sign in</h1>
				<label htmlFor="username">Username</label>
				<input
					name="username"
					id="username"
					type="text"
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input
					name="password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					id="password"
				/>
				<button type="submit">Login</button>
                {error && <div style={{textAlign: "center"}}>{error}</div>}
			</form>
		</div>
	); 
}

export default Login;
