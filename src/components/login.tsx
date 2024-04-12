import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, TextField, Button, CircularProgress, Grid, Card, CardContent, Avatar, Divider } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import BranchIcon from './icons';
import BranchDetails from './branchDetails';

const theme = createTheme();

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log(data.token);
        window.location.href = '/rooms';
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          <Button variant="contained" href="/register">
            Register
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

interface RoomsPageProps {}


const RoomsPage: React.FC<RoomsPageProps> = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const connectToSocket = () => {
      const token = localStorage.getItem('token');
      const newSocket = io('http://localhost:3000', {
        extraHeaders: {
          authorization: `${token}`,
        },
      });
      setSocket(newSocket);
      newSocket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });
      newSocket.on('rooms', (data) => {
        console.log(data);
        setRooms(data.items);
      });
      newSocket.on('messages', (data) => {
        setMessages(data.items);
      });
      newSocket.on('messageAdded', (message) => {
        setMessages((prevMessages) => {
          if (!prevMessages.some((m) => m.id === message.id)) {
            return [message, ...prevMessages];
          }
          return prevMessages;
        });
      });
    };

    connectToSocket();
  }, []);

  const joinRoom = (roomId: number) => {
    setCurrentRoomId(roomId);
    socket?.emit('joinRoom', roomId);
  };

  const sendMessage = () => {
    if (currentRoomId && newMessage.trim()) {
      socket?.emit('addMessage', { text: newMessage, roomId: currentRoomId });
      setNewMessage('');
    }
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4">Rooms</Typography>
        {rooms.map((room) => (
          <Box key={room.id}>
            <Typography variant="h6">{room.name} {room.id}</Typography>
            <Button variant="contained" onClick={() => joinRoom(room.id)}>
              Join Room
            </Button>
          </Box>
        ))}
      </Box>
      <Box>
        <Typography variant="h4">Messages</Typography>
        {messages.slice(0, 10).reverse().map((message) => (
          <Box key={message.id}>
            <Typography variant="body1">
              {new Date(message.created_at).toLocaleString('tr-TR', { month: 'short', day: 'numeric', year: 'numeric' })}  {new Date(message.created_at).toLocaleTimeString('tr-TR',{ hour: '2-digit', minute: '2-digit', hour12: false })}  {message.user.name}: {message.text}</Typography>
          </Box>
        ))}
      </Box>
      <Box>
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
        />
        <Button variant="contained" 
        onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, email:email, password:password }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = '/login';
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            onClick={handleRegister}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};
interface Branch {
  id: string;
  name: string;
  createdOn: string;
  email: string;
  phone: string;
  fax: string;
  address: string;
}

interface BranchProps {
  branch: Branch;
}
const branches: Branch[] = [
  {
    id: '1234',
    name: 'Merkez Şube',
    createdOn: '20.08.2024',
    email: 'merkez@company.com',
    phone: '7777777',
    fax: '7777777',
    address: 'Alanya/ANTALYA, Atatürk Caddesi'
  },
  {
    id: '1234',
    name: 'Merkez Şube',
    createdOn: '20.08.2024',
    email: 'merkez@company.com',
    phone: '7777777',
    fax: '7777777',
    address: 'Alanya/ANTALYA, Atatürk Caddesi'
  },
  {
    id: '1234',
    name: 'Merkez Şube',
    createdOn: '20.08.2024',
    email: 'merkez@company.com',
    phone: '7777777',
    fax: '7777777',
    address: 'Alanya/ANTALYA, Atatürk Caddesi'
  },
  {
    id: '1234',
    name: 'Merkez Şube',
    createdOn: '20.08.2024',
    email: 'merkez@company.com',
    phone: '7777777',
    fax: '7777777',
    address: 'Alanya/ANTALYA, Atatürk Caddesi'
  },
  {
    id: '1234',
    name: 'Merkez Şube',
    createdOn: '20.08.2024',
    email: 'merkez@company.com',
    phone: '7777777',
    fax: '7777777',
    address: 'Alanya/ANTALYA, Atatürk Caddesi'
  },
  {
    id: '1234',
    name: 'Merkez Şube',
    createdOn: '20.08.2024',
    email: 'merkez@company.com',
    phone: '7777777',
    fax: '7777777',
    address: 'Alanya/ANTALYA, Atatürk Caddesi'
  },
  
];

const BranchCard: React.FC<BranchProps> = ({ branch }) => {
  const linkTo = `/branch/${branch.id}`;
  return (
    <Link to={linkTo} style={{textDecoration:'none'}}>
    <Card sx={{maxWidth:300,borderRadius:4}}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            variant="square"
            sx={{
              backgroundColor: randomColor(),
              
              width: 55,
              height: 55,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              mr: 2,
            }}
          >
          <BranchIcon fontSize='large'/>
            
          </Avatar>
          <Box>
            <Typography variant="h6" gutterBottom>
              {branch.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Oluşturulma Tarihi: <br/> {branch.createdOn}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="body2" ml={1}>
            <span style={{color:'black'}}>İletişim No:</span>
            <span style={{color:'GrayText',marginLeft:10}}>{branch.phone}</span>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="body2" ml={1}>
            <span style={{color:'black'}}>Mail Adresi:</span>
            <span style={{color:'GrayText',marginLeft:10}}>{branch.email}</span>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="body2" ml={1}>
            <span style={{color:'black'}}>Fax:</span>
            <span style={{color:'GrayText',marginLeft:10}}>{branch.fax}</span>
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center">
          <Typography variant="body2" ml={1}>
            <span style={{color:'black'}}>Adres:</span>
            <span style={{color:'GrayText', marginLeft:10}}>{branch.address}</span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
    </Link>
  );
};

const BranchList: React.FC = () => {
 const [branchess, setBranches] = useState<Branch[]>([]);
 useEffect(() => {
    //
   setBranches(branches);
  }, []);


  return (
    <Grid container spacing={2} margin={2}>
      {branches.map((branch, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <BranchCard branch={branch} />
        </Grid>
      ))}
    </Grid>
  );
};

function randomColor() {
  let hex = Math.floor(Math.random() * 0xFFFFFF);
  let color = "#" + hex.toString(16);

  return color;
}

interface AppProps {}

const AppChat: React.FC<AppProps> = () => {
  const token = localStorage.getItem('token');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/rooms"
            element={token ? <RoomsPage /> : <Navigate to="/login"/>}
          />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/branch" element={<BranchList/>} />
          <Route path="/branch/:id" element={<BranchDetails/>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default AppChat;