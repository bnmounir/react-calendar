import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Calendar from '../pages/Calendar';

const Router = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={Calendar} />
        </Switch>
    );
};

export default Router;
