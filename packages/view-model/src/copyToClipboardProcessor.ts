import { PluginUIEvent, UIEventMsgType, curUIStateData } from "model";
import { IEventProcessor } from "./iEventProcessor";

export class CopyToClipboardProcessor implements IEventProcessor {
  messageType = UIEventMsgType.CopyToClipboard;

  async process(_event: PluginUIEvent) {
    await figma.clientStorage.setAsync(UIStateKey, curUIStateData)
    return false;
  }
}

export const UIStateKey = "UIStateKey"