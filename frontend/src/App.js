import React from 'react';
import ChatViewer from './components/ChatViewer';
import AIProcessor from './components/AIProcessor';
import HistoryViewer from './components/HistoryViewer';
import Controls from './components/Controls';

/**
 * Main App component that serves as the entry point for the GUI.
 * It includes navigation and renders other components.
 */
function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>MeetMe Chat Integration</h1>
            </header>
            <nav className="app-navigation">
                <ul>
                    <li><a href="#chat-viewer">Chat Viewer</a></li>
                    <li><a href="#ai-processor">AI Processor</a></li>
                    <li><a href="#history-viewer">History Viewer</a></li>
                </ul>
            </nav>
            <main className="app-main">
                <section id="chat-viewer">
                    <h2>Chat Viewer</h2>
                    <ChatViewer />
                </section>
                <section id="ai-processor">
                    <h2>AI Processor</h2>
                    <AIProcessor />
                </section>
                <section id="history-viewer">
                    <h2>History Viewer</h2>
                    <HistoryViewer />
                </section>
            </main>
            <footer className="app-footer">
                <Controls />
            </footer>
        </div>
    );
}

export default App;
