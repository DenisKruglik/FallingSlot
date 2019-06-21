import {GameState} from "./GameState";
import {SymbolContainer} from "../game_objects/SymbolContainer";
import {App} from "../App";
import {FallToStage} from "./FallToStage";
import {MovingObject} from "../game_objects/MovingObject";

export class FallDown extends GameState{
    static readonly DELAY_BETWEEN_ROWS = 200;
    static readonly DELAY_BETWEEN_SYMBOLS = 100;
    static readonly SLOT_ACCELERATION = 10;

    private symbolContainer: PIXI.Container;
    private isInited: boolean = false;
    private finishedMoving: Array<Array<boolean>> = [];
    private allowedToMove: Array<Array<boolean>> = [];
    private allowedRows: Array<boolean> = [];

    constructor(app: App) {
        super(app);
        // @ts-ignore
        this.symbolContainer = app.symbols.container;
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
                            let slot = this.symbolContainer.children[ind] as MovingObject;
                            slot.vy += FallDown.SLOT_ACCELERATION;
                            slot.y += slot.vy;
                            if (slot.getGlobalPosition().y >= App.CANVAS_HEIGHT) {
                                this.finishedMoving[i][j] = true;
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
            this.app.setGameState(new FallToStage(this.app));
        }
    }

    private init(): void {
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
            }).bind(this, currentRow), FallDown.DELAY_BETWEEN_SYMBOLS);
            currentRow++;
            if (currentRow === SymbolContainer.SYMBOL_ROWS) {
                clearInterval(rowsInterval);
            }
        }).bind(this), FallDown.DELAY_BETWEEN_ROWS);
        this.isInited = true;
    }
}