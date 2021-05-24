import React, { useState, useRef } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const NuevaNoticia = (props) => {
    const [categoria, setCategoria] = useState('');
    const [fechaNoticia, setFechaNoticia] = useState('10/10/2021');
    const [autorNoticia, setAutorNoticia] = useState('');
    const [tituloNoticia, setTituloNoticia] = useState('');
    const [noticiaBreve, setNoticiaBreve] = useState('');
    const [noticiaDetallada, setNoticiaDetallada] = useState('');
    const [imagenPrincipal, setImagenPrincipal] = useState('');
    const [imagenSec, setImagenSec] = useState('');
    const [destacada, setDestacada] = useState(false);
    const [id, setId] = useState("1000");

    const [errorValidacion, setErrorValidacion] = useState(false);

    const formRef = useRef(null);

    const handleReset = () => {
        formRef.current.reset();
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        //validar los datos

        if (autorNoticia.trim() === '' || tituloNoticia.trim() === '' || noticiaBreve.trim() === '' || noticiaDetallada.trim() === '' ||
            categoria === ''
            //|| imagenPrincipal === ''
        ) {
            //si falla la validacion mostrar alert de error
            setErrorValidacion(true);
            return;
        } else {
            //si sta todo bien, envio los datos a la API
            setErrorValidacion(false);

            //crear objeto
            const noticia = {
                tituloNoticia,
                noticiaBreve,
                noticiaDetallada,
                imagenPrincipal,
                imagenSec,
                categoria,
                autorNoticia,
                fechaNoticia,
                destacada,
                id
            }
            console.log("objeto noticia",noticia);

            try{
                const datosEnviar={
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(noticia)
                }
                const respuesta = await fetch('http://localhost:3004/noticias',datosEnviar);
                console.log(respuesta);

                if(respuesta.status === 201){
                    //mostrar cartel al usuario
                    Swal.fire(
                        'Guardado',
                        'Se registro una nueva noticia',
                        'success'
                      )
                    //otras tareas
                    props.consultarAPInoticias();

                    //limpiar imputs
                    handleReset();
                }

            }catch(error){
                console.log(error);
                Swal.fire(
                    'Ocurrio un error',
                    'Inténtelo en unos minutos',
                    'error'
                  )
            }

        }


    };

    return (
        <Container className="container my-3 py-3 shadow-lg">
            <h2 className="text-center my-3 py-3 text-dark">Nueva Noticia</h2>

            <Form ref={formRef} className='mx-5' onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group className='col-sm-6 col-md-4'>
                        <Form.Label>Categoría<span class="text-danger">*</span></Form.Label>
                        <Form.Control as="select" size="sm" placeholder="Categoría" onChange={(e) => setCategoria(e.target.value)}>
                            <option name="Categoria"></option>
                            <option name="Categoria" value='actualidad'>Actualidad</option>
                            <option name="Categoria" value='espectaculos'>Espectáculos</option>
                            <option name="Categoria" value='tecnologia'>Tecnología</option>
                            <option name="Categoria" value='deportes'>Deportes</option>
                            <option name="Categoria" value='fotografia'>Política</option>
                            <option name="Categoria" value='economia'>Economía</option>
                            <option name="Categoria" value='salud'>Salud</option>
                            <option name="Categoria" value='fotografia'>Fotografía</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='col-sm-6 col-md-4'>
                        <Form.Label>Fecha<span class="text-danger">*</span></Form.Label>
                        <Form.Control type="date" size="sm" placeholder="dd/mm/aa" 
                        //onChange={(e) => setFechaNoticia(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='col-sm-6 col-md-4'>
                        <Form.Label>Autor<span class="text-danger">*</span></Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Autor" onChange={(e) => setAutorNoticia(e.target.value)} />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Titulo Noticia<span class="text-danger">*</span></Form.Label>
                    <Form.Control type="text" size="sm" placeholder="Titulo de la Noticia" onChange={(e) => setTituloNoticia(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripción Breve<span class="text-danger">*</span></Form.Label>
                    <Form.Control as="textarea" rows={3} size="sm" placeholder="Descripción Breve" onChange={(e) => setNoticiaBreve(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descripción Detallada<span class="text-danger">*</span></Form.Label>
                    <Form.Control as="textarea" rows={5} size="sm" placeholder="Descripción Detallada" onChange={(e) => setNoticiaDetallada(e.target.value)} />
                </Form.Group>

                <Form.Row>
                    <Form.Group className='col-sm-12 col-md-8'>
                        <Form.Label>Imagen Principal<span class="text-danger">*</span></Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Imagen Principal"/>
                    </Form.Group>

                    <Form.Group className='col-sm-12 col-md-4 align-self-center d-flex justify-content-center'>
                        <img className='w-75' src="{noticiaCompleta.imagenPrincipal}" alt='Imagen Principal de la Noticia' />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group className='col-sm-12 col-md-8'>
                        <Form.Label>Imagen Secundaria (Opcional):</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Imagen Secundaria" />
                    </Form.Group>

                    <Form.Group className='col-sm-12 col-md-4 align-self-center d-flex justify-content-center'>
                        <img className='w-75' src="{noticiaCompleta.imagenSec}" alt='Imagen Secundaria de la Noticia' />
                    </Form.Group>
                </Form.Row>
                <Form.Group className='my-2 pb-2'>
                    <Form.Check type='checkbox' label='Noticia Destacada' />
                </Form.Group>

                <Button type='submit' className='w-100 text-light mt-3' variant="primary">Guardar</Button>
                {
                    errorValidacion === true ? (<Alert className='my-3' variant='warning'>Todos los campos son obligatorios</Alert>) : (null)
                }

            </Form>
        </Container>
    );
};

export default NuevaNoticia;