import numpy as np

class QuantumInspiredOptimizer:
    def optimize(self, objective_function, dim=10):
        population = np.random.rand(50, dim)
        scores = np.array([objective_function(p) for p in population])
        best = population[np.argmax(scores)]
        return best
