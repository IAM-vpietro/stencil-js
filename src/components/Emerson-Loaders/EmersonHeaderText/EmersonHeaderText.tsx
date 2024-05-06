import { Component, Fragment, h } from "@stencil/core";

@Component({
    tag: 'emerson-header-text',
    styleUrl: 'EmersonHeaderText.scss',
    scoped: true
})
export class EmersonSpinner {

    render() {
        return (
            <Fragment>
                <slot></slot>
            </Fragment>
        )
    };
}