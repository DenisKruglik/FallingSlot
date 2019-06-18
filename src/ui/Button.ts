import * as PIXI from 'pixi.js'
import {ButtonState} from "./ButtonState";
import {TextureMap} from "./TextureMap";
import {Drawable} from "../Drawable";

export class Button implements Drawable{
    readonly baseTexturePath: string = 'images/ui/btn_spin_';

    private sprite: PIXI.Sprite | undefined;

    private textures: TextureMap = {};

    constructor(private app: PIXI.Application) {
        PIXI.Loader.shared.add(Object.values(ButtonState).map(this.getTexturePath.bind(this)))
            .load(this.setup.bind(this));
    }

    private setup(): void {
        Object.values(ButtonState).forEach(((value: ButtonState) => {
            this.textures[value] = PIXI.Loader.shared.resources[this.getTexturePath(value)].texture;
        }));
        this.sprite = new PIXI.Sprite(this.textures[ButtonState.NORMAL]);
        this.show();
    }

    private getTexturePath(state: ButtonState): string {
        return this.baseTexturePath + state + '.png';
    }

    show(): void {
        if (this.sprite !== undefined) {
            this.app.stage.addChild(this.sprite);
        }
    }
}