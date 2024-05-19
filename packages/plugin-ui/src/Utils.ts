import { PluginUIEvent } from "model";
import { useEffect, useState } from "react";

export type SendMsgToModel = (event: PluginUIEvent) => void;

export const useEffectRegisterOnMessage = (callback: (message: any) => void, oneShot: boolean = false) => {
  const [consumed, setConsumed] = useState(false);

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (oneShot && consumed) return;

      const message = event.data.pluginMessage;
      console.log("Recieve msg from Figma backend: ", message);
      callback(message);

      setConsumed(true);
    }

    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    }
  }, [callback]);
};