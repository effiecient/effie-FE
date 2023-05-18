type dataType = "folder" | "link";

type accessType = "none" | "viewer" | "editor";

export type ShareConfiguration = {
    isShared: boolean;
    sharedPrivilege?: string; // "read" | "write"
};

export type FolderLinkDataArray = {
    type: string;
    children?: FolderLinkData[];
};

export type FolderLinkData = {
    id: string;
    title: string;
    isPinned: boolean;
    link?: string;
    type: dataType;
    publicAccess: accessType;
    personalAccess: string[];
    color?: string;
    createdAt: string;
    lastModifiedBy: string;
    lastModified: string;
    linkCount?: number;
    folderCount?: number;
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
