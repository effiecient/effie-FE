type dataType = "folder" | "link";

export type FolderLinkDataArray = {
    type: string;
    childrens?: {
        title: string;
        isPinned: boolean;
        link: string;
        type: dataType;
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

export type UpdateFolderReq = {
    username: string;
    path: string;
    relativePath: string;
    title?: string;
    isPinned?: boolean;
    newRelativePath?: string;
    shareConfiguration?: {
        isShared: boolean;
        sharedPrivilege: "read" | "write";
    };
};

export type UpdateLinkReq = {
    username: string;
    path: string;
    relativePath: string;
    title?: string;
    link? :string;
    isPinned?: boolean;
    newRelativePath?: string;
    shareConfiguration?: {
        isShared: boolean;
        sharedPrivilege: "read" | "write";
    };
};
