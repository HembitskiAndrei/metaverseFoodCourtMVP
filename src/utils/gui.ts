import {Image} from "@babylonjs/gui/2D/controls/image";
import {Rectangle} from "@babylonjs/gui/2D/controls/rectangle";
import {Control} from "@babylonjs/gui/2D/controls/control";
import {AdvancedDynamicTexture} from "@babylonjs/gui/2D/advancedDynamicTexture";
import {
  DEFAULT_COLOR_BACKGROUND,
  DEFAULT_COLOR_BORDER,
  SHADOW_COLOR_BORDER,
} from "./constants";
import {TInfoConfig} from "../types";

export const createAdvancedTextureForGUI = (name: string) => {
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(name);
  advancedTexture.idealHeight = 600;
  return advancedTexture;
};

export const AddInfoPopUp = (
  config: TInfoConfig,
  advancedTexture: AdvancedDynamicTexture
) => {
  const cnf = config || {
    titleText: "unknown",
    text: "unknown",
    width: "240px",
    height: "100px",
  };

  const container = new Rectangle();
  container.width = cnf.width;
  container.height = cnf.height;
  container.left = "-20px";
  container.top = "20px";
  container.scaleX = 0;
  container.scaleY = 0;
  container.transformCenterX = 1;
  container.transformCenterY = 0;
  container.cornerRadius = 10;
  container.color = DEFAULT_COLOR_BORDER;
  container.thickness = 4;
  container.background = DEFAULT_COLOR_BACKGROUND;
  container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  container.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  container.shadowColor = SHADOW_COLOR_BORDER;
  container.shadowBlur = 50;
  advancedTexture.addControl(container);

  const img = new Image("", cnf.imageURL);
  img.width = 1;
  img.height = 1;
  img.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  img.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  container.addControl(img);

  return container
};
