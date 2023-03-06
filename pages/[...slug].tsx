import { Navbar } from "@/components";
import { Browser } from "@/features";
import { useRouter } from "next/router";
import React from "react";

export default function Directory() {
    const router = useRouter();
    let slugs: any = router.query.slug;
    console.log("slugs", slugs);
    // if slugs is not an array, turn it into an array
    if (!Array.isArray(slugs)) {
        slugs = [slugs];
    }

    // const postID = router.query... I want to get postID from url somehow.
    return (
        <>
            <Browser username="christojeffrey" location={slugs} />
        </>
    );
}
