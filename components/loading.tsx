import React, { useEffect, useState } from "react";
import { ReactSVG } from 'react-svg';
import LoadingSVG from "@/components/loading-svg";

export default function LoadingPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-1/2 flex justify-center">
            <LoadingSVG/>
            <div>
                <p>Loading...</p>
            </div>
        </div>
    );
}