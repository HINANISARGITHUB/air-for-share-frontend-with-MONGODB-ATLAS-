import { useState, useEffect } from 'react';
import axios from 'axios';

// IMPORTANT: Yahan deployment ke baad backend ka URL aayega
const API_URL = "https://air-for-share-backend-with-mongodb.vercel.app";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setText(res.data.text || "");
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      await axios.post(`${API_URL}/save`, { text });

      setMessage("Saved Successfully!");

      setTimeout(() => {
        setMessage("");
      }, 2000);

    } catch (err) {
      console.log("Save Error:", err);
      setMessage("Error Saving Data");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Private Share App</h1>

        <p style={styles.subtitle}>
          Same WiFi/IP wale users data share kar sakte hain
        </p>

        <textarea
          style={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Kuch type karein..."
        />

        <button
          onClick={handleSave}
          disabled={loading}
          style={
            loading
              ? { ...styles.button, opacity: 0.7 }
              : styles.button
          }
        >
          {loading ? "Saving..." : "Save / Sync"}
        </button>

        {message && <p style={styles.msg}>{message}</p>}

        <p style={styles.footer}>
          Expires in 30 minutes of inactivity
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial'
  },

  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'center'
  },

  title: {
    color: '#1a73e8',
    marginBottom: '10px'
  },

  subtitle: {
    color: '#5f6368',
    fontSize: '14px',
    marginBottom: '20px'
  },

  textarea: {
    width: '100%',
    height: '150px',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  },

  button: {
    width: '100%',
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },

  msg: {
    marginTop: '10px',
    color: '#28a745',
    fontWeight: '500'
  },

  footer: {
    marginTop: '20px',
    fontSize: '11px',
    color: '#999'
  }
};

export default App;