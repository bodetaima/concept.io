import React, { Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
const ProfileSelector = React.lazy(() => import("./views/profiles/ProfileSelector"));
const Home = React.lazy(() => import("./views/home/Home"));
import "@styles/app.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.title = "Concept";
    }

    render() {
        const { loggedIn } = this.props;
        return (
            <>
                {loggedIn ? (
                    <Suspense fallback={<div className="bp3-skeleton"></div>}>
                        <BrowserRouter>
                            <Home />
                        </BrowserRouter>
                    </Suspense>
                ) : (
                    <Suspense fallback={<div className="bp3-skeleton"></div>}>
                        <ProfileSelector />
                    </Suspense>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps)(App);
