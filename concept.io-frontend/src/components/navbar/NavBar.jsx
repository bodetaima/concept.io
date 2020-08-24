import React from 'react';
import { connect } from 'react-redux';
import {
  Alignment,
  Button,
  Drawer,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleCloseDrawer, handleOpenDrawer, logout } from '../../store/actions';
import styles from './styles/navbar.module.css';

const NavBar = ({
  logOut, handleOpen, handleClose, isDrawerOpen, title, profile,
}) => (
  <Navbar className={styles.navbarBg}>
    <NavbarGroup align={Alignment.LEFT}>
      <Button className="bp3-minimal" onClick={handleOpen} icon="menu" />
      <Drawer
        isOpen={isDrawerOpen}
        canEscapeKeyClose
        canOutsideClickClose
        onClose={handleClose}
        lazy
        title="Your Concept"
        position={Position.LEFT}
        size={Drawer.SIZE_SMALL}
      >
        <Link to="/">Getting Started</Link>
        <Link to="/iZba2a">Test</Link>
      </Drawer>
      <NavbarHeading>{title}</NavbarHeading>
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <Button className="bp3-minimal" style={{ color: 'white' }} text="Share" />
      <Button className="bp3-minimal" style={{ color: 'white' }} text="Add notes" />
      <Popover
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName="bp3-popover-content-sizing"
        position={Position.BOTTOM_RIGHT}
      >
        <Button className="bp3-minimal" style={{ color: 'white' }} text={profile.fullname} />
        <div>
          <p>Do you want to change profile?</p>
          <Button onClick={logOut} className="bp3-intent-danger" style={{ marginRight: 5 }} text="Logout" />
        </div>
      </Popover>
    </NavbarGroup>
  </Navbar>
);

const mapStateToProps = (state) => ({
  profile: state.auth.profile,
  isDrawerOpen: state.app.drawerState,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logout()),
  handleOpen: () => dispatch(handleOpenDrawer()),
  handleClose: () => dispatch(handleCloseDrawer()),
});

NavBar.defaultProps = {
  title: PropTypes.string,
  profile: PropTypes.objectOf(PropTypes.object),
  isDrawerOpen: PropTypes.bool,
  logOut: PropTypes.func,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

NavBar.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.objectOf(PropTypes.object),
  isDrawerOpen: PropTypes.bool,
  logOut: PropTypes.func,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
