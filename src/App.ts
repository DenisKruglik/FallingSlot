import * as PIXI from 'pixi.js'
import {Button} from "./ui/Button";

export class App {
    readonly app: PIXI.Application;

    constructor() {
        this.app = new PIXI.Application();
    }

    run(): void {
        document.body.appendChild(this.app.view);
        this.enterFullscreen();
        this.addSpinButton();
    }

    private enterFullscreen(): void {
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    private addSpinButton() {
        new Button(this.app);
    }
}