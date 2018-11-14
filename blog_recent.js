var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    // if (req.url == "/") {
    //     fs.readFile('./JSON/titles.json', function (err, data) {
    //         if (err) {
    //             console.log(err);
    //             res.end('server error');
    //         } else {
    //             var titles = JSON.parse(data.toString());
    //
    //             fs.readFile('./PAGE/template.html', function (err, data) {
    //                 if (err) {
    //                     console.log(err);
    //                     res.end("Server error");
    //                 } else {
    //                     var templ = data.toString();
    //                     var html = templ.replace("%", titles.join('<li></li>'));
    //                     res.writeHead(200, {'Content-Type': 'text/html'});
    //                     res.end(html);
    //                 }
    //             })
    //         }
    //     });
    // }

    getTitles(res);
}).listen(8000, "127.0.0.1");


function getTitles(res) {

    fs.readFile('./JSON/titles', function (err, data) {
        if (err) {
            hadError(err, res);
        } else {
            getTemplate(JSON.parse(data.toString()), res);
        }
    })
}

function getTemplate(titles, res) {

    fs.readFile('./PAGE/template.html', function (err, data) {
        if (err) {
            hadError(err, res);
        } else {
            formatHtml(titles, data.toString(), res);
        }
    });
}

function formatHtml(titles, templ, res) {

    var html = templ.replace("%", titles.join('<li></li>'));
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}
function hadError(err,res) {
    res.end("server error");
}