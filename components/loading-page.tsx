import React, { useEffect, useState } from "react";
import LoadingSVG from "@/components/loading-svg";

export default function LoadingPage() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="h-1/6  w-1/6 md:h-1/12 md:w-1/12">
                <LoadingSVG />
            </div>
        </div>
    );
}
