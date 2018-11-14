var http = require('http');
var url = "http://www.baidu.com";
var body = '<p>Redirecting to<a href="' + url + '">' + url + '</a></p>';
var server = http.createServer(function (req, res) {
    res.setHeader('location', url);
    res.setHeader('Content-length', body.length);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 302;
    rep.setEncoding(
        'utf-8'
    );
    req.on('data', function (chunk) {
        console.log('parsed', chunk);
    });
    req.on('end', function () {
        console.log('done parsing');
        res.end(body);
    })
})
server.listen(3000);