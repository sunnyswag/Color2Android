import { defaultUIStateData } from "./defaultConfig";
import { UIStateData } from "./uiState";

export let curUIStateData: UIStateData = defaultUIStateData;

export const updateCurUIStateData = (data: UIStateData) => {
  curUIStateData = data;
}

export const restoreUIState = () => {
  curUIStateData = defaultUIStateData;
}