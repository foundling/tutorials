/*
 
 Require('http') imports the http module that, among other things, has a function that
 Creates an http server for us.

*/
var http = require('http');

/* 
 
 The server needs to run on a user defined port (anything above port 1024)

*/
var PORT = 3000;

/*
 
 This 'requestHandler' function is run everytime someone sends a request to our server at localhost://3000

*/
function requestHandler(request, response) {
   console.log(request); 
};



/*
 
 A function we run when we start the server to confirm in the terminal that it's running.

*/
function confirmRunning() {
    console.log('Server up and running on port %s. \n\nOpen a web browser to localhost://3000.\n', PORT);
};

/*
    We call the 'createServer' function on the http module to create a server that accepts http requests.

    The 'createServer' function takes one argument, which is a function that handles the request data 
    and the response data.
*/
var server = http.createServer(requestHandler);

/*

  Here we finally start the server by calling 'listen'.  The 'listen' function (or 'method') takes two arguments.

  We also pass a function that prints some information to the console.

*/
server.listen(PORT, confirmRunning);
