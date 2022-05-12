import {useState} from "react";

export default function AddCityForm(props) {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState({});

    /**
     * handle change event for input fields
     * @param event
     */
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    /**
     * check if param is numerical (including negative and floating point numbers)
     * @param n
     * @returns {boolean}
     */
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * check if input fields are valid
     * @param value
     * @param min
     * @param max
     * @param errors
     * @param varName
     */
    function validateRange(value, min, max, errors, varName) {
        if (value === undefined || value === "") {
            errors[varName] = `${varName} is required`;
        } else if (!isNumeric(value)) {
            errors[varName] = `${varName} must be a number`;
        } else if (value < min || value > max) {
            errors[varName] = `${varName} must be between ${min} and ${max}`;
        }
    }

    /**
     * handle sumbit event for form
     * @param event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        // validate

        // clear errors
        setError({});
        const errors = {}

        // validate city doesnt already exist
        if (inputs.city === undefined || inputs.city === "") {
            errors.city = "Name is required";
        } else if (props.locations.find(location => location.city === inputs.city))
            errors.city = "City already exists";

        validateRange(inputs.longitude, -180, 180, errors, "longitude");
        validateRange(inputs.latitude, -90, 90, errors, "latitude");


        // count number of keys in object
        console.log(errors);
        setError(errors);
        // check if there are any errors
        if (Object.keys(errors).length === 0) {
            props.addLocation({city:inputs.city,latitude:inputs.latitude,longitude:inputs.longitude})
        }
    }


    return (
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
    )
}