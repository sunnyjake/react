var express = require("express");
var app = express();

// app.use(express.static('js'));
app.use("/", express.static(__dirname))

    // app.use("/", function (request, response) {
    //     response.sendFile(__dirname.concat("/index.html"));
    // })
    .listen(8080, function () {
        console.log("Works on 8080");
    });