import {Link, Outlet} from "react-router-dom";

function Menu() {
    return (
        <>
            <h1>Forecast Weather</h1>
            <Link to={'/'}>Home</Link> |
            <Link to="/locations" >Locations</Link>
            <Outlet />
        </>
    );
}

export default Menu;