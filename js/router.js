export default class Router {
    _handleLocation;
    _routes;

    constructor() {
        this._routes = {
            '/'       : '/index.html',
            '/home'   : '/view/home.html',
            '/about'  : '/view/about.html',
            '/contact': '/view/contact.html',
        }

        this._handleLocation = async () => {
            const path = window.location.pathname,
                route  = this._routes[path] || this._routes[404],
                html   = await fetch(route).then((data) => data.text());   

            return document.getElementById("container").innerHTML = html;
        }
    }
    
    getRoute = event => {
        event = event || window.event;
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        this._handleLocation();
    }

    init = () => {
        window.onpopstate   = this._handleLocation();
        window.route        = this.getRoute();
        this.getRoute();
    }
}