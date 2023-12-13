import React from 'react';
import { Carousel } from './Carousel';
import Hero from './Hero';

const ArtistLoading: React.FC = () => {
   return (
      <div>
         <Hero />
         <Carousel />
      </div>
   );
};

export default ArtistLoading;
