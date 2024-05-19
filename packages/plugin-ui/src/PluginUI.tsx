import React, { createContext } from "react"
import { GetColorConfigPage } from "./GetColorConfigPage"
import { SendMsgToModel } from "./Utils"
import { PluginUIEvent, UIEventMsgType } from "model"
import { defaultPluginEvent } from "model/src/defaultConfig"

export const SendMsgToModelContext: React.Context<SendMsgToModel> = createContext((_event: PluginUIEvent) => { })

export const PluginUI: React.FC<{ sendMsgToModel: SendMsgToModel }> = ({ sendMsgToModel }) => {
  sendMsgToModel({
    ...defaultPluginEvent,
    msgType: UIEventMsgType.InitPlugin
  })

  return <SendMsgToModelContext.Provider value={sendMsgToModel}>
    <GetColorConfigPage />
    {/* your another page */}
  </SendMsgToModelContext.Provider>
}