import { useState, useCallback } from 'react';

/**
 * useThreeJS Hook
 * Manages 3D visualization state and operations for neural network rendering
 */
export const useThreeJS = () => {
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 10 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [visualizationMode, setVisualizationMode] = useState<'activations' | 'weights' | 'gradients'>('activations');

  const rotateCamera = useCallback((x: number, y: number, z: number) => {
    setCameraPosition(prev => ({
      x: prev.x + x,
      y: prev.y + y,
      z: prev.z + z
    }));
  }, []);

  const resetCamera = useCallback(() => {
    setCameraPosition({ x: 0, y: 0, z: 10 });
  }, []);

  const toggleAnimation = useCallback(() => {
    setIsAnimating(prev => !prev);
  }, []);

  const changeVisualizationMode = useCallback((mode: 'activations' | 'weights' | 'gradients') => {
    setVisualizationMode(mode);
  }, []);

  // Simulate neuron data for visualization
  const generateNeuronData = useCallback((layerCount: number, neuronsPerLayer: number) => {
    const layers = [];
    
    for (let i = 0; i < layerCount; i++) {
      const neurons = [];
      for (let j = 0; j < neuronsPerLayer; j++) {
        neurons.push({
          id: `neuron-${i}-${j}`,
          activation: Math.random(),
          position: {
            x: i * 3 - (layerCount * 1.5),
            y: j - (neuronsPerLayer / 2),
            z: 0
          }
        });
      }
      layers.push(neurons);
    }
    
    return layers;
  }, []);

  // Simulate connection data
  const generateConnectionData = useCallback((layers: any[]) => {
    const connections = [];
    
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i];
      const nextLayer = layers[i + 1];
      
      for (let j = 0; j < currentLayer.length; j++) {
        for (let k = 0; k < nextLayer.length; k++) {
          connections.push({
            from: currentLayer[j].id,
            to: nextLayer[k].id,
            weight: (Math.random() * 2) - 1, // Random weight between -1 and 1
            isActive: Math.random() > 0.3
          });
        }
      }
    }
    
    return connections;
  }, []);

  return {
    // State
    cameraPosition,
    isAnimating,
    visualizationMode,
    
    // Actions
    rotateCamera,
    resetCamera,
    toggleAnimation,
    changeVisualizationMode,
    
    // Data generators
    generateNeuronData,
    generateConnectionData,
    
    // Computed values
    cameraState: `Position: (${cameraPosition.x.toFixed(1)}, ${cameraPosition.y.toFixed(1)}, ${cameraPosition.z.toFixed(1)})`
  };
};

export default useThreeJS;