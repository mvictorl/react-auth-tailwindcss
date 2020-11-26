import React from 'react'
import './App.css'
import Auth from './components/Auth/Auth'
import UserProvider from './components/UserProvider/UserProvider';

function App() {
  return (
    <UserProvider>
      <Auth />
    </UserProvider>
  );
}

export default App