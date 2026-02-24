class Orchestrator:
    def __init__(self, registry, memory):
        self.registry = registry
        self.memory = memory

    def bootstrap(self):
        from agents.strategic_agent import StrategicAgent
        from agents.workflow_agent import WorkflowAgent
        from agents.spawning_agent import SpawningAgent
        
        self.registry.register(StrategicAgent())
        self.registry.register(WorkflowAgent())
        self.registry.register(SpawningAgent())

    def execute_cycle(self):
        for agent in self.registry.get_all():
            agent.perceive(self.memory)
            agent.decide()
            agent.act(self.memory)
