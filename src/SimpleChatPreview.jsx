import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Context
const PreviewMessagesContext = createContext();

// Custom hook
const usePreviewMessages = () => {
  const context = useContext(PreviewMessagesContext);
  if (!context) {
    throw new Error('usePreviewMessages must be used within a PreviewMessagesProvider');
  }
  return context;
};

// Provider component
const PreviewMessagesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chatSessions, setChatSessions] = useState([]);

  // Simulating API call to get channels
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        console.log('Fetching channels...');
        const response = await fetch('https://api.example.com/channels');
        console.log('Response received:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const sessions = data.map(channel => ({
          user: {
            id: channel.recipient.id.toString(),
            name: channel.recipient.full_name,
            imgSrc: channel.recipient.profilePicture,
            channel: channel.channelName,
          },
        }));
        
        setChatSessions(sessions);
      } catch (error) {
        console.error('Failed to fetch channels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannels();
  }, []);

  const value = useMemo(() => ({ chatSessions, isLoading }), [chatSessions, isLoading]);

  return (
    <PreviewMessagesContext.Provider value={value}>
      {children}
    </PreviewMessagesContext.Provider>
  );
};

// PreviewMessageCard component
const PreviewMessageCard = ({ user, isSelected }) => (
  <div style={{ 
    padding: '10px', 
    border: '1px solid #ccc', 
    margin: '5px', 
    backgroundColor: isSelected ? '#e6e6e6' : 'white' 
  }}>
    <img src={user.imgSrc} alt={user.name} style={{ width: 50, height: 50, borderRadius: '50%' }} />
    <h3>{user.name}</h3>
    <p>Channel: {user.channel}</p>
  </div>
);

// Main component
const PreviewMessages = ({ open, title }) => {
  const { chatSessions, isLoading } = usePreviewMessages();

  if (!open) return null;

  return (
    <div>
      <h2>{title}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        chatSessions.map((session, index) => (
          <PreviewMessageCard 
            key={session.user.id} 
            isSelected={index === 0} 
            {...session} 
          />
        ))
      )}
    </div>
  );
};

// App component
const App = () => (
  <PreviewMessagesProvider>
    <PreviewMessages open={true} title="Chat Preview" />
  </PreviewMessagesProvider>
);

export default App;
