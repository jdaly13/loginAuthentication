import React from 'react';
import HomePage from './components/HomePage.js';
import NotFound from './components/NotFound.js';
import DashboardPage from './containers/DashboardPage.js';
import LoginPage from './containers/LoginPage.js';
import SignUpPage from './containers/SignUpPage.js';
import Auth from './modules/Auth.js';
import { Redirect } from 'react-router';
import {
    Route,
    Switch
} from 'react-router-dom';

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home'
    },
    {
        path: '/signup',
        component: SignUpPage,
        name: 'signup'
    },
    {
        path: '/login',
        component: LoginPage,
        name:'login'
    },
    {
        path: '/logout',
        component: HomePage,
        name: 'logout'
    },
    {
        path: '/me',
        component: DashboardPage,
        name: 'dashboard'
    },
    {
        path: '*',
        component: NotFound,
        name: 'notfound'
    }
];

const isLoggedIn = () => {
    return Auth.isUserAuthenticated()
}

const RouteFunc = () => {
    let ele = false;
    const paths = routes.map((route) => {
        return route.path;
    })
    const path = window.location.pathname;
    paths.forEach((val)=> {
        if (val === path) {
            ele = true
        }
    });
    return ele;

}

const loopRoutes = routes.map((route, key) => {
    const Page = route.component;
    const HomePage = routes[0].component;
    const DashboardPage = routes[4].component;
    console.log(route, key)
    if (route.name === 'logout') {
        return (
            <Route exact path="/logout" key={key} render={() => {
                Auth.deauthenticateUser();
                return (
                <Redirect to="/"/>
                )
              }}/>
        )
    }
    if (route.name === 'dashboard') {
        return (
        <Route exact path={'/me'} key={key} render={() => (
            isLoggedIn() ? (
                <DashboardPage />
            ) : (
                <HomePage />
            )
        )}/>
    )
    }
    if (route.name === 'home') {
        return (
        <Route exact path={route.path} key={key} render={() => (
            isLoggedIn() ? (
                <DashboardPage />
            ) : (
                <HomePage />
            )
        )}/>
        )
    }

    if (RouteFunc()) {
        return (
            <Route exact path={route.path} key={key} render={(props) => (
                isLoggedIn() ? (
                    <Redirect to="/me"/>
                ) : (
                    <Page {...props} />
                )
            )}/>
        )
    }
    return (
        <Route key={key} render={(props) => (
            isLoggedIn() ? (
                <Redirect to="/me"/>
            ) : (
                <NotFound {...props} />
            )
        )} />
    )

});

const AppRouting = ()  => {
    return (
        <div>
            <Switch>
                {loopRoutes}
            </Switch>
        </div>
    )
}

export default AppRouting;
