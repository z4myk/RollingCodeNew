import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
// hoook para usar parametros
import { useParams } from 'react-router-dom';

import ItemNoticiaxCateg from './ItemNoticiaxCateg';
import Swal from 'sweetalert2'

const ListarNoticiasxCateg = () => {
    // obtener el parametro de la URL, NO de un props
    // console.log(useParams().nombreCategoria);
    const parametroCategoria = useParams().nombreCategoria;

    // state para almacenar resultados del fetch
    const [noticias, setNoticias] = useState([]);

    // URL donde estan almacenadas las noticias
    const URLnoticias = process.env.REACT_APP_API_URLnoticias + '/?categoria=' + parametroCategoria;

    useEffect(async () => {
        // buscar las noticias que tengan las categoria pasada como parametro en la URL
        try {
            const respuesta = await fetch(URLnoticias);
            if (respuesta.status === 200) {
                const noticiasFiltradas = await respuesta.json();
                setNoticias(noticiasFiltradas);
            }
        } catch (error) {
            console.log(error);
            Swal.fire(
                'Ocurrió un Error!',
                'Inténtelo en unos minutos.',
                'error'
            )
        }
    }, [])

    return (
        <Container className='margenListaNoticias'> 
            <h3 className='text-center my-3 py-3 fondoTitulo text-light'>Categoria: {parametroCategoria}</h3>
            <Table responsive hover>
                <thead>
                    <tr className="textoNoticia">
                        <th>Destacada</th>
                        <th>Fecha</th>
                        <th>Titulo</th>
                        <th className='d-none d-md-table-cell'>Noticia Breve</th>
                        <th className='d-none d-md-table-cell'>Autor</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        noticias.map((valor, indice) => <ItemNoticiaxCateg key={indice} info={valor}></ItemNoticiaxCateg>)
                    }
                </tbody>    
            </Table>    
        </Container>
        
    );
};


export default ListarNoticiasxCateg;