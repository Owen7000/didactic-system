## Backend Structure explanation

1. *server.js* starts the API
2. *app.js* configures it
3. */routes* define endpoints
4. */controllers* handle endpoint logic


## How it will scale

As features are added we will follow the same pattern, e.g.

routes/biomarkers.routes.js
controllers/biomarkers.controller.js
services/biomarkersService.js
db/biomarkers.js


## Owen has explained firebase notifications in FIREBASE.md

## Using express to handle HTTP and routing 

