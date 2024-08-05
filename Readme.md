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

```bash
siege -c120 -r50 -b -t60s -v -f urls.txt --content-type="application/json"
```

# Command Breakdown

- **`-c120`**: Simulates 120 concurrent users.
- **`-r50`**: Each user repeats the request 50 times.
- **`-b`**: Runs in benchmark mode, meaning it doesn't display per-request output.
- **`-t60s`**: Limits the test to 60 seconds.
- **`-v`**: Verbose output.
- **`-f urls.txt`**: Specifies the file containing the URLs to be tested.
- **`--content-type="application/json"`**: Sets the Content-Type header to `application/json` for all requests.

# Example Siege Output

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

# Additional Notes

- Make sure the **`urls.txt`** file contains the correct endpoints for testing.
- You can modify the **`siege`** command parameters to suit your testing needs.

