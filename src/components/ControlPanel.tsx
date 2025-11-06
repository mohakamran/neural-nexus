import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Settings, Speed, Palette } from '@mui/icons-material';
import { motion } from 'framer-motion';

/**
 * ControlPanel Component
 * Provides settings and parameter controls for the visualization
 * Includes animation speed, theme settings, and display options
 */
export const ControlPanel: React.FC = () => {
  const [animationSpeed, setAnimationSpeed] = React.useState(1);
  const [visualizationMode, setVisualizationMode] = React.useState('activations');
  const [showWeights, setShowWeights] = React.useState(true);
  const [theme, setTheme] = React.useState('dark');

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    setAnimationSpeed(newValue as number);
  };

  const handleVisualizationChange = (event: any) => {
    setVisualizationMode(event.target.value);
  };

  const handleThemeChange = (event: any) => {
    setTheme(event.target.value);
  };

  return (
    <Card sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Settings sx={{ color: '#4fc3f7' }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Visualization Controls
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Animation Speed */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Speed sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.7)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Animation Speed
                </Typography>
              </Box>
              <Slider
                value={animationSpeed}
                onChange={handleSpeedChange}
                min={0.1}
                max={3}
                step={0.1}
                sx={{
                  color: '#4fc3f7',
                  '& .MuiSlider-track': {
                    background: 'linear-gradient(90deg, #4fc3f7, #00f2fe)',
                  },
                  '& .MuiSlider-thumb': {
                    background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Current: {animationSpeed}x
              </Typography>
            </Box>
          </motion.div>

          {/* Visualization Mode */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Visualization Mode
              </InputLabel>
              <Select
                value={visualizationMode}
                label="Visualization Mode"
                onChange={handleVisualizationChange}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4fc3f7',
                  },
                }}
              >
                <MenuItem value="activations">Layer Activations</MenuItem>
                <MenuItem value="weights">Weight Distribution</MenuItem>
                <MenuItem value="gradients">Gradient Flow</MenuItem>
                <MenuItem value="combined">Combined View</MenuItem>
              </Select>
            </FormControl>
          </motion.div>

          {/* Theme Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Color Theme
              </InputLabel>
              <Select
                value={theme}
                label="Color Theme"
                onChange={handleThemeChange}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <MenuItem value="dark">Dark Theme</MenuItem>
                <MenuItem value="blue">Blue Gradient</MenuItem>
                <MenuItem value="purple">Purple Gradient</MenuItem>
                <MenuItem value="neon">Neon Glow</MenuItem>
              </Select>
            </FormControl>
          </motion.div>

          {/* Toggle Switches */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showWeights}
                    onChange={(e) => setShowWeights(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#4fc3f7',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#4fc3f7',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    Show Weight Connections
                  </Typography>
                }
              />
              
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#43e97b',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    Animate Data Flow
                  </Typography>
                }
              />
            </Box>
          </motion.div>
        </Box>
      </CardContent>
    </Card>
  );
};