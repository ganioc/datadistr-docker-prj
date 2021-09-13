## Commands

Upgrate it to JSON RPC 2.0 standard.

http://127.0.0.1:3000/tasks/rpc/v2/

### Return Error Code

```
code	message	meaning
-32700	Parse error	Invalid JSON was received by the server.
An error occurred on the server while parsing the JSON text.
-32600	Invalid Request	The JSON sent is not a valid Request object.
-32601	Method not found	The method does not exist / is not available.
-32602	Invalid params	Invalid method parameter(s).
-32603	Internal error	Internal JSON-RPC error.
-32000 to -32099	Server error	Reserved for implementation-defined server-errors.
```

```json
{
    "id": 31,
    "jsonrpc": "2.0",
    "method": "GetInTask",
    "params": {}
}
Feedback,
{
    "id": 31,
    "jsonrpc": "2.0",
    "result": {
        "name": "GetInTask",
        "data": []
    }
}
```

```json
{
    "id": 32,
    "jsonrpc": "2.0",
    "method": "QueryOutTask",
    "params": {"pageOffset": 0, "pageSize": 10, "finished": true, "all": true}
}
Feedback,
{
    "id": 32,
    "jsonrpc": "2.0",
    "result": {
        "name": "QueryOutTask",
        "data": {
            "pageOffset": 0,
            "pageSize": 10,
            "total": 0,
            "finished": true,
            "all": true,
            "data": []
        }
    }
}
```

## InsertInTask

```json

{
    "id":10,
    "jsonrpc": "2.0",
    "method":"InsertInTask",
    "params":{
        "finished": false,
        "block": 1,
        "txIndex": 0,
        "address": "0xasf",
        "pubKey": "xsdfdf",
        "hashId": "asdfsdafasdf"
    }
}
Feedback,
{
    "id": 10,
    "jsonrpc": "2.0",
    "result": {
        "name": "InsertInTask",
        "data": [
            {
                "finished": false,
                "block": 1,
                "txIndex": 0,
                "address": "0xasf",
                "pubKey": "xsdfdf",
                "hashId": "asdfsdafasdf"
            }
        ]
    }
}

{
    "id":13,
    "name":"InsertInTask",
    "data":{
        "finished": false,
        "block": 3,
        "txIndex": 0,
        "address": "0xasfasdfas",
        "pubKey": "xsdfdfdsfsad",
        "hashId": "asdfsdafdsffsdasdf"
    }
}

{
    "id":14,
    "name":"InsertInTask",
    "data":{
        "finished": false,
        "block": 4,
        "txIndex": 0,
        "address": "0xasfasdfas",
        "pubKey": "xsdfdfdsfsad",
        "hashId": "asdfsdafdsffsdasdf"
    }
}
{
    "id":15,
    "name":"InsertInTask",
    "data":{
        "finished": false,
        "block": 5,
        "txIndex": 0,
        "address": "0xasfasdfas",
        "pubKey": "xsdfdfdsfsad",
        "hashId": "asdfsdafdsffsdasdf"
    }
}
{
    "id":16,
    "name":"InsertInTask",
    "data":{
        "finished": false,
        "block": 6,
        "txIndex": 0,
        "address": "0xasfasdfas",
        "pubKey": "xsdfdfdsfsad",
        "hashId": "asdfsdafdsffsdasdf"
    }
}
{
    "id":17,
    "name":"InsertInTask",
    "data":{
        "finished": true,
        "block": 7,
        "txIndex": 0,
        "address": "0xasfasdfas",
        "pubKey": "xsdfdfdsfsad",
        "hashId": "asdfsdafdsffsdasdf"
    }
}

```

```json
{
    "id":332,
    "jsonrpc": "2.0",
    "method":"InsertOutTask",
    "params":{
                "finished": false,
                "block": 1,
                "txIndex": 0,
                "address": "0xasf",
                "pubKey": "xsdfdf",
                "status": "succeed",
                "encryptSecret": "asdfsdafasdf",
                "oldHashId": "xxx",
                "newHashId": "yyy"
            }
}
Feedback,
{
    "id": 332,
    "jsonrpc": "2.0",
    "result": {
        "name": "InsertOutTask",
        "data": []
    }
}

{
    "id":332,
    "name":"InsertOutTask",
    "data":{
                "finished": false,
                "block": 2,
                "txIndex": 0,
                "address": "0xasf",
                "pubKey": "xsdfdf",
                "status": "succeed",
                "encryptSecret": "asdfsdafasdf",
                "oldHashId": "xxx",
                "newHashId": "yyy"
            }
}
{
    "id":333,
    "name":"InsertOutTask",
    "data":{
                "finished": true,
                "block": 20,
                "txIndex": 0,
                "address": "0xasf",
                "pubKey": "xsdfdf",
                "status": "succeed",
                "encryptSecret": "asdfsdafasdf",
                "oldHashId": "xxx",
                "newHashId": "yyy"
            }
}
{
    "id":334,
    "name":"InsertOutTask",
    "data":{
                "finished": true,
                "block": 25,
                "txIndex": 0,
                "address": "0xasf",
                "pubKey": "xsdfdf",
                "status": "succeed",
                "encryptSecret": "asdfsdafasdf",
                "oldHashId": "xxx",
                "newHashId": "yyy"
            }
}
```

## GetInTask

```json
{
    "id": 301,
    "jsonrpc": "2.0",
    "method": "GetInTask",
    "params": {}
}
Feedback,
{
    "id": 301,
    "jsonrpc": "2.0",
    "result": {
        "name": "GetInTask",
        "data": [
            {
                "finished": false,
                "block": 1,
                "txIndex": 0,
                "address": "0xasf",
                "pubKey": "xsdfdf",
                "hashId": "asdfsdafasdf"
            }
        ]
    }
}
```

## GetOutTask

```json
{
    "id": 401,
    "jsonrpc": "2.0",
    "method": "GetOutTask",
    "params": {}
}
Feedback,
{
    "id": 401,
    "jsonrpc": "2.0",
    "result": {
        "name": "GetOutTask",
        "data": [
            {
                "finished": false,
                "block": 1,
                "txIndex": 0,
                "address": "0xasf",
                "pubKey": "xsdfdf",
                "status": "succeed",
                "encryptSecret": "asdfsdafasdf",
                "oldHashId": "xxx",
                "newHashId": "yyy"
            }
        ]
    }
}
```

## QueryInTask

```json
{
    "id":501,
    "jsonrpc": "2.0",
    "method":"QueryInTask",
    "params":{
        "pageOffset": 0,
        "pageSize": 5,
        "finished": false,
        "all": true
    }
}
Feedback,
{
    "id": 501,
    "jsonrpc": "2.0",
    "result": {
        "name": "QueryInTask",
        "data": {
            "pageOffset": 0,
            "pageSize": 5,
            "total": 1,
            "finished": false,
            "all": true,
            "data": [
                {
                    "finished": false,
                    "block": 1,
                    "txIndex": 0,
                    "address": "0xasf",
                    "pubKey": "xsdfdf",
                    "hashId": "asdfsdafasdf"
                }
            ]
        }
    }
}

{
    "id":502,
    "name":"QueryInTask",
    "data":{
        "pageOffset": 0,
        "pageSize": 15,
        "finished": true,
        "all": false
    }
}
{
    "id":503,
    "name":"QueryInTask",
    "data":{
        "pageOffset": 0,
        "pageSize": 1,
        "finished": false,
        "all": false
    }
}
{
    "id":504,
    "name":"QueryInTask",
    "data":{
        "pageOffset": 1,
        "pageSize": 1,
        "finished": false,
        "all": false
    }
}
```

## QueryOutTask

````json
{
    "id":601,
    "jsonrpc": "2.0",
    "method":"QueryOutTask",
    "params":{
        "pageOffset": 0,
        "pageSize": 10,
        "finished": false,
        "all": true
    }
}

Feedback,
{
    "id": 601,
    "jsonrpc": "2.0",
    "result": {
        "name": "QueryOutTask",
        "data": {
            "pageOffset": 0,
            "pageSize": 10,
            "total": 1,
            "finished": false,
            "all": true,
            "data": [
                {
                    "finished": false,
                    "block": 1,
                    "txIndex": 0,
                    "address": "0xasf",
                    "pubKey": "xsdfdf",
                    "status": "succeed",
                    "encryptSecret": "asdfsdafasdf",
                    "oldHashId": "xxx",
                    "newHashId": "yyy"
                }
            ]
        }
    }
}
```json

## MaskInTask
```json

{
    "id":332,
    "jsonrpc": "2.0",
    "method":"MarkInTask",
    "params":{
        "block": 1,
        "txIndex": 0
    }
}
Feedback,
{
    "id": 332,
    "jsonrpc": "2.0",
    "result": {
        "name": "MarkInTask",
        "data": []
    }
}
````

## MaskOutTask

```json
{
    "id": 312,
    "jsonrpc": "2.0",
    "method": "MarkOutTask",
    "params": {
        "block": 1,
        "txIndex": 0
    }
}
Feedback,
{
    "id": 312,
    "jsonrpc": "2.0",
    "result": {
        "name": "MarkOutTask",
        "data": []
    }
}
```

## GetCertainInTask

```json
{
    "id": 712,
    "jsonrpc": "2.0",
    "method": "GetCertainInTask",
    "params": {
        "block": 1,
        "txIndex": 0,
        "address": "",
        "hashId": ""
    }
}
```

## GetCertainOutTask

```json
{
    "id": 712,
    "method": "GetCertainOutTask",
    "params": {
        "block": 1,
        "txIndex": 0,
        "address": "",
        "hashId": ""
    }
}
```

## DeleteAllInTask, DeleteAllOutTask

```json
{
    "id":812,
    "jsonrpc": "2.0",
    "method":"DeleteAllInTask",
    "params":{}
}
Feedback
{
    "id": 812,
    "jsonrpc": "2.0",
    "result": {
        "name": "DeleteAllInTask",
        "data": []
    }
}

{
    "id":813,
    "jsonrpc": "2.0",
    "method":"DeleteAllOutTask",
    "params":{}
}
Feedback
{
    "id": 813,
    "jsonrpc": "2.0",
    "result": {
        "name": "DeleteAllOutTask",
        "data": []
    }
}
```

## Cats

```json
{
    "name": "Mew",
    "age": 1,
    "breed": "noble"
}
```

## tasks

-   /tasks/intask/
-   /tasks/outtask/

-   post /tasks/rpc/v1/

```json
{
    "id": 31,
    "name": "GetInTask",
    "data": {}
}
```

## temp records

```json
"data": [
            {
                "finished": false,
                "block": 9,
                "txIndex": 0,
                "address": "0xasfasdfas",
                "pubKey": "xsdfdfdsfsad",
                "hashId": "asdfsdafdsffsdasdf"
            },
            {
                "finished": false,
                "block": 8,
                "txIndex": 0,
                "address": "0xasfasdfas",
                "pubKey": "xsdfdfdsfsad",
                "hashId": "asdfsdafdsffsdasdf"
            },
            {
                "finished": true,
                "block": 7,
                "txIndex": 0,
                "address": "0xasfasdfas",
                "pubKey": "xsdfdfdsfsad",
                "hashId": "asdfsdafdsffsdasdf"
            },
            {
                "finished": false,
                "block": 6,
                "txIndex": 0,
                "address": "0xasfasdfas",
                "pubKey": "xsdfdfdsfsad",
                "hashId": "asdfsdafdsffsdasdf"
            }
        ]

```

## getState

```json
{
    "id": 912,
    "jsonrpc": "2.0",
    "method": "GetState",
    "params": {"id": 0}
}
```

## setState

```json
{
    "id": 913,
    "jsonrpc": "2.0",
    "method": "SetState",
    "params": {
        "id": 0,
        "latestBlock": 100,
        "latestTxIndex": 0
    }
}
```
