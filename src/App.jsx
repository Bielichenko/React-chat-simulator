import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import classNames from 'classnames';

import { getMessagesFromServer } from './components/ServerEmulator';
import { SearchSection } from './components/SearchSection/SearchSection';
import { ChatsSection } from './components/ChatsSection/ChatsSection';
import { DialogSection } from './components/DialogSection/DialogSection';

import './App.scss';
import './styles/mobileVersion.scss';

getMessagesFromServer()

export const App = () => {
  const [input, setInput] = useState('');
  const [allContacts, setContacts] = useState([]);
  const [isContactsVisible, setIsContactsVisible] = useState(true);
  const [userName, setUserName] = useState(JSON.parse(`${localStorage.getItem('userName')}`));
  const [userImg, setUserImg] = useState(JSON.parse(`${localStorage.getItem('userImg')}`));


  useEffect(() => {
    localStorage.setItem(`userName`, JSON.stringify(userName));
    localStorage.setItem(`userImg`, JSON.stringify(userImg));
  }, [userName, userImg])

  useEffect(() => {
    window.gapi.load('auth2', function () {
      window.gapi.auth2.init({
        client_id: '235288329074-kofj294dbe4us1g46u0lvqjbvajj5p99', plugin_name: "chat",
      }).then(() => console.log('init ok'), () => console.log('init err'))
    })
  }, [])

  const signIn = () => {
    const _authOk = googleUser => {
      setUserName(googleUser.getBasicProfile().getName());
      setUserImg(googleUser.getBasicProfile().getImageUrl());
      console.log(googleUser.getBasicProfile().getImageUrl());
    };
    const _authErr = () => console.log('auth err');

    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    GoogleAuth.signIn({
      scope: 'profile email',
    }).then(_authOk, _authErr);
  }

  return (
    <div className='App'>

      {!userName
        ? <button className='loginButton' onClick={() => signIn()}>
          {<GoogleLogin
            buttonText="Login with Google"
          />}
        </button>
        : <>
          <div className={
            classNames(
              { visible: isContactsVisible },
              { notVisible: !isContactsVisible },
              { leftSide: true },
            )
          }>
            <div className="fixedContainer">
              <SearchSection
                userName={userName}
                userImg={userImg}
                input={input}
                setInput={setInput}
                setIsContactsVisible={setIsContactsVisible}
              />
              <ChatsSection
                searchQuery={input}
                setContacts={setContacts}
                setIsContactsVisible={setIsContactsVisible}
              />
            </div>
          </div>

          <div className={
            classNames(
              { visible: !isContactsVisible },
              { notVisible: isContactsVisible },
              { rightSide: true },
            )
          }>
            <Routes>
              <Route
                path="/"
                element={<p className='chooseContact'>Please, select a contact to start chatting!</p>}
              />
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
        </>
      }
    </div>
  );
}

export default App;
