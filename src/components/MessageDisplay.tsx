import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

interface Message {
  user: {
    username: string;
  };
  text: string;
  timestamp: string;
}

interface MessageDisplayProps {
  messages: Message[];
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={message.user.username}
              secondary={
                <Box>
                  <Typography>{message.text}</Typography>
                  <Typography variant="caption">{new Date(message.timestamp).toLocaleString()}</Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageDisplay;