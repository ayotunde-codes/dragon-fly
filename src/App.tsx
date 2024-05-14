



import FileUpload from './components/FileUpload';
import './App.css'


const App = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Dragonfly File Upload</h1>
      <FileUpload />
    </div>
  );
};

export default App;