import {Component} from '../../core';
import styles from './header.component.css';
import template from './header.html';

@Component({
    selector: 'app-header',
    template,
    styles
})
export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        console.log('init', this);
    }
}
