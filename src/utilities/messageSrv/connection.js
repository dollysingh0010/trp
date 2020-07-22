require('dotenv').config();

var { Client }          = require('@sap/xb-msg-amqp-v100');
var reconnectCount      = Number(process.env.RECONNECT_COUNT) || 1;
var maxReconnectCount   = Number(process.env.MAX_RECONNECTCOUNT) || 10;
var timeInterval        = Number(process.env.RECONNECTION_INTERVAL) || 30000;
global.activeMQConnect  =  null;
global.connectionState  =  false;

global.activeMQConnect = new Client();
global.activeMQConnect.connect();

// Events to handle connect\disconnect\error
global.activeMQConnect.on('connected',(destination, peerInfo) => {
    console.log('connected with', peerInfo.description);
    //Setting below variable to handle reconnection
    global.connectionState = true;
    reconnectCount = 1;

})

//In case of error,It will fire disconnect error
.on('error', (error) => {
    console.log("Inside error ---",error.message);
})

.on('reconnecting', (destination) => {
    console.log('reconnecting, using destination ' + destination);
    global.connectionState = true;
    console.log("state in reconnecting--",global.connectionState)

})

//In case of disconnect,It will try to reconnect
.on('disconnected', (hadError, byBroker, statistics) => {
    console.log('disconnected ---->',hadError,byBroker,statistics);
    reconnectCount++;
    global.connectionState = false;
    console.log("state in disconnected--",global.connectionState,reconnectCount)

    if(!global.connectionState && reconnectCount<maxReconnectCount) {
        var retryConnection = setInterval(function() {
            global.activeMQConnect.connect();
            if(global.connectionState || reconnectCount>maxReconnectCount) {
                console.log("clearing setInterval--",reconnectCount)
                clearInterval(retryConnection);
            }
        },timeInterval)
    }
})

