import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const Header = ({ user }) => {
  // If avatar is a relative path, prepend API_URL
  const avatarSrc = user.avatar
    ? user.avatar.startsWith('http')
      ? user.avatar
      : `${API_URL}${user.avatar}`
    : "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name);

  return (
    <header className="bg-white shadow-sm">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <img
              src={avatarSrc}
              alt={user.name}
              className="rounded-circle"
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <h1 className="h5 mb-0">Welcome back, {user.name}</h1>
              <p className="text-muted small mb-0">Let's manage your finances</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;