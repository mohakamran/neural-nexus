import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Layout } from './components/Layout';
import { ArchitectureBuilder } from './components/ArchitectureBuilder';
import { TrainingDashboard } from './components/TrainingDashboard';
import { ControlPanel } from './components/ControlPanel';
import { Network3D } from './components/Network3D';
import { Header } from './components/Header';
import { MetricsChart } from './components/MetricsChart';
import { useNetworkStore } from './hooks/useNetworkStore';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { loss, accuracy } = useNetworkStore();

  return (
    <Layout>
      {/* Custom Header */}
      <Header />
      
      {/* Main Content Area */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: 3,
        height: 'calc(100vh - 80px)',
        overflow: 'hidden',
        p: 2
      }}>
        
        {/* Left Panel - Architecture & Controls */}
        <Box sx={{ 
          flex: isMobile ? 'none' : 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          minWidth: isMobile ? '100%' : 400,
          maxWidth: isMobile ? '100%' : 500,
          height: isMobile ? 'auto' : '100%',
          overflow: 'auto'
        }}>
          <ArchitectureBuilder />
          <ControlPanel />
        </Box>

        {/* Right Panel - Visualization & Training */}
        <Box sx={{ 
          flex: isMobile ? 'none' : 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          height: isMobile ? 'auto' : '100%',
          minHeight: isMobile ? 'auto' : '100%'
        }}>
          <Box sx={{ 
            flex: 1,
            minHeight: 400
          }}>
            <Network3D />
          </Box>
          
          <Box sx={{ 
            flex: 1,
            minHeight: 400
          }}>
            <TrainingDashboard />
          </Box>
        </Box>
      </Box>

      {/* DEDICATED FULL-WIDTH CHART SECTION */}
      <Box sx={{ 
        width: '100%',
        height: '500px', // Fixed height for chart section
        minHeight: '500px',
        p: 2,
        mt: 2
      }}>
        <MetricsChart loss={loss} accuracy={accuracy} />
      </Box>
    </Layout>
  );
}

export default App;