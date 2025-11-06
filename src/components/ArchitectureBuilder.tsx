import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStore } from '../hooks/useNetworkStore';

/**
 * ArchitectureBuilder Component
 * Allows users to add, remove, and configure neural network layers
 * Provides visual representation of the network architecture
 */
export const ArchitectureBuilder: React.FC = () => {
  const { layers, addLayer, removeLayer, updateLayer } = useNetworkStore();

  const handleAddLayer = () => {
    const newLayer = {
      type: 'dense' as const,
      units: 8,
      activation: 'relu' as const,
      name: `Layer ${layers.length + 1}`,
    };
    addLayer(newLayer);
  };

  const handleRemoveLayer = (layerId: string) => {
    removeLayer(layerId);
  };

  const getLayerColor = (layerType: string) => {
    const colors: { [key: string]: string } = {
      dense: '#4fc3f7',
      conv2d: '#ffb74d',
      lstm: '#ba68c8',
      dropout: '#ef5350',
    };
    return colors[layerType] || '#78909c';
  };

  return (
    <Card sx={{ mb: 4, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            Network Architecture
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddLayer}
            sx={{
              background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
              '&:hover': {
                background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
              },
            }}
          >
            Add Layer
          </Button>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2 
        }}>
          <AnimatePresence>
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  sx={{ 
                    background: `linear-gradient(135deg, ${getLayerColor(layer.type)}20, ${getLayerColor(layer.type)}40)`,
                    border: `1px solid ${getLayerColor(layer.type)}30`,
                    position: 'relative',
                    overflow: 'visible',
                    height: '100%',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ color: 'white', fontSize: '1rem' }}>
                          {layer.name}
                        </Typography>
                        <Chip
                          label={layer.type.toUpperCase()}
                          size="small"
                          sx={{
                            background: getLayerColor(layer.type),
                            color: 'white',
                            fontWeight: 'bold',
                            mt: 0.5,
                          }}
                        />
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveLayer(layer.id)}
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Units: <strong>{layer.units}</strong>
                      </Typography>
                      {layer.activation && (
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Activation: <strong>{layer.activation}</strong>
                        </Typography>
                      )}
                    </Box>

                    {/* Connection indicator */}
                    {index < layers.length - 1 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -8,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '8px solid transparent',
                          borderRight: '8px solid transparent',
                          borderTop: `8px solid ${getLayerColor(layer.type)}50`,
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        {layers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                No Layers Added
              </Typography>
              <Typography variant="body2">
                Click "Add Layer" to start building your neural network
              </Typography>
            </Box>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};