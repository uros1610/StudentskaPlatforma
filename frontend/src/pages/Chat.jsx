import React from "react";
import { useState } from "react";
import "../styles/chat.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import AuthContext from '../context/AuthContext'
import { useContext } from "react";

function Chat() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [suggestions, setSuggestions] = useState([
        'Zdravo!',
        'Koliko bodova imam iz predmeta [predmet]?',
        'Koji su dostupni materijali za predmet [predmet]?',
        'Koje predmete pohađam?',
        'Svi predmeti koje predaje profesor [profesor]?'
    ]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [chat]);

    const sendMessage = async () => {
        if (message.trim() === '') return; // Check for empty message

        const userMessage = { sender: 'user', text: message };
        setChat(prevChat => [...prevChat, userMessage]);

        try {
            const response = await axios.post(`/chat/${user.korisnickoIme}`, { prompt: message });
            const botMessage = { sender: 'bot', text: response.data.reply };
            setChat(prevChat => [...prevChat, botMessage]);
        } catch (error) {
            console.error('Došlo je do greške pri slanju poruke:', error);
            const errorMessage = { sender: 'bot', text: 'Došlo je do greške. Pokušajte ponovo kasnije.' };
            setChat(prevChat => [...prevChat, errorMessage]);
        }

        setMessage('');
    };

    const handleSuggestionClick = (suggestion) => {
        setMessage(suggestion);
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <main id="chat-body">
            <div id="chat-title">
                <FontAwesomeIcon icon={faRobot} className="home-icons" />
                <h1>Chat</h1>
            </div>
            <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginBlock: '30px' }}>
            <div id="chat-title">
                <FontAwesomeIcon icon={faRobot} className="home-icons" />
                <h1>Chat</h1>
            </div>
            <div ref={chatContainerRef} style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', marginTop: '15px', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%' }}></div>
                {chat.map((message, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                    <p style={{
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                    margin: '5px',
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: message.sender === 'bot' ? '#F4B392' : '#F4B392',
                    color: message.sender === 'bot' ? '#000' : '#fff'
                    }}>
                    {message.sender === 'user' ? 'Korisnik: ' : 'Bot: '}
                    {message.text}
                    </p>
                </div>
                ))}
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                {suggestions.map((suggestion, index) => (
                <button key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ marginRight: '10px', marginBottom: '10px'}}>
                    {suggestion}
                </button>
                ))}
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <textarea
                rows={1}
                cols={50}
                value={message}
                onChange={handleInputChange}
                placeholder="Napišite vaš upit ovdje..."
                style={{ width: '100%', padding: '5px', borderRadius: '5px', resize: 'none' }}
                />
                <button onClick={sendMessage} style={{ padding: '10px 20px', backgroundColor: '#F4B392', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Pošalji upit</button>
            </div>
            </div>
        </main>
    );
  }

export default Chat;