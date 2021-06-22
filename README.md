# Topic 2 

Task description 

This project's aim to implement a database-based application with logging service using pipeline and microservices software architecture styles. first, creating a component with pipeline architecture for acquiring specific data from OpenStreetMap and loading it into a database. By using osmfilter we extract desired data (restaurant, cafe, fast food) from open street maps and osmconvert to convert the data to CVS format.then we create a microservice with multiple APIs to add, modify and delete data stored in the database # with JavaScript using Nodejs framework and npm for node dependencies and Postman to access the APIs. after that we utilize Docker Containers to deploy the services and we Used Kafka queue for logging messages form server which is the consumer under topics so we can monitor what is happening in server by logging requests, errors, or responses.
## Requirements

* Egypt OSM
* osmfilter
* osmconvert 
* Nodejs 
* Postgres 
* PG Admin
* Docker 
* Docker compose 
* npm
* Visual code 
* Postman 
 
## Task1: 
### Extracting data
- Using osmfilter & osmconvert form open street maps for extract and convert selected data by useing only one command line:  
 
* osmfilter egypt.o5m --keep="amenity=restaurant , amenity=cafe , amenity=fast_food" -o=Data.o5m && osmconvert64 test.o5m --csv="@id name amenity " --csv-headline -o=Dataa.csv

- Using sed to delete unneeded data from csv

* sed -i '/^$/d' data.csv

## Task2: 
### APIS
- Build API routes with JavaScript using Nodejs framework and npm for node dependencies
##### Application architecture 
- *MVC* (model view controller) 
- *Model* is data transfer object 
- *Controller* responsible for the logic of transfer data from *data layer* And *view* (routes).
- *Repository* design patterns for abstract data layer which get, filter and set data to data base
 
## Task3: 
### Message broker
- Used Kafka queue for logging messages form server which is the *consumer* under topics so we can monitor what is happening in server by logging *requests, **errors* or *responses*.

# Task4: 
### Docker

- Tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all the parts it needs, such as libraries and other dependencies, and deploy it as one package.

#Start Project 
`npm install`
`docker-compose up`

## Contributing
Dr.Ramlly could are welcome. For major changes.