from agents.base_agent import BaseAgent
from agents.workflow_agent import WorkflowAgent

class SpawningAgent(BaseAgent):

    def perceive(self, memory):
        self.trigger = memory.retrieve("last_strategy")

    def decide(self):
        self.should_spawn = self.trigger == "spawn"

    def act(self, memory):
        if self.should_spawn:
            memory.store("spawned_agent", "workflow")
