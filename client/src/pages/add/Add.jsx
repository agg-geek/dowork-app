// adding a new gig page

import React, { useReducer, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "./Add.scss";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";

const Add = () => {
    const [singleFile, setSingleFile] = useState(undefined);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };
    const handleFeature = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_FEATURE",
            payload: e.target[0].value,
        });
        e.target[0].value = "";
    };

    const handleUpload = async () => {
        setUploading(true);
        try {
            const cover = await upload(singleFile);

            const images = await Promise.all(
                [...files].map(async (file) => {
                    const url = await upload(file);
                    return url;
                })
            );
            setUploading(false);
            dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
        } catch (err) {
            console.log(err);
        }
    };

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (gig) => {
            return newRequest.post("/gigs", gig);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myGigs"]);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(state);
        // navigate("/mygigs")
    };

    return (
        <div className="add">
            <div className="container">
                <h1>Add New Gig</h1>
                <div className="sections">
                    <div className="info">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleChange}
                        />
                        <label htmlFor="cat">Category</label>
                        <select name="cat" id="cat" onChange={handleChange}>
                            <option value="animation">Video & Animation</option>
                            <option value="webdesign">Web Design</option>
                            <option value="graphicdesign">Graphics & Design</option>
                            <option value="dataentry">Data Entry</option>
                            <option value="ai">AI Services</option>
                            <option value="translation">Writing and Translation</option>
                            <option value="social">Social Media</option>
                            <option value="seo">SEO</option>
                            <option value="voiceover">Voice Over</option>
                            <option value="bookcover">Book Covers</option>
                        </select>
                        <div className="images">
                            <div className="imagesInputs">
                                <label htmlFor="cover">Cover Image</label>
                                <input
                                    type="file"
                                    id="cover"
                                    name="cover"
                                    onChange={(e) => setSingleFile(e.target.files[0])}
                                />
                                <label htmlFor="images">Upload Images</label>
                                <input
                                    type="file"
                                    id="images"
                                    name="images"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                />
                            </div>
                            <button onClick={handleUpload}>
                                {uploading ? "uploading" : "Upload"}
                            </button>
                        </div>
                        <button onClick={handleSubmit}>Create</button>
                    </div>
                    <div className="details">
                        <label htmlFor="add-features">Add Features</label>
                        <form action="" id="add-features" className="add" onSubmit={handleFeature}>
                            <input type="text" />
                            <button type="submit">Add</button>
                        </form>
                        <div className="addedFeatures">
                            {state?.features?.map((f) => (
                                <div className="item" key={f}>
                                    <button
                                        onClick={() =>
                                            dispatch({ type: "REMOVE_FEATURE", payload: f })
                                        }
                                    >
                                        {f}
                                        <span>X</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <label htmlFor="desc">Description</label>
                        <textarea
                            name="desc"
                            id="desc"
                            placeholder="Complete description of your service"
                            cols="0"
                            rows="16"
                            onChange={handleChange}
                        ></textarea>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" onChange={handleChange} name="price" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
