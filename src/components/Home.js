import {useState} from "react";
import FormFetchWithHook from "./FormFetchWithHook";

function Home(props) {

    const [choice, setChoice] = useState(null);

    // display component's prop.locations array of objects
    return (
        <div>
            <h3>Home</h3>
            <div className="list-group">
                {props.locations.map(location => (
                    <button type="button"
                            className="list-group-item list-group-item-action"
                            key={location.id}
                            onClick={(e)=>{setChoice(location)}}>
                        {location.name}
                    </button>
                ))}
            </div>
            <div>
                { choice && <h5>current choice: {choice.name}</h5> }
            </div>

            <FormFetchWithHook choice={choice}/>
        </div>
    );

}

export default Home;