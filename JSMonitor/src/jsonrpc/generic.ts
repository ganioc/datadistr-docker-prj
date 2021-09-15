import { RspGroup } from "../interface/file";

export class BasicJson {
    id: number;
    jsonrpc: "2.0";
    method: string;
    params: any;
}
export let idCounter = 0;
export function getId() {
    return ++idCounter;
}

export function createBasicJson() {
    let json = new BasicJson();
    json.id = getId();
    return json;
}

export function matchGroupId(userGroups: RspGroup[], recordGroups: RspGroup[]): number {
    for (let userGroup of userGroups) {
        for (let recordGroup of recordGroups) {
            if (userGroup.groupId === recordGroup.groupId) {
                return userGroup.groupId;
            }
        }
    }

    return -1;
}