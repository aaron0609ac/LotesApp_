import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types"; // Importa prop-types
import { IonLabel } from "@ionic/react";

const FileUpload = ({ onUpload }) => {
  const acceptedFileTypes = ['image/*', 'video/*'];
  const onDrop = useCallback((acceptedFiles) => {
    // Realizar la carga de archivos aquí
    onUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <IonLabel>Clic para seleccionar archivos.</IonLabel>
    </div>
  );
};
FileUpload.propTypes = {
    onUpload: PropTypes.func.isRequired, // Define una validación de tipo para onUpload
    acceptedFiles: PropTypes.array,
  };
export default FileUpload;