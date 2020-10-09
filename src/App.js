import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React from 'react';
import { Message } from './components/Message';

function App() {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    { username: 'Amelit', text: 'sup' },
    { username: 'Wallrunner', text: 'Hey glad to see ya' },
  ]);
  const [username, setUsername] = React.useState('');

  React.useEffect(() => {
    setUsername(prompt('Enter your name please'));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    //with the spread operator code will copy all the files from messages (shadow copy), after that interpreter
    //will replace username to what it will come from our useState username variable.
    //And the text variable interpreter will get from input because it's just a text with a string type of variable
    setMessages([...messages, { username: username, text: input }]);
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
