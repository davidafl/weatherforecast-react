import {Link, Outlet} from "react-router-dom";
import React from "react";

/**
 * @description Menu component, contains two links to the home and editLocation pages
 * @returns {JSX.Element}
 * @constructor
 */
function Menu() {
    return (
        <>
            <div className={"text-center"}>
                <img src="header.jpg"
                     className="img-fluid" alt="loadingImage"/>
            </div>
            <div className="mt-2">
                <Link to={'/'}>
                    <button type="button" className="btn btn-primary">Home</button>
                </Link>
                {' '}
                <Link to="/locations" >
                    <button type="button" className="btn btn-primary">Locations</button>
                </Link>
            </div>
            <Outlet />
        </>
    );
}

export default Menu;