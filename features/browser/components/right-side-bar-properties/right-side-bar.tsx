// TODO: move to a separate file
type RightSideBarProps = {
    children: React.ReactNode;
    isOpen?: boolean;
    className?: string;
};
export const RightSideBar = ({
    children,
    isOpen = false,
    className = "",
}: RightSideBarProps) => {
    return (
        <>
            {/* create a fake div behind. holyshit i spend 3 hours for this few lines*/}
            <div
                className={`duration-500 ease-in-out ${
                    isOpen ? "mr-[20vw]" : "mr-6"
                }`}
            ></div>
            <div
                className={`fixed right-0 bottom-0 top-0 overflow-hidden duration-500 ease-in-out bg-white ${
                    isOpen ? "w-[20vw]" : "w-6"
                }`}
            >
                <div
                    className={`${className} w-[20vw] p-6 fixed flex flex-col justify-between`}
                >
                    {children}
                </div>
            </div>
        </>
    );
};
