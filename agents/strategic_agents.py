from agents.base_agent import BaseAgent
import random

class StrategicAgent(BaseAgent):

    def perceive(self, memory):
        self.environment = memory.knowledge

    def decide(self):
        self.strategy = random.choice(["expand", "optimize", "spawn"])

    def act(self, memory):
        memory.store("last_strategy", self.strategy)
