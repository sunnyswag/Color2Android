import { useEffect, useState } from "react";

export const useEffectRegisterOnMessage = (callback: (message: any) => void, oneShot: boolean) => {
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