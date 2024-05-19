import { PluginUI } from "plugin-ui"
import { PluginUIEvent } from "../../../packages/model/src"

function App() {
  return (
    <PluginUI sendMsgToModel={(event: PluginUIEvent) => {
      parent.postMessage({
        pluginMessage: event
      }, "*")
    }} />
  )
}

export default App
