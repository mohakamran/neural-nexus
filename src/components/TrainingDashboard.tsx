import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Chip,
  Alert,
} from '@mui/material';
import { PlayArrow, Stop, Refresh, Bolt, Psychology, AutoAwesome } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStore } from '../hooks/useNetworkStore';
import { MetricsChart } from './MetricsChart'; // This should work now

// ... rest of the TrainingDashboard component code remains the same ...
export const TrainingDashboard: React.FC = () => {
  const { isTraining, trainingProgress, loss, accuracy, startTraining, stopTraining, resetNetwork } = useNetworkStore();

  const handleStartTraining = () => {
    startTraining();
  };

  const handleStopTraining = () => {
    stopTraining();
  };

  const handleReset = () => {
    resetNetwork();
  };

  const currentLoss = loss.length > 0 ? loss[loss.length - 1] : 0;
  const currentAccuracy = accuracy.length > 0 ? accuracy[accuracy.length - 1] : 0;

  return (
    <Card sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
          Training Dashboard
        </Typography>

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
          {!isTraining ? (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={handleStartTraining}
              disabled={isTraining}
              sx={{
                background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #38f9d7, #43e97b)',
                },
              }}
            >
              Start Training
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Stop />}
              onClick={handleStopTraining}
              sx={{
                background: 'linear-gradient(45deg, #ff6b6b, #ffa8a8)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ffa8a8, #ff6b6b)',
                },
              }}
            >
              Stop Training
            </Button>
          )}
          
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleReset}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Reset
          </Button>
        </Box>

        {/* Progress Bar */}
        {isTraining && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Training Progress
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {trainingProgress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={trainingProgress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </motion.div>
        )}

        {/* Current Metrics */}
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                    {currentLoss.toFixed(4)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Current Loss
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ color: '#43e97b', fontWeight: 'bold' }}>
                    {(currentAccuracy * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Accuracy
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Box>

        {/* Charts */}
        <MetricsChart loss={loss} accuracy={accuracy} />
      </CardContent>
    </Card>
  );
};