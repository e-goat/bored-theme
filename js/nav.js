export default class Navigation {
    constructor() {
       this.length = document.getElementById('nav').children.length;
       this.click();
    }

    click() {
        for ( var i = 0; i < this.length; i++ ) {
            document.getElementById('nav').children[i].addEventListener('click', event => {
                let navNode = event.path[0];
                if ( !navNode.classList.contains('active') ) {
                    document.querySelectorAll('a.nav-b').forEach(btn => {
                        btn.classList.remove('active');
                    })
                    navNode.classList.add('active');
                }
            })
        }
    }
}

