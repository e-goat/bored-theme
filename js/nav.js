import Router from './router.js';

export default class Navigation {
    _length;

    constructor() {
       this._length = document.getElementById('nav').children.length
       this.onClick()
       this.stickyOnTop()
    }

    onClick() {
        const router = new Router();
        const initiateRouter = () => {
            [...document.querySelectorAll('a.nav-b')].forEach(
                element => {
                    element
                        .addEventListener('click', event => { 

                        const navNode = event.path[0];
                        if ( !navNode.classList.contains('active') ) {
                            document.querySelectorAll('a.nav-b').forEach(btn => {
                                btn.classList.remove('active')
                            })
                            navNode.classList.add('active')
                            router.init();
                        }
                    })
                }
            )
        }

        return initiateRouter();
    }

    stickyOnTop() {
        const navbar    = document.getElementById('nav'),
            sticky      = navbar.offsetTop;
        
        return window.onscroll  = () => { 
            window.pageYOffset  = sticky ? navbar.classList.add('sticky-nav')
                : navbar.classList.remove('sticky-nav')
        }
    }
}

