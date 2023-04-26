type dataType = "folder" | "link";

export type ShareConfiguration = {
    isShared: boolean;
    sharedPrivilege?: string; // "read" | "write"
};

export type FolderLinkDataArray = {
    type: string;
    childrens?: FolderLinkData[];
};

export type FolderLinkData = {
    title: string;
    isPinned: boolean;
    link?: string;
    type: dataType;
    shareConfiguration: ShareConfiguration;
};

export type UpdateFolderReq = {
    username: string;
    path: string;
    relativePath: string;
    title?: string;
    isPinned?: boolean;
    newRelativePath?: string;
    shareConfiguration?: ShareConfiguration;
};

export type UpdateLinkReq = {
    username: string;
    path: string;
    relativePath: string;
    title?: string;
    link?: string;
    isPinned?: boolean;
    newRelativePath?: string;
    shareConfiguration?: ShareConfiguration;
};
