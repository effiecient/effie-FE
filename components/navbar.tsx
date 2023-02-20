import { useState } from "react";
import Register from "./register";

export default function Navbar() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <div className="w-full bg-white">
                <button>Login</button>
                <button onClick={() => setIsRegisterOpen(!isRegisterOpen)}>Register</button>
            </div>

            {/* Register */}
            <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    );
}
  