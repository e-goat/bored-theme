export default class MailForm {
    _state;

    constructor(state) {
        this._state = state;
    }

    initEvent = () => {
        // document.getElementById('form-btn')?.addEventListener('click', event => {
        //     event.preventDefault();
        //     this.validate();
        // });
    }

    validate = () => {
        const list = {
            'name' : () => {
                const fname     = document.getElementById('fname');
                console.log(fname.value);
                //     warningText = document.createElement('span');

                // warningText.innerHTML       = 'Please type in your name.';
                // warningText.style.display   = 'none';


                // if ( fname ) {
                //     if ( fname.value != '' ) {
                //         fname.prepend( warningText )
                //         warningText.style.display = 'block';
                //         warningText.style.display = 'block';
                //     }  
                // }
            }
        }

        return list['name']();
    }
}