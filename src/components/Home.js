import {useState} from "react";

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
                            onClick={(e)=>{setChoice(location.id)}}>
                        {location.name}
                    </button>
                ))}
            </div>
            <div>
                <h5>current choice: {choice}</h5>
            </div>
            <button type="button" className="btn-primary mt-2">get Forecast</button>
        </div>
    );

}

export default Home;