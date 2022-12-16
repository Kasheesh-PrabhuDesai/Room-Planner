# Room-Planner
The idea behind this repository is very simple. There are a pre-defined number of rooms which can be booked depending on the status of the room. Rooms having desks cannot be booked as a whole. The individual desks can be however booked. The rooms having no desks can be booked. To begin with from the CRUD operations available only the DELETE and UPDATE i.e. the book free room is possible. 

# TECH STACK 
Frontend - React.js , Material UI and axios + Typescript
Backend - Express.js + Typescript

# Further development 
Added the Create new room and Edit room functionality.
Letting users book individual desks in the rooms having desks

TWO APPS HAVE BEEN CREATED ONE FOR THE CLIENT SIDE UI AND THE OTHER FOR THE SERVER SIDE. THE NAMES ARE CLIENT AND SERVER.

# SERVER SIDE
The server side app is implemented using express.js with mongodb as the database and mongoose to connect to mongo db. All the CRUD applications have been coded. However, to closely match the challenge, the create and edit cannot be used in this challenge.Typescript has been used to implement the server side app. The dist directory will serve as an output folder once the code has compiled to plain JavaScript. We also have an app.ts file that is the entry point of the server. The server is run concurrently. Concurrently will help compile the TypeScript code, keep watching for changes, and also start the server simultaneously.

# CLIENT SIDE
The main thing to notice is that src/type.d.ts will hold all the types. And since I will use them on almost every file, I added the extension .d.ts to make the types globally available. So now we don't need to import them anymore. The client side is coded using React.js for the UI and typescript. Three reusable components have been created. One to display the rooms, one to search for rooms and the last for displaying the navbar.

# STEPS TO RUN THE CHALLENGE
Follow the steps below

Open a terminal
git clone this repository
Go to the cloned repo folder.
cd client/
run yarn to install all the dependencies
cd .. and then cd server
yarn to again install all the dependencies
Once all the dependencies and installed go back to client and run yarn start to run the development UI
Go to server and run yarn start to run the server
open a browser and go to localhost:3000 to test the UI
