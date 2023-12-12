import React from 'react';
import { Carousel, Table } from './Carousel';

const SearchLoading: React.FC = () => {
   return (
      <div>
         <Carousel />
         <Table />
         <Carousel type="artist" />
      </div>
   );
};

export default SearchLoading;
