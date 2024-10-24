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
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = [
        { recipient: { id: 1, full_name: 'John Doe', profilePicture: 'john.jpg' }, channelName: 'channel1' },
        { recipient: { id: 2, full_name: 'Jane Smith', profilePicture: 'jane.jpg' }, channelName: 'channel2' },
      ];
      
      const sessions = mockData.map(channel => ({
        user: {
          id: channel.recipient.id.toString(),
          name: channel.recipient.full_name,
          imgSrc: channel.recipient.profilePicture,
          channel: channel.channelName,
        },
      }));
      
      setChatSessions(sessions);
      setIsLoading(false);
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
