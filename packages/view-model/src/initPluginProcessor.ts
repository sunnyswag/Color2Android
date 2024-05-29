import { PluginUIEvent, UIEventMsgType, UIStateData, curUIStateData, restoreUIState, updateCurUIStateData } from "model";
import { IEventProcessor } from "./iEventProcessor";
import { UIStateKey } from "./copyToClipboardProcessor";
import { genCode } from "gen-code";

export class InitPluginProcessor implements IEventProcessor {
  messageType = UIEventMsgType.InitPlugin;

  async process(_event: PluginUIEvent) {
    const diskData = await figma.clientStorage.getAsync(UIStateKey) as UIStateData;

    restoreUIState();
    if (diskData)
      updateCurUIStateData({
        code: genCode(diskData.codeType),
        codeType: diskData.codeType
      });
  }
}