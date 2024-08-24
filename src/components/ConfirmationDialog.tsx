// src/components/ConfirmationDialog.tsx

import React from 'react';
import { IonAlert } from '@ionic/react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      header="Confirmacion"
      message="Estas seguro que deseas registrar el fraccionamiento?"
      buttons={[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: onCancel,
        },
        {
          text: 'Confirmar',
          handler: onConfirm,
        },
      ]}
    />
  );
};

export default ConfirmationDialog;
