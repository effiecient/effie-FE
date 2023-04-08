import { FolderLinkData, UpdateFolderReq, UpdateLinkReq } from "@/type";
import CopyIcon from "@/public/icons/copy";
import Link from "next/link";
import { useRef, useState } from "react";
import { copyToClipboard } from "@/utils";
import { Button } from "@/ui";
import editIcon from "@/public/icons/edit.svg";
import Image from "next/image";
import Input from "../../components/input";
import Modal from "../../components/modal";
import ConfirmationModal from "../../components/create-modal/confirmation-modal";
import {
    BE_BASE_URL,
    FE_BASE_URL,
    FE_FULL_BASE_URL,
    FE_PROTOCOL,
} from "@/config";
import { useFetchEffieBE, useUserStore, useWindowSize } from "@/hooks";
import { useRouter } from "next/router";
import { RightSideBar } from "./right-side-bar";
import DrawerSVG from "@/public/images/drawer.svg";
import { relative } from "path";
type SideBarPropertiesProps = {
    isOpen: boolean;
    itemData: FolderLinkData;
    className?: string;
    relativePath: string;
    onClose: () => void;
};

export default function SideBarProperties({
    onClose = () => {},
    isOpen = false,
    itemData,
    className,
    relativePath,
}: SideBarPropertiesProps) {
    const subdomain = useUserStore((state: any) => state.subdomain);
    const pathname = useUserStore((state: any) => state.pathname);
    const [editedItemData, setEditedItemData] =
        useState<FolderLinkData>(itemData);

    const [isInEditMode, setIsInEditMode] = useState(false);
    const Content = () => {
        return (
            <>
                {itemData === undefined ? (
                    <div className="mt-6 lg:mt-16 flex flex-col justify-center items-center">
                        <Image
                            src={DrawerSVG}
                            alt="drawer"
                            width={200}
                            height={200}
                        />
                        <p className="text-neutral-700 mt-12">
                            Select an item to see its details here.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mt-6 lg:mt-16 h-full">
                            <h4 className="text-neutral-900">
                                {itemData.title}
                            </h4>
                            <div className="flex flex-col break-words">
                                <h5 className="text-neutral-800">Link</h5>
                                <p>{`${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${
                                    pathname === "" ? "" : `/${pathname}`
                                }/${relativePath}`}</p>
                                <h5 className="text-neutral-800">
                                    Redirects to
                                </h5>
                                <p>{itemData.link}</p>

                                <h5 className="text-neutral-800">Access</h5>
                                <p>
                                    {itemData.shareConfiguration.isShared
                                        ? itemData.shareConfiguration
                                              .sharedPrivilege === "read"
                                            ? "(Read Only)"
                                            : "(Read and Write)"
                                        : "Private"}
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        {isInEditMode ? (
                            <>testing</>
                        ) : (
                            <div className="sticky bottom-12 w-full">
                                <Button className="w-full" borderMode>
                                    Edit Properties
                                </Button>
                                <Button
                                    className="w-full"
                                    type="danger"
                                    borderMode
                                >
                                    Edit Properties
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </>
        );
    };
    // use modal when screen size is small
    const { width = 976 } = useWindowSize();
    const isSmallScreen = width < 976;
    return (
        <>
            {isSmallScreen ? (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <Content />
                </Modal>
            ) : (
                <RightSideBar isOpen={isOpen} className={`${className} h-full`}>
                    <Content />
                </RightSideBar>
            )}
        </>
    );
}
