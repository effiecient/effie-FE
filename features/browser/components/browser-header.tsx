import { useBrowserStore } from "@/hooks";
import { BrowserBreadcrumb } from "./browser-breadcrumb";
import { Dropdown } from "@/ui";
import InfoIcon from "@/public/icons/info";
import GridIcon from "@/public/icons/grid";
import ListIcon from "@/public/icons/list";
import { saveToCookie } from "@/helper";
import { shallow } from "zustand/shallow";
import { SyncingAnimation } from "./syncing-animation";

export const BrowserHeader = ({ isLoadingRefetch }: any) => {
    const [
        sortOption,
        setSortOption,
        isSortAsc,
        setIsSortAsc,
        view,
        setView,
        isRightSideBarPropertiesOpen,
        setIsRightSideBarPropertiesOpen,
    ] = useBrowserStore(
        (state: any) => [
            state.sortOption,
            state.setSortOption,
            state.isSortAsc,
            state.setIsSortAsc,
            state.view,
            state.setView,
            state.isRightSideBarPropertiesOpen,
            state.setIsRightSideBarPropertiesOpen,
        ],
        shallow
    );

    return (
        <div
            className={`z-0 fixed bg-neutral-50 lg:ml-20 lg:top-[63px] left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                isRightSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
            }`}
        >
            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center max-w-full gap-4 md:gap-0">
                <BrowserBreadcrumb />
                <div className="flex flex-row items-center justify-between md:justify-end gap-2 w-full md:w-auto">
                    <div className="flex flex-row-reverse md:flex-row items-center justify-between w-full">
                        {/* ## LOADING */}
                        <div>{isLoadingRefetch && <SyncingAnimation />}</div>
                        {/* ## SORT */}
                        <div className="flex">
                            <div className="flex gap-2 items-center">
                                <p className="hidden md:block text-neutral-700">
                                    Sort by
                                </p>
                                {/* DROPDOWN INPUT */}
                                <Dropdown
                                    options={["Name", "Link"]}
                                    // Set first letter to uppercase and replace '-' to ' '
                                    // TODO: I don't think this is necessary, might convert back
                                    selectedOption={sortOption
                                        .replace(/-/g, " ")
                                        .replace(/\b\w/g, (l: any) =>
                                            l.toUpperCase()
                                        )}
                                    setSelectedOption={(option: any) => {
                                        setSortOption(option);
                                        saveToCookie("sortOption", option);
                                    }}
                                />
                                {/* ### ASC DESC */}
                                <button
                                    className="text-neutral-700 py-1 rounded-full hover:text-neutral-900 font-normal mr-6"
                                    onClick={() => {
                                        setIsSortAsc(!isSortAsc);
                                        saveToCookie(
                                            "isSortAsc",
                                            String(!isSortAsc)
                                        );
                                    }}
                                >
                                    {isSortAsc ? "A → Z" : "Z → A"}
                                </button>
                            </div>
                            {/* ## VIEW */}
                            <div className="flex gap-2">
                                {/* ### GRID */}
                                <button
                                    onClick={() => {
                                        setView("grid");
                                        saveToCookie("view", "grid");
                                    }}
                                    className={`${
                                        view === "grid"
                                            ? "bg-primary-100"
                                            : "hover:bg-primary-50"
                                    } p-1 rounded-md duration-100`}
                                >
                                    <GridIcon />
                                </button>
                                {/* ### LIST */}
                                <button
                                    onClick={() => {
                                        setView("list");
                                        saveToCookie("view", "list");
                                    }}
                                    className={`${
                                        view === "list"
                                            ? "bg-primary-100"
                                            : "hover:bg-primary-50"
                                    } p-1  rounded-md duration-100`}
                                >
                                    <ListIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ## INFO */}
                    <button
                        className="ml-4"
                        onClick={() => {
                            setIsRightSideBarPropertiesOpen(
                                !isRightSideBarPropertiesOpen
                            );
                        }}
                    >
                        <InfoIcon className="h-8 w-8" aria-label="Info" />
                    </button>
                </div>
            </div>
        </div>
    );
};
