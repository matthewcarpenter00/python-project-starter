import { Button, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import LogoutButton from "./auth/LogoutButton";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <Navbar expand='md' variant='light' bg='light'>
      <Container>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src='https://static1.squarespace.com/static/5feb8101b5b33b527b373ebc/t/624deb72c3b55f64018575de/1649273714852/stdpsolution+icon-05.png'
            width='30'
            height='30'
            className='d-inline-block align-top'
          />{" "}
          <strong>step</strong>solution
        </Navbar.Brand>
        {/* <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li> */}
        <Nav className='justify-content-end'>
          <NavLink to='/profile/user' exact={true} activeClassName='active'>
            <Button className='m-3' variant='outline-dark'>
              Dashboard
            </Button>
          </NavLink>
          <NavLink to='/users' exact={true} activeClassName='active'>
            <Button className='m-3' variant='outline-dark'>
              Users
            </Button>
          </NavLink>
          {!user && (
            <>
              <NavLink to='/sign-up' exact={true}>
                <Button className='m-3' variant='outline-dark'>
                  Sign Up
                </Button>
              </NavLink>
              <NavLink to='/login' exact={true}>
                <Button className='m-3' variant='dark' type='submit'>
                  login
                </Button>
              </NavLink>
            </>
          )}

          {user && (
            <div href='#' className='mt-3'>
              <LogoutButton />
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
