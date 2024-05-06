import { Component, Fragment, h } from "@stencil/core";

@Component({
    tag: 'emerson-circles',
    styleUrl: 'EmersonCircles.scss',
    scoped: true
})
export class EmersonCirclesLoader {
    render() {
        return (
            <Fragment>
                
                <div class="circles__wrapper">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                </div>
            </Fragment>
        )
    };
}