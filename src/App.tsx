import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MyDay from './pages/MyDay';
import Advice from './pages/Advice';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/day" element={<MyDay />} />
        <Route path="/advice" element={<Advice />} />
      </Routes>
    </BrowserRouter>
  );
}
