// src/components/AI.jsx
import './AI.css'; // מייבאים את קובץ העיצוב הנפרד
import { useState } from 'react';

const AI = ({ onExpenseAdded }) => {
    // סטייט לניהול הטקסט שהמשתמש מקליד
    const [message, setMessage] = useState('');
    
    // פונקציה שתופעל כשלוחצים על כפתור השליחה
    // TODO: הפוך את הפונקציה ל-async, הוסף try-catch,
    // והשתמש ב-fetch(..., {method: 'POST', body: ...}) כדי לשלוח לשרת
    const handleSend = async() => {
        if (message.trim() === '')return ;
        try{
            const response = await fetch('http://localhost:4000/api/ai/analyze',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({text:message})
            })
            if(response.ok){console.log('ההןדעה נשלחה בהצלחה');
                setMessage('');
                onExpenseAdded();
            }
        } 
        catch(error){
            console.error('error in ',error);
            
        }
            setMessage('')        
        // המשימה שלך: תכתוב כאן את הקוד האסינכרוני לשליחה לשרת!
        // אל תשכח לנקות את הסטייט setMessage('') בסוף
    };

    return (
        <div className="ai-chat-container">
            <h2>העוזר החכם שלך 🤖</h2>
            <p className="ai-subtitle">
                תגיד לי משהו כמו: "קניתי בסופר ב-250 שקל" או "קיבלתי משכורת 10,000 שקלים"
            </p>

            <div className="chat-input-row">
                <input
                    type="text"
                    value={message}
                    // מעדכן את הסטייט בכל הקלדה
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="תכתוב לי כאן..."
                    className="ai-input"
                />
                <button
                    onClick={handleSend}
                    className="ai-send-button"
                >
                    שלח
                </button>
            </div>
        </div>
    );
};

export default AI;