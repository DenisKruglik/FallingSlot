import {GameState} from "./GameState";
import {App} from "../App";
import {SymbolContainer} from "../game_objects/SymbolContainer";
import {MovingObject} from "../game_objects/MovingObject";

export abstract class SymbolFall extends GameState {
    protected symbolContainer: PIXI.Container;
    protected isInited: boolean = false;
    protected finishedMoving: Array<Array<boolean>> = [];
    protected allowedToMove: Array<Array<boolean>> = [];
    protected allowedRows: Array<boolean> = [];

    constructor(app: App) {
        super(app);
        this.symbolContainer = (app.symbols as SymbolContainer).container;
    }

    execute(): void {
        if (!this.isInited) {
            this.init();
        }
        let allFinished = true;
        for (let i = 0; i < SymbolContainer.SYMBOL_ROWS; i++) {
            if (this.allowedRows[i]) {
                for (let j = 0; j < SymbolContainer.SYMBOLS_PER_ROW; j++) {
                    if (this.allowedToMove[i][j]) {
                        if (!this.finishedMoving[i][j]) {
                            allFinished = false;
                            let ind = SymbolContainer.SYMBOLS_PER_ROW * i + j;
                            let symbol = this.symbolContainer.children[ind] as MovingObject;
                            symbol.vy += App.SLOT_ACCELERATION;
                            symbol.y += symbol.vy;
                            if (this.isFinishedMoving(symbol)) {
                                this.finishedMoving[i][j] = true;
                                symbol.vy = 0;
                                this.onSymbolFinishedMoving(symbol);
                            }
                        }
                    } else {
                        allFinished = false;
                    }
                }
            } else {
                allFinished = false;
            }
        }
        if (allFinished) {
            this.onFinished();
        }
    }

    protected init(): void {
        for (let i = 0; i < SymbolContainer.SYMBOL_ROWS; i++) {
            let allowedRow: Array<boolean> = [];
            for (let j = 0; j < SymbolContainer.SYMBOLS_PER_ROW; j++) {
                allowedRow.push(false);
            }
            this.allowedToMove.push(allowedRow);
        }
        for (let i = 0; i < SymbolContainer.SYMBOL_ROWS; i++) {
            let finishedRow: Array<boolean> = [];
            for (let j = 0; j < SymbolContainer.SYMBOLS_PER_ROW; j++) {
                finishedRow.push(false);
            }
            this.finishedMoving.push(finishedRow);
        }
        for (let i = 0; i < SymbolContainer.SYMBOL_ROWS; i++) {
            this.allowedRows.push(false);
        }
        let currentRow = 0;
        let rowsInterval = setInterval((() => {
            this.allowedRows[currentRow] = true;
            let currentSymbol = 0;
            let rowInterval = setInterval((function (row: number) {
                // @ts-ignore
                this.allowedToMove[row][currentSymbol] = true;
                currentSymbol++;
                if (currentSymbol === SymbolContainer.SYMBOLS_PER_ROW) {
                    clearInterval(rowInterval);
                }
            }).bind(this, currentRow), App.DELAY_BETWEEN_SYMBOLS);
            currentRow++;
            if (currentRow === SymbolContainer.SYMBOL_ROWS) {
                clearInterval(rowsInterval);
            }
        }).bind(this), App.DELAY_BETWEEN_ROWS);
        this.isInited = true;
    }

    protected abstract isFinishedMoving(symbol: MovingObject): boolean;

    protected abstract getNextState(): GameState;

    protected abstract onSymbolFinishedMoving(symbol: MovingObject): void;

    protected onFinished(): void {
        this.app.setGameState(this.getNextState());
    }
}