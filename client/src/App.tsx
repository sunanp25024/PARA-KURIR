
import { DebugApp } from "./components/DebugApp";

const App = () => {
  console.log('App component rendering...');
  
  try {
    return <DebugApp />;
  } catch (error) {
    console.error('Error rendering App:', error);
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Rendering Error</h1>
          <p className="text-gray-700">Error: {String(error)}</p>
        </div>
      </div>
    );
  }
};

export default App;
