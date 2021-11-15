import React from 'react';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
const MyProfil = () => {
    return (
        <div>
            <Navigation />
            <Logo />
            <h1>Mon profil</h1>
            <br/>
            <p>Mon nom</p>
            <br/>
            <p>Mon hashtag #123456</p>
            <br/>
            <p>Mes amis</p>
            <br/>
            <p>Mes portes</p>
            <br/>
            <p>Mes invitations</p>
            <br/>
        </div>
    );
};

export default MyProfil;