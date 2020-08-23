from game import Game
from players import Player, RandomPlayer, BasicPlayer, NeatPlayer

Game(Player(), render=True).play()
Game(RandomPlayer(), render=True).play()
Game(BasicPlayer(), render=True).play()
Game(NeatPlayer(), render=True).play()
