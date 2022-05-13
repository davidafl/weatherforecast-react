/**
 * component CityList
 * creates the selectable list of cities
 * if deleteLocatoion function is provided it will add a delete button, otherwise it will not
 * if setChoice function is provided it will set the selected city
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function CityList(props) {
    return (
        <div className="list-group mt-2">
            {props.locations.map(location => (
                <button type="button"
                        className="list-group-item list-group-item-action"
                        key={location.id}
                        onClick={(e)=>{if (props.setChoice) { props.setChoice(location)} }}>
                    {location.city}
                    {props.deleteLocation &&
                    <span className={"btn btn-danger float-end"}
                          onClick={(e) => {
                              props.deleteLocation(location.id)
                          }}>X</span>
                    }
                </button>
            ))}
        </div>
    )
}