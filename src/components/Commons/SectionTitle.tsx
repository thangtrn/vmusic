import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import { Link, To } from 'react-router-dom';

interface SectionTitleProps {
   title?: string;
   link?: To;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, link }) => {
   return (
      <h3 className="mb-5 fx-between text-xl font-bold capitalize">
         {title}
         {link && (
            <Link
               to={link}
               className="fy-center text-xs font-medium uppercase text-navigation-color hover:text-hover-color"
            >
               Tất cả <ArrowRight2 size={16} className="ml-[6px]" />
            </Link>
         )}
      </h3>
   );
};

export default SectionTitle;
