
export type TextColorNodeType = {
  content: string;
  color: string;
};

export function findTextNodes(rootNode: ReadonlyArray<SceneNode>) {
  let result: TextColorNodeType[] = [];

  function traverse(node: SceneNode) {
    if (node.type === 'TEXT') {
      if (Array.isArray(node.fills)) {
        const alpha = node.fills[0]?.opacity ?? 1;
        const textColor = node.fills[0]?.color;  // 假设文本的填充是单色的，我们获取第一个填充颜色
        result.push({
            content: node.characters.replace(/\//g, "").trim(),
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

export function toCamelCase(str: string): string {
  // Check if the string is already in camel case
  const camelCasePattern = /^[a-z]+(?:[A-Z][a-z]*)*$/;
  if (camelCasePattern.test(str)) {
      return str;
  }

  // Split the string by spaces, underscores, or hyphens
  const words = str.split(/[\s_-]+/);
  const camelCased = words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');

  return camelCased;
}


function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const toHex = (value: number) => {
      const hex = Math.round(value * 255).toString(16).toUpperCase();
      return hex.length === 1 ? '0' + hex : hex;
  };

  return toHex(a) + toHex(r) + toHex(g) + toHex(b);
}