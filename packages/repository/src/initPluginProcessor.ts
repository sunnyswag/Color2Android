import { PluginUIEvent, UIEventMsgType } from "model";
import { IEventProcessor } from "./iEventProcessor";

export class InitPluginProcessor implements IEventProcessor {
  messageType = UIEventMsgType.InitPlugin;

  async process(_event: PluginUIEvent) {
    
  }
}