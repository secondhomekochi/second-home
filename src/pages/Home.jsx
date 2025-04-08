import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import Search from '../components/Search';
import Footer from '../components/Footer';
import { usePropertyContext } from '../contexts/PropertyContext';

const HomePage = () => {
    const { properties, updateProperties, selectProperty, resetProperties, propertiesBackup
    } = usePropertyContext();

    return (
        <>
            <Navbar />
            <main>
                {properties.length == 0 && <div>There is no Matching property</div>}
                {properties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        selectProperty={selectProperty}
                    />
                ))}
            </main>

            <Search updateProperties={updateProperties} properties={properties} propertiesBackup={propertiesBackup} />
            <Footer />
        </>
    );
};

export default HomePage;