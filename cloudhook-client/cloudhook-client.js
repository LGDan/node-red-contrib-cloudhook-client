module.exports = function(RED) {
    'use strict';

    function connect(uri, options) {
        return require('socket.io-client')(uri, options);
    }

    /* Config */
    function CloudhookConfig(config) {
        RED.nodes.createNode(this, config);
        this.uri = config.uri;
        //this.socket = connect(config.uri, JSON.parse(config.options || '{}'));
    }
    RED.nodes.registerType('cloudhook-config', CloudhookConfig);
   
    /* Standard */
    function CloudhookStandard(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        
        const server = RED.nodes.getNode(config.server);
        const socket = connect(server.uri, {});
        const hook = config.hooktenant + '/' + config.hookvalue;

        socket.on('connect', function() {
            socket.emit("ch-subscribe", hook);
            node.status({ fill: 'green', shape: 'dot', text: 'connected' });
        });

        socket.on('disconnect', function () {
            node.status({ fill: 'red', shape: 'ring', text: 'disconnected' });
        });

        socket.on('connect_error', function(err) {
            node.status({ fill: 'red', shape: 'ring', text: 'error' });
        });

        socket.on("ch-get", function (data) {
            node.send({ topic: hook, payload: data, method: "GET"});
        })

        socket.on("ch-post", function (data) {
            node.send({ topic: hook, payload: data, method: "POST" });
        })

        node.on('close', function (done) {
            socket.disconnect();
            node.status({});
            done();
        });
    }
    RED.nodes.registerType('cloudhook-standard', CloudhookStandard);


    /* Load Balance */
    function CloudhookLoadBalance(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        
        const server = RED.nodes.getNode(config.server);
        const socket = connect(server.uri, {});
        const hook = config.hooktenant + '/' + config.hookvalue;

        socket.on('connect', function() {
            socket.emit("ch-subscribe-lb", hook);
            node.status({ fill: 'green', shape: 'dot', text: 'connected' });
        });

        socket.on('disconnect', function () {
            node.status({ fill: 'red', shape: 'ring', text: 'disconnected' });
        });

        socket.on('connect_error', function(err) {
            node.status({ fill: 'red', shape: 'ring', text: 'error' });
        });

        socket.on("ch-get", function (data) {
            node.send({ topic: hook, payload: data, method: "GET"});
        })

        socket.on("ch-post", function (data) {
            node.send({ topic: hook, payload: data, method: "POST" });
        })

        node.on('close', function (done) {
            socket.disconnect();
            node.status({});
            done();
        });
    }
    RED.nodes.registerType('cloudhook-loadbalance', CloudhookLoadBalance);


    /* Hash */
    function CloudhookHash(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        
        const server = RED.nodes.getNode(config.server);
        const socket = connect(server.uri, {});
        const hook = config.hash;

        socket.on('connect', function() {
            socket.emit("ch-subscribe-hash", hook);
            node.status({ fill: 'green', shape: 'dot', text: 'connected' });
        });

        socket.on('disconnect', function () {
            node.status({ fill: 'red', shape: 'ring', text: 'disconnected' });
        });

        socket.on('connect_error', function(err) {
            node.status({ fill: 'red', shape: 'ring', text: 'error' });
        });

        socket.on("ch-get", function (data) {
            node.send({ topic: hook, payload: data, method: "GET"});
        })

        socket.on("ch-post", function (data) {
            node.send({ topic: hook, payload: data, method: "POST" });
        })

        node.on('close', function (done) {
            socket.disconnect();
            node.status({});
            done();
        });
    }
    RED.nodes.registerType('cloudhook-hash', CloudhookHash);

    
};
