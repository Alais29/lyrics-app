import React, { useState, useEffect } from 'react'
import Formulario from "./components/Formulario";
import Cancion from './components/Cancion';
import Info from './components/Info';
import axios from 'axios'

function App() {
  const [busquedaLetra, guardarBusquedaLetra] = useState({})
  const [letra, guardarLetra] = useState('')
  const [info, guardarInfo] = useState({})

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return

    const consutlarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ])

      guardarLetra(letra.data.lyrics)
      guardarInfo(informacion.data.artists[0])
    }
    consutlarApiLetra()
  }, [busquedaLetra])

  return (
    <>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
