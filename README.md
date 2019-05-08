# PFACS Teacher Dashboard

### 1:   Development tool
* React (https://reactjs.org/tutorial/tutorial.html)
* Typescript (https://www.typescriptlang.org)
* Semantic UI React (https://react.semantic-ui.com)
* Styled Component (https://www.styled-components.com)
* React Router (https://www.npmjs.com/package/react-router)

React is a UI Framework allowed for a component based development. It also allows for reusing different component. It needs a little bit learning curve, but it will help improve the code readability and management. It is a data driven framework to work

Typescript is an improved version of Javascript to ensure a good standard of the code in development cycle. It is a static typed language, like Java. You can still write any code in Javascript as long as I close the lint. 

Semantic UI React similar to bootstrap is the UI styling framework I used to quickly create a ok looking website

Styled Component is small, simple library that embeds the styling sheet in each componenet. It saves the need to create a bunch of stylesheet in the code. 

React Router is used to make sure that users can click back to navigate the websites

Currently, no cookie implemented, but definitely in the future

### 2:   How to run

To install all of the dependency:
type:  ``` npm install ``` 

Then run the frontend server:
type: ```npm run```

Now, you are good to go by opening the browser. 

It only runs the frontend on port 3000, so if you want to make it actually usable, run the backend. Frontend connects to the backend with web service. 


### 3:   The structure of main components
- Context (It's a mechanism for all components to get data, but it doesn't really help too much)
- Login  
- Sessions
    - Create new sessions 
    - Manage sessions
- Specific session
    - Live Dashboard
        - Live student status
        - Class Overview 
    - Dashboard Report

Couple data structures, mostly interface, are created to ensure the communication between different components:
- Student 
    - It's the data structure that defines the essential property for a student
- GoogleClassroomInfo  
    - For creating session, a wrapper for google classroom data

