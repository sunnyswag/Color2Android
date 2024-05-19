import { PluginUIEvent, UIEventMsgType } from "model";
import { IEventProcessor } from "./iEventProcessor";

export class GetColorCodeProcessor implements IEventProcessor {
  messageType = UIEventMsgType.GetColorCode;

  async process(_event: PluginUIEvent) {
    
  }
}