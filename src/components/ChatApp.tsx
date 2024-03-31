import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
  senderId: number;
  message: string;
}

const ChatApp: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number>(1);
  const [chatRecipientId, setChatRecipientId] = useState<number>(2);

  useEffect(() => {
    const newSocket = io('ws://localhost:3000'); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      newSocket.emit('joinPrivateChat', { recipientId: chatRecipientId });
    });

    newSocket.on('newPrivateMessage', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatRecipientId]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && socket) {
      socket.emit('sendPrivateMessage', {
        recipientId: chatRecipientId,
        content: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        {messages.map((message, index) => (
          <div key={index}>
            {message.senderId === currentUserId ? 'You: ' : 'Recipient: '}
            {message.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;