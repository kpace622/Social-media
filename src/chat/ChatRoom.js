import React, {useState, useRef} from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';
const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom() {

  const scrolling = useRef()

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue ] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')

    scrolling.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>

      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

        <div ref={scrolling}></div>
      </main>

      <form onSubmit={handleSubmit}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit'>Send Message</button>

      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img className='photo' src={photoURL} alt='user'/>
      <p>{text}</p>
    </div>
  )

}

export { ChatRoom, ChatMessage }