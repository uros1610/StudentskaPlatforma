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
import { FaUser } from 'react-icons/fa'


function Chat() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([{ sender: 'bot', text: 'Zdravo! Kako Vam mogu pomoći?' }]);
    const [suggestions, setSuggestions] = useState([
        'Koliko bodova imam iz predmeta [predmet]?',
        'Koji su dostupni materijali za predmet [predmet]?',
        'Koje predmete pohađam?',
        'Svi predmeti koje predaje profesor [profesor]?',
        'Izlistaj mi sva nepročitana obavještenja.'
    ]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [chat]);

    const sendMessage = async () => {
        if (message.trim() === '') return; 

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
            <div id="bigdiv">
                <div ref={chatContainerRef} id="mess-div"  style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', marginTop: '15px', position: 'relative' }}>
                    <div id="nevidljivi" style={{ position: 'absolute', bottom: 0, width: '100%' }}></div>
                    {chat.map((message, index) => (
                        <div key={index} className={message.sender === 'user' ? 'user' : 'bot'} style={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                            <p className={message.sender === 'bot' ? 'bot' : ''}
                            style={{
                                maxWidth: '80%',
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                margin: '5px',
                                padding: '10px',
                                borderRadius: '5px',
                                backgroundColor: message.sender === 'bot' ? '#0f75bd' : '#f7941d',
                                color: message.sender === 'bot' ? '#fff' : '#fff'
                                }}>
                                {message.sender === 'user' ? <FaUser /> : <FontAwesomeIcon icon={faRobot} />}
                                <span>  </span>{message.text}
                            </p>
                        </div>
                    ))}
                </div>
                <div id="neki-div">
                    {suggestions.map((suggestion, index) => (
                        <button key={index} onClick={() => handleSuggestionClick(suggestion)} className="btns">
                            {suggestion}
                        </button>
                    ))}
                </div>
                <div id="pom-div">
                    <textarea
                        rows={1}
                        cols={50}
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Pošaljite pitanje..."
                        id="text-area"
                    />
                    <button onClick={sendMessage} id="sendbtn">Pošalji</button>
                </div>
            </div>
        </main>
    );
  }

export default Chat;