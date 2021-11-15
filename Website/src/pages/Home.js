import Navigation from "../components/Navigation";
import Logo from "../components/Logo";

const Home = () => {
    return (
        <div className="home">
            <Navigation />
            <Logo />
            <h1>Accueil</h1>
        </div>
    );
};

//l'export permet de rendre le composant Home utilisable partout
export default Home;
