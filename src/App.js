import './App.css'
import React from 'react';
import Header from './component/Header/Header';
import Invoice from './component/Invoice/Invoice';
import Footer from './component/Footer/Footer';
import { createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';


const GlobalStyle = createGlobalStyle`
  * {
    ::-webkit-scrollbar {
      width: 18px;
    }

    ::-webkit-scrollbar-track {
      background: grey; 
    }

    ::-webkit-scrollbar-thumb {
      background: #666; 
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #444; 
    }
  }
`;
function App() {
  return (
    <div className='main-container'>
      <Header/>
      <GlobalStyle />
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
      <Invoice/>
      <Footer/>

    </div>
  );
}

export default App;
