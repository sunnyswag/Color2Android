import { UIEventMsgType, curUIStateData } from "model";
import { ProcessorFactory } from "view-model";

figma.showUI(__html__, { width: 450, height: 600, themeColors: true });

figma.ui.onmessage = (msg) => {
  console.log("Recieve msg from UI: ", msg);
  ProcessorFactory.doProcess(msg)
};

figma.on("selectionchange", () => {
  ProcessorFactory.doProcess({
    msgType: UIEventMsgType.GetColorCode,
	  colorCodeType: curUIStateData.codeType
  });
});