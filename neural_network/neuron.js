const uid = require('cuid');
const mathjs = require('mathjs');

class Neuron {
    constructor() {
        this.uid = uid()
        this.bias = Math.random() * 2 - 1;
        this.incoming = [];
        this.outgoing = [];
        this.output;
        this.error;
    }

    connect(neuron) {
        const weight = Math.random() * 2 - 1;
        this.outgoing.push({neuron: neuron, weight});
        neuron.incoming.push({neuron: this, weight}); // add this neuron to the incoming list of the new neuron
    };

    activate(input=null) {
        if (input !== null) { // If it has an input this is an input node
            this.output = input;
        }
        else {
            const dotPod = mathjs.dot(
                this.incoming.map(i => i.neuron.output), 
                this.incoming.map(i => i.weight)
            );
            this.output = sigmoid(dotPod + this.bias);
            this._output = reverseSigmoid(dotPod + this.bias);
        }
        return this.output;
    };

    propagate(target=null, learningRate=0.3) {
        if (target !== null) {
            this.error = (this.output - target) * this._output
        }
        else {
            this.outgoing.map(n => {
                const ind = n.neuron.incoming.findIndex(i => i.neuron.uid === this.uid);
                n.neuron.incoming[ind].weight -= learningRate * n.neuron.error * this.output;
            });
            const dotPod = mathjs.dot(
                this.outgoing.map(n => n.neuron.error),
                this.outgoing.map(n => n.weight)
            );
            this.error = dotPod * this._output
        }
        this.bias -= learningRate * this.error;
        return this.error;
    }

}

const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}

const reverseSigmoid = (x) => {
    return sigmoid(x) * (1 - sigmoid(x));
}

module.exports = { Neuron };