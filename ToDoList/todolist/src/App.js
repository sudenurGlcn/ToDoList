import logo from './logo.svg';
import './App.css';
import Main from './components/Main.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

