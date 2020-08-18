import React from "react";
import { connect } from "react-redux";
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
} from "@blueprintjs/core";
import { handleCloseDrawer, handleOpenDrawer, logout } from "@store/actions";
import { Link } from "react-router-dom";
import styles from "./styles/navbar.module.css";

const NavBar = ({ logout, handleOpenDrawer, handleCloseDrawer, isDrawerOpen, title, profile }) => {
    return (
        <Navbar className={styles.navbarBg}>
            <NavbarGroup align={Alignment.LEFT}>
                <Button className="bp3-minimal" onClick={handleOpenDrawer} icon="menu" />
                <Drawer
                    isOpen={isDrawerOpen}
                    canEscapeKeyClose
                    canOutsideClickClose
                    onClose={handleCloseDrawer}
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
                <Button className="bp3-minimal" style={{ color: "white" }} text="Share" />
                <Button className="bp3-minimal" style={{ color: "white" }} text="Add notes" />
                <Popover
                    interactionKind={PopoverInteractionKind.CLICK}
                    popoverClassName="bp3-popover-content-sizing"
                    position={Position.BOTTOM_RIGHT}
                >
                    <Button className="bp3-minimal" style={{ color: "white" }} text={profile.fullname} />
                    <div>
                        <p>Do you want to change profile?</p>
                        <Button
                            onClick={logout}
                            className="bp3-intent-danger"
                            style={{ marginRight: 5 }}
                            text="Logout"
                        />
                    </div>
                </Popover>
            </NavbarGroup>
        </Navbar>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile,
        isDrawerOpen: state.app.drawerState,
    };
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    handleOpenDrawer: () => dispatch(handleOpenDrawer()),
    handleCloseDrawer: () => dispatch(handleCloseDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
