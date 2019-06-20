import * as PIXI from 'pixi.js'
import {ButtonState} from "./ButtonState";
import {TextureMap} from "./TextureMap";
import {App} from "../../App";
import {DrawableObject} from "../DrawableObject";

export class Button extends DrawableObject {
    private static baseTexturePath: string = 'images/ui/btn_spin_';
    private static textures: TextureMap = {};
    private static isTextureMapInited: boolean = false;

    protected sprite: PIXI.Sprite;
    readonly container: PIXI.Container;
    private state: ButtonState = ButtonState.NORMAL;

    constructor(app: PIXI.Application) {
        super(app);
        this.container = new PIXI.Container();
        this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources[Button.getDefaultTextureName()].texture);
        if (!Button.isTextureMapInited) {
            Button.initTextureMap();
        }
    }

    private static initTextureMap(): void {
        Object.values(ButtonState).forEach(((value: ButtonState) => {
            Button.textures[value] = PIXI.Loader.shared.resources[Button.getTexturePath(value)].texture;
        }));
        Button.isTextureMapInited = true;
    }

    protected static getDefaultTextureName(): string {
        return Button.getTexturePath(ButtonState.NORMAL);
    }

    private static getTexturePath(state: ButtonState): string {
        return Button.baseTexturePath + state + '.png';
    }

    show(): void {
        this.container.addChild(this.sprite);
        this.container.scale.x = 0.75;
        this.container.scale.y = 0.75;
        this.container.x = (App.CANVAS_WIDTH / 2) - (this.container.width / 2);
        this.container.y = App.CANVAS_HEIGHT - this.container.height;
        let style = new PIXI.TextStyle({
            fontFamily: "Indie Flower",
            fontSize: 36,
            fill: "white",
            stroke: '#974e1f',
            strokeThickness: 4
        });
        let text = new PIXI.Text("Spin", style);
        text.pivot.set(0.5, 0.5);
        text.y = this.container.height / 4;
        text.x = this.container.width / 2;
        this.container.addChild(text);
        this.initHandlers();
        this.app.stage.addChild(this.container);
    }

    private initHandlers(): void {
        this.sprite.interactive = true;
        this.sprite.addListener('mouseover', e => {
            if (this.state !== ButtonState.HOVER && this.state !== ButtonState.DISABLED) {
                this.setState(ButtonState.HOVER);
            }
        });
        this.sprite.addListener('mousedown', e => {
            if (this.state !== ButtonState.PRESSED && this.state !== ButtonState.DISABLED) {
                this.setState(ButtonState.PRESSED);
            }
        });
        this.sprite.addListener('mouseout', e => {
            if (this.state === ButtonState.PRESSED || this.state === ButtonState.HOVER) {
                this.setState(ButtonState.NORMAL);
            }
        });
        this.sprite.addListener('mouseup', e => {
            if (this.state === ButtonState.PRESSED) {
                this.setState(ButtonState.DISABLED);
            }
        });
    }

    setState(state: ButtonState): void {
        this.state = state;
        this.sprite.texture = Button.textures[state];
    }

    setOnClick(func: ((e: PIXI.interaction.InteractionEvent) => void)): void {
        this.sprite.addListener('click', func);
    }
}