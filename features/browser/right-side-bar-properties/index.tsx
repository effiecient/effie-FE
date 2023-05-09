import { FolderLinkData, UpdateFolderReq, UpdateLinkReq } from "@/type";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "@/utils";
import Image from "next/image";

import { Button, Input, Select } from "@/ui";

import Modal from "../../../components/modal";

import {
    BE_BASE_URL,
    FE_BASE_URL,
    FE_FULL_BASE_URL,
    FE_PROTOCOL,
} from "@/config";

import { useFetchEffieBE, useUserStore, useWindowSize } from "@/hooks";
import { useRouter } from "next/router";
import { RightSideBar } from "../right-side-bar";

import CopyIcon from "@/public/icons/copy";
import editIcon from "@/public/icons/edit.svg";
import trashIcon from "@/public/icons/trash.svg";
import cancelIcon from "@/public/icons/cancel.svg";
import saveIcon from "@/public/icons/save.svg";
import drawerImage from "@/public/images/drawer.svg";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";

import { Content } from "./content";
type RightSideBarPropertiesProps = {
    isOpen: boolean;
    itemData: FolderLinkData;
    className?: string;
    relativePath: string;
    onClose: () => void;
    onUpdate: () => void;
};

export default function RightSideBarProperties({
    onClose = () => {},
    isOpen = false,
    itemData,
    className,
    relativePath,
    onUpdate = () => {},
}: RightSideBarPropertiesProps) {
    // use modal when screen size is small
    const { width = 976 } = useWindowSize();
    const isSmallScreen = width < 976;
    return (
        <>
            {isSmallScreen ? (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <Content
                        itemData={itemData}
                        relativePath={relativePath}
                        onUpdate={onUpdate}
                    />
                </Modal>
            ) : (
                <RightSideBar isOpen={isOpen} className={`${className} h-full`}>
                    <Content
                        itemData={itemData}
                        relativePath={relativePath}
                        onUpdate={onUpdate}
                    />
                </RightSideBar>
            )}
        </>
    );
}
