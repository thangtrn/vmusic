import React from 'react';
import { Line } from '../Commons';
import { convertDateTime } from '~/helpers';

interface CommentItemProps {
   data: IComment;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
   return (
      <div className="flex">
         <div className="w-10 h-10 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
            <img className="h-9 w-9 rounded-full object-cover" src={data?.imageUser} alt="" />
         </div>

         <div className="ml-2 text-sm">
            <div className="fy-center">
               <span className="font-medium text-title-color">{data?.username}</span>
               <Line type="vertical" className="mx-2" />
               <span className="text-subtitle-color text-xs">
                  {convertDateTime(data?.createdAt)}
               </span>
            </div>
            <p className="text-subtitle-color">{data?.content}</p>
         </div>
      </div>
   );
};

export default CommentItem;
