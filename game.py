from time import sleep

import gym


class Game:
    def __init__(self, player, render=False):
        self.env = gym.make("CartPole-v1")
        self.observation = self.env.reset()
        self.player = player
        self.render = render

    def play(self):
        done = False
        while not done:
            if self.render:
                self.env.render()
            action = self.player.action(self.observation)
            self.observation, reward, done, info = self.env.step(action)
            self.player.reward(reward)
        self.env.close()
        if self.render:
            self.scoreDisplay()
        return self.player.score

    def scoreDisplay(self):
        if self.player.score < 20:
            print(f'👎 {type(self.player).__name__} - {self.player.score}!')
        elif self.player.score < 250:
            print(f'😴 {type(self.player).__name__} - {self.player.score}!')
        elif self.player.score < 500:
            print(f'👍 {type(self.player).__name__} - {self.player.score}!')
        elif self.player.score == 500.0:
            print(f'🚀🌟 {type(self.player).__name__} - {self.player.score}!')
