import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { fetchLikedProperties, fetchProperties } from '../services/PropertyService';
import { usePropertyContext } from '../contexts/PropertyContext';
import { Link } from 'react-router-dom';


const LikedPropertiesPage = () => {
    const { selectProperty } = usePropertyContext();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleRemoveProperty = (propertyId) => {
        setProperties(prev => prev.filter(prop => prop._id !== propertyId));
      };

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                const fetchedProperties = await fetchLikedProperties();
                setProperties(fetchedProperties ? fetchedProperties : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (properties.length == 0){
        return (
            <>
                <Navbar/>
                <h2>No liked properties found</h2>
                <Link to={'/'}>
                    <button style={{marginBottom:'64%'}}>Go Back</button>
                </Link>
                <Footer/>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <main>
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <PropertyCard 
                            key={property._id} 
                            property={property} 
                            selectProperty={selectProperty}
                            handleRemoveProperty={handleRemoveProperty}
                        />
                    ))
                ) : (
                    <div>No liked properties found</div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default LikedPropertiesPage;