import React, { useState } from 'react';

interface SignalTransformerProps {
  multiplier: number;
  onResult: (value: number) => void;
  onClear: () => void;
}

export default function SignalTransformer({ multiplier, onResult, onClear }: SignalTransformerProps) {
  const [inputValue, setInputValue] = useState('');
  const [hasTransformed, setHasTransformed] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (hasTransformed) {
      onClear();
      setHasTransformed(false);
    }

    if (value.trim() === "" || !value.match(/^-?\d*\.?\d*$/) || isNaN(parseFloat(value))) {
      setInputValue("0");
      onClear();
    }
  };

  const handleTransform = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      const result = num * multiplier;
      onResult(result);
      setHasTransformed(true);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputGroup}>
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a number"
          style={styles.input}
          onKeyPress={(e) => e.key === 'Enter' && handleTransform()}
        />
      </div>
      <button
        onClick={handleTransform}
        style={styles.button}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background = '#2980b9';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = '#3498db';
        }}
      >
        Transform
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  },
  inputGroup: {
    flex: 1,
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: 'inherit',
  },
  button: {
    padding: '10px 24px',
    fontSize: '16px',
    fontWeight: '600',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};
