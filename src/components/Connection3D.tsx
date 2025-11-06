import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { TrendingUp, Link } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Connection3DProps {
  weight: number;
  fromNeuron: number;
  toNeuron: number;
  isActive?: boolean;
}

/**
 * Connection3D Component
 * Visualizes weight connections between neurons with interactive controls
 * Shows connection strength through animation and color
 */
export const Connection3D: React.FC<Connection3DProps> = ({ 
  weight, 
  fromNeuron, 
  toNeuron, 
  isActive = false 
}) => {
  const [connectionStrength, setConnectionStrength] = React.useState(weight);
  const normalizedWeight = Math.abs(connectionStrength);
  const isPositive = connectionStrength > 0;

  const handleStrengthChange = (event: Event, newValue: number | number[]) => {
    setConnectionStrength(newValue as number);
  };

  const getConnectionColor = () => {
    if (isPositive) {
      return normalizedWeight > 0.7 ? '#43e97b' : normalizedWeight > 0.3 ? '#4fc3f7' : '#81d4fa';
    }
    return normalizedWeight > 0.7 ? '#ff6b6b' : normalizedWeight > 0.3 ? '#ffa8a8' : '#ffcdd2';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        p: 2, 
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 2,
        border: `1px solid ${getConnectionColor()}30`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background */}
        <motion.div
          animate={{
            background: [
              `linear-gradient(90deg, ${getConnectionColor()}10, transparent)`,
              `linear-gradient(90deg, transparent, ${getConnectionColor()}20)`,
              `linear-gradient(90deg, ${getConnectionColor()}10, transparent)`,
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Link sx={{ color: getConnectionColor(), fontSize: 20 }} />
            <Typography variant="h6" sx={{ color: 'white', fontSize: '1rem' }}>
              Connection {fromNeuron} → {toNeuron}
            </Typography>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              background: isActive ? '#43e97b' : '#ff6b6b',
              ml: 'auto'
            }} />
          </Box>

          {/* Weight Visualization */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Weight Strength
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: getConnectionColor(),
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }}>
                  {connectionStrength.toFixed(2)}
                </Typography>
              </Box>
              
              {/* Weight bar visualization */}
              <Box sx={{ 
                width: '100%', 
                height: 6, 
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${normalizedWeight * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${getConnectionColor()}, ${getConnectionColor()}80)`,
                    borderRadius: 3,
                  }}
                />
              </Box>
            </Box>

            <TrendingUp sx={{ 
              color: getConnectionColor(),
              transform: isPositive ? 'none' : 'rotate(180deg)'
            }} />
          </Box>

          {/* Interactive Slider */}
          <Box sx={{ mt: 2 }}>
            <Slider
              value={connectionStrength}
              onChange={handleStrengthChange}
              min={-1}
              max={1}
              step={0.01}
              sx={{
                color: getConnectionColor(),
                '& .MuiSlider-track': {
                  background: `linear-gradient(90deg, #ff6b6b, #4fc3f7)`,
                },
                '& .MuiSlider-thumb': {
                  background: getConnectionColor(),
                  boxShadow: `0 0 10px ${getConnectionColor()}80`,
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                -1.0
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                0.0
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                +1.0
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 2,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Type
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                {isPositive ? 'Excitatory' : 'Inhibitory'}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Magnitude
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                {normalizedWeight.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Status
              </Typography>
              <Typography variant="body2" sx={{ 
                color: isActive ? '#43e97b' : '#ff6b6b',
                fontWeight: 'bold'
              }}>
                {isActive ? 'Active' : 'Idle'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Connection3D;