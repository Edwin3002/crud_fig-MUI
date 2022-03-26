import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { url } from '../helpers/Url';
import Swal from 'sweetalert2'
import '../styles/card.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#0E185F',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const CardList = () => {

    ///modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const editarFigura = (figura) => {
        console.log(figura)
        setFig(figura)
        handleOpen();
        return (

            <div key={figura.id}>hola</div>
        )
    }

    const [figur, setFig] = React.useState([])
    let { nombre, img, resumen, categoria, precio, id } = figur

    const [figuras, setFiguras] = React.useState([])

    const getdata = async () => {
        const resp = await fetch(url)
        const data = await resp.json()
        console.table(data)
        setFiguras(data)
    }
    React.useEffect(() => {
        getdata()
    }, [])


    //detalle
    const detalleFigura = async (nombre, resumen, img, precio) => {
        console.log(nombre)
        Swal.fire({
            title: `${nombre}`,
            text: `${resumen}`,
            imageUrl: `${img}`,
            imageWidth: 230,
            imageHeight: 300,
            imageAlt: 'Custom image',
        })
    }


    //ELIMINAR
    const eliminarFigura = async (id) => {
        console.log(id)
        console.log(url + id)
        await fetch(url + id,
            { method: 'delete' })
        getdata()
    }

    ///cambio
    const handleChange = ({ target }) => {
        setFig({
            ...figur,
            [target.name]: target.value
        })
        console.log(figur)
    }

    ///submit
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    ///editar

    const editFigura = (id) => {
        console.log('hola put')
        fetch(url + id, {
            method: 'PUT',
            body: JSON.stringify(figur),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 3000
        })
        handleClose()
        setTimeout(
            getdata()
        , 4000)
    }
    return (
        <div className='cartas'>

            {
                figuras.map((fig) => (
                    <Card key={fig.id} className='card' sx={{ maxWidth: 250 }}>
                        <div >
                            <CardMedia
                                component="img"
                                height="350"
                                image={fig.img}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {fig.nombre}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {fig.categoria}
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="contained" color="success" onClick={() => { detalleFigura(fig.nombre, fig.resumen, fig.img, fig.precio) }}>Detail</Button>
                                <Button size="small" color="secondary" onClick={() => editarFigura(fig)}>edit</Button>
                                {/* onClick={() => editarFigura(fig)} */}
                                <Button size="small" variant="outlined" color="error" onClick={() => eliminarFigura(fig.id)}>Delete</Button>
                            </CardActions>
                        </div>
                    </Card>

                ))
            }
            {/* /// modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography gutterBottom variant="h5" component="div">
                                    Editar figura
                                </Typography>
                    <form onSubmit={handleSubmit}>
                        <label variant="h5">Nombre </label>
                        <input onChange={handleChange} type='text' placeholder='Nombre' name='nombre' value={nombre} /><br/>
                        <label>Precio </label>
                        <input onChange={handleChange} type='text' placeholder='Precio' name='precio' value={precio} /><br/>
                        <label>Precio </label>
                        <input onChange={handleChange} type='text' placeholder='Descripcion' name='resumen' value={resumen} /><br/>
                        <label>Tipo de figura</label>
                        <select className='tipo' id="selectCategoria" name="categoria" value={categoria} onChange={handleChange}>
                            <option name="Original" value="Original">Original</option>
                            <option name="Replica" value="Replica">Replica</option>
                        </select><br/>
                        <label>Url de imagen </label>

                        <input onChange={handleChange} type='text' placeholder='Url de imagen' name='img' value={img} />
                        <CardActions>

                            <Button size="small" variant="contained" color="success" onClick={() => editFigura(id)}>Confirm</Button>
                            <Button size="small" variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
                        </CardActions>
                    </form>

                </Box>
            </Modal>


        </div>
    );
}
