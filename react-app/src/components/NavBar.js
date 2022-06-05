import { Button, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import LogoutButton from "./auth/LogoutButton";
import { useSelector } from "react-redux";
import { authUri } from "../lib/intuit-oauth";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
 

  return (
    <Navbar expand='lg' variant='light' bg='light'>
      <Container>
        <Navbar.Brand href='/' className='d-flex align-top'>
          <img
            alt=''
            src='https://static1.squarespace.com/static/5feb8101b5b33b527b373ebc/t/624deb72c3b55f64018575de/1649273714852/stdpsolution+icon-05.png'
            width='40'
            height='40'
            className='d-inline-block align-top'
          />{" "}
          <h2>
            <strong>step</strong>solution
          </h2>
        </Navbar.Brand>

        <Nav className='justify-content-end'>
          {!user && (
            <>
              {/* <NavLink to='/sign-up' exact={true}>
                <Button className='m-3' variant='outline-dark'>
                  Sign Up
                </Button>
              </NavLink> */}
              <NavLink to='/login' exact={true}>
                <Button className='m-3' variant='dark' type='submit'>
                  Login
                </Button>
              </NavLink>
            </>
          )}

          {user && (
            <div href='#' className='mt-3'>
              <LogoutButton />
            </div>
          )}

          {user && (
           
            <div href='#' className='mt-3'>
              <Button onClick={() => window.location.replace(authUri)}>
                Connect to Quickbooks
              </Button>
            </div>
           
          )}
          
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
