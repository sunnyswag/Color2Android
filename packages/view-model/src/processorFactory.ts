import { CopyToClipboardProcessor } from "./copyToClipboardProcessor";
import { InitPluginProcessor } from "./initPluginProcessor";
import { GetColorCodeProcessor } from "./getColorCodeProcessor";
import { IEventProcessor } from "./iEventProcessor";
import { PluginUIEvent, UIEventMsgType, curUIStateData } from "model";

export class ProcessorFactory {

  private static processors = [
    new CopyToClipboardProcessor(),
    new InitPluginProcessor(),
    new GetColorCodeProcessor(),
    // another msg processor
  ].reduce(
    (map, processor) => map.set(processor.messageType, processor),
    new Map<UIEventMsgType, IEventProcessor>
  )

  static async doProcess(event: PluginUIEvent) {
    const needNotifyUI = await ProcessorFactory.processors.get(event.msgType)?.process(event);
    if (needNotifyUI === undefined || needNotifyUI === true) {
      figma.ui.postMessage(curUIStateData)
    }
  }
}