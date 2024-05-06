import { Component, Fragment, Prop, State, Watch, h } from "@stencil/core";
import { SizeEnum } from "../../../utils/enums/Size";

@Component({
    tag: 'emerson-progress-bar',
    styleUrl: 'EmersonProgressBar.scss',
    scoped: true
})
export class EmersonProgressBar {
    private _id: string = Math.random().toString(36).substring(2, 9);
    @Prop({ mutable: true}) size: SizeEnum = SizeEnum.MEDIUM;
    @Prop({ mutable: true }) label: boolean = false;
    @Prop({ mutable: true }) progress: number = 0;
    @Prop({ mutable: true }) headertext: string;
    @State() private _handleProgress: number;
    @State() private _isLabel: boolean;
    @State() private _isHeaderText: boolean;
    
    @Watch('progress') 
    watchPropHandler(newValue: number, oldValue: number) {
        if(newValue !== oldValue) {
            this.progress = Number(newValue.toFixed(2));
            this._updateValue(this._roundValue(this.progress));
        }
    }

    componentWillLoad() {   
        this._checkValuePercentage(this.progress);
        this._checkLabelProp(this.label);
        this._checkHeaderText(this.headertext);
        this._updateValue(this.progress);
    }

    private _checkValuePercentage(progress: number): void {
        if(progress <= 1) return;
    
        const length = progress.toString().length;
        this.progress = progress / (10 * (length - 1));
    }
    
    private _checkHeaderText(headerText): void { 
        this._isHeaderText = headerText;
    }

    private _checkLabelProp(label): void {
        this._isLabel = label;
    }

    private _updateValue(progress: number) {
        this._handleProgress = progress;

        setTimeout(() => {
            const id = document.getElementById(this._id);
            let progressBar = id.querySelector('.progress-bar') as HTMLElement;
            let progressBg = id.querySelector('.progress-bg') as HTMLElement;
            progressBar.style.width = (this._handleProgress*100) + '%';
            progressBg.style.width = (99.9 - (this._handleProgress*100)) + '%'; 
        }, 100)
    }

    private _roundValue(progress: number): number {
        if (progress <= 0.1) return 0.1;
        if (progress <= 0.3) return 0.3;
        if (progress <= 0.5) return 0.5;
        if (progress <= 0.8) return 0.8;
        return 1; 
    }

    render() {
        return (
            <Fragment>
                <div class="progress__wrapper" id={this._id}>
                    {this._isHeaderText && <emerson-header-text>{this.headertext}</emerson-header-text>}

                    <div class="container">
                        <div class="inner" style={{
                            'width': this.size === SizeEnum.MEDIUM ? '404px' : '700.69px',
                        }}>
                            <div class="progress-container" style={{
                                'height': this.size === SizeEnum.MEDIUM ? '4px' : '7px',
                                
                            }}>
                            <div class="progress-bg"></div>
                            <div class="progress-bar" id="progressBar"></div>
                            </div>
                
                            <span class="end__point" style={{
                                'height': this.size === SizeEnum.MEDIUM ? '4px' : '7px',
                                'width': this.size === SizeEnum.MEDIUM ? '4px' : '7px',
                            }}></span>
                        </div>

                        {this._isLabel && <div class="progress__label">
                            <span style={{
                                'fontSize': this.size === SizeEnum.MEDIUM ? '12px' : '16px',
                                'width': '24px'
                                }}>
                            {this.size === SizeEnum.MEDIUM && <span>{(this._handleProgress*100).toFixed(0)}%</span>}
                            {this.size === SizeEnum.LARGE && <span>{(this._handleProgress*100).toFixed(0)}/100</span>}
                                </span>
                        </div>}
                    </div>
                    
                </div>
            </Fragment>
        )
    };
}