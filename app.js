require("./SRC/Utilities/MessageSrv/connection");
var producer = require("./SRC/Utilities/MessageSrv/producer")
var reciever = require("./SRC/Utilities/MessageSrv/consumer");

module.exports = {
    sendData : producer,
    recieveData : reciever
}
