import React, { Component } from 'react';
import Buscador from './componentes1/Buscador';
import Resultado from './componentes1/Resultado';
import { MoviesGrid } from './MoviesGrid';
import styles from "./MoviesGrid.module.css";

class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : ''
  }

  scroll = () => {
    const elemento = document.querySelector(".jumbotron");
    elemento.scrollIntoView("smooth", "start");
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;

    if(pagina === 1) return null;

    pagina -= 1;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    // console.log(pagina);
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;

    pagina += 1;

    this.setState({
      pagina
    }, () =>{
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina);
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = 'https://pixabay.com/api/?key=37771374-a4457e108b8c145042202e31a&q=&{termino}&per_page=30&page=${pagina}';
    
    console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json() )
      .then(resultado => this.setState({ imagenes : resultado.hits }) )
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }
  render() {
    return (
      <div className="app container">
        <div className='jumbotron'>
          <p className='lead text-center'>ESCUELA SUPERIOR POLITÉCNICA DE CHIMBORAZO</p>
          <p className='lead text-center'>Carrera de Software</p>
          <p className='lead text-center'>Buscador de Imágenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          /> 
        </div>
        <div className="row justify-content-center">
          <Resultado 
              imagenes={this.state.imagenes}
              paginaAnterior={this.paginaAnterior}
              paginaSiguiente={this.paginaSiguiente}
            />
        </div>
        <main>
          <MoviesGrid />
        </main>

      </div>
    );
  }
}

export default App;
