import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import PropertyDetailPage from './pages/PropertyDetail';
import LikedPropertiesPage from './pages/LikedProperties.jsx';
import {PropertyProvider} from './contexts/PropertyContext.jsx'

function App() {
  return (
    <PropertyProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/property/:id' element={<PropertyDetailPage />} />
          <Route path='/favorites' element={<LikedPropertiesPage />} />
        </Routes>
      </Router>
    </PropertyProvider>
  )
}

export default App
