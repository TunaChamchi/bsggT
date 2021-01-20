import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Main, Detail, Create, Error404 } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/:tag" component={Main}/>
                    <Route path="/:tag/:id" component={Detail}/>
                    <Route path="/:tag/Create" component={Create}/>

                    <Route path="/404" component={Error404}/>
                    <Redirect from="/" to="/all" />
                    <Redirect to="/404" component={Error404} />
                </Switch>
            </div>
        );
    }
}

export default App;