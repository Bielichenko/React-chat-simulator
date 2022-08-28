import React, { useState } from 'react';
import { useEffect } from 'react';

export const DialogSection = ({
  contactName,
  contactID,
  dialogMessages,
  setDialogMessages,
  setIsContactsVisible,
}) => {
  const [input, setInput] = useState('');

  function getRandomTime() {
    return 10000 + Math.random() * 5 * 1000;
  }

  function getSumOfSeconds(str) {
    const timeArray = str.split(':');
    return timeArray[0] * 60 * 60 + timeArray[1] * 60 + timeArray[2] * 1;
  }

  const emulateResponse = async () => {
    const newDate = new Date();
    const dateStringArray = newDate.toLocaleString().split(', ');

    let answerText;
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    await res.json().then(data => answerText = data.value);

    const newAnswer = {
      type: 'received',
      id: Math.random().toString(36).slice(2, 7),
      text: answerText,
      date: dateStringArray[0],
      time: dateStringArray[1],
      sumOfSec: getSumOfSeconds(dateStringArray[1]),
      monthName: newDate.toLocaleString('ukr', { month: 'long' }),
    }

    setDialogMessages((prev) => [...prev, newAnswer]);
  };

  const manageUserInput = (key) => {
    const newDate = new Date();
    const dateStringArray = newDate.toLocaleString().split(', ');

    if (key === 'Enter' && input.trim().length > 0) {
      const newMessage = {
        type: 'sent',
        id: Math.random().toString(36).slice(2, 7),
        text: input,
        date: dateStringArray[0],
        time: dateStringArray[1],
        sumOfSec: getSumOfSeconds(dateStringArray[1]),
        monthName: newDate.toLocaleString('ukr', { month: 'long' }),
      }
      setDialogMessages([...dialogMessages, newMessage]);
      setInput('');

      setTimeout(() => emulateResponse(), getRandomTime());
    }
  }

  useEffect(() => {
    localStorage.setItem(`messagesWith${contactID}`, JSON.stringify([...dialogMessages]));
  })

  return (
    <div className='dialogSection' >
      <div className='contactInfoSection mobileVersion'>
        <div className='imgContainer'>
          <img
            className='contactImg contactImg--main'
            src={require(`../../images/${contactID}.jpg`)}
            alt="contact-logo"
          />
          <img
            className='check'
            src={require(`../../images/check.png`)}
            alt="checkImg" />
        </div>
        <div className='contactName contactName--dialog'>{contactName}</div>
        <input
          className='navButton'
          type='image'
          src={require(`../../images/contacts.png`)}
          alt='кнопка'
          onClick={() => setIsContactsVisible(true)}></input>
      </div>
      <div className='messagesSection'>
        {dialogMessages.map(message => {
          return message.type === 'received'
            ? <div className='messageBox messageBox--received' key={message.id}>
              <img
                className='contactImg'
                src={require(`../../images/${contactID}.jpg`)}
                alt="contact-logo"
              />
              <div className='messageData'>
                <div className='messageText messageText--received'>{message.text}</div>
                <div className='messageTime'>{message.time.slice(0, 5) + ', ' + message.date}</div>
              </div>
            </div>
            : <div className='messageBox messageBox--sent' key={message.id}>
              <div className='messageData'>
                <div className='messageText messageText--sent'>{message.text}</div>
                <div className='messageTime'>{message.time.slice(0, 5) + ', ' + message.date}</div>
              </div>
            </div>
        })}
      </div>
      <div className='userInputSection'>
        <div className='userInputContainer'>
          <input
            className='userInput'
            type="text"
            value={input}
            placeholder='Type your message'
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => manageUserInput(e.key)}
          >
          </input>
          <input
            className='sendMessageIcon'
            type='image'
            src={require(`../../images/sendMessageIcon.jpg`)}
            alt='кнопка'
            onClick={() => manageUserInput('Enter')}
          >
          </input>
        </div>
      </div>
    </div>
  );
}
