'use strict';

// Listener port
var PORT = 8080;

// Init synaptic
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

function Perceptron(input, hidden, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

function LSTM(input, blocks, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var inputGate = new Layer(blocks);
    var forgetGate = new Layer(blocks);
    var memoryCell = new Layer(blocks);
    var outputGate = new Layer(blocks);
    var outputLayer = new Layer(output);

    // connections from input layer
    var input = inputLayer.project(memoryCell);
    inputLayer.project(inputGate);
    inputLayer.project(forgetGate);
    inputLayer.project(outputGate);

    // connections from memory cell
    var output = memoryCell.project(outputLayer);

    // self-connection
    var self = memoryCell.project(memoryCell);

    // peepholes
    memoryCell.project(inputGate);
    memoryCell.project(forgetGate);
    memoryCell.project(outputGate);

    // gates
    inputGate.gate(input, Layer.gateType.INPUT);
    forgetGate.gate(self, Layer.gateType.ONE_TO_ONE);
    outputGate.gate(output, Layer.gateType.OUTPUT);

    // input to output direct connection
    inputLayer.project(outputLayer);

    // set the layers of the neural network
    this.set({
        input: inputLayer,
        hidden: [inputGate, forgetGate, memoryCell, outputGate],
        output: outputLayer
    });
}

// extend the prototype chain
LSTM.prototype = new Network();
LSTM.prototype.constructor = LSTM;

var express = require('express');
var connect = require('connect');
var http = require('http');

// HTTP listener
var app = express();

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

// default response
app.get('/', function (req, res) {
  res.send('Hello World\n');
});

// Allow http access to directory /public
var serveStatic = require('serve-static')
app.use(serveStatic(__dirname + '/public', {'index': ['index.html']}))

//create node.js http server and listen on port
app.listen(PORT);

console.log('Running on http://localhost:' + PORT);

