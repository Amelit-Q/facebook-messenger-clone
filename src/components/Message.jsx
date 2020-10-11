import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './Message.css';

export const Message = React.forwardRef(({ message, username }, ref) => {
  //введена новая переменная isUser, которая проверяет от кого идёт сообщение, в случае если оно
  //от того, кто залогинился, применяется другой CSS, для того чтобы отделить сообщение "своё", от сообщений других юзеров

  console.log(message);

  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message ${isUser && 'message__user'}`}>
      <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {message.username}: {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});
