import {App} from "../App";

export abstract class GameState {
    constructor(protected app: App) {
    }

    abstract execute(): void;
}