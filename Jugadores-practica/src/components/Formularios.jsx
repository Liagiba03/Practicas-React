import React, { useState } from 'react'
import shortid from 'shortid';
import Swal from 'sweetalert2';

export const Formularios = () => {

    const [nombre, setNombre] = useState('');
    const [equipoActual, setEquipo] = useState('');
    const [costo, setCosto] = useState('');
    const [listaJugadores, setListaJugadores] = useState([]);
    const [btnEdit , setBtnEdit] = useState(false);
    const [id, setId] = useState('');

    const editarJugador =(objJugador) =>{
      setBtnEdit(true);
      console.log(objJugador);
      //alert('edir')
      setNombre(objJugador.noJugador);
      setCosto(objJugador.costo);
      setEquipo(objJugador.equipo);
      setId(objJugador.id)

    }

    const editarJugadorOK =(evt) =>{
      evt.preventDefault();
      //Para actualizar tambien se necesita un hook para el id del jugador
      //lo declaramos con los otros estados de jugador
      //validamos que no permita editar con valores vacios

      if(!nombre.trim()){
        Swal.fire({
            icon: "error",
            title: "Debe ingresar el nombre",
            width: 600,
            padding: "3em",
            color: "#716add",
            
          });
        return;
    }
    if(!equipoActual.trim()){
        Swal.fire({
            icon: "error",
            title: "Debe ingresar el equipo actual",
            width: 600,
            padding: "3em",
            color: "#716add",
            
          });
        return;
    }
    if(!costo.trim()){
        Swal.fire({
            icon: "error",
            title: "Debe ingresar el costo",
            width: 600,
            padding: "3em",
            color: "#716add",
            
          });
        //alert("Debe ingresar el costo")
        return;
    }

    Swal.fire({
      title: "Seguro?",
      text: "Estas seguro de editar este jugador?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agregar!"
    }).then((result) => {
      if (result.isConfirmed) {
        const jugadorEditado =listaJugadores.map(
          regJugador => regJugador.id === id ? {noJugador: nombre, equipo: equipoActual, costo: costo} : regJugador
        )
        Swal.fire({
          title: "Actualizado!",
          text: "Tu registro ha sido guardado.",
          icon: "success"
        });

        setListaJugadores(jugadorEditado);
        setBtnEdit(false);
      }
    });

  //Limpiar los hook y los campos
  setNombre('');
  setEquipo('');
  setCosto('');
  setId('');

    }

    const eliminarJugador = (id) =>{
      //Buscar y filtrar el arrar con la lista de jugadores y
      //comparar el id, si es igual, quuitar el objeto

      Swal.fire({
        title: "Estas seguro?",
        text: "NO podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!"
      }).then((result) => {
        if (result.isConfirmed) {

          const arrayFiltrado = listaJugadores.filter(
            jugador =>(jugador.id !== id)
          );
          setListaJugadores(arrayFiltrado);


          Swal.fire({
            title: "Eliminado!",
            text: "Tu registro ha sido elminado.",
            icon: "success"
          });
        }
      });
    }

    const registrarJugador = (evt) =>{
        evt.preventDefault();

        if(!nombre.trim()){
            Swal.fire({
                icon: "error",
                title: "Debe ingresar el nombre",
                width: 600,
                padding: "3em",
                color: "#716add",
                
              });
            return;
        }
        if(!equipoActual.trim()){
            Swal.fire({
                icon: "error",
                title: "Debe ingresar el equipo actual",
                width: 600,
                padding: "3em",
                color: "#716add",
                
              });
            return;
        }
        if(!costo.trim()){
            Swal.fire({
                icon: "error",
                title: "Debe ingresar el costo",
                width: 600,
                padding: "3em",
                color: "#716add",
                
              });
            //alert("Debe ingresar el costo")
            return;
        }
        //Agregando y concatenando los Hooks a la lista de objetos 
        //Utilizando el operador de Proágación (...)

        Swal.fire({
            title: "Seguro?",
            text: "Estas seguro de añadir este jugador?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agregar!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Registrado!",
                text: "Tu registro ha sido guardado.",
                icon: "success"
              });

              setListaJugadores([
                ...listaJugadores,
                {id:shortid.generate(), noJugador: nombre, equipo: equipoActual, costo: costo}
            ]);

            }
          });

        //Limpiar los hook y los campos
        setNombre('');
        setEquipo('');
        setCosto('');
        setId('');
        //evt.target.reset();
    }
  return (
    <>
    <div className='container'>
        <h1 className='text text-center mt-5'>Draft Jugadores Liga MX</h1>

        <section className='row'>
            <section className='col-sm-12 col-md-4 col-lg-5'>
                <h4>Registro Jugador</h4>
                <form onSubmit={btnEdit? editarJugadorOK : registrarJugador}>
                    <input type="text"  placeholder='Nombre' className='form-control mb-3' onChange={(evt)=>setNombre(evt.target.value)} value={nombre}/>

                    <input type="text" placeholder='Equipo actual' className='form-control mb-3' onChange={(evt)=>setEquipo(evt.target.value)} value={equipoActual}/>

                    <input  type="number" placeholder='Costo Carta' className='form-control mb-3' onChange={(evt)=>setCosto(evt.target.value)} value={costo}/>

                    {
                      btnEdit ? (<button type='submit' className='btn btn-warning btn-block'>Editar Jugador</button>)
                      :(<button type='submit' className='btn btn-dark btn-block'>Registrar Jugador</button>)
                    }
                </form>
            </section>
            <section className='col-sm-12 col-md-8 col-lg-7 mt-3 mt-md-0'>
                <h4>Lista Jugadores</h4>
                <ul className='list-group'>
                {
                  listaJugadores.length === 0 ? (<li className='list-group-item'>No hay jugadores para mostrar...</li>) 
                  :(
                    listaJugadores.map((ju)=>{
                        return(
                        <li key={ju.id} className='list-group-item'>
                          <span className='lead'>{ju.noJugador} :: {ju.equipo} :: {ju.costo}</span>
                          
                            <button onClick={()=> editarJugador(ju)} className='btn btn-sm btn-success float-right mx-2'>Editar</button>
                            <button onClick={()=> eliminarJugador(ju.id)} className='btn btn-sm btn-danger float-right'>Eliminar</button>
                          
                        </li>
                        )
                    })
                  )
                }
                </ul>
            </section>
        </section>
    </div>
    </>
  )
}

export default Formularios