import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Flex, Radio, Button } from 'antd';

export const MainUI: React.FC = () => (
  <Flex vertical gap="middle" align='center'>
    <ProcessTypeView />
    <CodePreview />
    <CopyToClipBoard />
  </Flex>
);

enum ProcessType {
  XmlResource,
  Compose
}

const ProcessTypeView: React.FC = () => (
  <Radio.Group defaultValue={ProcessType.XmlResource} buttonStyle="solid">
    <Radio.Button value={ProcessType.XmlResource}>Xml Resource</Radio.Button>
    <Radio.Button value={ProcessType.Compose}>Compose</Radio.Button>
  </Radio.Group>
);

const CodePreview: React.FC = () => (
  <div style={{width: 400}}>
  <SyntaxHighlighter
    language="xml"
    customStyle={{
      fontSize: 12,
      borderRadius: 8,
      marginTop: 0,
      marginBottom: 0,
      backgroundColor: "#1B1B1B",
      transitionProperty: "all",
      transitionTimingFunction: "ease",
      transitionDuration: "0.2s",
    }}
  >
    {"code"}
  </SyntaxHighlighter>
  </div>

);

const CopyToClipBoard: React.FC = () => (
  <Button type="primary">Copy To Clipboard</Button>
);