import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { ListItemNode, ListNode } from "@lexical/list";

import ToolbarPlugin from "@/LexicalPlugin/ToolbarPlugin";
import PlaygroundTheme from "./themes/PlaygroundTheme";
import "./check.less"
import { Button, Dialog, Input } from "@taroify/core";
import { useState } from "react";
import store from "../index/store";

const editorConfig = {
  namespace:'suixue-editer',
  theme: PlaygroundTheme,
  onError(error) {
    throw error;
  },
  nodes: [ListNode, ListItemNode]
};

export default function Editor() {
  const [dialogShow, setDialogShow] = useState(false)
  
  return (
    <div className="article-check">
      <Dialog open={dialogShow} onClose={setDialogShow}>
        <Dialog.Header>格式化</Dialog.Header>
        <Dialog.Content>
        <Input onInput={e => { store.formated_text = e.detail.value }} placeholder='请输入段落分割符' />
          此功能会将输入的段落分隔符<br/>插入到每个段落的上面一行
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setDialogShow(false)}>取消</Button>
          <Button onClick={() => setDialogShow(false)}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin>
        <Button  
        size="mini" 
        variant="outlined" 
        color="default"
        onClick={() => setDialogShow(true)}
        aria-label="formte"
      >
        格式化
      </Button>
        </ToolbarPlugin>

        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <HistoryPlugin />
        <CheckListPlugin />
      </div>
    </LexicalComposer>
    </div>
    
  );
}

function Placeholder() {
  return (
    <div className="editor-placeholder">
      请输入笔记内容
    </div>
  );
}
