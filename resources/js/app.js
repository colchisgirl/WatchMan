import React from 'react';
import ReactDOM from 'react-dom';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

import AppComponent from './components/AppComponent/AppComponent';

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true
});

ReactDOM.render(
    <AppComponent />,
    document.getElementById('app'));
