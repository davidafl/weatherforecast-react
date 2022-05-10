import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * this function returns a function that will be used as a callback
 * to set the URL to fetch, and various states to track the fetching
 * @param initialUrl
 * @param initialData
 * @returns {[{isLoading: boolean, isError: boolean, data: unknown}, ((value: unknown) => void)]}
 */
const useDataApi = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData); // data to be fetched
    const [isLoading, setIsLoading] = useState(false); // is it fetching?
    const [isError, setIsError] = useState(false); // is there an error?

    // we are using useEffect to fetch data from the API
    // when the url state changes
    const fetchData = async (url) => {
        setIsError(false); // reset error state
        setIsLoading(true); // set loading state to true to show loading indicator for example
        try {
            const result = await axios(url);
            setData(result.data); // set data state
        } catch (error) {
            setIsError(true); // an error occurred, set error state to true
        }
        setIsLoading(false); // set loading state to false to hide loading indicator
    };

    //fetchData(); // execute the function above

    return [{ data, isLoading, isError }, fetchData]; // return the data and the URL setter function
};

export default function FormFetchWithHook(props) {
    const [query, setQuery] = useState('');
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        '',
        { hits: [] },
    );

    return (
        <>
            <form
                onSubmit={event => {
                    doFetch(
                        `https://www.7timer.info/bin/api.pl?lon=${props.choice.longitude}&lat=${props.choice.latitude}&product=civillight&output=json`,
                    );
                    event.preventDefault();
                }}
            >
                <input type="text" className="form-control" value={query} onChange={event => setQuery(event.target.value)}/>
                <button className="btn btn-primary" type="submit">Search</button>
            </form>

            {isError && <div>Something went wrong ...</div>}

            {isLoading ? (
                <div className="alert alert-warning">Loading ...</div>
            ) : (
                <ol>
                    <li>
                        weather: fuck
                    </li>
                </ol>
            )}
        </>
    );
}
/*
                <ol>
                    {data.hits.map(item => (
                        <li>
                            weather: {item}
                        </li>
                    ))}
                </ol>
 */