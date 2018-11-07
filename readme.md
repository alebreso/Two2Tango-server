# Readme for the server

### This server is build with a postgreSQL database. It handles the routes through a KOA server. All the queries are done with an ORM named 'typeORM' which uses Typescript.

# To run:

- yarn install
- yarn start

A visitor can signup and login. When a user is logged in, they can see a list of results of selected tango partners. These potential partners are carefully selected based on the preferences of the user. When a certain result is clicked the profile page of that particular user is showed.
