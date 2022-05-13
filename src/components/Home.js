import {useState} from "react";
import GetForecast from "./GetForecast";
import CityList from "./CityList";

/**
 * component Home, which contains the search bar and the list of cities, and the button to get the forecast
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Home(props) {

    const [choice, setChoice] = useState(null);

    // display component's prop.locations array of objects
    return (
        <div>
            <div className={"mt-2"}>
                <h3>Home</h3>
            </div>
            {props.locations.length === 0 &&
            <div className="alert alert-warning" role="alert">
                No locations found. please add some.
            </div>}
            <CityList setChoice={setChoice} locations={props.locations}/>
            { choice &&
            <div className="alert alert-info mt-2" role="alert">
                current choice: {choice.city}
            </div>}


            <GetForecast choice={choice}/>
        </div>
    );

}

export default Home;