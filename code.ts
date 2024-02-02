// This plugin creates 5 rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

type TextColorNodeType = {
  content: string;
  color: string;
};

function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const toHex = (value: number) => {
      const hex = Math.round(value * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
  };

  console.log(r, g, b, a);

  return '#' + toHex(a) + toHex(r) + toHex(g) + toHex(b);
}

function toXmlFormat(nodes: TextColorNodeType[]): string {
  return nodes.map(node => 
      `<color name="${node.content}">${node.color}</color>`
  ).join('\n');
}

function findTextNodes(rootNode: ReadonlyArray<SceneNode>) {
  let result: TextColorNodeType[] = [];

  function traverse(node: SceneNode) {
    if (node.type === 'TEXT') {
      if (Array.isArray(node.fills)) {
        const alpha = node.fills[0]?.opacity ?? 1;
        const textColor = node.fills[0]?.color;  // 假设文本的填充是单色的，我们获取第一个填充颜色
        result.push({
            content: node.characters,
            color: rgbaToHex(textColor.r, textColor.g, textColor.b, alpha)
        });
      }
    }

    if ('children' in node) {
      node.children.forEach(traverse);
    }
  }

  rootNode.forEach(traverse);
  return result;
}

const textNodes = findTextNodes(figma.currentPage.selection);
console.log(textNodes);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Figma Plugin UI</title>
</head>
<body>
    <textarea id="outputText" rows="10" cols="50" readonly></textarea>
    <button id="copyButton">复制到剪切板</button>

    <script>
        // 当点击复制按钮时执行的函数
        document.getElementById('copyButton').addEventListener('click', () => {
            const textarea = document.getElementById('outputText');
            textarea.select();
            document.execCommand('copy');
            window.parent.postMessage({ pluginMessage: 'copied' }, '*');
        });

        // 从Figma插件主线程接收消息
        onmessage = (event) => {
            document.getElementById('outputText').value = event.data.pluginMessage;
        }
    </script>
</body>
</html>
`;

figma.showUI(htmlContent, { width: 400, height: 300 });
const colorData = toXmlFormat(textNodes); // 这应该是一个函数，返回你要显示的文本数据
figma.ui.postMessage(colorData);


// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.

figma.ui.onmessage = msg => {
  if (msg === 'copied') {
      figma.closePlugin();
  }
}
