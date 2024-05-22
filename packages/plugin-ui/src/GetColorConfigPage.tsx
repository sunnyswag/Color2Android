import React, { useCallback, useContext, useState } from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Flex, Radio, Button, RadioChangeEvent } from 'antd';
import { CodeType, UIEventMsgType } from 'model';
import { SendMsgToModelContext } from './PluginUI';
import { defaultPluginEvent } from 'model/src/defaultConfig';
import copy from 'copy-to-clipboard';
import { useEffectRegisterOnMessage } from './Utils';

export const GetColorConfigPage: React.FC = () => {
  const [code, SetCode] = useState<string>("")
  const [codetype, SetCodeType] = useState<CodeType>(CodeType.XmlResource);

  useEffectRegisterOnMessage((message) => {
    SetCode(message.code)
    SetCodeType(message.codeType)
  })

  const sendMsgToModel = useContext(SendMsgToModelContext);
  const onCodeTypeChange = useCallback((e: RadioChangeEvent) => {
    const curType = e.target.value as CodeType
    SetCodeType(curType)
    sendMsgToModel({
      ...defaultPluginEvent,
      msgType: UIEventMsgType.GetColorCode,
      colorCodeType: curType
    })
  }, [codetype])

  return <Flex vertical gap="middle" align='center'>
    <ColorCodeTypeView codetype={codetype} onCodeTypeChange={onCodeTypeChange} />
    <CodePreview codetype={codetype} code={code} />
    <CopyToClipBoard code={code} />
  </Flex>
};

const ColorCodeTypeView: React.FC<{
  codetype: CodeType,
  onCodeTypeChange: (e: RadioChangeEvent) => void
}> = ({ codetype, onCodeTypeChange }) => {
  return <Radio.Group value={codetype} onChange={onCodeTypeChange} buttonStyle="solid">
    <Radio.Button value={CodeType.XmlResource}>Xml Resource</Radio.Button>
    <Radio.Button value={CodeType.Compose}>Compose</Radio.Button>
  </Radio.Group>
};

const CodePreview: React.FC<{ codetype: CodeType, code: string }> = ({ codetype, code }) => {
  const getLang = useCallback(() => {
    switch(codetype) {
      case CodeType.XmlResource:
        return "xml"
      case CodeType.Compose:
        return "kotlin"
    }
  }, [codetype])

  return <div style={{ width: '100%' }}>
    <SyntaxHighlighter
      language={getLang()}
      customStyle={{
        fontSize: 12,
        borderRadius: 8,
        marginTop: 0,
        marginBottom: 0
      }}
    >
      {code}
    </SyntaxHighlighter>
  </div>
};

const CopyToClipBoard: React.FC<{ code: string }> = ({ code }) => (
  <Button
    type="primary"
    onClick={() => { copy(code) }}
  >Copy To Clipboard</Button>
);