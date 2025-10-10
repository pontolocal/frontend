import React from 'react';
import type { Seller } from '../../types/Review'; 
import ProfileIcon from '../ui/ProfileIcon';


interface MerchantProfileProps {
  data: Seller;
}

const MerchantProfile: React.FC<MerchantProfileProps> = ({ data }) => {
  return (
    <div>
      <div className="flex items-center gap-6">
        
        <div className="flex-shrink-0">
          <ProfileIcon 
            photoUrl={data.photoUrl}
            initials={data.initials}
            authorName={data.name}
            size={223}
          />
        </div>
        <div className='ml-12'>
          <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
          
          <p className="text-sm text-gray-500 mt-1">{data.salesCount} vendas</p>
          
          <p className="text-base text-gray-700 my-4">
            {data.storeDescription}
          </p>
          
          <a 
            href={data.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gray-300 rounded-md px-6 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-colors"
          >
            Visitar site
          </a>
        </div>

      </div>
    </div>
  );
};

export default MerchantProfile;