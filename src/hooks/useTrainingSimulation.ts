import { useState, useCallback, useRef } from 'react';

interface TrainingState {
  epoch: number;
  loss: number;
  accuracy: number;
  learningRate: number;
  batchSize: number;
  isRunning: boolean;
}

/**
 * useTrainingSimulation Hook
 * Advanced training simulation with configurable parameters and real-time updates
 */
export const useTrainingSimulation = () => {
  const [trainingState, setTrainingState] = useState<TrainingState>({
    epoch: 0,
    loss: 0,
    accuracy: 0,
    learningRate: 0.01,
    batchSize: 32,
    isRunning: false
  });

  const [history, setHistory] = useState<{ loss: number[]; accuracy: number[] }>({
    loss: [],
    accuracy: []
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const simulateEpoch = useCallback(() => {
    setTrainingState(prev => {
      const newEpoch = prev.epoch + 1;
      
      // Simulate realistic training progress
      const baseLoss = Math.exp(-newEpoch / 25);
      const noise = (Math.random() - 0.5) * 0.1;
      const newLoss = Math.max(0.01, baseLoss + noise);
      
      const baseAccuracy = 1 - Math.exp(-newEpoch / 20);
      const accuracyNoise = (Math.random() - 0.5) * 0.05;
      const newAccuracy = Math.min(0.99, baseAccuracy + accuracyNoise);

      // Update history
      setHistory(current => ({
        loss: [...current.loss, newLoss],
        accuracy: [...current.accuracy, newAccuracy]
      }));

      return {
        ...prev,
        epoch: newEpoch,
        loss: newLoss,
        accuracy: newAccuracy
      };
    });
  }, []);

  const startTraining = useCallback(() => {
    if (intervalRef.current) return;

    setTrainingState(prev => ({ ...prev, isRunning: true }));
    
    intervalRef.current = setInterval(() => {
      simulateEpoch();
    }, 500); // Update every 500ms
  }, [simulateEpoch]);

  const stopTraining = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setTrainingState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const resetTraining = useCallback(() => {
    stopTraining();
    setTrainingState({
      epoch: 0,
      loss: 0,
      accuracy: 0,
      learningRate: 0.01,
      batchSize: 32,
      isRunning: false
    });
    setHistory({ loss: [], accuracy: [] });
  }, [stopTraining]);

  const updateLearningRate = useCallback((newRate: number) => {
    setTrainingState(prev => ({ ...prev, learningRate: newRate }));
  }, []);

  const updateBatchSize = useCallback((newSize: number) => {
    setTrainingState(prev => ({ ...prev, batchSize: newSize }));
  }, []);

  const getTrainingProgress = useCallback(() => {
    const maxEpochs = 100;
    return Math.min(100, (trainingState.epoch / maxEpochs) * 100);
  }, [trainingState.epoch]);

  const getTrainingInsights = useCallback(() => {
    const { loss, accuracy, epoch } = trainingState;
    
    let status = 'Initializing';
    if (epoch > 0) {
      if (loss < 0.1 && accuracy > 0.9) status = 'Converging';
      else if (loss < 0.3 && accuracy > 0.7) status = 'Learning Well';
      else if (loss < 0.5) status = 'Learning';
      else status = 'Starting';
    }

    const learningSpeed = history.loss.length > 1 
      ? history.loss[history.loss.length - 2] - history.loss[history.loss.length - 1]
      : 0;

    return {
      status,
      learningSpeed: learningSpeed.toFixed(4),
      isConverging: loss < 0.1 && accuracy > 0.9,
      estimatedTimeRemaining: trainingState.isRunning 
        ? `${Math.max(0, (100 - epoch) * 0.5).toFixed(1)}s`
        : '0s'
    };
  }, [trainingState, history]);

  return {
    // State
    trainingState,
    history,
    
    // Actions
    startTraining,
    stopTraining,
    resetTraining,
    updateLearningRate,
    updateBatchSize,
    
    // Computed values
    progress: getTrainingProgress(),
    insights: getTrainingInsights(),
    
    // Utilities
    isTraining: trainingState.isRunning,
    currentEpoch: trainingState.epoch
  };
};

export default useTrainingSimulation;