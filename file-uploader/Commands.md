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
    "name": "getGroup",
    "data": {
        "groupId": 0
    }
}
OK,
{
    "id": 101,
    "name": "getGroup",
    "statusCode": 0,
    "data": [
        {
            "id": 1,
            "groupId": 0,
            "alias": "default",
            "level": 0,
            "date": "2021-09-02T09:23:22.626Z"
        }
    ]
}
```

## addGroup

```json
{
    "id": 102,
    "name": "addGroup",
    "data": {
        "groupId": 1,
        "alias": "normal user",
        "level": 0
    }
}

{
    "id": 102,
    "name": "addGroup",
    "statusCode": 0,
    "data": [
        {
            "groupId": 1,
            "alias": "normal user",
            "level": 0,
            "date": "2021-09-03T07:35:00.288Z",
            "id": 2
        }
    ]
}

{
    "id": 1021,
    "name": "addGroup",
    "data": {
        "groupId": 2,
        "alias": "premium user",
        "level": 0
    }
}


```

## getGroups

```json
{
    "id": 103,
    "name": "getGroups",
    "data": {
        "pageOffset": 0,
        "pageSize": 10
    }
}
Feedback
{
    "id": 103,
    "name": "getGroups",
    "statusCode": 0,
    "data": {
        "pageOffset": 0,
        "pageSize": 10,
        "total": 2,
        "data": [
            {
                "id": 1,
                "groupId": 0,
                "alias": "default",
                "level": 0,
                "date": "2021-09-02T09:23:22.626Z"
            },
            {
                "id": 2,
                "groupId": 1,
                "alias": "normal user",
                "level": 0,
                "date": "2021-09-03T07:35:00.288Z"
            }
        ]
    }
}
OK
```

pagination

## getGroupUsers

```json
{
    "id": 104,
    "name": "getGroupUsers",
    "data": {
        "groupId": 1,
        "pageOffset": 0,
        "pageSize": 10
    }
}
```

## delGroup

```json
{
    "id": 104,
    "name": "delGroup",
    "data": {
        "groupId": 2
    }
}
OK
```

## addUser

```json
{
    "id": 105,
    "name": "addUser",
    "data": {
        "address": "12345",
        "name": "Mary",
        "organization": "dianke"
    }
}
{
    "id": 1051,
    "name": "addUser",
    "data": {
        "address": "234",
        "name": "Rose",
        "organization": "dianke"
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
    "name": "getUsers",
    "data": {
        "pageOffset": 0,
        "pageSize": 10
    }
}
OK
```

## getUser

by address
, 12345, 234, 456,

```json
{
    "id": 107,
    "name": "getUser",
    "data": {
        "address": "456"
    }
}
```

## delUser

```json
{
    "id": 107,
    "name": "delUser",
    "data": {
        "address": "2"
    }
}
```

## addUserToGroup

```json
{
    "id": 107,
    "name": "addUserToGroup",
    "data": {
        "address": "456",
        "groupId": 1
    }
}
{
    "id": 107,
    "name": "addUserToGroup",
    "data": {
        "address": "12345",
        "groupId": 1
    }
}
```

## delUserFromGroup

```json
{
    "id": 107,
    "name": "delUserFromGroup",
    "data": {
        "address": "456",
        "groupId": 1
    }
}
```

## getRecords

pagination

```json
{
    "id": 201,
    "name": "getRecords",
    "data": {
        "pageOffset": 0,
        "pageSize": 10
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
    "name": "getRecord",
    "data": {
        "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD"
    }
}
```

## getRecordCopys

```json
{
    "id": 203,
    "name": "getRecordCopys",
    "data": {
        "pageOffset": 0,
        "pageSize": 10
    }
}
```

## insertRecordCopy

```json
{
    "id": 204,
    "name": "insertRecordCopy",
    "data": {
        "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD",
        "newFileName": "newjoker.jpeg",
        "newHashId": "newHashQmZCA",
        "secret": "1234",
        "groupId": 0
    }
}
Feedback
{
    "id": 205,
    "name": "insertRecordCopy",
    "statusCode": 0,
    "data": [
        {
            "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD",
            "newFileName": "newjoker.jpeg",
            "newHashId": "newHashQmZCA",
            "secret": "1234",
            "date": "2021-09-06T09:48:27.159Z",
            "groupId": 0,
            "id": 1
        }
    ]
```

## delRecordCopy

```json
{
    "id": 206,
    "name": "delRecordCopy",
    "data": {
        "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD",
        "groupId": 0
    }
}
```

## getRecordCopy

```json
{
    "id": 207,
    "name": "getRecordCopy",
    "data": {
        "hashId": "QmZCAtvcamEAqTicFJvYGShN1ebTVfeHaogmzKFKCTntZD",
        "groupId": 0
    }
}
```
