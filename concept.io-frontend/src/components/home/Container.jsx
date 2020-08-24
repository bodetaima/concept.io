import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { handleOpenDrawer } from '../../store/actions';
import styles from './styles/container.module.css';

function Container({ handleOpen }) {
  return (
    <>
      <div className={styles.container}>
        <h1>Welcome to your Concept</h1>
        <span>Have a nice day!</span>
        <ul>
          <li>
            You can get started by
            <Button outlined onClick={handleOpen} text="checking existing concepts" />
            on the left side menu.
          </li>
          <li>Or if you have something in mind, create a new one.</li>
        </ul>
        <p>Hope your concept come real one day!</p>
        <p>Here is a fortune for you:</p>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleOpen: () => dispatch(handleOpenDrawer()),
});

Container.defaultProps = {
  handleOpen: PropTypes.func,
};

Container.propTypes = {
  handleOpen: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Container);
