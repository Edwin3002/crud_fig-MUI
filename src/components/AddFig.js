import { Button, } from '@mui/material'
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { url as url2 } from '../helpers/Url';


export const AddFig = () => {


    ///estado principal de figura
    const [agregar, setAgregar] = useState({
        nombre: '',
        precio: '',
        resumen: '',
        categoria: '',
        img: '',
    })

    let { nombre, img, resumen, categoria, precio } = agregar

    ///cambia el estado de figura con onChange
    const handleChange = ({ target }) => {
        setAgregar({
            ...agregar,
            [target.name]: target.value
        })
        console.log(agregar)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        // AddFigura()
        // setAgregar ({
        //     nombre: '',
        //     tipo: '',
        //     numero: '',
        //     telefono: '',
        //     celular: '',
        //     direccion: '',
        //     imagen: ''
        // })
    }

    const AddFigura = () => {
        console.log('hola post')
        fetch(url2, {
            method: 'POST',
            body: JSON.stringify(agregar),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}><br/>
                <input onChange={handleChange} type='text' placeholder='Nombre' name='nombre' value={nombre} /><br/>
                <input onChange={handleChange} type='text' placeholder='Precio' name='precio' value={precio} /><br/>
                <input onChange={handleChange} type='text' placeholder='Descripcion' name='resumen' value={resumen} /><br/>

                <input onChange={handleChange} type='text' placeholder='Categoria' name='categoria' value={categoria} /><br/>
                <input onChange={handleChange} type='text' placeholder='Url de imagen' name='img' value={img} /><br/>

                {/* <TextField color="success" required id="outlined-required" label="Nombre" defaultValue="Hello World"/> */}
                <Button type="submit" variant="contained" endIcon={<SendIcon />} onClick={() => AddFigura()}>
                    Send
                </Button>
            </form>
            
        </div>
    )
}
