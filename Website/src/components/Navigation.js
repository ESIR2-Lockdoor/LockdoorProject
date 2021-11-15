import React from 'react';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="/myProfil" activeClassName="nav-active">
                Mon profil
            </NavLink>
            <NavLink exact to="/admin-settings" activeClassName="nav-active">
                Admin Settings
            </NavLink>
            <NavLink exact to="/settings" activeClassName="nav-active">
                Settings
            </NavLink>
            <NavLink exact to="/about" activeClassName="nav-active">
                About
            </NavLink>
        </div>
    );
};

export default Navigation;