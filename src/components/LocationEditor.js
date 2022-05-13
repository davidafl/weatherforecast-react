import CityList from "./CityList";
import AddCityForm from "./AddCityForm";

/**
 * @description - This component is used to display the list of cities and the form to add a new city.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function LocationEditor(props) {

    return (
        <>
            <div className={"mt-2"}>
                <h3>Locations</h3>
            </div>

            <CityList locations={props.locations} deleteLocation={props.deleteLocation}/>

            <AddCityForm addLocation={props.addLocation} locations={props.locations}/>
        </>
    );
}

export default LocationEditor;