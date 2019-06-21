import {DrawableObject} from "./DrawableObject";
import {TextureMap} from "./ui/TextureMap";
import * as PIXI from "pixi.js";
import {SymbolValue} from "../logic/SymbolValue";
import {MovingObject} from "./MovingObject";

export class SymbolContainer extends DrawableObject {
    static readonly SYMBOL_ROWS = 3;
    static readonly SYMBOLS_PER_ROW = 5;
    static readonly SYMBOL_WIDTH = 200;
    static readonly SYMBOL_HEIGHT = 200;

    private static textures: TextureMap = {};
    private static isTextureMapInited: boolean = false;
    private static baseTexturePath = 'images/symbols/symbol_';

    readonly container: PIXI.Container;

    constructor(app: PIXI.Application) {
        super(app);
        this.container = new PIXI.Container();
        if (!SymbolContainer.isTextureMapInited) {
            SymbolContainer.initTextureMap();
        }
    }

    show(): void {
        this.container.x = 10;
        this.container.y = 10;
        for (let i = 0; i < SymbolContainer.SYMBOL_ROWS; i++) {
            for (let j = 0; j < SymbolContainer.SYMBOLS_PER_ROW; j++) {
                let symbol = new MovingObject(SymbolContainer.getRandomTexture());
                symbol.width = SymbolContainer.SYMBOL_WIDTH;
                symbol.height = SymbolContainer.SYMBOL_HEIGHT;
                symbol.x = SymbolContainer.SYMBOL_WIDTH * j;
                symbol.y = (SymbolContainer.SYMBOL_HEIGHT * SymbolContainer.SYMBOL_ROWS - SymbolContainer.SYMBOL_HEIGHT)
                    - (SymbolContainer.SYMBOL_HEIGHT * i);
                this.container.addChild(symbol);
            }
        }
        this.app.stage.addChild(this.container);
    }

    private static initTextureMap(): void {
        Object.values(SymbolValue).filter(value => !isNaN(parseInt(value))).forEach(((value: SymbolValue) => {
            SymbolContainer.textures[SymbolValue[value]] = PIXI.Loader.shared.resources[SymbolContainer.getTexturePath(value)].texture;
        }));
        SymbolContainer.isTextureMapInited = true;
    }

    private static getRandomTexture(): PIXI.Texture {
        let allowedValues = Object.values(SymbolValue).filter(value => typeof value === 'number');
        let value: SymbolValue = allowedValues[Math.floor(Math.random() * allowedValues.length)];
        return PIXI.Loader.shared.resources[SymbolContainer.getTexturePath(value)].texture;
    }

    private static getTexturePath(value: SymbolValue): string {
        return SymbolContainer.baseTexturePath + value + '.png';
    }
}