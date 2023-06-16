import { FolderLinkData } from "@/type";

import Modal from "@/ui/modal";

import { useBrowserStore, useWindowSize } from "@/hooks";
import { RightSideBar } from "./right-side-bar";

import { Content } from "./content";
type RightSideBarPropertiesProps = {
    className?: string;
};

export default function RightSideBarProperties({
    className,
}: RightSideBarPropertiesProps) {
    // use modal when screen size is small
    const { width = 976 } = useWindowSize();
    const isSmallScreen = width < 976;

    const [isRightSideBarPropertiesOpen, setIsRightSideBarPropertiesOpen] =
        useBrowserStore((state: any) => [
            state.isRightSideBarPropertiesOpen,
            state.setIsRightSideBarPropertiesOpen,
        ]);

    const handleClose = () => {
        setIsRightSideBarPropertiesOpen(false);
    };
    return (
        <AlternateParent
            parent={isSmallScreen ? Modal : RightSideBar}
            isOpen={isRightSideBarPropertiesOpen}
            onClose={handleClose}
            className={`${className} ${!isSmallScreen && "h-full"}`}
        >
            <Content />
        </AlternateParent>
    );
}

type alternateParentProps = {
    parent: React.ComponentType<any>;
    [x: string]: any; // any other props
};

const AlternateParent = (props: alternateParentProps) => {
    const { parent: Parent } = props;

    // filter out Parent from props
    const passedProps = { ...props, parent: undefined };

    return <Parent {...passedProps} />;
};
