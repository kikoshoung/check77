
var http = require("http"),
        fs = require('fs');

fs.readFile(__dirname + '/index.html', 'utf-8', function(err, html){
        console.log(__dirname);
	if(err) throw err;

        http.createServer(function(request, response) {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(html);
                response.end();
        }).listen(8000);
});
