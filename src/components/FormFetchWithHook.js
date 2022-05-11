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

    return [{ data, isLoading, isError }, fetchData]; // return the data and the URL setter function
};

export default function FormFetchWithHook(props) {
    const [query, setQuery] = useState('');
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        '',
        { dataseries: [] },
    );

    return (
        <>
            <form
                onSubmit={event => {
                    event.preventDefault();
                    doFetch(
                        `https://www.7timer.info/bin/api.pl?lon=${props.choice.longitude}&lat=${props.choice.latitude}&product=civillight&output=json`,
                    );
                }}
            >
                <button className="btn btn-primary mt-2" type="submit">Search</button>
            </form>

            {isError && <div>Something went wrong ...</div>}

            {isLoading ? (
                <div className="alert alert-warning">Loading ...</div>
            ) : ( data.dataseries.length > 0  &&
                        <div className="text-center">
                            <img src={`https://www.7timer.info/bin/astro.php?%20lon=${props.choice.longitude}&lat=${props.choice.latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`}
                                 className="img-fluid" alt="ForecastImage"/>
                            <div className="table-responsive">
                                <table className="table">
                                    <caption>Weekly Forecast</caption>
                                    <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Weather</th>
                                        <th scope="col">Minimum Temperature</th>
                                        <th scope="col">Maximum Temperature</th>
                                        <th scope="col">Wind</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.dataseries.map(item => (
                                        <tr key={item.date.toString()}>
                                            <td>{item.date.toString().substr(6, 2) + '/' + item.date.toString().substr(4, 2) + '/' + item.date.toString().substr(0, 4)}</td>
                                            <td>{item.weather}</td>
                                            <td>{item.temp2m.min}</td>
                                            <td>{item.temp2m.max}</td>
                                            <td>{item.wind10m_max}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
            )}
        </>
    );
}