import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface Message {
  user: {
    username: string;
  };
  text: string;
  timestamp: string;
}

interface MessageInputProps {
  onSendMessage: (message: Message) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage({
        user: {
          username: 'User',
        },
        text: message,
        timestamp: new Date().toISOString(),
      });
      setMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
      <TextField
        fullWidth
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;