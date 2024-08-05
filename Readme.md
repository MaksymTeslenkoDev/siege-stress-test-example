# Siege Stress Testing Example

This project is designed to demonstrate how to perform stress testing on a web application using `siege` and Docker. 

## Prerequisites

- Docker installed on your machine.
- `siege` installed (see installation instructions below).
- Node.js installed on your machine.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.

## Running the Application

To start the application, use the following command:

```bash
docker-compose up
```
This command will build and start the necessary Docker containers, including the web application and the PostgreSQL database.

## Initial Setup

Before running the stress test with siege, you need to run the setup.js script to initialize the application. This script prepares the environment and database for testing.

```bash
node setup.js
```

## Running Siege for Stress Testing

Once the application is running and the setup is complete, you can perform stress testing using siege. Here's an example command:

# Example Siege Output for diferent concurencies
- **`-c10`**: siege  -c10  -b -v -f urls.txt --content-type="application/json" 
```
Lifting the server siege...
Transactions:                  65439 hits
Availability:                  99.97 %
Elapsed time:                 111.13 secs
Data transferred:              84.81 MB
Response time:                  0.01 secs
Transaction rate:             588.85 trans/sec
Throughput:                     0.76 MB/sec
Concurrency:                    5.42
Successful transactions:       65439
Failed transactions:              18
Longest transaction:           19.52
Shortest transaction:           0.00
```
- **`-c25`**: siege  -c25 -t30s -b -v -f urls.txt --content-type="application/json" 
```
Lifting the server siege...
Transactions:                  16391 hits
Availability:                 100.00 %
Elapsed time:                  30.59 secs
Data transferred:              21.20 MB
Response time:                  0.02 secs
Transaction rate:             535.83 trans/sec
Throughput:                     0.69 MB/sec
Concurrency:                    9.10
Successful transactions:       16391
Failed transactions:               0
Longest transaction:            6.74
Shortest transaction:           0.00
```
- **`-c50`**: siege  -c50 -r10 -t60s -b -v -f urls.txt --content-type="application/json" 
```
Lifting the server siege...
Transactions:                  32775 hits
Availability:                  99.90 %
Elapsed time:                  60.20 secs
Data transferred:              42.36 MB
Response time:                  0.04 secs
Transaction rate:             544.44 trans/sec
Throughput:                     0.70 MB/sec
Concurrency:                   22.45
Successful transactions:       32775
Failed transactions:              32
Longest transaction:           19.73
Shortest transaction:           0.00
```
- **`-c120`**: siege -c120 -r50 -b -t60s -v -f urls.txt --content-type="application/json"
```
Lifting the server siege...
Transactions:                  32796 hits
Availability:                  99.77 %
Elapsed time:                  60.07 secs
Data transferred:              41.49 MB
Response time:                  0.09 secs
Transaction rate:             545.96 trans/sec
Throughput:                     0.69 MB/sec
Concurrency:                   49.92
Successful transactions:       32796
Failed transactions:              76
Longest transaction:           19.54
Shortest transaction:           0.00
```

- **`-c150`**: siege -c150 -r50 -b -t3m -v -f urls.txt --content-type="application/json"
```
Lifting the server siege...
Transactions:                  98434 hits
Availability:                  99.52 %
Elapsed time:                 180.60 secs
Data transferred:             127.30 MB
Response time:                  0.14 secs
Transaction rate:             545.04 trans/sec
Throughput:                     0.70 MB/sec
Concurrency:                   76.49
Successful transactions:       98434
Failed transactions:             476
Longest transaction:           20.41
Shortest transaction:           0.00
```
# Command Breakdown

- **`-c120`**: Simulates 120 concurrent users.
- **`-r50`**: Each user repeats the request 50 times.
- **`-b`**: Runs in benchmark mode, meaning it doesn't display per-request output.
- **`-t60s`**: Limits the test to 60 seconds.
- **`-v`**: Verbose output.
- **`-f urls.txt`**: Specifies the file containing the URLs to be tested.
- **`--content-type="application/json"`**: Sets the Content-Type header to `application/json` for all requests.


# Additional Notes

- Make sure the **`urls.txt`** file contains the correct endpoints for testing.
- You can modify the **`siege`** command parameters to suit your testing needs.

