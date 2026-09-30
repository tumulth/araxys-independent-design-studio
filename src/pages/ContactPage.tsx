import React, { useEffect } from 'react';
import { ContactSection } from '../sections/ContactSection';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'ARAXYS — Contact';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#03040A]">
      <ContactSection isStandalonePage={true} />
    </div>
  );
};

export default ContactPage;
