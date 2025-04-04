import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import Search from '../components/Search';
import Footer from '../components/Footer';
import { usePropertyContext } from '../contexts/PropertyContext';

const HomePage = () => {
    const { properties, updateProperties, selectProperty, resetProperties } = usePropertyContext();
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const footerRef = useRef(null);
    
    useEffect(() => {
        if (!footerRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '0px'
            }
        );
        
        observer.observe(footerRef.current);
        
        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);
    
    return (
        <>
            <Navbar />
            <main>
                {console.log(properties)}
                {properties.map((property) => (
                    <PropertyCard 
                        key={property._id} 
                        property={property} 
                        selectProperty={selectProperty}
                    />
                ))}
            </main>
            
            {/* Only render Search component when footer is not visible */}
            {!isFooterVisible && (
                <Search updateProperties={updateProperties} properties={properties} resetProperties={resetProperties} />
            )}
            
            {/* Add ref to Footer */}
            <div ref={footerRef}>
                <Footer />
            </div>
        </>
    );
};

export default HomePage;