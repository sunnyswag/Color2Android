import { PluginUIEvent, UIEventMsgType, updateCurUIStateData } from "model";
import { IEventProcessor } from "./iEventProcessor";
import { UIStateKey } from "./copyToClipboardProcessor";

export class InitPluginProcessor implements IEventProcessor {
  messageType = UIEventMsgType.InitPlugin;

  async process(_event: PluginUIEvent) {
    updateCurUIStateData(await figma.clientStorage.getAsync(UIStateKey))
  }
}