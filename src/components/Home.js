import {useState} from "react";
import FormFetchWithHook from "./FormFetchWithHook";

function Home(props) {

    const [choice, setChoice] = useState(null);

    // display component's prop.locations array of objects
    return (
        <div>
            <h3>Home</h3>
            <div className="list-group mt-2">
                {props.locations.map(location => (
                    <button type="button"
                            className="list-group-item list-group-item-action"
                            key={location.id}
                            onClick={(e)=>{setChoice(location)}}>
                        {location.city}
                    </button>
                ))}
            </div>
            <div className="mt-2">
                { choice &&
                <div className="alert alert-info" role="alert">
                    current choice: {choice.city}
                </div>}
            </div>

            <FormFetchWithHook choice={choice}/>
        </div>
    );

}

export default Home;