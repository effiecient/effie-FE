import { Navbar } from "@/components";
import { Browser } from "@/features";
import React from "react";

export default function Directory() {
    return (
        <div className="flex flex-col h-full w-full">
            <Navbar />
            <Browser />
        </div>
    );
}
