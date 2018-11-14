var http=require("http");
var parse=require('url').parse;
var join=require('path').join;
var fs=require("fs");
var root=__dirname;//全局变量，存储的是文件所在的文件目录,__filename：全局变量，存储的是文件名

var server = http.createServer(function(req, res){
    var url = parse(req.url);
    var path = join(root, url.pathname);
    console.log(root);
    console.log(url);
    console.log(path);

    var stream = fs.createReadStream(path);
    stream.pipe(res);
    stream.on('error',function () {
        res.statusCode=500;
        res.end('Internal Server ERROR');
    })
    stream.on('data', function(chunk){
        res.write(chunk);
    });
    stream.on('end', function(){
        res.end();
    });
});
server.listen(3000);