import { FolderLinkDataArray } from "@/type";

export function sortDataToFolderAndLink(input: any, sortOption: string, asc: boolean) {
    let data: FolderLinkDataArray = input;
    // setup dataChildren as array
    let dataChildrenFolders: any = [];
    let dataChildrenLinks: any = [];

    data?.children?.forEach((child: any) => {
        if (child.type === "folder") {
            // key value of child and data
            dataChildrenFolders.push(child);
        }
        if (child.type === "link") {
            dataChildrenLinks.push(child);
        }
    });
    // sort based on isPinned and then title alphabetically
    dataChildrenFolders.sort((a: any, b: any) => {
        if (a.isPinned === b.isPinned) {
            if ((sortOption === "name" || sortOption === "link") && asc) {
                return a.title.localeCompare(b.title);
            } else if ((sortOption === "name" || sortOption === "link") &&
                !asc) {
                return b.title.localeCompare(a.title);
            }
        }
        if (a.isPinned) {
            return -1;
        }
        return 1;
    });
    dataChildrenLinks.sort((a: any, b: any) => {
        if (a.isPinned === b.isPinned) {
            if (sortOption === "name" && asc) {
                return a.title.localeCompare(b.title);
            } else if (sortOption === "name" && !asc) {
                return b.title.localeCompare(a.title);
            } else if (sortOption === "link" && asc) {
                return a.link.localeCompare(b.link);
            } else if (sortOption === "link" && !asc) {
                return b.link.localeCompare(a.link);
            }
        }
        if (a.isPinned) {
            return -1;
        }
        return 1;
    });
    return { dataChildrenFolders, dataChildrenLinks };
}
