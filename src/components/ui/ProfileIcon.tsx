import React from 'react';
import Avatar from '@mui/material/Avatar';

// 1. Definimos as props que o componente vai receber
interface ProfileIconProps {
  photoUrl?: string | null; // A URL da foto é opcional
  initials: string;        // As iniciais são obrigatórias para o caso de não haver foto
  authorName: string;      // O nome do autor para o atributo 'alt' da imagem
  size?: number;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ photoUrl, initials, authorName,size = 40}) => {
  
  if (photoUrl) {
    return (
      <Avatar 
        alt={authorName} 
        src={photoUrl} 
        sx={{ width: size, height: size }} 
      />
    );
  }
  return (
    <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full font-bold text-gray-600"
      style={{ width: size, height: size, fontSize: size / 2.5 }}
    >
      {initials}
    </div>
  );
};

export default ProfileIcon;