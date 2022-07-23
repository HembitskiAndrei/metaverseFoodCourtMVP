import {
  AdvancedDynamicTexture,
  Control,
  Rectangle,
  TextBlock,
  TextWrapping,
  Image
} from "@babylonjs/gui";
import {
  DEFAULT_COLOR_BACKGROUND,
  DEFAULT_COLOR_BORDER,
  SHADOW_COLOR_BORDER,
  TEXT_COLOR,
} from "./constants";
import {TInfoConfig} from "../types";

export const createAdvancedTextureForGUI = (name: string) => {
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(name);
  advancedTexture.idealWidth = 800;
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

  const titleText = new TextBlock();
  titleText.paddingTopInPixels = 5;
  titleText.text = cnf.titleText;
  titleText.color = TEXT_COLOR;
  titleText.fontSize = 16;
  titleText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  titleText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  container.addControl(titleText);

  const infoText = new TextBlock();
  infoText.paddingLeftInPixels = 80;
  infoText.paddingRightInPixels = 5;
  infoText.paddingTopInPixels = 35;
  infoText.paddingBottomInPixels = 5;
  infoText.text = cnf.text;
  infoText.color = TEXT_COLOR;
  infoText.fontSize = 11;
  // infoText.resizeToFit = true;
  infoText.textWrapping = TextWrapping.WordWrap;
  infoText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  infoText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  container.addControl(infoText);

  const imageContainer = new Rectangle();
  imageContainer.width = "60px";
  imageContainer.height = "60px";
  imageContainer.left = "5px";
  imageContainer.top = "30px";
  imageContainer.cornerRadius = 5;
  imageContainer.color = TEXT_COLOR;
  imageContainer.thickness = 2;
  imageContainer.background = DEFAULT_COLOR_BACKGROUND;
  imageContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  imageContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  container.addControl(imageContainer);

  const img = new Image("", cnf.imageURL);
  img.width = 1;
  img.height = 1;
  img.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  img.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
  imageContainer.addControl(img);

  return {
    container,
    infoText,
  };
};
