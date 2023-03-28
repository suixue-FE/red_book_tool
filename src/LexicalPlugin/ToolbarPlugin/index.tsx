import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React,{ useState,useEffect, Children } from "react";

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
  REDO_COMMAND
} from 'lexical';
import { Button, Dialog } from "@taroify/core";
import './index.less'


export default function ToolbarPlugin(props){
  const { children } = props
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<any>("paragraph");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);


  useEffect(() => {
    console.log(1000009);
    const removeUpdateListener = editor.registerUpdateListener(
      (_) => {   
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
    <div className="toolbar">
      <Button  
        size="mini" 
        variant="outlined" 
        color="default"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label="Undo"
      >
        上一步
      </Button>
      <Button  
        size="mini" 
        variant="outlined" 
        color="default"
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label="Redo"
      >
        下一步
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
}
