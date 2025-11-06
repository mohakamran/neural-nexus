// Core type definitions for our neural network visualization

export interface LayerConfig {
  id: string;
  type: 'dense' | 'conv2d' | 'lstm' | 'dropout';
  units: number;
  activation?: 'relu' | 'sigmoid' | 'tanh' | 'softmax';
  name: string;
}

export interface NetworkState {
  layers: LayerConfig[];
  isTraining: boolean;
  trainingProgress: number;
  loss: number[];
  accuracy: number[];
  activations: number[][];
}

export interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  timestamp: number;
}