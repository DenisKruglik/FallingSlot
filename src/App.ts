import * as PIXI from 'pixi.js'
import {Button} from "./game_objects/ui/Button";
import {SymbolContainer} from "./game_objects/SymbolContainer";
import {GameState} from "./logic/GameState";
import {Wait} from "./logic/Wait";
import {Sound} from "./sound/Sound";
import {FallDown} from "./logic/FallDown";
import {ButtonState} from "./game_objects/ui/ButtonState";

export class App {
    readonly app: PIXI.Application;
    static readonly CANVAS_WIDTH = 1024;
    static readonly CANVAS_HEIGHT = 768;

    private spinButton: Button | undefined;
    private symbolContainer: SymbolContainer | undefined;
    private gameState: GameState;
    private sound: Sound = new Sound();

    constructor() {
        this.app = new PIXI.Application({
            width: App.CANVAS_WIDTH,
            height: App.CANVAS_HEIGHT
        });
        this.gameState = new Wait(this);
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
        this.addSymbols();
    }

    private addSpinButton(): void {
        this.spinButton = new Button(this.app);
        this.spinButton.show();
        this.spinButton.setOnClick(e => {
            // @ts-ignore
            if (this.spinButton.getState() !== ButtonState.DISABLED) {
                this.sound.playButtonClickSound();
                this.gameState = new FallDown(this);
                // @ts-ignore
                this.spinButton.setState(ButtonState.DISABLED);
            }
        });
    }

    private addSymbols(): void {
        this.symbolContainer = new SymbolContainer(this.app);
        this.symbolContainer.show();
    }

    private gameLoop(delta: number): void {
        this.gameState.execute();
    }

    get button(): Button | undefined {
        return this.spinButton;
    }

    get symbols(): SymbolContainer | undefined {
        return this.symbolContainer;
    }

    setGameState(state: GameState) {
        this.gameState = state;
    }
}