// src/App.jsx
import React from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default App;