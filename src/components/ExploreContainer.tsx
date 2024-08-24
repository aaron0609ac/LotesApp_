import React from 'react';
import './ExploreContainer.css';
import Lotes from './Lotes';
import Login from './Login';
import Clientes from './Clientes';
import Vendedores from './Vendedores';
import LoginBiometric from './LoginBiometric';
import VendedoresDetalle from './VendedoresDetalle';
import ClientesDetalle from './ClientesDetalle';
import LotesRegistro from './LotesRegistro';
import LoteDetalle from './LoteDetalle';
import LoteMap from './LoteMap';
import FraccionamientoMap from './FraccionamientoMap';
import Fraccionamientos from './Fraccionamientos';
import FraccionamientoDibujar from './FraccionamientoDibujar';
import Registro from './Registro';
interface ContainerProps {
  name: string;
  id?: string;
  idCl?: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, id, idCl  }) => {
  if(name==='Lotes'){
    return (
      <Lotes name={name} />
      );
  }else if(name==='LotesRegistro'){
    return (
      <LotesRegistro  />
      );
  }else if(name==='LoteDetalle'){
    return (
      <LoteDetalle match={id}  />
      );
  }else if(name==='LoteMap'){
    return (
      <LoteMap match={id}  />
      );
  }else if(name==='FraccionamientoDibujar'){
    return (
      <FraccionamientoDibujar match={id}  />
      );
  }else if(name==='Fraccionamientos'){
    return (
      <Fraccionamientos />
      );
  }else if(name==='FraccionamientoMap'){
    return (
      <FraccionamientoMap match={id}  />
      );
  }else if(name==='Login'){
    return (
      <Login  />
      );
  }else if(name==='Clientes'){
    return (
      <Clientes  />
      );
  }else if(name==='ClientesDetalle'){
    return (
      <ClientesDetalle match={idCl}  />
      );
  }else if(name==='Vendedores'){
    return (
      <Vendedores  />
      );
  }else if(name==='VendedoresDetalle'){
    return (
      <VendedoresDetalle match={id}  />
      );
  }
  else if(name==='LoginBiometric'){
    return (
      <LoginBiometric  />
      );
  }else if(name==='Registro'){
    return (
      <Registro  />
      );
  }else{
    return (
      <div className="container"><strong>No se encuentra opcion seleccionada</strong></div>
    );
  }
};

export default ExploreContainer;
