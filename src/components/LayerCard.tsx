import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  TextField,
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { LayerConfig } from '../types/network';

interface LayerCardProps {
  layer: LayerConfig;
  onUpdate: (layerId: string, updates: Partial<LayerConfig>) => void;
  onDelete: (layerId: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

/**
 * LayerCard Component
 * Individual neural network layer representation
 * Supports editing, deletion, and configuration
 */
export const LayerCard: React.FC<LayerCardProps> = ({ 
  layer, 
  onUpdate, 
  onDelete, 
  isFirst = false, 
  isLast = false 
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(layer.name);

  const handleSave = () => {
    onUpdate(layer.id, { name: editedName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(layer.name);
    setIsEditing(false);
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

  const layerColor = getLayerColor(layer.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card 
        sx={{ 
          background: `linear-gradient(135deg, ${layerColor}15, ${layerColor}25)`,
          border: `1px solid ${layerColor}30`,
          position: 'relative',
          overflow: 'visible',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: `1px solid ${layerColor}50`,
            boxShadow: `0 4px 20px ${layerColor}20`,
          },
        }}
      >
        {/* Connection lines */}
        {!isFirst && (
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: `8px solid ${layerColor}50`,
            }}
          />
        )}
        
        {!isLast && (
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
              borderTop: `8px solid ${layerColor}50`,
            }}
          />
        )}

        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              {isEditing ? (
                <TextField
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                  }}
                />
              ) : (
                <Typography variant="h6" sx={{ color: 'white', fontSize: '1rem' }}>
                  {layer.name}
                </Typography>
              )}
              
              <Chip
                label={layer.type.toUpperCase()}
                size="small"
                sx={{
                  background: layerColor,
                  color: 'white',
                  fontWeight: 'bold',
                  mt: 0.5,
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {isEditing ? (
                <>
                  <IconButton
                    size="small"
                    onClick={handleSave}
                    sx={{ color: '#43e97b' }}
                  >
                    <Save fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={handleCancel}
                    sx={{ color: '#ff6b6b' }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    size="small"
                    onClick={() => setIsEditing(true)}
                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(layer.id)}
                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>

          {/* Layer Details */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Units:
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                {layer.units}
              </Typography>
            </Box>

            {layer.activation && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Activation:
                </Typography>
                <Chip
                  label={layer.activation}
                  size="small"
                  variant="outlined"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    fontSize: '0.7rem',
                    height: 20,
                  }}
                />
              </Box>
            )}

            {/* Visual representation of units */}
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Neurons: {layer.units}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 0.5, 
                mt: 0.5,
                flexWrap: 'wrap'
              }}>
                {Array.from({ length: Math.min(layer.units, 10) }).map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: layerColor,
                        opacity: 0.8,
                      }}
                    />
                  </motion.div>
                ))}
                {layer.units > 10 && (
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    +{layer.units - 10} more
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};