type dataType = "folder" | "link";

export type FolderLinkDataArray = {
    type: string;
    childrens?: {
        title: string;
        isPinned: boolean;
        link: string;
        type: dataType ;
        effieUrl: string;
        isShared?: boolean;
    }[];
};

export type FolderLinkData = {
    title: string;
    isPinned: boolean;
    link: string;
    type: dataType;
    effieUrl: string;
    isShared?: boolean;
};
