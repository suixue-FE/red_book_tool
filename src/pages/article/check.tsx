import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';

import store, { normal_mint, makeups_mint, medical_mint } from '@/pages/index/store';

import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Button, Field, Input } from '@taroify/core';

function Check() {
  const { text, title } = store
  const [checkedTitle, setCheckedTitle] = useState(title)
  const [checkedText, setCheckedText] = useState(text)

  const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo'
    ]
  }  // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  const handleClick = useCallback(() => {
    const texts = editor?.getElemsByTypePrefix('p')
    const html = editor?.getHtml()
    const text = editor?.getText()
    console.log(editor, html, texts, text, 1111111);

  }, [editor])



  return <div className='article-check-page'>
    111
    <div className='reds-box'>
      <Input className='fw500 reds-title'>
        {checkedTitle}
      </Input>
      <Field align="center">
        <Input onInput={e => { store.formated_text = e.detail.value }} placeholder="请输入段落分割符" />
        <Button shape="round" onClick={handleClick} size="small" color="primary">
          插入
        </Button>
      </Field>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={checkedText}
          onCreated={setEditor}
          onChange={editor => setCheckedText(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        {checkedText}
      </div>
    </div>
  </div>

}
export default observer(Check)
