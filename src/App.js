import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Intro from './pages/Intro';
import Q1 from './pages/Q1';
import Q2 from './pages/Q2';
import Q3 from './pages/Q3';

function App() {
  return (
    <>
    <Sidebar className='sidebar'/>
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route path='/'>
              <Route index element={ <Intro /> } />
            </Route>
            <Route path='/q1'>
              <Route index element={ <Q1 /> } />
            </Route>
            <Route path='/q2'>
              <Route index element={ <Q2 /> } />
            </Route>
            <Route path='/q3'>
              <Route index element={ <Q3 /> } />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
