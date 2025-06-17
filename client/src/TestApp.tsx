import React from 'react';

const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>INSAN Mobile - Test Page</h1>
      <p>If you can see this, the React app is working correctly.</p>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  );
};

export default TestApp;