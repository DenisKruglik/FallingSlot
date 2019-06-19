import {Drawable} from "./Drawable";
import * as PIXI from 'pixi.js';

export abstract class DrawableObject implements Drawable{
    protected sprite: PIXI.Sprite;

    protected constructor(protected app: PIXI.Application) {
        this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources[this.getDefaultTextureName()].texture);
    }

    protected abstract getDefaultTextureName(): string;

    abstract show(): void;
}