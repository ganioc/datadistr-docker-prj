"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileapi_1 = require("./api/fileapi");
var taskapi_1 = require("./api/taskapi");
var generic_1 = require("./jsonrpc/generic");
var utils_1 = require("./utils");
var LOOP_DELAY = (process.env.LOOP_DELAY == undefined) ? 10000 : parseInt(process.env.LOOP_DELAY);
var TASK_HOST = (process.env.TASK_HOST === undefined) ? "192.168.0.199" : process.env.TASK_HOST;
var TASK_PORT = (process.env.TASK_PORT === undefined) ? 3000 : process.env.TASK_PORT;
var TASK_URL = (process.env.TASK_URL === undefined) ? "/tasks/rpc/v2/" : process.env.TASK_URL;
var FILE_HOST = (process.env.FILE_HOST === undefined) ? "192.168.0.199" : process.env.FILE_HOST;
var FILE_PORT = (process.env.FILE_PORT === undefined) ? 3001 : process.env.FILE_PORT;
var FILE_URL = (process.env.TASK_URL === undefined) ? "/rpc/v2/" : process.env.FILE_URL;
var T_URL = "http://" + TASK_HOST + ":" + TASK_PORT + TASK_URL;
var F_URL = "htpp://" + FILE_HOST + ":" + FILE_PORT + FILE_URL;
console.log("=====================================");
console.log("LOOP_DELAY:", LOOP_DELAY);
console.log("TASK_HOST:", TASK_HOST);
console.log("TASK_PORT:", TASK_PORT);
console.log("TASK_URL:", TASK_URL);
console.log("FILE_HOST:", FILE_HOST);
console.log("FILE_PORT:", FILE_PORT);
console.log("FILE_URL:", FILE_URL);
console.log("T_URL:", T_URL);
console.log("F_URL:", F_URL);
console.log("=====================================");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function app() {
            return __awaiter(this, void 0, void 0, function () {
                var inTask, fileUser, userGroups, record, recordGroups, groupId, recordCopy, block, txIndex, outTask, bInsert, bMark;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("\nCheck InTask ...");
                            return [4 /*yield*/, (0, taskapi_1.getOneInTask)(T_URL)];
                        case 1:
                            inTask = _a.sent();
                            if (!(inTask === null)) return [3 /*break*/, 4];
                            console.log("No more inTask found!\n");
                            return [4 /*yield*/, (0, utils_1.DelayMs)(LOOP_DELAY)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, app()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                        case 4:
                            console.log("User address:", inTask.address);
                            console.log("hashId:", inTask.hashId);
                            console.log("\nCheck user's group");
                            return [4 /*yield*/, (0, fileapi_1.getUserFile)(F_URL, inTask.address)];
                        case 5:
                            fileUser = _a.sent();
                            if (!(fileUser === null)) return [3 /*break*/, 8];
                            console.log("user not registered!\n", inTask.address);
                            return [4 /*yield*/, (0, utils_1.DelayMs)(LOOP_DELAY)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, app()];
                        case 7:
                            _a.sent();
                            return [2 /*return*/];
                        case 8:
                            userGroups = fileUser.groups;
                            console.log("\nCheck record's group");
                            return [4 /*yield*/, (0, fileapi_1.getRecordFile)(F_URL, inTask.hashId)];
                        case 9:
                            record = _a.sent();
                            if (!(record === null)) return [3 /*break*/, 12];
                            console.log("record not found", inTask.hashId);
                            return [4 /*yield*/, (0, utils_1.DelayMs)(LOOP_DELAY)];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, app()];
                        case 11:
                            _a.sent();
                            return [2 /*return*/];
                        case 12:
                            recordGroups = record.groups;
                            groupId = (0, generic_1.matchGroupId)(userGroups, recordGroups);
                            if (!(groupId == -1)) return [3 /*break*/, 15];
                            console.log("user dont has permission to read the record!\n");
                            return [4 /*yield*/, (0, utils_1.DelayMs)(LOOP_DELAY)];
                        case 13:
                            _a.sent();
                            return [4 /*yield*/, app()];
                        case 14:
                            _a.sent();
                            return [2 /*return*/];
                        case 15:
                            console.log("user's groupId: ", groupId);
                            console.log("\ncheck recordCopy ...");
                            return [4 /*yield*/, (0, fileapi_1.getRecordCopyFile)(F_URL, inTask.hashId, groupId)];
                        case 16:
                            recordCopy = _a.sent();
                            if (!(recordCopy == null)) return [3 /*break*/, 18];
                            console.log("Insert new recordCopy, according to inTask");
                            return [4 /*yield*/, (0, fileapi_1.insertRecordCopyFile)(F_URL, inTask, record, groupId)];
                        case 17:
                            recordCopy = _a.sent();
                            _a.label = 18;
                        case 18:
                            console.log("return recordCopy");
                            if (!(recordCopy === null)) return [3 /*break*/, 21];
                            console.log("insertRecordCopy fail");
                            return [4 /*yield*/, (0, utils_1.DelayMs)(LOOP_DELAY)];
                        case 19:
                            _a.sent();
                            return [4 /*yield*/, app()];
                        case 20:
                            _a.sent();
                            return [2 /*return*/];
                        case 21:
                            // insert new OutTask
                            // add outTask
                            // check outTask exist, block, 
                            console.log("\nCreate OutTask ...");
                            console.log("\nCheck OutTask with address , hashId:");
                            block = inTask.block;
                            txIndex = inTask.txIndex;
                            return [4 /*yield*/, (0, taskapi_1.getCertainOutTask)(T_URL, block, txIndex, inTask.address, inTask.hashId)];
                        case 22:
                            outTask = _a.sent();
                            if (!(outTask === null)) return [3 /*break*/, 24];
                            console.log("outTask not exists\n");
                            return [4 /*yield*/, (0, taskapi_1.insertOutTask)(T_URL, block, txIndex, inTask.address, inTask.hashId, inTask.pubKey, 0, recordCopy.secret, recordCopy.newHashId)];
                        case 23:
                            bInsert = _a.sent();
                            _a.label = 24;
                        case 24:
                            if (!(outTask || bInsert)) return [3 /*break*/, 26];
                            return [4 /*yield*/, (0, taskapi_1.markInTask)(T_URL, block, txIndex, inTask.address, inTask.hashId)];
                        case 25:
                            bMark = _a.sent();
                            if (bMark) {
                                console.log("mark inTask OK");
                            }
                            else {
                                console.log("mark inTask Fail");
                            }
                            _a.label = 26;
                        case 26: return [4 /*yield*/, (0, utils_1.DelayMs)(LOOP_DELAY)];
                        case 27:
                            _a.sent();
                            return [4 /*yield*/, app()];
                        case 28:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('hello, JSMonitor ...');
                    return [4 /*yield*/, app()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
