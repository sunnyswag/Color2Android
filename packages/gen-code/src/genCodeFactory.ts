import { CodeType } from "model";
import { TextColorNodeType, findTextNodes, toCamelCase } from "./Utils";

export function genCode(codeType: CodeType): string {
  const textColorRes = findTextNodes(figma.currentPage.selection)
  return textColorRes.map(item => genCodeDispatch(codeType, item)).join('\n');
}

function genCodeDispatch(codeType: CodeType, item: TextColorNodeType): string {
  switch(codeType) {
    case CodeType.XmlResource:
      return toXmlFormat(item);
    case CodeType.Compose:
      return toComposeFormat(item);
  }
}

function toXmlFormat(item: TextColorNodeType): string {
  return `<color name="${item.content}">${item.color}</color>`
}

function toComposeFormat(item: TextColorNodeType): string {
  return `val ${toCamelCase(item.content)} = Color(0x${item.color})`
}
