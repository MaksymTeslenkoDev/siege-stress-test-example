DROP DATABASE IF EXISTS "siege-stress-test";
DROP USER IF EXISTS marcus;
CREATE USER marcus WITH PASSWORD 'marcus';
CREATE DATABASE "siege-stress-test" OWNER marcus;