// main page
"use client";
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerticalNavbar from '@/organizerMain_Components/Sidebar/page';
import Home from '@/organizerMain_Components/home/page';
import Event from '@/organizerMain_Components/Event/page';
const page = () => {
  const [content, setContent] = useState('home');

  const renderContent = () => {
    switch (content) {
      case 'home':
        return <Home/>;
      case 'Event':
        return <Event/>;
    //   case 'services':
    //     return <Schedule/>;
    //   case 'contact':
    //     return <div>Contact Content</div>;
     
    }
  };

  return (
    <div style={{ display: 'flex' }}>
    
     <VerticalNavbar onLinkClick={setContent}  />
   
      <Container className="content">
        {renderContent()}
      </Container>
    </div>
  );
};

export default page;
