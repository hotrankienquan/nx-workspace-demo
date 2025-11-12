import {
  Box,
  CssBaseline,
} from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const ModuleInstruction1 = React.lazy(() => import("characters/ModuleInstruction1"))

function ClaimPilotLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />

      <Header />

      <Sidebar />
      <React.Suspense fallback={null}>
        <Routes>
          <Route path="/remote1/*" element={<ModuleInstruction1 />} />
        </Routes>
      </React.Suspense>
    </Box>
  );
}

export default ClaimPilotLayout;