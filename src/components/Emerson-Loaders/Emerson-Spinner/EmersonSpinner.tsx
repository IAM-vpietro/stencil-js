import { Component, Fragment, Prop, State, Watch, h } from "@stencil/core";
import { MdCircularProgress } from "@material/web/progress/circular-progress";

@Component({
    tag: 'emerson-spinner',
    styleUrl: 'EmersonSpinner.scss',
    scoped: true
})
export class EmersonSpinner {

    private _id = Math.random().toString(36).substring(7);
    @Prop({ mutable: true }) value: number = 0;
    @Prop({ mutable: true }) darkmode: boolean = false;
    @State() private _isDarkMode: boolean;
    protected _md = new MdCircularProgress();

    connectedCallback() {
        this._checkDarkModeProp(this.darkmode);
    }

    @Watch('darkmode')
    darkmodeHandler(newValue: boolean, oldValue: boolean) {
        if(newValue !== oldValue) {
            this._checkDarkModeProp(newValue);
        }
    }

    @Watch('value')
    valueHandler(newValue: number, oldValue: number) {
        if(newValue !== oldValue) {
            this._updateValue(newValue);
        }
    }

    private _checkDarkModeProp(darkmode: boolean) {
        setTimeout(() => {
            const component = document.getElementById(this._id);
            const circularProgressTag = component.querySelectorAll('md-circular-progress');
            circularProgressTag.forEach((tag) => {
                const shadowRoot = tag.shadowRoot;
    
                const svg = shadowRoot.querySelector('div').querySelector('svg');
                const indeterminate = shadowRoot.querySelector('div').querySelector('.spinner');
                const circleColor = darkmode ? '#05AFF8' : '#0764A8';
    
                if(indeterminate) { 
                    const left = indeterminate.querySelector('.left').querySelector('.circle') as HTMLElement;
                    const right = indeterminate.querySelector('.right').querySelector('.circle') as HTMLElement;
                    right.style.borderColor = 'transparent';
                    left.style.borderColor = circleColor;
                }

                if(svg) {
                  const circle = svg.querySelector('.active-track') as HTMLElement;
                  circle.style.stroke = circleColor;               
                }  
            })
        }, 100);
        this._isDarkMode = darkmode;
    }

    private _updateValue(value: number) {
        if(value >= 1) value = 1;
        this.value = value;
        
    }


    render() {
        return (
            <Fragment>
                <div id={this._id}>
                <md-circular-progress value={this.value}></md-circular-progress>
                <md-circular-progress indeterminate></md-circular-progress>
                </div>
            </Fragment>
        )
    }
}