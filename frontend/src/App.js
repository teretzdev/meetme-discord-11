import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [scripts, setScripts] = useState([]);
  const [metrics, setMetrics] = useState({ messagesSent: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch initial data for scripts and metrics
    fetchScripts();
    fetchMetrics();
  }, []);

  const fetchScripts = async () => {
    try {
      const response = await fetch('/api/scripts');
      const data = await response.json();
      setScripts(data);
    } catch (error) {
      console.error('Error fetching scripts:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const handleScriptAction = async (scriptId, action) => {
    setLoading(true);
    try {
      await fetch(`/api/scripts/${scriptId}/${action}`, { method: 'POST' });
      fetchScripts();
      fetchMetrics();
    } catch (error) {
      console.error(`Error performing ${action} on script ${scriptId}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Script Manager Dashboard</h1>
      </header>
      <main>
        <section className="metrics">
          <h2>Metrics</h2>
          <p>Messages Sent: {metrics.messagesSent}</p>
        </section>
        <section className="scripts">
          <h2>Scripts</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {scripts.map((script) => (
                <li key={script.id}>
                  <span>{script.name}</span>
                  <button
                    onClick={() => handleScriptAction(script.id, 'start')}
                    disabled={script.status === 'running'}
                  >
                    Start
                  </button>
                  <button
                    onClick={() => handleScriptAction(script.id, 'stop')}
                    disabled={script.status !== 'running'}
                  >
                    Stop
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
