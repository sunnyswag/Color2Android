export type UIEvent = {
	msgType: UIEventMsgType,
	colorCodeType: ColorCodeType,
  deleteItemId: string
}

export enum UIEventMsgType {
	GetColorCode,
	CopyToClipboard,
  ToHistoryPage,
  DeleteItem
}

export enum ColorCodeType {
	XmlResource,
	Compose
}