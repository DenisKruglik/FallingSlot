import {DrawableObject} from "./DrawableObject";
import {TextureMap} from "./ui/TextureMap";
import * as PIXI from "pixi.js";
import {SlotValue} from "../logic/SlotValue";

export class SlotContainer extends DrawableObject {
    static readonly SLOT_ROWS = 3;
    static readonly SLOTS_PER_ROW = 5;
    static readonly SLOT_WIDTH = 200;
    static readonly SLOT_HEIGHT = 200;

    private static textures: TextureMap = {};
    private static isTextureMapInited: boolean = false;
    private static baseTexturePath = 'images/symbols/symbol_';

    readonly container: PIXI.Container;

    constructor(app: PIXI.Application) {
        super(app);
        this.container = new PIXI.Container();
        if (!SlotContainer.isTextureMapInited) {
            SlotContainer.initTextureMap();
        }
    }

    show(): void {
        this.container.x = 12;
        this.container.y = 10;
        for (let i = 0; i < SlotContainer.SLOT_ROWS; i++) {
            for (let j = 0; j < SlotContainer.SLOTS_PER_ROW; j++) {
                let slot = new PIXI.Sprite(SlotContainer.getRandomTexture());
                slot.width = SlotContainer.SLOT_WIDTH;
                slot.height = SlotContainer.SLOT_HEIGHT;
                slot.x = SlotContainer.SLOT_WIDTH * j;
                slot.y = (SlotContainer.SLOT_HEIGHT * SlotContainer.SLOT_ROWS - SlotContainer.SLOT_HEIGHT)
                    - (SlotContainer.SLOT_HEIGHT * i);
                this.container.addChild(slot);
            }
        }
        this.app.stage.addChild(this.container);
    }

    private static initTextureMap(): void {
        Object.values(SlotValue).filter(value => !isNaN(parseInt(value))).forEach(((value: SlotValue) => {
            SlotContainer.textures[SlotValue[value]] = PIXI.Loader.shared.resources[SlotContainer.getTexturePath(value)].texture;
        }));
        SlotContainer.isTextureMapInited = true;
    }

    private static getRandomTexture(): PIXI.Texture {
        let allowedValues = Object.values(SlotValue).filter(value => typeof value === 'number');
        let value: SlotValue = allowedValues[Math.floor(Math.random() * allowedValues.length)];
        return PIXI.Loader.shared.resources[SlotContainer.getTexturePath(value)].texture;
    }

    private static getTexturePath(value: SlotValue): string {
        return SlotContainer.baseTexturePath + value + '.png';
    }
}