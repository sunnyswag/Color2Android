export type PluginUIEvent = {
	msgType: UIEventMsgType,
	colorCodeType: CodeType
	// extra ui event info
}

export enum UIEventMsgType {
	GetColorCode,
	CopyToClipboard,
	InitPlugin
	// another ui event message type
}

export enum CodeType {
	XmlResource,
	Compose
}