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

    // clear all errors
    function clearErrors() {
        setError({});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate

        setError({});
        const errors = {}

        if (inputs.city === undefined || inputs.city === "") {
            //setError(values => ({...values, city: "Name is required"}));
            errors.city = "Name is required";
        } else if (props.locations.find(location => location.city === inputs.city))
            //setError(values => ({...values, city: "City already exists"}));
            errors.city = "City already exists";


        if (inputs.longitude === undefined || inputs.longitude === "") {
            //setError(values => ({...values, longitude: "Longitude is required"}));
            errors.longitude = "Longitude is required";
        } else if (!isNumeric(inputs.longitude)) {
            //setError(values => ({...values, longitude: "Longitude must be a number"}));
            errors.longitude = "Longitude must be a number";
        } else if (inputs.longitude < -180 || inputs.longitude > 180) {
            //setError(values => ({...values, longitude: "Longitude must be between -180 and 180"}));
            errors.longitude = "Longitude must be between -180 and 180";
        }

        if (inputs.latitude === undefined || inputs.latitude === "") {
            //setError(values => ({...values, latitude: "Latitude is required"}));
            errors.latitude = "Latitude is required";
        } else if (!isNumeric(inputs.latitude)) {
            //setError(values => ({...values, latitude: "Latitude must be a number"}));
            errors.latitude = "Latitude must be a number";
        } else if (inputs.latitude < -90 || inputs.latitude > 90) {
            //setError(values => ({...values, latitude: "Latitude must be between -90 and 90"}));
            errors.latitude = "Latitude must be between -90 and 90";
        }

        // count number of keys in object
        console.log(errors);
        setError(errors);
        // check if there are any errors
        if (Object.keys(errors).length === 0) {
            props.addLocation({name:inputs.city,latitude:inputs.latitude,longitude:inputs.longitude})
        }
    }


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
            <form onSubmit={handleSubmit}>
                <label htmlFor="city">City:</label><br/>
                <input type="text" id="city" name="city" value={inputs.city || ""} onChange={handleChange}/><br/>
                {error.city && <div className={"text-danger"}>{error.city}</div>}

                <label htmlFor="longitude">Longtitude:</label><br/>
                <input type="text" id="longitude" name="longitude" value={inputs.longitude || ""} onChange={handleChange}/><br/>
                {error.longitude && <div className={"text-danger"}>{error.longitude}</div>}

                <label htmlFor="latitude">Latitude:</label><br/>
                <input type="text" id="latitude" name="latitude" value={inputs.latitude || ""} onChange={handleChange}/><br/>
                {error.latitude && <div className={"text-danger"}>{error.latitude}</div>}


                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </>
    );
}

export default LocationEditor;