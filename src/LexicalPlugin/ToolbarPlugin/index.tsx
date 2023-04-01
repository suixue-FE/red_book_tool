import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useState, useEffect, Children } from "react";
import { $selectAll } from '@lexical/selection';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  REMOVE_LIST_COMMAND
} from "@lexical/list";
import {
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  UNDO_COMMAND,
  REDO_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $createTextNode,
  $setSelection,
  $getTextContent,
  $getRoot
} from 'lexical';
import { Button, Dialog, Input } from "@taroify/core";
import './index.less'
import store from "@/pages/index/store";
import { observer } from "mobx-react";
import { Arrow, ArrowLeft } from "@taroify/icons";
// import UndoSvg from '@static/icons/undo.svg'
// import RedoSvg from '@static/icons/redo.svg'

export default observer(function ToolbarPlugin(props) {
  const { children } = props
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<any>("paragraph");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [dialogShow, setDialogShow] = useState(false)

  const editAritcle = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $selectAll(selection);
        let currentIndex = 0
        selection?.getNodes().forEach((node) => {
          if (node?.getType() === "paragraph" && node?.getTextContent()?.trim()) {
            currentIndex++
            
            if (currentIndex > 1) {
              const insertNode = $createParagraphNode()
              const insertText = $createTextNode().setTextContent(store.formated_text || ' ')
              insertNode.append(insertText)
              node?.insertBefore(insertNode)
            }
          }
        });
        $setSelection(null);
      }
    });
    setDialogShow(false)
  };


  useEffect(() => {
    const removeUpdateListener = editor.registerTextContentListener(
      (text_content) => {
        
        store.editer_str = text_content?.replace(/\n\n/g,"\n")
        editor.registerCommand<boolean>(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL)
        editor.registerCommand<boolean>(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        )
      },
    )
    return removeUpdateListener;
  }, [editor]);

  const formatList = (listType) => {
    console.log(blockType);
    if (listType === "number" && blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      setBlockType("number");
    } else if (listType === "bullet" && blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      setBlockType("bullet");
    } else if (listType === "check" && blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
      setBlockType("check");
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      setBlockType("paragraph");
    }
  };

  return (
    <div className='toolbar'>
      <Dialog open={dialogShow} onClose={setDialogShow}>
        <Dialog.Header>格式化</Dialog.Header>
        <Dialog.Content>
          <Input onInput={e => { store.formated_text = e.detail.value }} placeholder='请输入段落分割符' />
          此功能会将输入的段落分隔符<br />插入到每个段落的上面一行
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setDialogShow(false)}>取消</Button>
          <Button onClick={editAritcle}>确认</Button>
        </Dialog.Actions>
      </Dialog>
      <Button
        size='small'
        variant='text'
        color='default'
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label='Undo'
        icon={<ArrowLeft />}
      >

      </Button>
      <Button
        size='small'
        variant='text'
        color='default'
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label='Redo'
        icon={<Arrow />}
      />
      <Button
        size='small'
        variant='text'
        color='default'
        onClick={() => setDialogShow(true)}
        aria-label='formte'
      >
        格式化
      </Button>
      {children}
      {/* <Button  
        size="mini" 
        variant="outlined" 
        color="default"
        onClick={() => formatList("bullet")}
      >
        Bullet List
      </Button>
      <Button  
        size="mini" 
        variant="outlined" 
        color="default"
        onClick={() => formatList("number")}
      >
        Numbered List
      </Button>
      <Button  
        size="mini" 
        variant="outlined" 
        color="default"
        onClick={() => formatList("check")}
      >
        Check List
      </Button> */}
    </div>
  );
})
