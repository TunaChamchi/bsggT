import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Main, Detail, Create, Error404 } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Switch>
                    <Route path="/Detail" component={Detail}/>
                    <Route path="/Create" component={Create}/>

                    <Route path="/404" component={Error404}/>
                </Switch>
            </div>
        );
    }
}

export default App;