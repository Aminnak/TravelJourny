import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/login" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}
