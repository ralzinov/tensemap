// import * as template from './header.html';

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = '';

        console.log('init');
    }
}
