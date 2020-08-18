import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";

const Container = React.lazy(() => import("@components/home/Container"));
const Concept = React.lazy(() => import("@components/concepts/Concept"));

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Suspense fallback={<div className="bp3-skeleton"/>}>
                    <Container/>
                </Suspense>
            </Route>
            <Route path="/:pghash">
                <Suspense fallback={<div className="bp3-skeleton"/>}>
                    <Concept/>
                </Suspense>
            </Route>
        </Switch>
    );
}

export default Routes;
