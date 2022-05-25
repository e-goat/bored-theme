export default class Router {
    _handleLocation;
    _routes;

    constructor() {
        this._routes = {
            404       : '/404.html',
            '/'       : '/index.html',
            '/contact': '/contact.html',
        }

        this._handleLocation = async () => {
            const path = window.location.pathname;
            const route = this._routes[path] || this._routes[404];
            const html = await fetch(route).then((data) => data.text())
            console.log(route);
            document.getElementById("main-page").innerHTML = html;
        }
    }
    
    getRoute = event => {
        event = event || window.event;
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        this._handleLocation();
    }

    init = () => {
        window.onpopstate = this._handleLocation();
        window.route = this.getRoute();
        this._handleLocation();
    }
}