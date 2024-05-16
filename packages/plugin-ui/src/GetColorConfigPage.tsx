import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Flex, Radio, Button } from 'antd';
import { ColorCodeType } from 'model';

export const GetColorConfigPage: React.FC = () => (
  <Flex vertical gap="middle" align='center'>
    <ColorCodeTypeView />
    <CodePreview />
    <CopyToClipBoard />
  </Flex>
);

const ColorCodeTypeView: React.FC = () => (
  <Radio.Group defaultValue={ColorCodeType.XmlResource} buttonStyle="solid">
    <Radio.Button value={ColorCodeType.XmlResource}>Xml Resource</Radio.Button>
    <Radio.Button value={ColorCodeType.Compose}>Compose</Radio.Button>
  </Radio.Group>
);

const CodePreview: React.FC = () => (
  <div style={{ width: '100%' }}>
    <SyntaxHighlighter
      language="xml"
      customStyle={{
        fontSize: 12,
        borderRadius: 8,
        marginTop: 0,
        marginBottom: 0
      }}
    >
      {"code"}
    </SyntaxHighlighter>
  </div>

);

const CopyToClipBoard: React.FC = () => (
  <Button type="primary">Copy To Clipboard</Button>
);