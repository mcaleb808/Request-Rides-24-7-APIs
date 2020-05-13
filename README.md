# Taxi-24-APIs

![Test suites](https://github.com/mcaleb808/Taxi-24-APIs/workflows/Test%20suites/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/mcaleb808/Taxi-24-APIs/badge.svg?branch=ft-add-trips-routes)](https://coveralls.io/github/mcaleb808/Taxi-24-APIs?branch=ft-add-trips-routes)

> Taxi 24 helps to disrupt the taxi industry in Rwanda by providing a white-label solution to the existing taxi companies and hotels.

---

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/download/) if you dont have it installed.
- Install Postgresql to your system.
- Install [Nodemon](https://www.npmjs.com/package/nodemon).

## Environment Setup

1. git clone this repository && cd to the project directory
2. with postgres create 2 databases : `one for test and another for development`.
3. run `yarn install` to install dependencies.
4. create a `.env` file in the root project directory.
5. copy the `.env.example` to the `.env` file and update it accordingly.
6. run `yarn run migrate:seeds` to create tables and insert seeds.
7. run `yarn run test` to run the application tests.

## API Spec

The preferred JSON object to be returned by the API should be structured as follows:

### Drivers

```source-json
{
  "Driver": {
        "id": 0,
        "fullname": "Mugisha Caleb",
        "plate_no": "RAA qqq B",
        "location": "Kimironko, Kigali",
        "phone": "+267854030503",
        "status": "available",
        "created_on": "12-08-2020"
    }
}
```

### Riders

```source-json
{
  "rider": {
        "id": 0,
        "fullname": "Mugisha Caleb",
        "phone": "+267854030503",
        "created_on": "12-08-2020"
    }
}
```

### Trips

```source-json
{
  "trip": {
        "pickUpPoint": "Gisozi, Kigali",
        "destination": "Kibagabaga, Gasabo",
        "riderId": "3",
        "driverId": "3"
    }
}
```

### Invoice

```source-json
{
  "invoice": {
    {
        "id": 0,
        "amount": "3290 Rwf",
        "status": "paid",
        "created_on": "12-08-2020",
        "driver": {
            "id": 0,
            "fullname": "Mugisha Caleb",
            "phone": "+267854030503",
            "plate_no": "RAA qqq B"
        }
    }
}
```

## Endpoints

Run the application with `yarn run dev` and open an API testing tool.

### Get all Drivers

`GET /api/v1/drivers`

### Get all available Drivers

`GET /api/v1/drivers/available`

### Get one Driver

`GET /api/v1/drivers/id`

Replace `id` with a number.

### Get available drivers for a specific location

`GET api/v1/drivers/available/{location}`

Replace `location` with an actual location, eg: Kigali, Rwanda.

### Get all Riders

`GET /api/v1/riders`

### Get one Rider

`GET /api/v1/rider/id`

Replace `id` with a number.

### Get closest drivers to a specific rider

`GET api/v1/riders/nearByDrivers/{location}`

Replace `location` with an actual location, eg: Kigali, Rwanda.

### Create a new Trip Request

`POST /api/v1/trips`

Example request body:

```source-json

Create a trip object
{
  "pickUpPoint": "Gisozi, Kigali",
  "destination": "Kibagabaga, Gasabo",
  "riderId": "3",
  "driverId": "3"
}
```

Required fields: `All field are required`

### Complete a Trip and generate an invoice

`PUT api/v1/trips/{id}/complete`

### Get a list of all active trips

`GET api/v1/trips/`
