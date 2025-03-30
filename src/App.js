import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Routes, Route } from 'react-router';

function App() {
  return (
    <>
    <Sidebar className='sidebar'/>
    <Routes>
      {/* <Route path='/' element={<Intro />} /> */}
      {/* <Route path="/q1" element={<Question1 />} /> */}
      {/* <Route path="/q2" element={<Question2 />} /> */}
      {/* <Route path="/q3" element={<Question3 />} /> */}
    </Routes>
    </>
  );
}

export default App;
