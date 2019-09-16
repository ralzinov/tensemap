import {IComponentDecoratorProps} from './interfaces';

function componentTemplateFactory(props: IComponentDecoratorProps) {
    return `
        ${props.styles ? `<style>${props.styles}</style>` : ''}
        ${props.template || ''}
    `;
}

export function Component(props: IComponentDecoratorProps) {
    return function(Target: any) {
        class CustomElement extends Target {
            constructor(...args: any[]) {
                super(...args);
                const shadowRoot = this.attachShadow({mode: 'open'});
                shadowRoot.innerHTML = componentTemplateFactory(props);
            }
        }

        CustomElement.prototype.constructor = Target;
        customElements.define(props.selector, CustomElement);
        return <typeof Target>CustomElement;
    };
}
