
import app from "./app"
import 'reflect-metadata';

const port = 8080; // default port to listen

// define a route handler for the default home page


// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
