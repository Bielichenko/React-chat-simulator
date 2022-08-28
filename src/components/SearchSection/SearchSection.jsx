import React from 'react';

export const SearchSection = ({
  userName,
  userImg,
  input,
  setInput,
}) => (
  <div className='searchSection'>
    <div className="userInfoSection">
      <div className='imgContainer imgContainer--user'>
        <img
          src={userImg}
          alt="user-logo"
          className='contactImg contactImg--main contactImg--user'
        />
        <img
          className='check'
          src={require(`../../images/check.png`)}
          alt="checkImg" />
      </div>
      <p>{userName}</p>
    </div>
    <div className='searchContainer'>
      <input
        className='searchInput'
        placeholder='Search a contact or message'
        type="text"
        value={input}
        onChange={(e) => (setInput(e.target.value))}
      />
      <img
        className='findIcon'
        src={require(`../../images/find.png`)}
        alt="checkImg" />
    </div>
  </div >
);
