
## Commands

```json
{
    "id": 31,
    "name": "GetInTask",
    "data":{}
}


```

```json
{"id":32,"name":"QueryOutTask","data":{"pageOffset":0, "pageSize":10,"finished":true, "all":true}}

```

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
```
## GetInTask
```json
{
    "id":301,
    "name":"GetInTask",
    "data":{}
}
```
## GetOutTask
```json
{
    "id":401,
    "name":"GetOutTask",
    "data":{}
}

```

```json

{
    "id":332,
    "name":"MarkInTask",
    "data":{
        "block": 1, 
        "txIndex": 0
    } 
}
```


```json

{
    "id":312,
    "name":"MarkOutTask",
    "data":{
        "block": 1000, 
        "txIndex": 0
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

- /tasks/intask/
- /tasks/outtask/

- post /tasks/rpc/v1/

```json

{
    "id": 31,
    "name": "GetInTask",
    "data":{}
}
```