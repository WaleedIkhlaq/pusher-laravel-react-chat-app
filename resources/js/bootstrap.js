import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common[ 'X-Requested-With' ] = 'XMLHttpRequest';

import { configureEcho } from "@laravel/echo-react";
import Echo from "laravel-echo";

window.Echo = new Echo ( {
                             broadcaster: 'pusher',
                             key        : import.meta.env.VITE_PUSHER_APP_KEY,
                             cluster    : import.meta.env.VITE_PUSHER_APP_CLUSTER,
                             forceTLS   : true,
                         } );
