import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Courses from '../Courses/Courses';

const App = () => {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/profile" element={<h1>acc</h1>}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
