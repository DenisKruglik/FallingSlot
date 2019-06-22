import {SymbolFall} from "./SymbolFall";
import {MovingObject} from "../game_objects/MovingObject";
import {GameState} from "./GameState";
import {FallToStage} from "./FallToStage";
import {App} from "../App";

export class FallDown extends SymbolFall {
    protected getNextState(): GameState {
        return new FallToStage(this.app);
    }

    protected isFinishedMoving(symbol: MovingObject): boolean {
        return symbol.getGlobalPosition().y >= App.CANVAS_HEIGHT;
    }

    protected onSymbolFinishedMoving(): void {
    }
}