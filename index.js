const PORT = process.env.PORT || 3000;

var WebSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer(function(request, response) {
    // Qui possiamo processare la richiesta HTTP
    // Dal momento che ci interessano solo le WebSocket, non dobbiamo implementare nulla
});
server.listen(PORT, function() { });
// Creazione del server
wsServer = new WebSocketServer({
    httpServer: server
});
// Gestione degli eventi
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
        // Metodo eseguito alla ricezione di un messaggio
        var response = JSON.parse(message.utf8Data);
	if(response.event == 'offer') {
	        response.timestamp = Date.now();
	}
	else if(response.event == 'reset') {
		//resetto offerte dopo acquisto
	}
        wsServer.broadcast(JSON.stringify(response));
    });
    connection.on('close', function(connection) {
        // Metodo eseguito alla chiusura della connessione
    });
});
