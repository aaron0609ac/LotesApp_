import React, { useState } from 'react';
import axios from 'axios';
import { IonSearchbar, IonModal, IonButton, IonList, IonItem, IonLabel, onIonChange } from '@ionic/react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://lotes.cocinasdalloway.com/components/clients/getAll2Select.php?term=${searchTerm}`);
      setResults(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <IonSearchbar
        value={searchTerm}
        onIonChange={(e) => {setSearchTerm(e.detail.value)}}
        onIonClear={() => setSearchTerm('')}
        placeholder="Search"
        debounce={500}
        onIonInput={() => handleSearch()}
      />
      <IonModal isOpen={showModal}>
        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        <IonList>
          {results.map((result) => (
            <IonItem key={result.id}>
              <IonLabel>{result.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonModal>
    </div>
  );
}

export default Search;
