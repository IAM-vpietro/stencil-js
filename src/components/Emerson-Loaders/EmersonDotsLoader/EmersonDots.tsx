import { Component, Fragment, h } from "@stencil/core";

@Component({
    tag: 'emerson-dots',
    styleUrl: 'EmersonDots.scss',
    scoped: true
})
export class EmersonDotsLoader {
    render() {
        return (
            <Fragment>
                <div class="dots__wrapper">
                    <div class="dot-flashing"></div>
                    {/* <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div> */}
                </div>
            </Fragment>
        )
    };
}