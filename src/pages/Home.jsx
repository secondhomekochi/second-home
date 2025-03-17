import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard'
import Search from '../components/Search';
import {usePropertyContext} from '../contexts/PropertyContext'


const HomePage = () => {
    // const [properties, setProperties] = useState([]);

    // const updateProperties = (newProperties) => {
    //     setProperties(newProperties);
    // };

    // useEffect(() => {
    //     const fetchPropeties = async () => {
    //         try {
    //             const url = `https://nteaegk8.apicdn.sanity.io/v2024-08-13/data/query/production?query=*%5B_type+%3D%3D+%22property%22+%26%26+%21%28_id+in+path%28%27drafts.**%27%29%29%5D&returnQuery=false`;
    
    //             const response = await fetch(url);
    
    //             if (!response.ok) {
    //                 throw new Error(`API call failed: ${response.status}`);
    //             }
    
    //             let data = await response.json();
    //             setProperties(data.result);
    //             console.log(data);
                
    
    //         } catch (error) {
    //             console.error('Error fetching search results:', error);
    //         }
    //     };

    //     fetchPropeties();
    // }, []);

    const { properties, loading, error, updateProperties } = usePropertyContext();
  
    
    return (
        <>
            <Navbar />
            <main>
                {/* {properties.map(prop=>prop.place)} */}
                {
                    properties.map(
                        (property) => (
                            <PropertyCard key={property._id} property={property}></PropertyCard>
                        )
                    )
                }
            </main>
            <Search updateProperties= {updateProperties} properties={properties}/>
        </>
    );
}

export default HomePage;