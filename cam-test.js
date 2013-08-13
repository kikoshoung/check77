var express = require('express')
var net = require('net');
var child = require('child_process');
 
var cmd = 'gst-launch-0.10';
var args = '';
var options = null;
 
var app = express();
 
app.get('/', function(req, res) {
  var date = new Date();
 
  res.writeHead(200, {
    'Date':date.toUTCString(),
    'Connection':'close',
    'Cache-Control':'private',
    'Content-Type':'video/webm',
    'Server':'CustomStreamer/0.0.1',
    });
 
  var server = net.createServer(function (socket) {
    socket.on('data', function (data) {
      res.write(data);
    });
    socket.on('close', function(had_error) {
      res.end();
    });
  });
 
  server.maxConnections = 1;
 
  server.listen(function() {
    args =
    ['v4l2src device=/dev/video0',
    '!', 'video/x-raw-rgb,framerate=30/1',
    '!', 'ffmpegcolorspace',
    '!', 'vp8enc', 'speed=2',
    '!', 'queue2',
    '!', 'm.', 'audiotestsrc', 'is-live=1',
    '!', 'audioconvert',
    '!', 'vorbisenc',
    '!', 'queue2',
    '!', 'm.', 'webmmux', 'name=m', 'streamable=true',
    '!', 'tcpclientsink', 'host=localhost',
    'port='+server.address().port];
 
    var gstMuxer = child.spawn(cmd, args, options);
 
    gstMuxer.stderr.on('data', onSpawnError);
    gstMuxer.on('exit', onSpawnExit);
 
    res.connection.on('close', function() {
      gstMuxer.kill();
    });
  });
});
 
app.listen(9001);
 
function onSpawnError(data) {
  console.log(data.toString());
}
 
function onSpawnExit(code) {
  if (code != null) {
    console.error('GStreamer error, exit code ' + code);
  }
}
 
process.on('uncaughtException', function(err) {
  console.debug(err);
});