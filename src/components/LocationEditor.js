import {useState} from "react";


function LocationEditor(props) {

    const [inputs, setInputs] = useState({});

    const [error, setError] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    // check if param is numerical (including negative and floating point numbers)
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate

        // clear errors
        setError({});
        const errors = {}

        if (inputs.city === undefined || inputs.city === "") {
            errors.city = "Name is required";
        } else if (props.locations.find(location => location.city === inputs.city))
            errors.city = "City already exists";


        if (inputs.longitude === undefined || inputs.longitude === "") {
            errors.longitude = "Longitude is required";
        } else if (!isNumeric(inputs.longitude)) {
            errors.longitude = "Longitude must be a number";
        } else if (inputs.longitude < -180 || inputs.longitude > 180) {
            errors.longitude = "Longitude must be between -180 and 180";
        }

        if (inputs.latitude === undefined || inputs.latitude === "") {
            errors.latitude = "Latitude is required";
        } else if (!isNumeric(inputs.latitude)) {
            errors.latitude = "Latitude must be a number";
        } else if (inputs.latitude < -90 || inputs.latitude > 90) {
            errors.latitude = "Latitude must be between -90 and 90";
        }

        // count number of keys in object
        console.log(errors);
        setError(errors);
        // check if there are any errors
        if (Object.keys(errors).length === 0) {
            props.addLocation({city:inputs.city,latitude:inputs.latitude,longitude:inputs.longitude})
        }
    }


    return (
        <>
            <h3>Locations</h3>
            <div className="list-group mt-2">
                {props.locations.map(location => (
                    <button type="button"
                            className="list-group-item list-group-item-action"
                            key={location.id}>
                        {location.city}
                        <span className={"btn btn-danger float-end"}
                                onClick={(e)=>{props.deleteLocation(location.id)}}>X</span>
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-2">
                <div className="form-group">
                    <label htmlFor="city">City:</label><br/>
                    <input type="text" className="form-control" id="city" name="city" value={inputs.city || ""} onChange={handleChange}/><br/>
                    {error.city && <div className={"text-danger"}>{error.city}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="longitude">Longtitude:</label><br/>
                    <input type="text" className="form-control" id="longitude" name="longitude" value={inputs.longitude || ""} onChange={handleChange}/><br/>
                    {error.longitude && <div className={"text-danger"}>{error.longitude}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="latitude">Latitude:</label><br/>
                    <input type="text" className="form-control" id="latitude" name="latitude" value={inputs.latitude || ""} onChange={handleChange}/><br/>
                    {error.latitude && <div className={"text-danger"}>{error.latitude}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </>
    );
}

export default LocationEditor;