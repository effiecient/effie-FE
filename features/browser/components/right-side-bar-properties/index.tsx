import { FolderLinkData } from "@/type";

import Modal from "@/ui/modal";

import { useBrowserStore, useWindowSize } from "@/hooks";
import { RightSideBar } from "./right-side-bar";

import { Content } from "./content";
type RightSideBarPropertiesProps = {
    className?: string;
};

export function RightSideBarProperties({
    className,
}: RightSideBarPropertiesProps) {
    // use modal when screen size is small
    const { width } = useWindowSize();

    const [isRightSideBarPropertiesOpen, setIsRightSideBarPropertiesOpen] =
        useBrowserStore((state: any) => [
            state.isRightSideBarPropertiesOpen,
            state.setIsRightSideBarPropertiesOpen,
        ]);

    const handleClose = () => {
        setIsRightSideBarPropertiesOpen(false);
    };
    return (
        (width && (
            <AlternateParent
                parent={width < 976 ? Modal : RightSideBar}
                isOpen={isRightSideBarPropertiesOpen}
                onClose={handleClose}
                className={`${className} ${!(width < 976) && "h-full"}`}
            >
                <Content />
            </AlternateParent>
        )) || <></>
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
