import {useState} from "react";

function LocationEditor(props) {

    const [city, setCity] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);



    return (
        <>
            <div className="list-group">
                {props.locations.map(location => (
                    <button type="button"
                            className="list-group-item list-group-item-action"
                            key={location.id}>
                        {location.name}
                        <span className={"btn btn-danger float-end"}
                                onClick={(e)=>{props.deleteLocation(location.id)}}>X</span>
                    </button>
                ))}
            </div>
            <form onSubmit={(e)=>{e.preventDefault(); props.addLocation({name:city,latitude:latitude,longitude:longitude})}}>
                <label htmlFor="city">City:</label><br/>
                <input type="text" id="city" name="city"
                       onChange={(e)=>{setCity(e.target.value)}}/><br/>

                <label htmlFor="longitude">Longtitude:</label><br/>
                <input type="text" id="longitude" name="longitude"
                       onChange={(e)=>{setLongitude(e.target.value)}}/><br/>

                <label htmlFor="latitude">Latitude:</label><br/>
                <input type="text" id="latitude" name="latitude"
                       onChange={(e)=>{setLatitude(e.target.value)}}/><br/>


                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </>
    );
}

export default LocationEditor;