import {Drawable} from "./Drawable";
import * as PIXI from 'pixi.js';

export abstract class DrawableObject implements Drawable {
    protected constructor(protected app: PIXI.Application) {
    }

    abstract show(): void;
}