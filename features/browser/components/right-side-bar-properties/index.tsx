import { FolderLinkData } from "@/type";

import Modal from "@/ui/modal";

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
        <AlternateParent
            parent={isSmallScreen ? Modal : RightSideBar}
            isOpen={isOpen}
            onClose={onClose}
            className={`${className} ${!isSmallScreen && "h-full"}`}
        >
            <Content
                itemData={itemData}
                relativePath={relativePath}
                onUpdate={onUpdate}
            />
        </AlternateParent>
    );
}

type alternateParentProps = {
    parent: React.ComponentType<any>;
};

const AlternateParent = (props: any) => {
    const { parent: Parent } = props;

    // filter out Parent from props
    const passedProps = Object.keys(props)
        .filter((key) => key !== "parent")
        .reduce((obj: any, key: any) => {
            obj[key] = props[key];
            return obj;
        }, {});

    return <Parent {...passedProps} />;
};
