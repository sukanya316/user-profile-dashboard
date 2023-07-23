import { Routes,Route,BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage'
import ProfileDetailsPage from './components/ProfileDetailsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
 <Routes>
    <Route path="/home" Component={HomePage}/>
    <Route exact path='/profile/:id' Component={ProfileDetailsPage}/>
 </Routes>  
 </BrowserRouter> 
  );
}

export default App;
