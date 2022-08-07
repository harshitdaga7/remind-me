import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";


export default function Header() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // check if loggedin previously and then set state
        setLoggedIn(false);
    }, []);

    function handleLoginClick() {
        /// handle what happens if user clicks on login button
        setLoggedIn(true);
    }

    function renderLogin() {
        if (isLoggedIn) {
            return (
                <span className="dropdown dropdown-center">
                    <button
                        className="btn btn-outline-light dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Hello
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <a className="dropdown-item" href="#">
                                Action
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Another action
                            </a>
                        </li>
                    </ul>
                </span>
            );
        } else {
            return (
                <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={handleLoginClick}
                >
                    Login
                </button>
            );
        }
    }

    return (
        <nav className="navbar navbar-expand-md bg-dark">
            <div className="container-fluid">

                <Link to="/" className="navbar-brand">
                    RemindMe
                </Link>
                <div className="headerLeft">
                    <Link to = "/create" className="btn btn-outline-light mx-3 my-2"  role="button">
                        create
                    </Link>
                    <Link to = "/dashboard" className="btn btn-outline-light mx-3 my-2" href="#" role="button">
                        Dashboard
                    </Link>
                    {renderLogin()}
                </div>
            </div>
        </nav>
    );
}
