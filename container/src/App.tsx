import React, { Suspense, useState } from 'react';

const RemoteApp = React.lazy(() => import("SignalTransformer/remoteTransformer"));

interface RemoteProps {
  multiplier: number;
  onResult: (value: number) => void;
}

export default function App() {
  const [multiplier] = useState(777);
  const [finalResult, setFinalResult] = useState<number | null>(null);

  const handleResult = (value: number) => {
    setFinalResult(value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Signal Transformer MicroFE</h1>
        
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Container State</h2>
          <p style={styles.text}>Multiplier: <strong>{multiplier}</strong></p>
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Remote Component</h2>
          <Suspense fallback={<p style={styles.text}>Loading remote app...</p>}>
            <RemoteApp 
              multiplier={multiplier} 
              onResult={handleResult}
            />
          </Suspense>
        </div>

        <div style={styles.divider} />

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Result</h2>
          {finalResult !== null ? (
            <p style={styles.result}>
              Final Result: <strong>{finalResult}</strong>
            </p>
          ) : (
            <p style={styles.text}>No result yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: '#f5f5f5',
  },
  card: {
    background: 'white',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  text: {
    fontSize: '16px',
    color: '#555',
    margin: '8px 0',
  },
  result: {
    fontSize: '18px',
    color: '#27ae60',
    fontWeight: '600',
    padding: '12px',
    background: '#f0fdf4',
    borderLeft: '4px solid #27ae60',
    borderRadius: '4px',
  },
  divider: {
    height: '1px',
    background: '#eee',
    margin: '20px 0',
  },
};
