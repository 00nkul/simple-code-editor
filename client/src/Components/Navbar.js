import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({setLang , runCode}) {
    const handleClick = () => {
        runCode();
    }
    const handleChange = (e) => {
        // console.log(e.target.value);
        setLang(e.target.value);
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Code-Editor</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        <select onChange={(e) => handleChange(e)}>
                            <option value="js">JS</option>
                            <option value="py">Python</option>
                            <option value="cpp">CPP</option>
                        </select>
                        <Nav.Link eventKey={2} href="#memes">
                            <div className="" onClick={handleClick}>
                                Run Code
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;