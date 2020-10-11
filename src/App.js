import { FormControl, Input, InputLabel } from '@material-ui/core';
import React from 'react';
import { Message } from './components/Message';
import { db } from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import './App.css';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    //in this useEffect we only receive messages from our database that's it by using map
    db.collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() })));
      });
  }, []);

  React.useEffect(() => {
    setUsername(prompt('Enter your name please'));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  return (
    <div>
      <h2>Welcome {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter a message</InputLabel>
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendMessage}>
            <SendSharpIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
