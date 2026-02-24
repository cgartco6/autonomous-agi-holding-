from core.orchestrator import Orchestrator
from core.registry import AgentRegistry
from core.memory import GlobalMemory

class SyntheticEngine:
    def __init__(self):
        self.registry = AgentRegistry()
        self.memory = GlobalMemory()
        self.orchestrator = Orchestrator(self.registry, self.memory)

    def initialize(self):
        self.orchestrator.bootstrap()

    def run(self):
        while True:
            self.orchestrator.execute_cycle()
