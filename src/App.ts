import * as PIXI from 'pixi.js'
import {Button} from "./game_objects/ui/Button";

export class App {
    readonly app: PIXI.Application;
    static readonly CANVAS_WIDTH = 1024;
    static readonly CANVAS_HEIGHT = 768;

    private spinButton: Button | undefined;

    constructor() {
        this.app = new PIXI.Application({
            width: App.CANVAS_WIDTH,
            height: App.CANVAS_HEIGHT
        });
    }

    run(): void {
        document.body.appendChild(this.app.view);
        PIXI.Loader.shared.add([
            'images/ui/btn_spin_disabled.png',
            'images/ui/btn_spin_hover.png',
            'images/ui/btn_spin_normal.png',
            'images/ui/btn_spin_pressed.png',
            'images/symbols/symbol_1.png',
            'images/symbols/symbol_2.png',
            'images/symbols/symbol_3.png',
            'images/symbols/symbol_4.png',
            'images/symbols/symbol_5.png',
            'images/symbols/symbol_6.png',
            'images/symbols/symbol_7.png',
            'images/symbols/symbol_8.png'
        ]).load(this.setup.bind(this));
    }

    private setup(): void {
        this.buildScene();
        this.app.ticker.add(delta => this.gameLoop(delta))
    }

    private buildScene(): void {
        this.addSpinButton();
    }

    private addSpinButton(): void {
        this.spinButton = new Button(this.app);
        this.spinButton.show();
    }

    private gameLoop(delta: number): void {

    }
}