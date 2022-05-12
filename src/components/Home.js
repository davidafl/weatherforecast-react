import {useState} from "react";
import GetForecast from "./GetForecast";
import CityList from "./CityList";

function Home(props) {

    const [choice, setChoice] = useState(null);

    // display component's prop.locations array of objects
    return (
        <div>
            <h3>Home</h3>
            {props.locations.length === 0 &&
            <div className="alert alert-warning" role="alert">
                No locations found. please add some.
            </div>}
            <CityList setChoice={setChoice} locations={props.locations}/>
            <div className="mt-2">
                { choice &&
                <div className="alert alert-info" role="alert">
                    current choice: {choice.city}
                </div>}
            </div>

            <GetForecast choice={choice}/>
        </div>
    );

}

export default Home;