import { FolderLinkData } from "@/type";

import Modal from "../../../components/modal";

import { useWindowSize } from "@/hooks";
import { RightSideBar } from "./right-side-bar";

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
