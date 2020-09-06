const { Neuron } = require('./neuron');

class Network {
    constructor(inputs, hidden, outputs) {
        this.inputs = [...Array(inputs)].map(() => new Neuron());
        this.hidden = [...Array(hidden)].map(() => new Neuron());
        this.outputs = [...Array(outputs)].map(() => new Neuron());

        this.inputs.map(i => {
            this.hidden.map(h => i.connect(h));
        });
        this.hidden.map(h => {
            this.outputs.map(o => h.connect(o));
        });
    };

    activate(input) {
        this.inputs.forEach((nueron, i ) => nueron.activate(input[i]));
        this.hidden.forEach((neuron) => neuron.activate());
        return this.outputs.map(neuron => neuron.activate());
    };

    propagate(target) {
        this.outputs.forEach((neuron, t) => neuron.propagate(target[t]));
        this.hidden.forEach(neuron => neuron.propagate());
        return this.inputs.forEach(neuron => neuron.propagate()); 
    };

    train(datasets, interations=1000) {
        console.log('\nTrainging the network... 🥊')
        while (interations > 0 ) {
            datasets.map(d => {
                this.activate(d[0]);
                this.propagate(d[1]);
            });
            interations--;
        };
        console.log('Training complete ✅\n')
    }
};

module.exports = { Network };