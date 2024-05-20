import { PluginUIEvent, UIEventMsgType, curUIStateData, updateCurUIStateData } from "model";
import { IEventProcessor } from "./iEventProcessor";
import { genCode } from "gen-code";

export class GetColorCodeProcessor implements IEventProcessor {
  messageType = UIEventMsgType.GetColorCode;

  async process(event: PluginUIEvent) {
    const codeRes = genCode(event.colorCodeType)
    updateCurUIStateData({
      codeType: event.colorCodeType,
      code: codeRes
    })
  }
}