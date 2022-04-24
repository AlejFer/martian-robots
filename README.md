# martian-robots
Martian Robots Problem resolution

1- npm install

2- npm run start

---------------------------------
Or docker-compose up

---------------------------------

Create planet where coordinates indicate the top right X & Y coordinates from the map

POST /planets

{
    coordinates: "5 3"
}

Create robots, send them  to given planet and executes their instructions

POST /robots

{
    marsid: "678ceb37-8524-4a7a-89db-3a546d813bd4"
    robotsets: [
        "1 1 E",
        "RFRFRFRF",
        "3 2 N",
        "FRRFLLFFRRRFLL",
        "0 3 W",
        "LLFFFRFLFL"
    ]
}

Get a list of existing planets

GET /planets

Get the robot's execution from the given planet

GET /robots/:planetId

