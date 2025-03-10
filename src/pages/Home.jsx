import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard'


const HomePage = () => {
    return (
        <>
            <Navbar/>
            <main>
                <PropertyCard></PropertyCard>
            </main>
        </>
    );
}

export default HomePage;