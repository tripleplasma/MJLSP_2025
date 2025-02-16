## Needed packages
- Do `npm install` as long as their is a package.json in this directory

## How to start Project
- npm start

#### Technology Stack

<!--Here are some sample technology stacks that you can use for inspiration:-->
Frontend - REACT Website

Backend - webscraping Linkedin

Database - Usernames and Passwords

```mermaid
flowchart RL
subgraph Frontend
	A(Javascript using React)
end
	
subgraph Backend
	B(Javascript)
end
	
subgraph Database
	C[(MySQL)]
end

A <--> B
B <-->|"Node.js"| C
```

```mermaid
flowchart RL
subgraph Frontend
	A(Javascript using React)
end
	
subgraph Backend
	B(Java via Springboot)
end
	
subgraph Database
	C[(MySQL)]
end

A <-->|"Rest API"| B
B <-->|"Node.js"| C
```