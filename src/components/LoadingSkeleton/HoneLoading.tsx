import React from 'react';
import { Carousel } from './Carousel';
import { Table } from './Carousel';

const HoneLoading: React.FC = () => {
   return (
      <div className="pb-10">
         <Carousel />
         <Table />
         <Carousel type="artist" />
      </div>
   );
};

export default HoneLoading;
