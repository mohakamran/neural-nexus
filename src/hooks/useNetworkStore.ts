import { create } from 'zustand';
import { NetworkState, LayerConfig } from '../types/network';

interface NetworkStore extends NetworkState {
  // Actions
  addLayer: (layer: Omit<LayerConfig, 'id'>) => void;
  removeLayer: (layerId: string) => void;
  updateLayer: (layerId: string, updates: Partial<LayerConfig>) => void;
  startTraining: () => void;
  stopTraining: () => void;
  updateTrainingProgress: (progress: number) => void;
  addMetrics: (loss: number, accuracy: number) => void;
  resetNetwork: () => void;
}

const initialLayers: LayerConfig[] = [
  { id: '1', type: 'dense', units: 4, activation: 'relu', name: 'Input Layer' },
  { id: '2', type: 'dense', units: 8, activation: 'relu', name: 'Hidden Layer 1' },
  { id: '3', type: 'dense', units: 1, activation: 'sigmoid', name: 'Output Layer' },
];

export const useNetworkStore = create<NetworkStore>((set, get) => ({
  // Initial state
  layers: initialLayers,
  isTraining: false,
  trainingProgress: 0,
  loss: [],
  accuracy: [],
  activations: [],

  // Actions
  addLayer: (layer) => {
    const newLayer: LayerConfig = {
      ...layer,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({ layers: [...state.layers, newLayer] }));
  },

  removeLayer: (layerId) => {
    set((state) => ({
      layers: state.layers.filter(layer => layer.id !== layerId),
    }));
  },

  updateLayer: (layerId, updates) => {
    set((state) => ({
      layers: state.layers.map(layer =>
        layer.id === layerId ? { ...layer, ...updates } : layer
      ),
    }));
  },

  startTraining: () => {
    set({ isTraining: true, trainingProgress: 0, loss: [], accuracy: [] });
    
    // Simulate training progress
    const interval = setInterval(() => {
      const { isTraining, trainingProgress } = get();
      if (!isTraining || trainingProgress >= 100) {
        clearInterval(interval);
        return;
      }
      
      const newProgress = trainingProgress + 1;
      const loss = Math.exp(-newProgress / 20) + Math.random() * 0.1;
      const accuracy = 1 - Math.exp(-newProgress / 25) + Math.random() * 0.1;
      
      set({
        trainingProgress: newProgress,
        loss: [...get().loss, loss],
        accuracy: [...get().accuracy, accuracy],
      });
      
      if (newProgress >= 100) {
        set({ isTraining: false });
      }
    }, 100);
  },

  stopTraining: () => {
    set({ isTraining: false });
  },

  updateTrainingProgress: (progress) => {
    set({ trainingProgress: progress });
  },

  addMetrics: (loss, accuracy) => {
    set((state) => ({
      loss: [...state.loss, loss],
      accuracy: [...state.accuracy, accuracy],
    }));
  },

  resetNetwork: () => {
    set({
      layers: initialLayers,
      isTraining: false,
      trainingProgress: 0,
      loss: [],
      accuracy: [],
      activations: [],
    });
  },
}));