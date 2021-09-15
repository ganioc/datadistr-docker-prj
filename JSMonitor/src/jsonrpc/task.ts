import { BasicJson, createBasicJson } from "./generic";


export function taskGetInTask(): BasicJson {
    let json = createBasicJson();
    json.method = "GetInTask";
    json.params = {
    }
    return json;
}
