import { PluginUIEvent, UIEventMsgType } from "model";
import { IEventProcessor } from "./iEventProcessor";

export class CopyToClipboardProcessor implements IEventProcessor {
  messageType = UIEventMsgType.CopyToClipboard;

  async process(_event: PluginUIEvent) {
    return false;
  }
}