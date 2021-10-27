# UTE1.21-EC18A002-BE

## Home page
https://be-ec.herokuapp.com/
Backend Viet Nam Delivery

## -------------------------API FOR ACCOUNTING-------------------------
## API 1 - Get all accounting by month
https://be-ec.herokuapp.com/api/v1/accountings/get-all/2021-06

HTTP Method: GET, Body:
```json
{
    "busId": "60c9d0906eec542f00c2874a",
    "date": "2021-06-01"
}
```
Response: Body:
```json
{
    "status": "success",
    "results": 3,
    "data": {
        "accountings": [
            {
                "_id": "60cb2a578d79a845c0733c9c",
                "busId": "60c9d0906eec542f00c2874a",
                "busName": "Nguyen Dinh Phu",
                "totalOrder": 2,
                "totalCost": 200000,
                "payBack": 10000,
                "actuallyReceived": 190000,
                "lastMileston": "Chưa gửi hạch toán",
                "lastTime": "2021-06-17T10:56:22.930Z",
                "month": "2021-06-01",
                "feedBack": "Chưa có phản hồi"
            }, {}, {}
        ]
    }
}
```
## API 2 - Get accounting by id
https://be-ec.herokuapp.com/api/v1/accountings/60cb2a578d79a845c0733c9c

HTTP Method: GET
Response: Body:
```json
{
    "status": "success",
    "data": {
        "accounting": {
            "_id": "60cb2a578d79a845c0733c9c",
            "busId": "60c9d0906eec542f00c2874a",
            "busName": "Nguyen Dinh Phu",
            "totalOrder": 2,
            "totalCost": 200000,
            "payBack": 10000,
            "actuallyReceived": 190000,
            "lastMileston": "Chưa gửi hạch toán",
            "lastTime": "2021-06-17T10:56:22.930Z",
            "month": "2021-06-01",
            "feedBack": "Chưa có phản hồi",
            "createdAt": "2021-06-17T10:56:23.687Z",
            "updatedAt": "2021-06-17T10:56:23.687Z",
            "__v": 0
        },
        "states": [
            {
                "_id": "60cb2a578d79a845c0733c9d",
                "accId": "60cb2a578d79a845c0733c9c",
                "mileston": "Chưa gửi hạch toán",
                "time": "2021-06-17T10:56:22.930Z",
                "createdAt": "2021-06-17T10:56:23.687Z",
                "updatedAt": "2021-06-17T10:56:23.687Z",
                "__v": 0
            }
        ]
    }
}
```

## API 3 - Get accounting by id
https://be-ec.herokuapp.com/api/v1/accountings/60cb2a578d79a845c0733c9c

HTTP Method: PUT, body
```
{
    "feedBack": "Lỗi quá lỗi"
}
```
Response: Body:
```json
{
    "status": "success",
    "data": {
        "accounting": {
            "_id": "60cb2a578d79a845c0733c9c",
            "busId": "60c9d0906eec542f00c2874a",
            "busName": "Nguyen Dinh Phu",
            "totalOrder": 2,
            "totalCost": 200000,
            "payBack": 10000,
            "actuallyReceived": 190000,
            "lastMileston": "Chưa gửi hạch toán",
            "lastTime": "2021-06-17T10:56:22.930Z",
            "month": "2021-06-01",
            "feedBack": "Lỗi quá lỗi",
            "createdAt": "2021-06-17T10:56:23.687Z",
            "updatedAt": "2021-06-17T10:57:38.816Z",
            "__v": 0
        }
    }
}
```
## -------------------------API FOR USER-------------------------
## API 1 - Register User
https://be-ec.herokuapp.com/api/v1/auth/register

HTTP Method: POST, Body:
```json
{
    "name": "Le Nhat Tuong",
    "email": "lenhattuong12345@gmail.com",
    "password": "123456"
}
```
Response: Body:
```json
{
    "status": "success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGM3NmJkMGI2MjA2MDAwMTU1Y2JhYmEiLCJpYXQiOjE2MjM2ODIwMDB9.8-gbG6wtPpLabjD8pM3KKyu-LoDaemRQpJX1uiFSi4g",
        "userName": "Le Nhat Tuong"
    }
}
```

## API 2 - Login
https://be-ec.herokuapp.com/api/v1/auth/login

HTTP Method: POST, Body:
```json
{
    "email": "lenhattuong12345@gmail.com",
    "password": "123456"
}
```
Response: Body:
```json
{
    "status": "success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGM3NmJkMGI2MjA2MDAwMTU1Y2JhYmEiLCJpYXQiOjE2MjM2ODIwMDR9.fkQ6i5Ek9rns9hcbcmNSUwl-axjzgvk07Y3STFgIpsk",
        "userName": "Le Nhat Tuong",
        "role": "admin"
    }
}
```

## API 3 - Get curent user
https://be-ec.herokuapp.com/api/v1/auth/

HTTP Method: GET
Response: Body:
```json
{
    "status": "success",
    "data": {
        "user": {
            "userName": "Tuong Le",
            "email": "lenhattuong12345@gmail.com",
            "role": "admin"
        }
    }
}
```
## API 4 - Get curent user info
https://be-ec.herokuapp.com/api/v1/auth/info

HTTP Method: GET
Response: Body:
```json
{
    "status": "success",
    "data": {
        "user": {
            "_id": "60c76bd0b6206000155cbaba",
            "name": "Le Nhat Tuong",
            "email": "lenhattuong12345@gmail.com",
            "password": "$2a$10$oItMm0CY1wOBsThQC8wQHOEdUYsFDhpkXfPR7i7yH1cYpAkiNn9lC",
            "role": "admin",
            "createdAt": "2021-06-14T14:46:40.140Z",
            "updatedAt": "2021-06-14T14:46:40.140Z",
            "__v": 0
        }
    }
}
```
## API 5 - Update curent user info
https://be-ec.herokuapp.com/api/v1/auth/info

HTTP Method: POST, body
```json
{
    "name": "Tuong Le"
}
```
Response: Body:
```json
{
    "status": "success",
    "data": {
        "user": {
            "_id": "60c76bd0b6206000155cbaba",
            "name": "Tuong Le",
            "email": "lenhattuong12345@gmail.com",
            "password": "$2a$10$oItMm0CY1wOBsThQC8wQHOEdUYsFDhpkXfPR7i7yH1cYpAkiNn9lC",
            "role": "admin",
            "createdAt": "2021-06-14T14:46:40.140Z",
            "updatedAt": "2021-06-14T17:44:31.436Z",
            "__v": 0
        }
    }
}
```
## API 6 - Get all user
https://be-ec.herokuapp.com/api/v1/auth/users

HTTP Method: GET
Response: Body:
```json
{
    "status": "success",
    "results": 4,
    "data": {
        "users": [{}]
}
```
## API 7 - Change password
https://be-ec.herokuapp.com/api/v1/auth/change-password

HTTP Method: POST, body
```json
{
    "oldPassword": "123456",
    "newPassword": "123456",
    "reNewPassword": "123456"
}
```
Response: Body:
```json
{
    "status": "success",
    "data": {
        "user": {
            "_id": "60c76bd0b6206000155cbaba",
            "name": "Tuong Le",
            "email": "lenhattuong12345@gmail.com",
            "password": "$2a$10$oItMm0CY1wOBsThQC8wQHOEdUYsFDhpkXfPR7i7yH1cYpAkiNn9lC",
            "role": "admin",
            "createdAt": "2021-06-14T14:46:40.140Z",
            "updatedAt": "2021-06-14T17:44:31.436Z",
            "__v": 0
        }
    }
}
```

## API 8 - Get all customer
https://be-ec.herokuapp.com/api/v1/auth/customers

HTTP Method: GET

## API 9 - Get all business
https://be-ec.herokuapp.com/api/v1/auth/businesses

HTTP Method: GET
## -------------------------API FOR ORDER-------------------------
## API 1 - Get all order
https://be-ec.herokuapp.com/api/v1/orders/all

HTTP Method: GET, Body:
Response: Body:
```json
{
    "status": "success",
    "results": 1,
    "data": {
        "orders": [
            {
                "_id": "60c8788ba700a2353c23496c",
                "busId": "1234",
                "fare": 100000,
                "couponCode": "KM",
                "name": "Giao hàng",
                "note": "Nhẹ tay",
                "weight": 0.5,
                "quantity": 1,
                "senderName": "Tường",
                "senderPhone": "1234",
                "senderEmail": "1234",
                "sendAddress": "1234",
                "sendLine": "1234",
                "reciverName": "Tường",
                "reciverPhone": "1234",
                "reciverEmail": "1234",
                "reciverAddress": "1234",
                "reciverLine": "1234",
                "cusId": "60c76bd0b6206000155cbaba",
                "createdAt": "2021-06-15T09:53:15.717Z",
                "updatedAt": "2021-06-15T09:53:15.717Z",
                "__v": 0
            }
        ]
    }
```
## API 2 - Create one order - Include add new state for order
https://be-ec.herokuapp.com/api/v1/orders

HTTP Method: POST, Body:
```json
{
    "busId": "1234",
    "fare": 100000,
    "couponCode": "KM",
    "name": "Giao hàng"
    "reciverLine": "1234"
    ...
}
```
Response: Body:
```json
{
    "status": "success",
    "data": {
        "order": {
            "_id": "60c87f05d12176382c474dac",
            "busId": "1234",
            "fare": 100000,
            "couponCode": "KM",
            "name": "Giao hàng",
            "note": "Nhẹ tay",
            "weight": 0.5,
            "quantity": 1,
            "senderName": "Tường",
            "senderPhone": "1234",
            "senderEmail": "1234",
            "sendAddress": "1234",
            "sendLine": "1234",
            "reciverName": "Tường",
            "reciverPhone": "1234",
            "reciverEmail": "1234",
            "reciverAddress": "1234",
            "reciverLine": "1234",
            "cusId": "60c76bd0b6206000155cbaba",
            "createdAt": "2021-06-15T10:20:53.184Z",
            "updatedAt": "2021-06-15T10:20:53.184Z",
            "__v": 0
        }
    }
}
```
## API 3 - Update one order
https://be-ec.herokuapp.com/api/v1/orders/orderId

HTTP Method: PUT, Body: Field need to update
```json
{
    "cusId": "update"
}
```
Response: Body:
```json
Order has been update
```
## API 4 - Delete order by id
https://be-ec.herokuapp.com/api/v1/orders/orderId

HTTP Method: DELETE, Parametter: orderId
Response: Body:
```json
{
    "status": "success",
    "massage": "Order has been deleted"
}
```
## API 5 - Count order by user
https://be-ec.herokuapp.com/api/v1/orders/count

HTTP Method: GET, Parametter: orderId
Response: Body:
```json
{
    "status": "success",
    "results": 2
}
```

## API 6 - Get total fare by user
https://be-ec.herokuapp.com/api/v1/orders/fare

HTTP Method: GET, Parametter: orderId
Response: Body:
```json
{
    "status": "success",
    "totlaFare": 200000
}
```

## API 6 - Get order by id include state of order
https://be-ec.herokuapp.com/api/v1/orders/orderId

HTTP Method: GET, Parametter: orderId
Response: Body:
```
{
    "status": "success",
    "data": {
        "order": {
            "_id": "60c9699995a26e43dc413738",
            "busId": "1234",
            "fare": 100000,
            "couponCode": "KM",
            "name": "Giao hàng",
            "note": "Nhẹ tay",
            "weight": 0.5,
            "quantity": 1,
            "senderName": "Tường",
            "senderPhone": "1234",
            "senderEmail": "1234",
            "sendAddress": "1234",
            "sendLine": "1234",
            "reciverName": "Tường",
            "reciverPhone": "1234",
            "reciverEmail": "1234",
            "reciverAddress": "1234",
            "reciverLine": "1234",
            "cusId": "60c76bd0b6206000155cbaba",
            "lastMileston": "Đang chờ xử lý",
            "lastTime": "2021-06-16T03:01:45.642Z",
            "createdAt": "2021-06-16T03:01:45.650Z",
            "updatedAt": "2021-06-16T03:01:45.650Z",
            "__v": 0
        },
        "states": [
            {
                "_id": "60c9699995a26e43dc413739",
                "orderId": "60c9699995a26e43dc413738",
                "mileston": "Đang chờ xử lý",
                "time": "2021-06-16T03:01:45.642Z",
                "createdAt": "2021-06-16T03:01:45.910Z",
                "updatedAt": "2021-06-16T03:01:45.910Z",
                "__v": 0
            }
        ]
    }
}
```

## API 7  - Get order by user
https://be-ec.herokuapp.com/api/v1/orders/

HTTP Method: GET
Response: Body: like get all order

## API 8  - Get totle fare
https://be-ec.herokuapp.com/api/v1/orders/total-fare

HTTP Method: GET
Response: Body:
```
{
    "status": "success",
    "totalOrder": 4,
    "totlaFare": 403002
}
## API 8  - Get totle fare
https://be-ec.herokuapp.com/api/v1/orders/total-fare

HTTP Method: GET
Response: Body:
```
{
    "status": "success",
    "totalOrder": 4,
    "totlaFare": 403002
}

## API 9  - Get totle fare by date
https://be-ec.herokuapp.com/api/v1/orders/total-fare-by-date

HTTP Method: GET
Response: Body:
```
{
    "status": "success",
    "totlaFare": 403002
}
```

## API 10  - Count Order By Current Month
https://be-ec.herokuapp.com/api/v1/orders/count-order-by-current-month

HTTP Method: GET
Response: Body:
```
{
    "status": "success",
    "totalOrder": 4,
    "totalDate": 30,
    "data": {
        "orderCount": [
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            2,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ]
    }
}

```
## API 9  - Caculate Business Order By Date
https://be-ec.herokuapp.com/api/v1/orders/caculate-business-order-by-date

HTTP Method: GET
Response: Body:
```
{
    "status": "success",
    "totalBusiness": 1,
    "data": {
        "businessCount": [
            {
                "name": "Nguyen Dinh Phu",
                "totalOrder": 1,
                "totalCost": 100000,
                "percent": 25
            }
        ]
    }
}
```
## API 10  - Get all order by business
https://be-ec.herokuapp.com/api/v1//orders/business/get-all/60c9d0906eec542f00c2874a

HTTP Method: GET
Response: Body:
```
{
    "status": "success",
    "totalOrders": 2,
    "totalCost": 200000,
    "payBack": 10000,
    "actuallyReceived": 190000,
    "data": {
        "orders": []
    }
}
```
## API 11  - Get all order by business by month (2021-06-01)
https://be-ec.herokuapp.com/api/v1//orders/business/get-all-by-month

HTTP Method: GET, Body
```
{
    "busId": "60c9d0906eec542f00c2874a",
    "date": "2021-06-01"
}
```
Response: Body:
```
{
    "status": "success",
    "totalOrders": 2,
    "totalCost": 200000,
    "payBack": 10000,
    "actuallyReceived": 190000,
    "data": {
        "orders": []
    }
}
```
## -------------------------API FOR REGISTER SERVICE PACK-------------------------
## API 1 - Caculate Business Service Pack By Date
https://be-ec.herokuapp.com/api/v1/RegisteredSPs

HTTP Method: GET, body
```
{
    "startDate": "2021-06-01",
    "endDate": "2021-06-30"
}
```
Response: Body:
```json
{
    "status": "success",
    "totalRegister": 1,
    "totalPay": 1502,
    "data": {
        "businessPack": [
            {
                "name": "Nguyen Dinh Phu",
                "pay": 1502,
                "percent": 100
            }
        ]
    }
}
```

## -------------------------API FOR STATE ACCOUNTING-------------------------
## API 1 - Create one state accounting
https://be-ec.herokuapp.com/api/v1/state-accountings

HTTP Method: POST, Body:
```json
{
    "accId": "60cb0b91c92c4b28c0a6ef8b",
    "mileston": "Gửi hoạch toán"
}
```
Response: Body:
```json
{
    "status": "success",
    "data": {
        "stateAcc": {
            "_id": "60cb1c03bf85a924d0f4691d",
            "accId": "60cb0b91c92c4b28c0a6ef8b",
            "mileston": "Gửi hoạch toán",
            "time": "2021-06-17T09:55:15.638Z",
            "createdAt": "2021-06-17T09:55:15.645Z",
            "updatedAt": "2021-06-17T09:55:15.645Z",
            "__v": 0
        }
    }
}
```




# API Registered Info

https://hostname.domain.com/rest/api/v1/RegisteredInfos

### GET

> Response: Body: Retrieve all Registered Information of Business wanna join to VN Delivery

Status code: 200

```json
{
  "status": "success",
  "results": 4,
  "data": {
    "regInfos": [
      {
        "_id": "60c988190892ca5748bbab3e",
        "Name": "Giao Hang TK",
        "City": "Ho Chi Minh",
        "District": "Thu Duc",
        "Ward": "Linh Trung",
        "AddressLine": "1234 Kha Van Can",
        "PhoneNumber": "0981234456",
        "Email": "somecat@outlook.com",
        "Website": "nothing.com",
        "createdAt": "2021-06-16T05:11:53.353Z",
        "updatedAt": "2021-06-16T05:11:53.353Z",
        "__v": 0
      },
      {
        "_id": "60c9881a0892ca5748bbab40",
        "Name": "Giao Hang Cham",
        "City": "Ho Chi Minh",
        "District": "Thu Duc",
        "Ward": "Linh Trung",
        "AddressLine": "1234 Kha Van Can",
        "PhoneNumber": "0981234456",
        "Email": "somecat@outlook.com",
        "Website": "nothing.com",
        "createdAt": "2021-06-16T05:11:54.778Z",
        "updatedAt": "2021-06-16T05:11:54.778Z",
        "__v": 0
      },
      {
        "_id": "60c9887ed941f558e56fb2e8",
        "Name": "Giao Hang Nhanh",
        "City": "Ho Chi Minh",
        "District": "Thu Duc",
        "Ward": "Linh Trung",
        "AddressLine": "1234 Kha Van Can",
        "PhoneNumber": "0981234456",
        "Email": "somecat@outlook.com",
        "Website": "nothing.com",
        "createdAt": "2021-06-16T05:13:34.434Z",
        "updatedAt": "2021-06-16T05:13:34.434Z",
        "__v": 0
      },
      {
        "_id": "60c99dbc813144673124343e",
        "Name": "Giao Hang Le",
        "City": "Ho Chi Minh City",
        "District": "Thu Duc",
        "Ward": "Linh Trung",
        "AddressLine": "1264 Kha Van Can",
        "PhoneNumber": "0981234456",
        "Email": "somecat@outlook.com",
        "Website": "nothing.com",
        "createdAt": "2021-06-16T05:11:53.353Z",
        "updatedAt": "2021-06-16T05:11:53.353Z",
        "__v": 0
      }
    ]
  }
}
```

### POST

> Create new register form to join VN Delivery for business

Request

```json
	{
		"Name": "Grab",
		"City": "Ho Chi Minh City",
		"District": "Thu Duc",
		"Ward": "Linh Trung",
		"AddressLine": "1264 Kha Van Can",
		"PhoneNumber": "0981234456",
		"Email": "somecat@outlook.com",
		"Website": "nothing.com"
	}
```

Response:

Status code: 201

```json
{
  "status": "success",
  "message": "Created new request for join VN Delivery"
}
```

### GET

> Retrieve a registered form by id

https://hostname.domain.com/rest/api/v1/RegisteredInfos/60c988190892ca5748bbab3e

> 60c988190892ca5748bbab3e is __id__ of registered form

Response:

Status code: 200

```json
{
  "status": "success",
  "data": {
    "regInfo": {
      "_id": "60c988190892ca5748bbab3e",
      "Name": "Giao Hang TK",
      "City": "Ho Chi Minh",
      "District": "Thu Duc",
      "Ward": "Linh Trung",
      "AddressLine": "1234 Kha Van Can",
      "PhoneNumber": "0981234456",
      "Email": "somecat@outlook.com",
      "Website": "nothing.com",
      "createdAt": "2021-06-16T05:11:53.353Z",
      "updatedAt": "2021-06-16T05:11:53.353Z",
      "__v": 0
    }
  }
}
```

### PUT

> Update a registered form by id

https://hostname.domain.com/rest/api/v1/RegisteredInfos/60c988190892ca5748bbab3e

>60c988190892ca5748bbab3e is __id__ of registered form

Request:

```json
	{
		"Name": "Giao Hang TK edited",
		"City": "Ho Chi Minh City",
		"District": "Thu Duc",
		"Ward": "Linh Trung",
		"AddressLine": "1264 Kha Van Can",
		"PhoneNumber": "0981234456",
		"Email": "somecat@outlook.com",
		"Website": "nothing.com"
	}
```

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Updated request for join VN Delivery"
}
```

### DELETE

> Delete RegisteredInfo by id

https://hostname.domain.com/rest/api/v1/RegisteredInfos/60c99dbc813144673124343e

> rest/api/v1/RegisteredInfos/60c99dbc813144673124343e is __id__ of RegisterInfo

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Deleted"
}
```

---

# API ServicePacks

https://hostname.domain.com/rest/api/v1/ServicePacks

### GET

> Retrieve all ServicePacks

Response

Status code: 200

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "sps": [
      {
        "_id": "60c9c820cc5c5b92726c1bb9",
        "Cost": 1500,
        "Period": 12,
        "MaxOrders": 300,
        "createdAt": "2021-06-16T09:45:04.615Z",
        "updatedAt": "2021-06-16T09:45:04.615Z",
        "__v": 0
      }
    ]
  }
}
```

### POST

> Create new Service Pack

Request

```json
{
	"Cost": 500,
	"Period": 3,
	"MaxOrders": 60
}
```

Response:

Status code: 201

```json
{
  "status": "success",
  "message": "Created new Service Pack"
}
```

### GET

> Retrieve a SP by id

https://hostname.domain.com/rest/api/v1/ServicePacks/60c9ca314bae12935c1f18dd

> 60c9ca314bae12935c1f18dd is __id__ of Service Pack

Response:

Status code: 200

```json
{
  "status": "success",
  "data": {
    "sp": {
      "_id": "60c9ca314bae12935c1f18dd",
      "Cost": 500,
      "Period": 3,
      "MaxOrders": 60,
      "createdAt": "2021-06-16T09:53:53.533Z",
      "updatedAt": "2021-06-16T09:53:53.533Z",
      "__v": 0
    }
  }
}
```

### PUT

> Update a Service Pack by id

https://hostname.domain.com/rest/api/v1/ServicePacks/60c9ca314bae12935c1f18dd

> 60c9ca314bae12935c1f18dd is __id__ of Service Pack

Request:

```json
{
	"Cost": 505,
	"Period": 3,
	"MaxOrders": 60
}
```

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Updated SP"
}
```

### DELETE

> Delete a ServicePack by id

https://hostname.domain.com/rest/api/v1/ServicePacks/60c9ca314bae12935c1f18dd

> 60c9ca314bae12935c1f18dd is __id__ of ServicePack

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Deleted"
}
```



---

# API Registered Service Packs

https://hostname.domain.com/rest/api/v1/RegisteredSPs

### GET

> Retrieve all Registered Service Packs

Response:

Status code: 200

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "rsps": [
      {
        "_id": "60c9d2db86f8809dc261ddf3",
        "BusID": "60c9d0906eec542f00c2874a",
        "PackID": "60c9ca314bae12935c1f18dd",
        "DateBegin": "2021-06-16T09:53:53.533Z",
        "DateEnd": "2021-09-16T09:53:53.533Z",
        "Pay": 505,
        "createdAt": "2021-06-16T10:30:51.225Z",
        "updatedAt": "2021-06-16T10:30:51.225Z",
        "__v": 0
      }
    ]
  }
}
```

### POST

> Purchase new Service Pack

Request:

```json
{
	"BusID": "60c9d0906eec542f00c2874a",
	"PackID": "60c9c820cc5c5b92726c1bb9",
	"DateBegin": "2021-06-16T09:53:53.533Z",
	"DateEnd": "2022-06-16T09:53:53.533Z",
	"Pay": 1500
}
```

Response:

Status code: 201

```json
{
  "status": "success",
  "message": "Purchased new SP"
}
```

### GET

> Retrieve a Registered SP by id

https://hostname.domain.com/rest/api/v1/RegisteredSPs/60c9d2db86f8809dc261ddf3

> 60c9d2db86f8809dc261ddf3 is __id__ of Registered SP

Response:

Status code: 200

```json
{
  "status": "success",
  "data": {
    "rsp": {
      "_id": "60c9d2db86f8809dc261ddf3",
      "BusID": "60c9d0906eec542f00c2874a",
      "PackID": "60c9ca314bae12935c1f18dd",
      "DateBegin": "2021-06-16T09:53:53.533Z",
      "DateEnd": "2021-09-16T09:53:53.533Z",
      "Pay": 505,
      "createdAt": "2021-06-16T10:30:51.225Z",
      "updatedAt": "2021-06-16T10:30:51.225Z",
      "__v": 0
    }
  }
}
```

### PUT

> Update Registered SP by id

https://hostname.domain.com/rest/api/v1/RegisteredSPs/60c9d2db86f8809dc261ddf3

> 60c9d2db86f8809dc261ddf3 is __id__ of Registered SP

Request:

```json
{
	"BusID": "60c9d0906eec542f00c2874a",
	"PackID": "60c9c820cc5c5b92726c1bb9",
	"DateBegin": "2021-06-16T09:53:53.533Z",
	"DateEnd": "2022-06-16T09:53:53.533Z",
	"Pay": 1502
}
```

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Updated SP"
}
```

### DELETE

> Delete Registered SP by id

https://hostname.domain.com/rest/api/v1/RegisteredSPs/60c9d569d3bcea9ef6aee9ae

> 60c9d569d3bcea9ef6aee9ae is __id__ of Registered ServicePack

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Deleted"
}
```



---

# API Addons

https://hostname.domain.com/rest/api/v1/Addons

### GET

> Retrieve all Addons

Response:

Status code: 200

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "addons": [
      {
        "_id": "60c9fdfb952436ba2ad463d5",
        "BusID": "60c9d0906eec542f00c2874a",
        "Insurance": 20,
        "Fast": 22,
        "Fragile": 10,
        "HighValue": 60,
        "SeeInside": 5,
        "createdAt": "2021-06-16T13:34:51.332Z",
        "updatedAt": "2021-06-16T13:34:51.332Z",
        "__v": 0
      }
    ]
  }
}
```

### POST

> Create new Addons for each Business

Request:

```json
{
	"BusID": "60c9d0906eec542f00c2874a",
	"Insurance": 20,
	"Fast": 22,
	"Fragile": 10,
	"HighValue": 60,
	"SeeInside": 7
}
```

Response:

Status code: 201

```json
{
  "status": "success",
  "message": "Created new Addon"
}
```

###  GET

> Retrieve an Addon by ID

https://hostname.domain.com/rest/api/v1/Addons/60c9ff01b66460ba51f4f732

> 60c9ff01b66460ba51f4f732 is __id__ of Addon

Response:

Status code: 200

```json
{
  "status": "success",
  "data": {
    "addon": {
      "_id": "60c9ff01b66460ba51f4f732",
      "BusID": "60c9d0906eec542f00c2874a",
      "Insurance": 20,
      "Fast": 22,
      "Fragile": 10,
      "HighValue": 60,
      "SeeInside": 7,
      "createdAt": "2021-06-16T13:39:13.620Z",
      "updatedAt": "2021-06-16T13:39:13.620Z",
      "__v": 0
    }
  }
}
```

### PUT

> Update an Addon by id

https://hostname.domain.com/rest/api/v1/Addons/60c9ff01b66460ba51f4f732

> 60c9ff01b66460ba51f4f732 is __id__ of Addon

Request:

```json
{
	"BusID": "60c9d0906eec542f00c2874a",
	"Insurance": 20,
	"Fast": 22,
	"Fragile": 10,
	"HighValue": 60,
	"SeeInside": 5
}
```

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Updated Addon"
}
```

### DELETE

> Delete an Addon by id

https://hostname.domain.com/rest/api/v1/Addons/60c9ff01b66460ba51f4f741

> 60c9ff01b66460ba51f4f741 is __id__ of Addon

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Deleted"
}
```



---

# API Coupons

https://hostname.domain.com/rest/api/v1/Coupons

### GET

> Retrieve all Coupons

Response:

Status code: 200

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "coupons": [
      {
        "_id": "60ca055a491cb1c1161ca2a3",
        "CouponCode": "FREE50",
        "TimeBegin": "2021-06-16T09:53:53.533Z",
        "TimeEnd": "2021-06-18T09:53:53.533Z",
        "TheRemainingAmount": 99,
        "ListCustomerUsed": [
          {
            "_id": "60ca055a491cb1c1161ca2a4",
            "CusID": "60c7785cb6206000155cbabb"
          }
        ],
        "Propotion": 15,
        "MaxValue": 50,
        "createdAt": "2021-06-16T14:06:18.738Z",
        "updatedAt": "2021-06-16T14:06:18.738Z",
        "__v": 0
      }
    ]
  }
}
```

### POST

> Create new Coupon

Request:

```json
{
	"CouponCode": "TTHAPPY",
	"TimeBegin": "2021-06-16T09:53:53.533Z",
	"TimeEnd": "2021-06-19T09:53:53.533Z",
	"TheRemainingAmount": 30,
	"ListCustomerUsed": [
		{
			"CusID": "60c7785cb6206000155cbabb"
		}
	],
	"Propotion": 0,
	"MaxValue": 60
}
```

Response:

Status code: 201

```json
{
  "status": "success",
  "message": "Created new Coupon"
}
```

### GET

> Retrieve a Coupon by id

https://hostname.domain.com/rest/api/v1/Coupons/60ca07414d04d4c24bfbc0eb

> 60ca07414d04d4c24bfbc0eb is __id__ of Coupon

Response:

```json
{
  "status": "success",
  "data": {
    "coupon": {
      "_id": "60ca07414d04d4c24bfbc0eb",
      "CouponCode": "TTHAPPY",
      "TimeBegin": "2021-06-16T09:53:53.533Z",
      "TimeEnd": "2021-06-19T09:53:53.533Z",
      "TheRemainingAmount": 30,
      "ListCustomerUsed": [
        {
          "_id": "60ca07414d04d4c24bfbc0ec",
          "CusID": "60c7785cb6206000155cbabb"
        }
      ],
      "Propotion": 0,
      "MaxValue": 60,
      "createdAt": "2021-06-16T14:14:25.877Z",
      "updatedAt": "2021-06-16T14:14:25.877Z",
      "__v": 0
    }
  }
}
```

### PUT

> Update Coupon by id

https://hostname.domain.com/rest/api/v1/Coupons/60ca07414d04d4c24bfbc0eb

> 60ca07414d04d4c24bfbc0eb is __id__ of Coupon

Request:

```json
{
	"CouponCode": "TTHAPPY",
	"TimeBegin": "2021-06-16T09:53:53.533Z",
	"TimeEnd": "2021-06-19T09:53:53.533Z",
	"TheRemainingAmount": 30,
	"ListCustomerUsed": [
		{
			"CusID": "60c7785cb6206000155cbabb"
		}
	],
	"Propotion": 10,
	"MaxValue": 60
}
```

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Updated Coupon"
}
```

### DELETE

> Delete a Coupon by id

https://hostname.domain.com/rest/api/v1/Coupons/60ca07414d04d4c24bfbc2cb

> 60ca07414d04d4c24bfbc2cb is __id__ of Coupon

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Deleted"
}
```



---

# API Fares

https://hostname.domain.com/rest/api/v1/Fares

### GET

> Retrieve all Fares

Response:

Status code: 200

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "fares": [
      {
        "_id": "60ca0f9181d42bcb3e16584e",
        "BusID": "60c7785cb6206000155cbabb",
        "WeightRange1Min": 0,
        "WeightRange1Max": 1,
        "DistanceRange1Min": 0,
        "DistanceRange1Max": 20,
        "Fare1": 30,
        "WeightRange2Min": 1,
        "WeightRange2Max": 10,
        "DistanceRange2Min": 20,
        "DistanceRange2Max": 50,
        "Fare2": 50,
        "createdAt": "2021-06-16T14:49:53.713Z",
        "updatedAt": "2021-06-16T14:49:53.713Z",
        "__v": 0
      }
    ]
  }
}
```

### POST

> Create new Fare

Request:

```json
{
	"BusID": "60c7785cb6206000155cbabb",
	"WeightRange1Min": 0,
	"WeightRange1Max": 1,
	"DistanceRange1Min": 0,
	"DistanceRange1Max": 20,
	"Fare1": 35,
	"WeightRange2Min": 1,
	"WeightRange2Max": 10,
	"DistanceRange2Min": 20,
	"DistanceRange2Max": 50,
	"Fare2": 55
}
```

Response:

Status code: 201

```json
{
  "status": "success",
  "message": "Created new Coupon"
}
```

### GET

> Retrieve one Fare by id

https://hostname.domain.com/rest/api/v1/Fares/60ca10ffa44292cc0be1e42f

> 60ca10ffa44292cc0be1e42f is __id__ of one Fare

Response:

Status code: 200

```json
{
  "status": "success",
  "data": {
    "fare": {
      "_id": "60ca10ffa44292cc0be1e42f",
      "BusID": "60c7785cb6206000155cbabb",
      "WeightRange1Min": 0,
      "WeightRange1Max": 1,
      "DistanceRange1Min": 0,
      "DistanceRange1Max": 20,
      "Fare1": 35,
      "WeightRange2Min": 1,
      "WeightRange2Max": 10,
      "DistanceRange2Min": 20,
      "DistanceRange2Max": 50,
      "Fare2": 55,
      "createdAt": "2021-06-16T14:55:59.562Z",
      "updatedAt": "2021-06-16T14:55:59.562Z",
      "__v": 0
    }
  }
}
```

### PUT

> Update one Fare by id

https://hostname.domain.com/rest/api/v1/Fares/60ca10ffa44292cc0be1e42f

> 60ca10ffa44292cc0be1e42f is __id__ of one Fare

Request:

```json
{
	"BusID": "60c7785cb6206000155cbabb",
	"WeightRange1Min": 0,
	"WeightRange1Max": 1,
	"DistanceRange1Min": 0,
	"DistanceRange1Max": 20,
	"Fare1": 39,
	"WeightRange2Min": 1,
	"WeightRange2Max": 10,
	"DistanceRange2Min": 20,
	"DistanceRange2Max": 50,
	"Fare2": 55
}
```

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Updated Coupon"
}
```

### DELETE

> Delete 1 Fare by id

https://hostname.domain.com/rest/api/v1/Fares/60ca10ffa44292cc0be1e42f

> 60ca10ffa44292cc0be1e42f is __id__ of Fare

Response:

Status code: 200

```json
{
  "status": "success",
  "message": "Deleted"
}
```

