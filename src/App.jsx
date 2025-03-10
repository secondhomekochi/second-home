import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import PropertyDetailPage from './pages/PropertyDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/property/:id' element={<PropertyDetailPage />}/>
      </Routes>
    </Router>
  )
}

export default App
