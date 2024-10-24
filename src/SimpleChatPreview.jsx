import React, { createContext, useContext, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL query
const GET_LAUNCHES = gql`
  query GetLaunches {
    launchesPast(limit: 5) {
      id
      mission_name
      launch_date_local
      links {
        mission_patch_small
      }
    }
  }
`;

// Context
const LaunchesContext = createContext();

// Custom hook
const useLaunches = () => {
  const context = useContext(LaunchesContext);
  if (!context) {
    throw new Error('useLaunches must be used within a LaunchesProvider');
  }
  return context;
};

// Provider component
const LaunchesProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  const launches = useMemo(() => (data ? data.launchesPast : []), [data]);

  const value = useMemo(() => ({ launches, loading, error }), [launches, loading, error]);

  return (
    <LaunchesContext.Provider value={value}>
      {children}
    </LaunchesContext.Provider>
  );
};

// LaunchCard component
const LaunchCard = ({ launch, isSelected }) => (
  <div style={{ 
    padding: '10px', 
    border: '1px solid #ccc', 
    margin: '5px', 
    backgroundColor: isSelected ? '#e6e6e6' : 'white' 
  }}>
    <img src={launch.links.mission_patch_small} alt={launch.mission_name} style={{ width: 50, height: 50 }} />
    <h3>{launch.mission_name}</h3>
    <p>Launch Date: {new Date(launch.launch_date_local).toLocaleDateString()}</p>
  </div>
);

// Main component
const LaunchList = ({ open, title }) => {
  const { launches, loading, error } = useLaunches();

  if (!open) return null;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{title}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        launches.map((launch, index) => (
          <LaunchCard 
            key={launch.id} 
            isSelected={index === 0} 
            launch={launch} 
          />
        ))
      )}
    </div>
  );
};

// App component
const App = () => (
  <LaunchesProvider>
    <LaunchList open={true} title="SpaceX Launches" />
  </LaunchesProvider>
);

export default App;
