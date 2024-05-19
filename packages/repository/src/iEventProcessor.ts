import { PluginUIEvent, UIEventMsgType } from "model"

export interface IEventProcessor {
  messageType: UIEventMsgType
  /**
   * 
   * @param event 
   * @returns wheather send message to notify ui or not,
   * default has no return -> send msg
   */
  process: (event: PluginUIEvent) => Promise<boolean | void>
}