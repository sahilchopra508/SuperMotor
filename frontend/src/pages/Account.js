import React from 'react';
import './Account.css';

const Account = ({ user }) => {
  return (
    <div className="account-container">
      <div className="account-title">Account Details</div>
      <div className="account-details">
        <div><b>Name:</b> {user.name}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Phone:</b> {user.phone}</div>
      </div>
    </div>
  );
};

export default Account; 