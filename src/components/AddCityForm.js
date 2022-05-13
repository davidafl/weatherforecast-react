import {useState} from "react";

const CITY_REQUIRED_MSG = "Name is required";
const CITY_EXIST_MSG = "City already exists";

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
     * generic function to check if a variable is in a given range
     * @param value - value to check
     * @param min - minimum value
     * @param max - maximum value
     * @param errors - error object to be updated
     * @param varName - name of the variable
     */
    function validateRange(value, min, max, errors, varName) {
        if (value === undefined || value.trim() === "") {
            errors[varName] = `${varName} is required`;
        } else if (!isNumeric(value.trim())) {
            errors[varName] = `${varName} must be a number`;
        } else if (value.trim() < min || value.trim() > max) {
            errors[varName] = `${varName} must be between ${min} and ${max}`;
        }
    }

    /**
     * handle sumbit event for form, validate input and add the location to the list
     * @param event
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        // clear errors
        setError({});
        const errors = {}

        // validate city doesnt already exist
        if (inputs.city === undefined || inputs.city.trim() === "") {
            errors.city = CITY_REQUIRED_MSG;
        } else if (props.locations.find(location => location.city.trim() === inputs.city.trim()))
            errors.city = CITY_EXIST_MSG;

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
                <label htmlFor="city">City:</label>
                <input type="text" className="form-control" id="city" name="city" value={inputs.city || ""} onChange={handleChange}/>
                {error.city && <div className={"text-danger"}>{error.city}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="longitude">Longtitude:</label>
                <input type="text" className="form-control" id="longitude" name="longitude" value={inputs.longitude || ""} onChange={handleChange}/>
                {error.longitude && <div className={"text-danger"}>{error.longitude}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="latitude">Latitude:</label>
                <input type="text" className="form-control" id="latitude" name="latitude" value={inputs.latitude || ""} onChange={handleChange}/>
                {error.latitude && <div className={"text-danger"}>{error.latitude}</div>}
            </div>

            <button type="submit" className="btn btn-primary mt-2">Add</button>
        </form>
    )
}