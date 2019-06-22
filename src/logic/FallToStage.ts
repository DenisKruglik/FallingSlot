import {GameState} from "./GameState";
import {SymbolFall} from "./SymbolFall";
import {MovingObject} from "../game_objects/MovingObject";
import {Wait} from "./Wait";
import {SymbolContainer} from "../game_objects/SymbolContainer";
import {ButtonState} from "../game_objects/ui/ButtonState";
import {Button} from "../game_objects/ui/Button";
import * as PIXI from 'pixi.js';

export class FallToStage extends SymbolFall {
    protected getNextState(): GameState {
        return new Wait(this.app);
    }

    protected isFinishedMoving(symbol: MovingObject): boolean {
        let finalY = this.getFinalY(symbol);
        return symbol.y >= finalY;
    }

    protected onSymbolFinishedMoving(symbol: MovingObject): void {
        this.app.sounds.playRandomReelStopSound();
        symbol.y = this.getFinalY(symbol);
    }

    protected init(): void {
        for (let i = 0; i < SymbolContainer.SYMBOL_ROWS; i++) {
            for (let j = 0; j < SymbolContainer.SYMBOLS_PER_ROW; j++) {
                let ind = SymbolContainer.SYMBOLS_PER_ROW * i + j;
                let symbol = this.symbolContainer.children[ind] as MovingObject;
                let globalPosition = new PIXI.Point(symbol.x, SymbolContainer.SYMBOL_HEIGHT * (-1 - i));
                let localPosition = symbol.toLocal(globalPosition, this.symbolContainer);
                symbol.y = localPosition.y;
                symbol.texture = SymbolContainer.getRandomTexture();
            }
        }
        super.init();
    }

    protected onFinished(): void {
        super.onFinished();
        (this.app.button as Button).setState(ButtonState.NORMAL);
    }

    private getFinalY(symbol: MovingObject): number {
        let ind = this.symbolContainer.children.indexOf(symbol);
        let rowInd = Math.floor(ind / SymbolContainer.SYMBOLS_PER_ROW);
        return (SymbolContainer.SYMBOL_ROWS - 1 - rowInd) * SymbolContainer.SYMBOL_HEIGHT;
    }
}