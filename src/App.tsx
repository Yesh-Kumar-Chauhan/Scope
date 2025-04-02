import './App.css';
import Layout from './components/layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <BrowserRouter>
          <ToastContainer />
          <Layout />
        </BrowserRouter>
    </>
  );
}

export default App;
