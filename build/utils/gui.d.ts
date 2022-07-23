import { AdvancedDynamicTexture, Rectangle, TextBlock } from "@babylonjs/gui";
import { TInfoConfig } from "../types";
export declare const createAdvancedTextureForGUI: (name: string) => AdvancedDynamicTexture;
export declare const AddInfoPopUp: (config: TInfoConfig, advancedTexture: AdvancedDynamicTexture) => {
    container: Rectangle;
    infoText: TextBlock;
};
