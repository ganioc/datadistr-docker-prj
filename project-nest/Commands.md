## Commands

Upgrate it to JSON RPC 2.0 standard.

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
    "name": "GetInTask",
    "data": {}
}
```

```json
{
    "id": 32,
    "name": "QueryOutTask",
    "data": {"pageOffset": 0, "pageSize": 10, "finished": true, "all": true}
}
```

## InsertInTask

```json

{
    "id":10,
    "name":"InsertInTask",
    "data":{
        "finished": false,
        "block": 1,
        "txIndex": 0,
        "address": "0xasf",
        "pubKey": "xsdfdf",
        "hashId": "asdfsdafasdf"
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
    "name":"InsertOutTask",
    "data":{
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
    "name": "GetInTask",
    "data": {}
}
```

## GetOutTask

```json
{
    "id": 401,
    "name": "GetOutTask",
    "data": {}
}
```

## QueryInTask

```json
{
    "id":501,
    "name":"QueryInTask",
    "data":{
        "pageOffset": 0,
        "pageSize": 5,
        "finished": false,
        "all": true
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
    "name":"QueryOutTask",
    "data":{
        "pageOffset": 0,
        "pageSize": 10,
        "finished": false,
        "all": true
    }
}


```json

## MaskInTask
```json

{
    "id":332,
    "name":"MarkInTask",
    "data":{
        "block": 9,
        "txIndex": 0
    }
}
````

## MaskOutTask

```json
{
    "id": 312,
    "name": "MarkOutTask",
    "data": {
        "block": 5,
        "txIndex": 0
    }
}
```

## GetCertainInTask

```json
{
    "id": 712,
    "name": "GetCertainInTask",
    "data": {
        "block": 8,
        "txIndex": 0
    }
}
```

## GetCertainOutTask

```json
{
    "id": 712,
    "name": "GetCertainOutTask",
    "data": {
        "block": 2,
        "txIndex": 0
    }
}
```

## DeleteAllInTask, DeleteAllOutTask

```json
{
    "id":812,
    "name":"DeleteAllInTask",
    "data":{}
}

{
    "id":813,
    "name":"DeleteAllOutTask",
    "data":{}
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
