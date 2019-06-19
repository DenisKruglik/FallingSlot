import * as PIXI from 'pixi.js'
import {ButtonState} from "./ButtonState";
import {TextureMap} from "./TextureMap";
import {App} from "../../App";
import {DrawableObject} from "../DrawableObject";

export class Button extends DrawableObject{
    private static baseTexturePath: string = 'images/ui/btn_spin_';

    private textures: TextureMap = {};

    private container: PIXI.Container;

    private state: ButtonState = ButtonState.NORMAL;

    constructor(app: PIXI.Application) {
        super(app);
        this.container = new PIXI.Container();
        Object.values(ButtonState).forEach(((value: ButtonState) => {
            this.textures[value] = PIXI.Loader.shared.resources[Button.getTexturePath(value)].texture;
        }));
    }

    protected getDefaultTextureName(): string {
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
        this.app.stage.addChild(this.container);
    }
}