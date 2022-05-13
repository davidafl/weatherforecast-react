import React, { useState } from 'react';
import axios from 'axios';

const SERVER_ERROR = "weather forecast server error";

const WIND_CONVERSION = {
    1: 'No wind',
    2:  "0.3-3.4m/s (light)",
    3: "3.4-8.0m/s (moderate)",
    4: "8.0-10.8m/s (fresh)",
    5: "10.8-17.2m/s (strong)",
    6: "17.2-24.5m/s (gale)",
    7: "24.5-32.6m/s (storm)",
    8: "Over 32.6m/s (hurricane)"
}

const WEATHER_CONVERSION = {
    clear: 'Total cloud cover less than 20%',
    pcloudy: 'Total cloud cover between 20% and 60%',
    mcloudy: "Total cloud cover between 60%-80%",
    cloudy: "Total cloud cover over over 80%",
    humid: "Relative humidity over 90% with total cloud cover less than 60%",
    lightrain: "recipitation rate less than 4mm/hr with total cloud cover more than 80%",
    oshower: "Precipitation rate less than 4mm/hr with total cloud cover between 60%-80%",
    ishower: "Precipitation rate less than 4mm/hr with total cloud cover less than 60%",
    lightsnow: "Precipitation rate less than 4mm/hr",
    rain: "Precipitation rate over 4mm/hr",
    snow: "Precipitation rate over 4mm/hr",
    rainsnow: "Precipitation type to be ice pellets or freezing rain",
    ts: "Lifted Index less than -5 with precipitation rate below 4mm/hr",
    tsrain: "Lifted Index less than -5 with precipitation rate over 4mm/hr"
}

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
/**
 * this function returns a function that will be used as a callback
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function GetForecast(props) {
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
                <button className="btn btn-primary mt-2" type="submit">Display forecast</button>
            </form>

            {isError && <div className="alert alert-warning">{SERVER_ERROR}</div>}

            {isLoading ? (
                <div className="text-center">
                    <img src="loading_icon.gif"
                         className="img-fluid" alt="loadingImage"/>
                </div>
            ) : ( data.dataseries.length > 0  &&
                        <div className="text-center mt-2">
                            <img src={`https://www.7timer.info/bin/astro.php?%20lon=${props.choice.longitude}&lat=${props.choice.latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`}
                                 className="img-fluid" alt="ForecastImage"/>
                            <div className="table-responsive mt-2">
                                <table className="table">
                                    <caption>Weekly Forecast</caption>
                                    <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Weather</th>
                                        <th scope="col">Temperature</th>
                                        <th scope="col">Wind</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.dataseries.map(item => (
                                        <tr key={item.date.toString()}>
                                            <td>{item.date.toString().substr(6, 2) + '/' + item.date.toString().substr(4, 2) + '/' + item.date.toString().substr(0, 4)}</td>
                                            <td>{WEATHER_CONVERSION[item.weather]}</td>
                                            <td>{item.temp2m.min} - {item.temp2m.max} °C</td>
                                            <td>{WIND_CONVERSION[item.wind10m_max]}</td>
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