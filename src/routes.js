import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Active from "./pages/Active";
import Completed from "./pages/Completed";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/active" element={<Active />} />
                <Route path="/completed" element={<Completed />} />
            </Routes>
        </BrowserRouter>
    )
}