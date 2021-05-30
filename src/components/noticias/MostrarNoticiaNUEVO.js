import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";
// hoook para usar parametros
import { useParams, Link } from "react-router-dom";

const MostrarNoticiaNUEVO = () => {
    // obtener el parametro de la URL
    // console.log(useParams().id);
    const parametroID = useParams().id;
    // URL donde estan almacenadas las noticias
    const URLnoticias = process.env.REACT_APP_API_URLnoticias + "/?id=" + parametroID;


    //=== state para almacenar resultados del fetch
    const [noticiaCompleta, setNoticiaCompleta] = useState({});

    useEffect(() => {
        consultarAPInoticias();
    }, [])

    // toma los datos de la api
    const consultarAPInoticias = async () => {
        // buscar la noticia que tenga el ID pasado como parametro en la URL
        try {
            const respuesta = await fetch(URLnoticias);
            if (respuesta.status === 200) {
                const noticiaFiltrada = await respuesta.json();
                setNoticiaCompleta(noticiaFiltrada[0]);
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Ocurrió un Error!", "Inténtelo en unos minutos.", "error");
        }
    }

    // const fechaLocal = noticiaCompleta.fechaNoticia.toLocalString()
    
    return (
        <Container className='margenListaNoticias'>
            <h3 className="text-center my-3 py-3 bg-warning text-light">
                Mostrar Noticia Completa
            </h3>
            <Card>
                {/* <p>{noticiaCompleta.autorNoticia}</p> */}
                <p>{noticiaCompleta.categoria}</p>
                {/* <p>(noticiaCompleta.destacada ==='on') ? "Noticia Destacada" : null</p> */}
                <Card.Title>{noticiaCompleta.tituloNoticia}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{noticiaCompleta.noticiaBreve}</Card.Subtitle>
                <p>{noticiaCompleta.fechaNoticia}</p>
                <Card.Img className='w-50 text-center' variant="top" src={noticiaCompleta.imagenPrincipal} />
                <Card.Body>    
                    <Card.Text>
                        {noticiaCompleta.noticiaDetallada}
                    </Card.Text>
                    {/* <Button variant="primary">Volver</Button> */}
                    <Link className='btn btn-primary text-light mr-3 d-block' to={'/noticias/listar/' + noticiaCompleta.categoria}> Volver a Noticias por Categoría</Link>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MostrarNoticiaNUEVO;