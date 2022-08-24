import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames';

import { getMessagesFromServer } from './components/ServerEmulator';
import { SearchSection } from './components/SearchSection';
import { ChatsSection } from './components/ChatsSection';
import { DialogSection } from './components/DialogSection';

import './App.scss';
import './styles/mobileVersion.scss';

getMessagesFromServer()

export const App = () => {
  const [input, setInput] = useState('');
  const [allContacts, setContacts] = useState([]);
  const [isContactsVisible, setIsContactsVisible] = useState(true);


  useEffect(() => {
    if (allContacts[0]) {
      console.log(allContacts[0])
      console.log(allContacts[1])
      console.log(allContacts[2])
    }
  })

  console.log(isContactsVisible);

  return (
    <div className='App'>
      <div className={
        classNames({ visible: isContactsVisible }, {notVisible: !isContactsVisible}, {leftSide: true})
        }>
        <div className="fixedContainer">
          <SearchSection input={input} setInput={setInput} setIsContactsVisible={setIsContactsVisible}/>
          <ChatsSection searchQuery={input} setContacts={setContacts} setIsContactsVisible={setIsContactsVisible}/>
        </div>
      </div>

      <div className={
        classNames({ visible: !isContactsVisible }, {notVisible: isContactsVisible}, {rightSide: true})
        }>
        <Routes>
          <Route path="/" element={<p className='chooseContact'>Please, select a contact to start chatting!</p>} />
          {allContacts.map(contactObj => (
            <Route
              key={contactObj.id}
              path={contactObj.id}
              element={<DialogSection
                contactName={contactObj.name}
                contactID={contactObj.id}
                dialogMessages={contactObj.messages}
                setDialogMessages={contactObj.setDialogMessages}
                setIsContactsVisible={setIsContactsVisible}
              />}
            />
          ))}
        </Routes>
      </div>
    </div>
  )
}

export default App;
