
// src/components/ItemDetail.tsx
import React,{useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonRow, IonGrid, IonCol } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader,IonItem,IonList,IonSelect,IonSelectOption,IonInput,IonIcon  } from '@ionic/react';
import { personCircle,arrowForward, refresh, trash, addCircleOutline } from 'ionicons/icons';
import { IonInputCustomEvent, InputInputEventDetail } from '@ionic/core';

interface ContainerProps {
  match?: string;
}


const FraccionamientoCoordenadas: React.FC<ContainerProps> = ({match}) => {
    const [inputData, setInputData] = useState([{ name: '', value: '' }]);
    const [info, setInfo] = useState<string>('');
  const handleInputChange = (index: number, e:any) => {
    const { name, value } = e.target;
    const updatedInputData = [...inputData];
    updatedInputData[index] = { ...updatedInputData[index], [name]: value };
    setInputData(updatedInputData);
  };

  const handleAddInput = () => {
    setInputData([...inputData, { name: '', value: '' }]);
  };

  const handleRemoveInput = (index: number) => {
    const updatedInputData = [...inputData];
    updatedInputData.splice(index, 1);
    setInputData(updatedInputData);
  };

  const handleSubmit = () => {
    // Send the inputData to your PHP server for saving
    fetch(`https://lotes.cocinasdalloway.com/components/colonias/addCoordenadas.php?id=${info}`, {
      method: 'POST',
      body: JSON.stringify(inputData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.status===200) {
           
             alert(data.message);
             window.location.reload();
           } else {
             alert('Error:' + data.message);
           }
      })
      .catch((error) => {
        // Handle errors
        alert('Error interno del servidor, detalle:'+error)
      });
  };
  const loadInfo = () => {
    const Parameters=JSON.stringify(match);
    const Parameters1=JSON.parse(Parameters);
    
      // Simulate loading data from an API based on the "id" URL parameter
      const id = Parameters1.params.id;
      // Replace this with your actual data fetching logic
      const fetchedInfo = id;
      console.log(fetchedInfo);
      setInfo(fetchedInfo);
  }
 useEffect(() => {
    loadInfo();
  }, [match]);

 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle del fraccionamiento </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        
      <IonCard>
      <IonCardHeader>
      {/*
      <IonCardTitle>ID:{IdLote}</IonCardTitle>
      <IonCardSubtitle>Nombre del Lote:{Nombre}</IonCardSubtitle>
      */}
      </IonCardHeader>
      <IonCardContent>
        
      <div>
      <IonGrid>
      {inputData.map((data, index) => (
        <div key={index}>
        <IonRow>
        <IonCol>
          <IonInput
          label={"Latitud "+(index+1)} labelPlacement="floating" fill="outline" placeholder={"Latitud del punto "+(index+1)}
            type="text"
            name="name"
            value={data.name}
            onIonInput={(e) => handleInputChange(index, e)}
          />
        </IonCol>
        <IonCol>
          <IonInput
          label={"Longitud "+(index+1)} labelPlacement="floating" fill="outline" placeholder={"Longitud del punto "+(index+1)}
            type="text"
            name="value"
            value={data.value}
            onIonInput={(e) => handleInputChange(index, e)}
          />
          </IonCol>
          <IonCol>
          <IonButton  color="danger" onClick={() => handleRemoveInput(index)}>
                      <IonIcon icon={trash} />
                    </IonButton>
          </IonCol>
          </IonRow>
        </div>
      ))}
      </IonGrid>
      <IonButton slot="end" color="secondary" onClick={handleAddInput}>
        <IonIcon slot="start" icon={addCircleOutline}></IonIcon>
        Agregar Coordenada
        </IonButton>
      <IonButton color="success" expand="block" shape="round" onClick={handleSubmit}>Enviar</IonButton>
    </div>
      </IonCardContent>
      <IonButton expand="block" routerLink="../Fraccionamientos" >Regresar</IonButton>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default FraccionamientoCoordenadas;
