import React, { useEffect } from 'react';
import { SelectedWork } from '../sections/SelectedWork';

export const WorkPage: React.FC = () => {
  useEffect(() => {
    document.title = 'ARAXYS — Selected Work';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-[#03040A]">
      <SelectedWork />
    </div>
  );
};

export default WorkPage;
