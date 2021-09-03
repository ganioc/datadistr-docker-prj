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

```json
{
    "id": 107,
    "name": "getUser",
    "data": {
        "address": 2
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
        "address": "2",
        "groupId":
    }
}
```

## delUserFromGroup

```json
{
    "id": 107,
    "name": "addUserToGroup",
    "data": {
        "address": "2",
        "groupId":
    }
}
```

## getRecords

pagination

## getRecord

by hashId

## getRecordCopys

## insertRecordCopy

## delRecordCopy
