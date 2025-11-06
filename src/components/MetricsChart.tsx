import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, 
  ShowChart, 
  BarChart as BarChartIcon,
  AreaChart,
  Download,
  AutoGraph
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface MetricsChartProps {
  loss: number[];
  accuracy: number[];
}

/**
 * MetricsChart Component - Fixed with proper container sizing
 */
export const MetricsChart: React.FC<MetricsChartProps> = ({ loss, accuracy }) => {
  const [chartType, setChartType] = React.useState<'line' | 'area' | 'bar'>('line');
  const [animationEnabled, setAnimationEnabled] = React.useState(true);

  // Prepare chart data
  const chartData = React.useMemo(() => {
    return loss.map((lossValue, index) => ({
      epoch: index + 1,
      loss: lossValue,
      accuracy: accuracy[index] ? accuracy[index] * 100 : 0,
    }));
  }, [loss, accuracy]);

  const handleChartTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newChartType: 'line' | 'area' | 'bar',
  ) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const exportChartData = () => {
    const dataStr = JSON.stringify(chartData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'neural-nexus-training-metrics.json';
    link.click();
  };

  // Chart renderer
  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <Box sx={{ 
          width: '100%',
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column',
          minHeight: 400
        }}>
          <Typography color="rgba(255, 255, 255, 0.7)" variant="h6" textAlign="center">
            No training data yet
          </Typography>
          <Typography color="rgba(255, 255, 255, 0.5)" variant="body2" textAlign="center">
            Start training to see live metrics
          </Typography>
        </Box>
      );
    }

    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="epoch" 
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            />
            <RechartsTooltip 
              contentStyle={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 8,
                color: 'white'
              }}
              formatter={(value: number, name: string) => [
                name === 'accuracy' ? `${value.toFixed(2)}%` : value.toFixed(4),
                name === 'accuracy' ? 'Accuracy' : 'Loss'
              ]}
            />
            <Line
              type="monotone"
              dataKey="loss"
              stroke="#ff6b6b"
              strokeWidth={3}
              dot={false}
              isAnimationActive={animationEnabled}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#43e97b"
              strokeWidth={3}
              dot={false}
              isAnimationActive={animationEnabled}
            />
          </LineChart>
        );

      case 'area':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="epoch" 
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            />
            <RechartsTooltip 
              contentStyle={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 8,
              }}
            />
            <Line
              type="monotone"
              dataKey="loss"
              stroke="#ff6b6b"
              strokeWidth={2}
              dot={false}
              isAnimationActive={animationEnabled}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#43e97b"
              strokeWidth={2}
              dot={false}
              isAnimationActive={animationEnabled}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="epoch" 
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            />
            <RechartsTooltip 
              contentStyle={{ 
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 8,
              }}
            />
            <Line
              type="monotone"
              dataKey="loss"
              stroke="#ff6b6b"
              strokeWidth={3}
              dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
              isAnimationActive={animationEnabled}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#43e97b"
              strokeWidth={3}
              dot={{ fill: '#43e97b', strokeWidth: 2, r: 4 }}
              isAnimationActive={animationEnabled}
            />
          </LineChart>
        );

      default:
        return (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="white">Select a chart type</Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Card sx={{ 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <CardContent sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          p: 3 
        }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            flexShrink: 0
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <TrendingUp sx={{ color: '#4fc3f7', fontSize: 32 }} />
              </motion.div>
              <Box>
                <Typography variant="h5" sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #fff, #a8edea)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Training Analytics
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Real-time performance metrics
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Toggle Animations">
                <IconButton
                  onClick={() => setAnimationEnabled(!animationEnabled)}
                  sx={{
                    color: animationEnabled ? '#43e97b' : 'rgba(255, 255, 255, 0.5)',
                    background: animationEnabled ? 'rgba(67, 233, 123, 0.1)' : 'transparent',
                  }}
                >
                  <AutoGraph />
                </IconButton>
              </Tooltip>

              <Tooltip title="Export Data">
                <IconButton
                  onClick={exportChartData}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#4fc3f7',
                      background: 'rgba(79, 195, 247, 0.1)'
                    }
                  }}
                >
                  <Download />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Chart Type Selector */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 3,
            flexShrink: 0
          }}>
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={handleChartTypeChange}
              aria-label="chart type"
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 3,
                p: 0.5,
                '& .MuiToggleButton-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  border: 'none',
                  borderRadius: 2,
                  px: 2,
                  '&.Mui-selected': {
                    color: 'white',
                    background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                    boxShadow: '0 4px 15px 0 rgba(79, 172, 254, 0.3)',
                  },
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              }}
            >
              <ToggleButton value="line" aria-label="line chart">
                <ShowChart sx={{ mr: 1 }} />
                Line
              </ToggleButton>
              <ToggleButton value="area" aria-label="area chart">
                <AreaChart sx={{ mr: 1 }} />
                Area
              </ToggleButton>
              <ToggleButton value="bar" aria-label="bar chart">
                <BarChartIcon sx={{ mr: 1 }} />
                Bar
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* MAIN CHART CONTAINER - Takes full remaining space */}
          <Box sx={{ 
            flex: 1,
            width: '100%',
            minHeight: 400,
            height: '100%',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            background: 'rgba(0, 0, 0, 0.2)',
            overflow: 'hidden'
          }}>
            <ResponsiveContainer width="100%" height="100%" debounce={1}>
              {renderChart()}
            </ResponsiveContainer>
          </Box>

          {/* Legend */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4, 
            mt: 3,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 20, 
                height: 4, 
                background: 'linear-gradient(90deg, #ff6b6b, #ff8e8e)',
                borderRadius: 1 
              }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'bold' }}>
                Loss
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 20, 
                height: 4, 
                background: 'linear-gradient(90deg, #43e97b, #38f9d7)',
                borderRadius: 1 
              }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'bold' }}>
                Accuracy
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%',
                background: animationEnabled ? '#43e97b' : '#ff6b6b',
                animation: animationEnabled ? 'pulse 2s infinite' : 'none'
              }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {animationEnabled ? 'Live' : 'Paused'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};