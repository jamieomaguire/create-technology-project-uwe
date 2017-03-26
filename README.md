# Nom Noms
## Encouraging mindful eating

This is my disseration project for my degree in Digital Media BSc (Hons)
at the University of the West of England.

It is a web application designed to promote mindful food choices and 
self-reflection in regards to the foods we choose to eat. 

The application is built using MongoDB, Express, React and Node.js.

## To run the project locally:

*Note: you will not be provided with a database username and password. You will need to set up your own MLab account (for free) to use this project*
which can be done [here](https://mlab.com/signup/ "MLab signup page")

1. Clone the repo

~~~
git clone https://github.com/jamieomaguire/create-technology-project-uwe.git
~~~

2. Change directory and install the packages

~~~
cd create-technology-project-uwe

npm install
~~~

3. In the server.js file replace your the database URI with the MongoDB URI MLab provides you when setting up your free account.
It will look like this:

~~~
mongodb://<DBUSERNAME>:<DBPASSWORD>@ds025439.mlab.com:25439/nom-noms;
~~~

4. Now you can simply run the start-dev script to run the project locally:

~~~
npm run start-dev
~~~

The application will now be running on port 3000, and the API will be running on port 3001