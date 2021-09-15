still use rpc to do the work

/rpc/v1

http://127.0.0.1:3001/rpc/v1/

POST

Content-Type application/json

## getGroup

by groupId

```json
{
    "id": 101,
    "jsonrpc": "2.0",
    "method": "getGroup",
    "params": {
        "groupId": 0
    }
}
OK,
{
    "id": 101,
    "jsonrpc": "2.0",
    "result": {
        "name": "getGroup",
        "data": [
            {
                "id": 1,
                "groupId": 0,
                "alias": "default",
                "level": 0,
                "date": "2021-09-03T09:53:22.337Z"
            }
        ]
    }
}
{
    "id": 101,
    "jsonrpc": "2.0",
    "error": {
        "code": 6,
        "message": "Can not found",
        "data": []
    }
}
```

## addGroup

```json
{
    "id": 101,
    "jsonrpc": "2.0",
    "method": "addGroup",
    "params": {
        "groupId": 2,
        "alias": "advanced user",
        "level": 0
    }
}

{
    "id": 101,
    "jsonrpc": "2.0",
    "result": {
        "name": "addGroup",
        "data": [
            {
                "groupId": 2,
                "alias": "advanced user",
                "level": 0,
                "date": "2021-09-15T05:42:38.752Z",
                "users": [],
                "recordOrigs": [],
                "id": 3
            }
        ]
    }
}


```

## getGroups

```json
{
    "id": 103,
    "jsonrpc": "2.0",
    "method": "getGroups",
    "params": {
        "pageOffset": 0,
        "pageSize": 10
    }
}
Feedback
{
    "id": 103,
    "jsonrpc": "2.0",
    "result": {
        "name": "getGroups",
        "data": {
            "pageOffset": 0,
            "pageSize": 10,
            "total": 3,
            "data": [
                {
                    "id": 1,
                    "groupId": 0,
                    "alias": "default",
                    "level": 0,
                    "date": "2021-09-03T09:53:22.337Z"
                },
                {
                    "id": 2,
                    "groupId": 1,
                    "alias": "normal user",
                    "level": 0,
                    "date": "2021-09-03T09:56:10.337Z"
                },
                {
                    "id": 3,
                    "groupId": 2,
                    "alias": "advanced user",
                    "level": 0,
                    "date": "2021-09-15T05:42:38.752Z"
                }
            ]
        }
    }
}
OK
```

pagination

## getGroupUsers

```json
{
    "id": 104,
    "jsonrpc": "2.0",
    "method": "getGroupUsers",
    "params": {
        "groupId": 1,
        "pageOffset": 0,
        "pageSize": 10
    }
}
{
    "id": 104,
    "jsonrpc": "2.0",
    "result": {
        "name": "getGroupUsers",
        "data": {
            "pageOffset": 0,
            "pageSize": 10,
            "total": 1,
            "data": [
                {
                    "id": 1,
                    "address": "12345",
                    "name": "Mary",
                    "orgization": "dianke",
                    "date": "2021-09-03T09:56:52.964Z"
                }
            ]
        }
    }
}
```

## delGroup

```json
{
    "id": 104,
    "jsonrpc": "2.0",
    "method": "delGroup",
    "params": {
        "groupId": 2
    }
}
OK
```

## addUser

```json
{
    "id": 105,
    "jsonrpc": "2.0",
    "method": "addUser",
    "params": {
        "address": "0x60079bb72b53e55fd411d93cfa32e7fca0cd28a4",
        "name": "Tao",
        "organization": "dianke"
    }
}
{
    "id": 105,
    "jsonrpc": "2.0",
    "result": {
        "name": "addUser",
        "data": [
            {
                "address": "0x60079bb72b53e55fd411d93cfa32e7fca0cd28a4",
                "name": "Tao",
                "orgization": "dianke",
                "date": "2021-09-15T05:51:34.087Z",
                "groups": [],
                "id": 6
            }
        ]
    }
}
{
    "id": 1052,
    "name": "addUser",
    "data": {
        "address": "456",
        "name": "Miona",
        "organization": "dianke"
    }
}
OK

```

## getUsers

pagination

```json
{
    "id": 106,
    "jsonrpc": "2.0",
    "method": "getUsers",
    "params": {
        "pageOffset": 0,
        "pageSize": 10
    }
}
OK
{
    "id": 106,
    "jsonrpc": "2.0",
    "result": {
        "name": "getUsers",
        "data": {
            "pageOffset": 0,
            "pageSize": 10,
            "total": 4,
            "data": [
                {
                    "id": 1,
                    "address": "12345",
                    "name": "Mary",
                    "orgization": "dianke",
                    "date": "2021-09-03T09:56:52.964Z"
                },
                {
                    "id": 2,
                    "address": "234",
                    "name": "Rose",
                    "orgization": "dianke",
                    "date": "2021-09-03T09:57:02.228Z"
                },
                {
                    "id": 3,
                    "address": "456",
                    "name": "Miona",
                    "orgization": "dianke",
                    "date": "2021-09-03T09:57:12.510Z"
                },
                {
                    "id": 6,
                    "address": "0x60079bb72b53e55fd411d93cfa32e7fca0cd28a4",
                    "name": "Tao",
                    "orgization": "dianke",
                    "date": "2021-09-15T05:51:34.087Z"
                }
            ]
        }
    }
}

```

## getUser

by address
, 12345, 234, 456,

```json
{
    "id": 107,
    "jsonrpc": "2.0",
    "method": "getUser",
    "params": {
        "address": "0x60079bb72b53e55fd411d93cfa32e7fca0cd28a4"
    }
}
{
    "id": 107,
    "jsonrpc": "2.0",
    "result": {
        "name": "getUser",
        "data": [
            {
                "id": 6,
                "address": "0x60079bb72b53e55fd411d93cfa32e7fca0cd28a4",
                "name": "Tao",
                "organization": "dianke",
                "date": "2021-09-15T05:51:34.087Z",
                "groups": []
            }
        ]
    }
}
```

## delUser

```json
{
    "id": 107,
    "jsonrpc": "2.0",
    "method": "delUser",
    "params": {
        "address": "456"
    }
}
{
    "id": 107,
    "jsonrpc": "2.0",
    "result": {
        "name": "delUser",
        "data": [
            {
                "raw": [],
                "affected": 1
            }
        ]
    }
}
```

## addUserToGroup

```json
{
    "id": 107,
    "jsonrpc": "2.0",
    "method": "addUserToGroup",
    "params": {
        "address": "0x60079bb72b53e55fd411d93cfa32e7fca0cd28a4",
        "groupId": 0
    }
}
{
    "id": 107,
    "jsonrpc": "2.0",
    "result": {
        "name": "addUserToGroup",
        "data": []
    }
}
```

## delUserFromGroup

```json
{
    "id": 107,
    "jsonrpc": "2.0",
    "method": "delUserFromGroup",
    "params": {
        "address": "0x60079bb72b53e55fd411d93cfa32e7fca0cd28a4",
        "groupId": 0
    }
}
OK
{
    "id": 107,
    "jsonrpc": "2.0",
    "result": {
        "name": "delUserFromGroup",
        "data": [
            {
                "id": 1,
                "groupId": 0,
                "alias": "default",
                "level": 0,
                "date": "2021-09-03T09:53:22.337Z",
                "users": []
            }
        ]
    }
}
```

## getRecords

pagination

```json
{
    "id": 201,
    "jsonrpc": "2.0",
    "method": "getRecords",
    "params": {
        "pageOffset": 0,
        "pageSize": 10
    }
}
{
    "id": 201,
    "jsonrpc": "2.0",
    "result": {
        "name": "getRecords",
        "data": {
            "pageOffset": 0,
            "pageSize": 10,
            "total": 2,
            "data": [
                {
                    "id": 1,
                    "fileName": "joker.jpeg",
                    "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD",
                    "type": "normal",
                    "date": "2021-09-06T08:23:38.713Z"
                },
                {
                    "id": 2,
                    "fileName": "chicken.jpeg",
                    "hashId": "QmceAfwiW34EnqhuKCiRG8YByi8nPP431owpV2xKKJdwVQ",
                    "type": "normal",
                    "date": "2021-09-06T09:42:31.035Z"
                }
            ]
        }
    }
}
```

## getRecord

QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD
hashId": "QmceAfwiW34EnqhuKCiRG8YByi8nPP431owpV2xKKJdwVQ",
by hashId

```json
{
    "id": 202,
    "jsonrpc": "2.0",
    "method": "getRecord",
    "params": {
        "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD"
    }
}
{
    "id": 202,
    "jsonrpc": "2.0",
    "result": {
        "name": "getRecord",
        "data": [
            {
                "id": 1,
                "fileName": "joker.jpeg",
                "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD",
                "type": "normal",
                "date": "2021-09-06T08:23:38.713Z",
                "groups": [
                    {
                        "id": 1,
                        "groupId": 0,
                        "alias": "default",
                        "level": 0,
                        "date": "2021-09-03T09:53:22.337Z"
                    }
                ]
            }
        ]
    }
}
```

## getRecordCopys

```json
{
    "id": 203,
    "jsonrpc": "2.0",
    "method": "getRecordCopys",
    "params": {
        "pageOffset": 0,
        "pageSize": 10
    }
}
OK
{
    "id": 203,
    "jsonrpc": "2.0",
    "result": {
        "name": "getRecordCopys",
        "data": [
            {
                "id": 2,
                "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD",
                "newFileName": "newjoker.jpeg",
                "newHashId": "newHashQmZCA",
                "secret": "1234",
                "date": "2021-09-06T09:53:44.952Z",
                "groupId": 0
            }
        ]
    }
}
```

## insertRecordCopy

```json
{
    "id": 204,
    "jsonrpc": "2.0",
    "method": "insertRecordCopy",
    "params": {
        "hashId": "QmceAfwiW34EnqhuKCiRG8YByi8nPP431owpV2xKKJdwVQ",
        "newFileName": "newjoker2.jpeg",
        "newHashId": "newHashQmZCA2",
        "secret": "1234222",
        "groupId": 0
    }
}
Feedback
{
    "id": 204,
    "jsonrpc": "2.0",
    "result": {
        "name": "insertRecordCopy",
        "data": [
            {
                "hashId": "QmceAfwiW34EnqhuKCiRG8YByi8nPP431owpV2xKKJdwVQ",
                "newFileName": "newjoker2.jpeg",
                "newHashId": "newHashQmZCA2",
                "secret": "1234222",
                "date": "2021-09-15T06:04:56.885Z",
                "groupId": 0,
                "id": 3
            }
        ]
    }
}
```

## delRecordCopy

```json
{
    "id": 206,
    "jsonrpc": "2.0",
    "method": "delRecordCopy",
    "params": {
        "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD",
        "groupId": 0
    }
}
{
    "id": 206,
    "jsonrpc": "2.0",
    "result": {
        "name": "delRecordCopy",
        "data": [
            {
                "raw": [],
                "affected": 1
            }
        ]
    }
}
```

## getRecordCopy

```json
{
    "id": 207,
    "jsonrpc": "2.0",
    "method": "getRecordCopy",
    "params": {
        "hashId": "QmceAfwiW34EnqhuKCiRG8YByi8nPP431owpV2xKKJdwVQ",
        "groupId": 0
    }
}
{
    "id": 207,
    "jsonrpc": "2.0",
    "result": {
        "name": "getRecordCopy",
        "data": [
            {
                "id": 3,
                "hashId": "QmceAfwiW34EnqhuKCiRG8YByi8nPP431owpV2xKKJdwVQ",
                "newFileName": "newjoker2.jpeg",
                "newHashId": "newHashQmZCA2",
                "secret": "1234222",
                "date": "2021-09-15T06:04:56.885Z",
                "groupId": 0
            }
        ]
    }
}
{
    "id": 207,
    "jsonrpc": "2.0",
    "error": {
        "code": 6,
        "message": "Not found",
        "data": []
    }
}
```
