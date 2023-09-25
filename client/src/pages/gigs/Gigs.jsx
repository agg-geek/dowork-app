// the all gigs page, also has various options for choosing category

import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation, useSearchParams } from "react-router-dom";

function Gigs() {
    // for "Best selling" and "newest" category selection
    const [open, setOpen] = useState(false);

    // for showing the value "best selling" and "newest" on category selection
    // /api/gigs?sort=sales
    // /api/gigs?sort=createdAt
    // these will be the 2 values (obtained as query) possible for this state
    // default values is sort=sales hence used sales here
    const [sort, setSort] = useState("sales");

    // don't know the meaning of these things
    // const minRef = useRef();
    // const maxRef = useRef();

    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    // useLocation has properties like pathname which gives the current path
    // and search which gives the search query like ?cat=design
    // console.log(location);
    const { search } = useLocation();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["gigs"],
        queryFn: () =>
            newRequest
                .get(
                    // search was provided in the url as query
                    // min, max has to be set using the options available
                    // sort is set using the sort button
                    // `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
                    // `/gigs?${search}&min=${min}&max=${max}&sort=${sort}`
                    // '/gigs'
                    `/gigs?${search && search}&${sort}`
                )
                .then((res) => (res.data)),
    });


    // whenever you change the sort by "best selling" or "newest"
    // then the reSort function is called which changes the setSort to the chosen sort type
    // it also makes the opened box to go away via setOpen
    // now when setSort is called, it changes the sort variable value
    // see below useEffect further
    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    // as the sort variable's value changes, we just refetch the content
    // so that the gigs are refetched from API
    // and the data variable from API is then used
    // and the isLoading, error and data stuff is shown at the end
    useEffect(() => {
        refetch();
    }, [sort]);

    
    // apply is used when the "apply" button is set 
    // while setting min and max price
    const apply = () => {
        refetch();
    };
    
    function capitalizeFirstLetter(string) {
        if (!string) return;
        if (string === "ai") return "AI";
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    
    const [searchParams] = useSearchParams();

    let category = capitalizeFirstLetter(searchParams.get("cat"));
    let searchTerm = capitalizeFirstLetter(searchParams.get("search"));
    let title;

    if (category) {
        if (searchTerm) title = `Results for ${searchTerm} in ${category} category`;
        else title = `Results for ${category} category`;
    }
    else if (searchTerm) title = `Results for ${searchTerm}`;
    else title = "All Gigs";

    return (
        <div className="gigs">
            <div className="container">
                <h1>{title}</h1>
                <div className="menu">
                    <div className="left">
                        <span>Budget</span>
                        {/* <input ref={minRef} type="number" placeholder="min" /> */}
                        {/* <input ref={maxRef} type="number" placeholder="max" /> */}
                        <input type="number" placeholder="min" onChange={(e) => setMin(e.target.value)} />
                        <input type="number" placeholder="max" onChange={(e) => setMax(e.target.value)} />
                        <button onClick={apply}>Apply</button>
                    </div>
                    <div className="right">
                        <span className="sortBy">Sort by</span>
                        <span className="sortType">
                            {sort === "sales" ? "Best Selling" : "Newest"}
                        </span>
                        <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />

                        {/* dynamically show the Newest and Best selling option
                        if selected sort is sales, then show only newest option */}
                        {open && (
                            <div className="rightMenu">
                                {sort === "sales" ? (
                                    <span onClick={() => reSort("createdAt")}>Newest</span>
                                ) : (
                                    <span onClick={() => reSort("sales")}>Best Selling</span>
                                )}

                                {/* hidden this as there was probably no change in best selling and popular */}
                                {/* <span onClick={() => reSort("sales")}>Popular</span> */}
                            </div>
                        )}
                    </div>
                </div>
                {/* card is the gig component */}
                {/* isLoading and error comes from the react query */}
                <div className="cards">
                    {isLoading
                        ? "loading"
                        : error
                            ? "Something went wrong!"
                            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
                </div>
            </div>
        </div>
    );
}

export default Gigs;
