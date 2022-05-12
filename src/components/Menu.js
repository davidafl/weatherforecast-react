import {Link, Outlet} from "react-router-dom";

/**
 * @description Menu component
 * @returns {JSX.Element}
 * @constructor
 */
function Menu() {
    return (
        <>
            <h1>Forecast Weather</h1>
            <Link to={'/'}>
                <button type="button" className="btn btn-primary">Home</button>
            </Link>
            {' '}
            <Link to="/locations" >
                <button type="button" className="btn btn-primary">Locations</button>
            </Link>
            <Outlet />
        </>
    );
}

export default Menu;