import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';


const Timer = () => {
  const [segundos, setSegundos] = useState(0); //segundos es el estado y set es el metodo para cambiarlo
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador');
  const myRef = useRef(null);
  
  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value
    setSegundos(ref)
  }
  
  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    }
    if (activo && tipo === 'Cuenta Regresiva') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === 'Contador') {
      clearInterval(intervalo);
    }
    if (segundos === 0 && activo === 'Cuenta Regresiva') {
      setActivo();
      clearInterval(intervalo);
    }
    if (segundos === 0 && activo && tipo === 'Cuenta Regresiva') {
      //reset();

      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  return (
    <div className="app">
      <div className={!segundos && tipo === "Cuenta Regresiva" ? "animated flash time0" : "time" }>
        {segundos}s
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${activo ? 'active' : 'inactive'}`} onClick={toggle}>
          {activo ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button" onClick={cambioTipo}>
         {tipo}
      </button>
      {tipo === 'Cuenta Regresiva' && <input type="number" ref={myRef} onChange={agregaSegundos} placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
  
  function toggle() {
  setActivo(!activo);
  }
  function reset() {
    if ( tipo === 'Cuenta Regresiva'){
      agregaSegundos()
      setActivo(false)
    } else{
      setSegundos(0); 
      setActivo(false);}
  }
  function cambioTipo() {
    if(tipo === 'Contador') setTipo('Cuenta Regresiva')
    if(tipo === 'Cuenta Regresiva') setTipo('Contador')
  }
  
};


export default Timer;
