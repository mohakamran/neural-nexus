/**
 * Three.js utility functions for 3D neural network visualization
 * Provides geometry creation, material configuration, and scene management helpers
 */

// Color utilities for neural network visualization
export const ColorPalettes = {
  activations: {
    low: '#1a237e',
    medium: '#3949ab',
    high: '#5c6bc0',
    veryHigh: '#9fa8da'
  },
  weights: {
    negative: '#ff5252',
    neutral: '#bdbdbd',
    positive: '#4caf50'
  },
  layers: {
    input: '#ff9800',
    hidden: '#2196f3',
    output: '#4caf50'
  }
};

// Generate neuron positions in 3D space
export const generateNeuronPositions = (layerSizes: number[], spacing = { x: 3, y: 1.5, z: 0 }) => {
  const positions: { [layer: number]: Array<{ x: number; y: number; z: number }> } = {};
  
  layerSizes.forEach((size, layerIndex) => {
    positions[layerIndex] = [];
    const startY = -(size - 1) * spacing.y / 2;
    
    for (let i = 0; i < size; i++) {
      positions[layerIndex].push({
        x: layerIndex * spacing.x - ((layerSizes.length - 1) * spacing.x) / 2,
        y: startY + i * spacing.y,
        z: (Math.random() - 0.5) * spacing.z // Small random depth for visual interest
      });
    }
  });
  
  return positions;
};

// Generate connection lines between layers
export const generateConnections = (layerSizes: number[], neuronPositions: any) => {
  const connections: Array<{
    from: { layer: number; neuron: number };
    to: { layer: number; neuron: number };
    weight: number;
  }> = [];
  
  for (let layerIndex = 0; layerIndex < layerSizes.length - 1; layerIndex++) {
    const currentLayerSize = layerSizes[layerIndex];
    const nextLayerSize = layerSizes[layerIndex + 1];
    
    for (let i = 0; i < currentLayerSize; i++) {
      for (let j = 0; j < nextLayerSize; j++) {
        connections.push({
          from: { layer: layerIndex, neuron: i },
          to: { layer: layerIndex + 1, neuron: j },
          weight: (Math.random() * 2) - 1 // Random weight between -1 and 1
        });
      }
    }
  }
  
  return connections;
};

// Calculate connection color based on weight
export const getConnectionColor = (weight: number) => {
  if (weight > 0.5) return ColorPalettes.weights.positive;
  if (weight > 0) return '#81c784';
  if (weight > -0.5) return '#e57373';
  return ColorPalettes.weights.negative;
};

// Calculate connection opacity based on weight magnitude
export const getConnectionOpacity = (weight: number) => {
  return Math.min(0.8, Math.abs(weight) * 0.8 + 0.2);
};

// Calculate neuron color based on activation
export const getNeuronColor = (activation: number) => {
  if (activation > 0.8) return ColorPalettes.activations.veryHigh;
  if (activation > 0.6) return ColorPalettes.activations.high;
  if (activation > 0.4) return ColorPalettes.activations.medium;
  if (activation > 0.2) return ColorPalettes.activations.low;
  return '#0d47a1';
};

// Calculate neuron size based on activation
export const getNeuronSize = (activation: number, baseSize = 0.3) => {
  return baseSize * (0.5 + activation * 0.5);
};

// Generate camera positions for different views
export const CameraPresets = {
  overview: { x: 0, y: 0, z: 15 },
  side: { x: 10, y: 0, z: 5 },
  top: { x: 0, y: 10, z: 0 },
  front: { x: 0, y: 0, z: 8 }
};

// Animation utilities
export const AnimationConfigs = {
  neuronPulse: {
    duration: 2,
    scale: [1, 1.2, 1],
    ease: "easeInOut"
  },
  connectionFlow: {
    duration: 3,
    flowSpeed: 0.02
  },
  cameraOrbit: {
    duration: 20,
    rotationSpeed: 0.5
  }
};

// Performance optimization
export const optimizeScene = (layerSizes: number[]) => {
  const totalNeurons = layerSizes.reduce((sum, size) => sum + size, 0);
  const totalConnections = layerSizes.slice(0, -1).reduce((sum, size, index) => 
    sum + size * layerSizes[index + 1], 0
  );
  
  return {
    totalNeurons,
    totalConnections,
    recommendation: totalNeurons > 1000 ? 'Use LOD (Level of Detail)' : 'Full detail',
    estimatedPerformance: totalNeurons < 500 ? 'Excellent' : 
                         totalNeurons < 2000 ? 'Good' : 'Consider optimization'
  };
};

export default {
  ColorPalettes,
  generateNeuronPositions,
  generateConnections,
  getConnectionColor,
  getConnectionOpacity,
  getNeuronColor,
  getNeuronSize,
  CameraPresets,
  AnimationConfigs,
  optimizeScene
};