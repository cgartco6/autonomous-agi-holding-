import uuid

class BaseAgent:
    def __init__(self):
        self.id = str(uuid.uuid4())
        self.state = {}

    def perceive(self, memory):
        pass

    def decide(self):
        pass

    def act(self, memory):
        pass
