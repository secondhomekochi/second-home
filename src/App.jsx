import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import PropertyDetailPage from './pages/PropertyDetail';
import {PropertyProvider} from './contexts/PropertyContext.jsx'

function App() {
  return (
    <PropertyProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/property/:id' element={<PropertyDetailPage />} />
        </Routes>
      </Router>
    </PropertyProvider>
  )
}

export default App
