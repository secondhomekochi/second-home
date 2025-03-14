import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard'
import Search from '../components/Search';

const properties = [
    {
        id: 1,
        name: "Palarivattam Hostel",
        type: "Hostel",
        distance: "4.0 Km",
        price: "₹10,000",
        availability: "Family, Bachelors, Couples",
        bhk: "2 BHK",
        furnishing: "Fully Furnished",
        image: 'src/assets/prop-img-1.webp',
    },
    {
        id: 2,
        name: "Kakkanad Apartment",
        type: "Apartment",
        distance: "6.5 Km",
        price: "₹15,000",
        availability: "Family",
        bhk: "3 BHK",
        furnishing: "Semi Furnished",
        image: 'src/assets/prop-img-1.webp',
    },
    {
        id: 3,
        name: "Edappally Studio",
        type: "Studio",
        distance: "3.2 Km",
        price: "₹8,500",
        availability: "Bachelors",
        bhk: "1 BHK",
        furnishing: "Fully Furnished",
        image: 'src/assets/prop-img-1.webp',
    },
    {
        id: 4,
        name: "Vyttila PG",
        type: "PG Accommodation",
        distance: "2.0 Km",
        price: "₹6,000",
        availability: "Working Professionals",
        bhk: "1 Room",
        furnishing: "Furnished",
        image: 'src/assets/prop-img-1.webp',
    },
    {
        id: 5,
        name: "Aluva",
        type: "Villa",
        distance: "10 Km",
        price: "₹20,000",
        availability: "Family, Bachelors",
        bhk: "4 BHK",
        furnishing: "Fully Furnished",
        image: 'src/assets/prop-img-1.webp',
    }
];

const HomePage = () => {
    return (
        <>
            <Navbar />
            <main>
                {
                    properties.map(
                        (property) => (
                            <PropertyCard key={property.id} property={property}></PropertyCard>
                        )
                    )
                }
            </main>
            <Search />
        </>
    );
}

export default HomePage;