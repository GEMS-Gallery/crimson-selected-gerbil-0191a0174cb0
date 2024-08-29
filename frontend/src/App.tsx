import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Paper, Typography, TextField, Button, List, ListItem, ListItemText, CircularProgress, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Message = {
  sender: string;
  content: string;
  timestamp: bigint;
};

type FormInputs = {
  message: string;
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('User A');
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const fetchMessages = async () => {
    const fetchedMessages = await backend.getMessages();
    setMessages(fetchedMessages);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    try {
      await backend.sendMessage(currentUser, data.message);
      await fetchMessages();
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <img src="https://images.unsplash.com/photo-1531986362435-16b427eb9c26?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5Njc3OTV8&ixlib=rb-4.0.3" alt="Chat header" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        </Box>
        <Typography variant="h4" gutterBottom>Simple Messaging App</Typography>
        <ToggleButtonGroup
          value={currentUser}
          exclusive
          onChange={(_, newUser) => setCurrentUser(newUser)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="User A">User A</ToggleButton>
          <ToggleButton value="User B">User B</ToggleButton>
        </ToggleButtonGroup>
        <List sx={{ height: '300px', overflowY: 'auto', bgcolor: 'background.paper', mb: 2 }}>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ 
              justifyContent: msg.sender === currentUser ? 'flex-end' : 'flex-start',
              '& .MuiListItemText-root': {
                bgcolor: msg.sender === currentUser ? '#3498db' : '#2ecc71',
                color: 'white',
                borderRadius: '10px',
                padding: '5px 10px',
                maxWidth: '70%',
              }
            }}>
              <ListItemText 
                primary={msg.content}
                secondary={`${msg.sender} - ${new Date(Number(msg.timestamp) / 1000000).toLocaleTimeString()}`}
              />
            </ListItem>
          ))}
        </List>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              {...register('message', { required: true })}
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              sx={{ mr: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              disabled={loading}
            >
              Send
            </Button>
          </Box>
        </form>
      </Paper>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        Header image by <a href="https://unsplash.com/photos/selective-focus-photography-of-turned-on-gold-iphone-6s-CB4z0uTFSYg" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </Typography>
    </Container>
  );
};

export default App;
