import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component that provides consistent structure
 * Includes header, navigation, and content area
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                background: 'linear-gradient(45deg, #fff, #a8edea)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold'
              }}
            >
              Neural Nexus
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem'
              }}
            >
              Interactive AI Architecture Visualizer
            </Typography>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {children}
        </Container>
      </motion.div>
    </Box>
  );
};