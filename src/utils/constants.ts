import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export const TRIGGER_CONFIGS = [
  {
    index: "Pizza",
    position: new Vector3(-1.2, 0, 0.8),
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
    index: "menu",
    position: new Vector3(-0.4, 0, -1.5),
    size: new Vector3(0.5, 0.5, 0.5),
  },
]
export const MENU_CONFIGS = {
  bread: {
    titleText: "Bread",
    text: "-   Pack my box with five dozen liquor jugs.\n-    Cozy sphinx waves quart jug of bad milk.",
    width: "200px",
    height: "100px",
    imageURL: "./assets/textures/bread.jpg"
  },
  Pizza: {
    titleText: "Pizza",
    text: "-   Pack my box with five dozen liquor jugs.\n-  Cozy sphinx waves quart jug of bad milk.",
    width: "200px",
    height: "100px",
    imageURL: "./assets/textures/Pizza.jpg"
  },
  dish: {
    titleText: "Soup",
    text: "-   Pack my box with five dozen liquor jugs.\n-    Cozy sphinx waves quart jug of bad milk.",
    width: "200px",
    height: "100px",
    imageURL: "./assets/textures/dish.jpg"
  },
  menu: {
    titleText: "Drinks",
    text: "-   Pack my box with five dozen liquor jugs.\n-    Cozy sphinx waves quart jug of bad milk.",
    width: "200px",
    height: "100px",
    imageURL: "./assets/textures/menu.jpg"
  },
}

export const LABEL_ANIMATION_DURATION = 250;

export const DEFAULT_COLOR_BORDER = "#1d1d1d";

export const SHADOW_COLOR_BORDER = "#ffffff";

export const DEFAULT_COLOR_BACKGROUND = "#40404099";

export const TEXT_COLOR = "#ffffff";


