import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/app.css';

const ProfileSelector = React.lazy(() => import('./views/profiles/ProfileSelector'));
const Home = React.lazy(() => import('./views/home/Home'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Concept';
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <>
        {loggedIn ? (
          <Suspense fallback={<div className="bp3-skeleton" />}>
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          </Suspense>
        ) : (
          <Suspense fallback={<div className="bp3-skeleton" />}>
            <ProfileSelector />
          </Suspense>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

App.defaultProps = {
  loggedIn: PropTypes.bool,
};

App.propTypes = {
  loggedIn: PropTypes.bool,
};

export default connect(mapStateToProps)(App);
