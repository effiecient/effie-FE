import { useState } from "react";
import Login from "./login";
import Register from "./register";

export default function Navbar() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <div className="w-full bg-white">
                <button onClick={() => setIsLoginOpen(!isLoginOpen)} disabled={isRegisterOpen}>Login</button>
                <button onClick={() => setIsRegisterOpen(!isRegisterOpen)} disabled={isLoginOpen}>Register</button>
            </div>

            {/* Register */}
            <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

            {/* Login */}
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
}
  