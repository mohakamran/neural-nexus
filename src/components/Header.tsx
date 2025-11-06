import React from 'react';
import { AppBar, Toolbar, Typography, Box, Chip } from '@mui/material';
import { Psychology, Code } from '@mui/icons-material';
import { motion } from 'framer-motion';

/**
 * Header Component
 * Displays the application title, subtitle, and status indicators
 * Includes animated elements for visual appeal
 */
export const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 2 }}>
          {/* Animated Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Psychology sx={{ fontSize: 32, color: '#4fc3f7' }} />
          </motion.div>

          {/* Title Section */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h4" 
                component="div" 
                sx={{ 
                  background: 'linear-gradient(45deg, #fff, #a8edea)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                Neural Nexus
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.8rem', md: '0.9rem' }
                }}
              >
                Interactive AI Architecture Visualizer
              </Typography>
            </motion.div>
          </Box>
        </Box>

        {/* Status Chips */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Chip
              icon={<Code />}
              label="TensorFlow.js"
              size="small"
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Chip
              label="Real-time"
              size="small"
              sx={{
                background: 'linear-gradient(45deg, #45B7D1, #96E6A1)',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};