import type { Vector3 } from "@babylonjs/core/Maths/math.vector";
export interface IInstanceConfig {
    index: string;
    position: Vector3;
    size: Vector3;
}
export declare type TInfoConfig = {
    titleText: string;
    text: string;
    width: string;
    height: string;
    imageURL?: string;
};
