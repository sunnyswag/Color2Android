import { CodeType, PluginUIEvent, UIEventMsgType } from "./uiEvent";
import { UIStateData } from "./uiState";

export const defaultUIStateData: UIStateData = {
	codeType: CodeType.XmlResource,
	code: "// select nodes to get config code"
}

export const defaultPluginEvent: PluginUIEvent = {
	msgType: UIEventMsgType.GetColorCode,
	colorCodeType: CodeType.XmlResource
}