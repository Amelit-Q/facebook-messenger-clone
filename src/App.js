import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React from 'react';
import { Message } from './components/Message';
import { db } from './firebase';
import firebase from 'firebase';

function App() {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    //in this useEffect we only receive messages from our database that's it by using map
    db.collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
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
      <form>
        <FormControl>
          <InputLabel>Enter a message</InputLabel>
          <Input value={input} onChange={(event) => setInput(event.target.value)} />
          <Button
            disabled={!input}
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendMessage}>
            Send Message
          </Button>
        </FormControl>
      </form>
      {messages.map((message) => (
        <Message username={username} message={message} />
      ))}
    </div>
  );
}

export default App;
