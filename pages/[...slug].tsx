import { Navbar, Snackbar } from "@/components";
import { Browser } from "@/features";
import React from "react";

export default function Directory() {
    return (
        <>
            <Browser />
            <Snackbar className="z-50" />
        </>
    );
}
