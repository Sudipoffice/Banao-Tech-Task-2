// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MicTest from "./pages/MicTest";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mic-test" element={<MicTest />} />
      </Routes>
    </BrowserRouter>
  );
}