import Navbar from '../components/Navbar';
import PropertyDetails from '../components/PropertyDetails';
import {usePropertyContext} from '../contexts/PropertyContext';


const PropertyDetailPage = () => {
    const { selectedProperty } = usePropertyContext();

    return (
        <>
            <Navbar />
            <PropertyDetails property={selectedProperty} />
        </>
    );
}

export default PropertyDetailPage;