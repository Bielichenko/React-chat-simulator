/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


export const ChatsSection = ({ searchQuery, setContacts, setIsContactsVisible }) => {
  const [dialogMessages1, setDialogMessages1] = useState(JSON.parse(`${localStorage.getItem('messagesWith1')}`));
  const [dialogMessages2, setDialogMessages2] = useState(JSON.parse(`${localStorage.getItem('messagesWith2')}`));
  const [dialogMessages3, setDialogMessages3] = useState(JSON.parse(`${localStorage.getItem('messagesWith3')}`));

  const allContacts = [
    { id: '1', name: "Oleksandr Usyk", messages: dialogMessages1, setDialogMessages: setDialogMessages1 },
    { id: '2', name: "Joseph Biden", messages: dialogMessages2, setDialogMessages: setDialogMessages2 },
    { id: '3', name: "Lana Rhodes", messages: dialogMessages3, setDialogMessages: setDialogMessages3 },
  ];

  useEffect(() => {
    localStorage.setItem('messagesWith1', JSON.stringify([...dialogMessages1]));
    setContacts(allContacts);
  }, [dialogMessages1])

  useEffect(() => {
    localStorage.setItem('messagesWith2', JSON.stringify([...dialogMessages2]));
    setContacts(allContacts);
  }, [dialogMessages2])

  useEffect(() => {
    localStorage.setItem('messagesWith3', JSON.stringify([...dialogMessages3]));
    setContacts(allContacts);
  }, [dialogMessages3])

  function getLastMessage(contactObj) {
    return contactObj.messages[contactObj.messages.length - 1];
  }

  function isThisDayIsToday(messageDate) {
    const currentDate = new Date().toLocaleString().split(', ')[0];
    return messageDate === currentDate;
  }

  allContacts.sort((contactX, contactY) => {
    if (contactX.messages.length && contactY.messages.length) {
      if (+getLastMessage(contactY).date.slice(0, 2) - +getLastMessage(contactX).date.slice(0, 2) > 0) {
        return 1;
      }
      if (+getLastMessage(contactY).date.slice(0, 2) - +getLastMessage(contactX).date.slice(0, 2) < 0) {
        return -1;
      }
      return getLastMessage(contactY).sumOfSec - getLastMessage(contactX).sumOfSec;
    }
    if (contactX.messages.length) {
      return -1;
    }
    return 1;
  })

  return (
      <div className='chatsSection '>
        <p className='chatsTitle'>Chats</p>
        {allContacts.map(contactObj => (
          <NavLink
            className='contactLink'
            to={contactObj.id}
            key={contactObj.id}
            onClick={() => {setIsContactsVisible(false  )}}
          >
            <div >
              {contactObj.name.toLowerCase().includes(searchQuery.toLowerCase()) || contactObj.messages
                .find(messageObj => {
                  if (messageObj) {
                    return messageObj.text.toLowerCase().includes(searchQuery.toLowerCase())
                  } else {
                    return false;
                  }
                })
                ?
                <div className='contactBox'>
                  <div className='imgContainer'>
                    <img
                      className='contactImg contactImg--main contactImg--main--contacts'
                      src={require(`../images/${contactObj.id}.jpg`)}
                      alt=""
                    />
                    <img
                      className='check'
                      src={require(`../images/check.png`)} alt="checkImg" />
                  </div>

                  <div className='contactData'>
                    <div className='contactName'>{contactObj.name}</div>
                    {contactObj.messages.length > 0
                      ? <div className='lastMessageText'>
                        {getLastMessage(contactObj).text}
                      </div>
                      : null}
                  </div>
                  {contactObj.messages.length > 0
                    ? <div className='lastMessageTime'>
                      {isThisDayIsToday(getLastMessage(contactObj).date)
                        ? getLastMessage(contactObj).time.slice(0, 5)
                        : getLastMessage(contactObj).monthName.slice(0, 4) + ' '
                        + getLastMessage(contactObj).date.slice(0, 2) + ', '
                        + getLastMessage(contactObj).date.slice(-4)
                      }
                    </div>
                    : null}
                </div>
                : null}
            </div>
          </NavLink>
        ))}
      </div>
  )
}