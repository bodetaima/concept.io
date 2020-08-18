import React from "react";
import styles from "./styles/container.module.css";
import {handleOpenDrawer} from "@store/actions";
import {connect} from "react-redux";

function Container({handleOpenDrawer}) {
    return (
        <>
            <div className={styles.container}>
                <h1>Welcome to your Concept</h1>
                <span>Have a nice day!</span>
                <ul>
                    <li>
                        You can get started by <a onClick={handleOpenDrawer}>checking existing concepts</a> on the left
                        side menu.
                    </li>
                    <li>Or if you have something in mind, create a new one.</li>
                </ul>
                <p>Hope your concept come real one day!</p>
                <p>Here is a fortune for you:</p>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isDrawerOpen: state.app.drawerState,
    };
};
const mapDispatchToProps = (dispatch) => ({
    handleOpenDrawer: () => dispatch(handleOpenDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
