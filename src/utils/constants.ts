import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export const TRIGGER_CONFIGS = [
  {
    index: "Pizza",
    position: new Vector3(-1.2, 0, 0.8),
    size: new Vector3(0.5, 0.5, 0.5),
  },
  {
    index: "cake",
    position: new Vector3(-1.2, 0, -1),
    size: new Vector3(0.5, 0.5, 0.5),
  },
  {
    index: "bread",
    position: new Vector3(1.2, 0, -0.7),
    size: new Vector3(0.5, 0.5, 0.5),
  },
  {
    index: "dish",
    position: new Vector3(1.2, 0, 0.8),
    size: new Vector3(0.5, 0.5, 0.5),
  },
  {
    index: "hotDog",
    position: new Vector3(1.2, 0, 2.0),
    size: new Vector3(0.5, 0.5, 0.5),
  },
  {
    index: "cocktail",
    position: new Vector3(-0.4, 0, -1.5),
    size: new Vector3(0.5, 0.5, 0.5),
  },
]

const sizeInfo = {
  width: "440px",
  height: "440px"
}

export const MENU_CONFIGS = {
  bread: {
    width: sizeInfo.width,
    height: sizeInfo.height,
    imageURL: "./assets/textures/bread.jpg"
  },
  cake: {
    width: sizeInfo.width,
    height: sizeInfo.height,
    imageURL: "./assets/textures/cake.jpg"
  },
  Pizza: {
    width: sizeInfo.width,
    height: sizeInfo.height,
    imageURL: "./assets/textures/Pizza.jpg"
  },
  dish: {
    width: sizeInfo.width,
    height: sizeInfo.height,
    imageURL: "./assets/textures/dish.jpg"
  },
  hotDog: {
    width: sizeInfo.width,
    height: sizeInfo.height,
    imageURL: "./assets/textures/hotdog.jpg"
  },
  cocktail: {
    width: sizeInfo.width,
    height: sizeInfo.height,
    imageURL: "./assets/textures/menu.jpg"
  },
}

export const LABEL_ANIMATION_DURATION = 250;

export const DEFAULT_COLOR_BORDER = "#1d1d1d";

export const SHADOW_COLOR_BORDER = "#ffffff";

export const DEFAULT_COLOR_BACKGROUND = "#40404099";

export const TEXT_COLOR = "#ffffff";


