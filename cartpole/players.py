import neat
from random import choice

from game import Game

class Player:
    def __init__(self):
        self.score = 0

    def action(self, observation):
        return 0

    def reward(self, amount):
        self.score += amount

class RandomPlayer(Player):
    def action(self, observation):
        return choice([0,1])

class BasicPlayer(Player):
    def action(self, observation):
        if observation[3] > 0:
            return 1
        return 0

class NeatPlayer(Player):
    def __init__(self):
        self.score = 0
        self.winner = None
        self.train()

    def train(self):
        config = neat.Config(
            neat.DefaultGenome,
            neat.DefaultReproduction,
            neat.DefaultSpeciesSet,
            neat.DefaultStagnation,
            './neat.config'
        )
        p = neat.Population(config)
        winner = p.run(self.evaluation, 300)
        self.winner = neat.nn.FeedForwardNetwork.create(winner, config)

    def evaluation(self, genomes, config):
        for id, genome in genomes:
            net = neat.nn.FeedForwardNetwork.create(genome, config)
            genome.fitness = Game(GenomePlayer(net), render=False).play()

    def action(self, observation):
        choices = self.winner.activate(observation)
        return choices[0] >= 0

class GenomePlayer(Player):
    def __init__(self, net):
        self.score = 0
        self.net = net

    def action(self, observation):
        choices = self.net.activate(observation)
        return choices[0] >= 0
