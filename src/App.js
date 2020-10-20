import React from 'react';
import './App.css';
import { firebase } from './firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { ChatRoom } from './chat/ChatRoom';
import { SignIn, SignOut } from './chat/SignIn';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className='app-header'>

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
      <SignOut />
    </div>
  );
}

export default App;
