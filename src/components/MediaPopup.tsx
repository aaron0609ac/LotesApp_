import React from 'react';
import { IonModal, IonContent, IonButton } from '@ionic/react';

interface MediaPopupProps {
  isOpen: boolean;
  onClose: () => void;
  mediaType: 'image' | 'video';
  mediaSrc: string;
}

const MediaPopup: React.FC<MediaPopupProps> = ({ isOpen, onClose, mediaType, mediaSrc }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent>
        {mediaType === 'image' ? (
          <img src={mediaSrc} alt="Image" />
        ) : mediaType === 'video' ? (
          <video controls>
            <source src={mediaSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
        <IonButton expand="full" onClick={onClose}>Cerrar</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default MediaPopup;
