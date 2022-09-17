import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MiApi = () => {
    const url = "https://valorant-api.com/v1/agents/?isPlayableCharacter=true";
    const [characters, setCharacters] = useState([]);
    const [listSearch, setListSearch] = useState(characters);
    const [searchCharacter, setSearchCharacter] = useState("");
    const [orderList, setOrderList] = useState([]);

    const searchCharacterName = (event) => {
        event.preventDefault()
        if (searchCharacter === "") {
            alert("Ingresa el nombre de cualquier campeon")
        }
        else {
            const filterSearchCharacter = characters.filter((character) => character.displayName.includes(searchCharacter))
            setListSearch(filterSearchCharacter)
            setSearchCharacter("")
        }
    }

    const sortByName = () => {
        const listSort = characters.sort((a, b) => a.displayName > b.displayName ? 1 : -1)
        setOrderList(listSort)
    }
    useEffect(() => {
        async function getData() {
            try {
                /* devuelve el objeto de la api */
                const { data, status } = await axios.get(url)
                setCharacters(data.data)
            } catch (error) {
                return (
                    <div>
                        <h1> Error al cargar los personajes</h1>
                    </div>
                )
            }
        }
        getData()
    }, []);

    return (
        <div>
            <Navbar className='navbar' bg="dark" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link style={{ color: "white" }} href="#">
                                Campeones de Valorant
                            </Nav.Link>
                            <Button type="button" onClick={sortByName}>Ordenar Alfabeticamente</Button>
                        </Nav>
                        <Nav className='me-3'>
                            Busca tu Campeón
                        </Nav>
                        <Form className="d-flex" onSubmit={searchCharacterName} >
                            <Form.Control
                                type="search"
                                placeholder="Buscar"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => {
                                    setSearchCharacter(e.target.value);
                                }}
                            />
                            <Button type="submit" variant="outline-success"> Buscar </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                {/*  Recorremos la lista que nos retorna el Input una vez que el boton es clickeado */}
                {/* Pintar el buscar */}
                {listSearch.map((character) => {
                    return (
                        <div className="container" style={{ maxWidth: "100%" }}>
                            <div key={character.uuid}>
                                <Card
                                    className="card"
                                    style={{
                                        width: '18rem',
                                        backgroundColor: "black",
                                        color: "white",
                                        borderRadius: "20px"
                                    }}>
                                    <Card.Img variant="top" src={character.fullPortrait} />
                                    <Card.Body>
                                        <Card.Title className="Card-title"> {character.displayName} </Card.Title>
                                        <Card.Text> {character.description}
                                            {listSearch.length > 0 ? <Button href="https://moisesvr.github.io/prueba1" variant="outline-success" className="me-auto my-auto"> Volver </Button> : null}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* Pintar el ordenado alfabeticamente*/}
            {/* Cuando listSearch sea menor que 0 no hará nada y cuando cambie a mayor que 0 pasara a la siguiente condicion */}
            {listSearch.length > 0 ? null : <div className="container" style={{ maxWidth: "100%" }}>
                {/* Cuando el largo del arreglo orderList sea menor que 0 va a dibujar  */}
                {/* Va dibujando desde la lista ordenada directamente */}
                {orderList.length > 0 ? orderList.map((character) => {
                    return (
                        <div key={character.uuid}>
                            <Card
                                className="card"
                                style={{
                                    width: '18rem',
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "20px"
                                }}>
                                <Card.Img variant="top" src={character.fullPortrait} />
                                <Card.Body>
                                    <Card.Title className="Card-title"> {character.displayName} </Card.Title>
                                    <Card.Text>
                                        {character.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>)

                }) :
                /* Si no cuando orderlist sea mayor que 0 pasara a dibujar los datos directos de la api  */
                    /* Pintar el principal de la api */
                    characters.map((character) => {
                        return (
                            <div key={character.uuid}>
                                <Card
                                    className="card"
                                    style={{
                                        width: '18rem',
                                        backgroundColor: "black",
                                        color: "white",
                                        borderRadius: "20px"
                                    }}>
                                    <Card.Img variant="top" src={character.fullPortrait} />
                                    <Card.Body>
                                        <Card.Title className="Card-title"> {character.displayName} </Card.Title>
                                        <Card.Text> {character.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>}
        </div>
    );
}

export default MiApi;