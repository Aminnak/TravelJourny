import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import TravelJourney from "./pages/TravelJourney";
import CreatePost from "./pages/CreatePost";

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/login" element={<Signup />} />
                    <Route path="/journey/:id" element={<TravelJourney />} />
                    <Route path="/journey/create" element={<CreatePost />} />
                </Routes>
            </Router>
        </div>
    );
}
