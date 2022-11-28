import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { StatusContext } from "../../App";
import logo from "./../../assets/logo.png";
import "./css/navbar.min.css";

const Navbar = () => {
   const {filter} = useParams()
    let { Status, setStatus } = useContext(StatusContext);
    const [ActiveDropDown, setActiveDropDown] = useState();

    const handleLogout = (_) => {
        // Log Out Hndled
        window.localStorage.removeItem("userToken"); // remove from storage
        setStatus("login"); // set Status To Login
    };

    useEffect(() => {
        setActiveDropDown(filter);
    }, [filter]);

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-secondary navbar-dark">
                <div className="container">
                    <Link
                        className="navbar-brand d-flex align-items-center me-5 bg-transparent"
                        to="/"
                    >
                        <img src={logo} className="me-2" alt="Logo" />
                        <span>Game Over</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse fs-5 shadow-sm"
                        id="navbarSupportedContent"
                    >
                        {Status === "loggedin" ? (
                            <>
                                <ul className="navbar-nav me-auto mb-2 my-lg-0 mt-3">
                                    <li className="nav-item my-2 my-lg-0 mx-0 mx-lg-2">
                                        <NavLink
                                            className={`nav-link fs-6 py-1 px-2 rounded-2 nav-link-w`}
                                            aria-current="page"
                                            to=""
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className="nav-item my-2 my-lg-0 mx-0 mx-lg-2">
                                        <NavLink
                                            className={`nav-link fs-6 py-1 px-2 rounded-2 nav-link-w`}
                                            to="/games/all"
                                        >
                                            All
                                        </NavLink>
                                    </li>

                                    <li className="nav-item dropdown my-2 my-lg-0 mx-0 mx-lg-2">
                                        <Link
                                            className={`nav-link dropdown-toggle fs-6 py-1 px-2 rounded-2 nav-link-w ${(ActiveDropDown === 'platform') && 'active'}`}
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Platforms
                                        </Link>
                                        <ul className="dropdown-menu px-2">
                                            <li>
                                                <NavLink
                                                    to="/games/platform/pc"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    PC
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/platform/browser"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    Browser
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown my-2 my-lg-0 mx-0 mx-lg-2">
                                        <Link
                                            className={`nav-link dropdown-toggle fs-6 py-1 px-2 rounded-2 nav-link-w ${(ActiveDropDown === 'sort-by') && 'active'}`}
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            sort-by
                                        </Link>
                                        <ul className="dropdown-menu px-2">
                                            <li>
                                                <NavLink
                                                    to="/games/sort-by/release-date"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    release-date
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/sort-by/popularity"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    popularity
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/sort-by/alphabitical"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    alphabitical
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/sort-by/relevancs"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    relevancs
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown my-2 my-lg-0 mx-0 mx-lg-2">
                                        <Link
                                            className={`nav-link dropdown-toggle fs-6 py-1 px-2 rounded-2 nav-link-w ${(ActiveDropDown === 'category') && 'active'}`}
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Categories
                                        </Link>
                                        <ul className="dropdown-menu px-2">
                                            <li>
                                                <NavLink
                                                    to="/games/category/racing"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    racing
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/sports"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    sports
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/social"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    social
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/shooter"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    shooter
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/open-world"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    open-world
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/zombie"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    zombie
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/fantasy"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    fantasy
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/action-rpg"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    action-rpg
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/action"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    action
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/flight"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    flight
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/games/category/battle-royale"
                                                    className={`dropdown-item nav-link-w my-2 pb-2 rounded-2`}
                                                >
                                                    battle-royale
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <NavLink
                                    to="/profile"
                                    className="btn btn-outline-primary border-0 me-2"
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/auth"
                                    className="btn btn-outline-primary"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/auth"
                                    className="btn btn-outline-primary border-0 me-2 ms-auto"
                                    onClick={(_) => setStatus("login")}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/auth/register"
                                    className="btn btn-outline-primary"
                                    onClick={(_) => setStatus("register")}
                                >
                                    Join Free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
