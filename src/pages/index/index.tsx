import React, { useCallback, useEffect, useState } from 'react';
import { Button, Textarea, Flex, Input, Field, Navbar, Popup, Toast, FixedView } from "@taroify/core"
import { Description, OrdersOutlined, WarnOutlined } from "@taroify/icons"
import { observer } from 'mobx-react'
import throttle from 'lodash/throttle'
import NoteTemplate from './template'
import store from './store';

import IconButton from '../../components/IconButton'
import ClipboardJS from 'clipboard'

import Taro from '@tarojs/taro';
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

import './index.less'

function Index() {
  const { formated_text, editerHtml, title, show_template } = store;
  const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      // 'bulletedList',
      // 'numberedList',
      'emotion',
      // '|',
      // 'undo',
      // 'redo',

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

  function handleClick() {
    const nodes = editor?.getElemsByTypePrefix('p')
    const html = editor?.getHtml()
    // const text = editor?.getText()

    // console.log(editor, html, nodes, text, 1111111);
    const insert = `<p>${formated_text}</p>`
    const p = '<p>'

    let newHtml = ''
    let pIndex = html?.indexOf(p)
    let PIndexs: number[] = []

    while (pIndex !== undefined && pIndex !== -1) {
      PIndexs.push(pIndex)
      pIndex = html?.indexOf(p, pIndex + 1);//寻找下一个o
    }

    let prevIndex = 0
    nodes?.forEach((node, index) => {
      if (index === 0) return
      // console.log(node?.children?.find(a => a?.text?.trim()?.length));

      if (node?.children?.find(a => a?.text?.trim()?.length)) {

        console.log(PIndexs, html?.slice(PIndexs?.[prevIndex], PIndexs?.[index]));

        newHtml = `${newHtml}${html?.slice(PIndexs?.[prevIndex], PIndexs?.[index])}${insert}`
        prevIndex = index
      }
    })
    newHtml = `${newHtml}${html?.slice(PIndexs?.[prevIndex])}`
    editor?.setHtml(newHtml)
  }


  const handleTextAreaChange = useCallback(throttle((html) => {
    store.editerHtml = html
  }, 500, { trailing: true }), [])


  const handleCopyTitle = useCallback(throttle((e) => {
    // copy(store.title)
    var clipboard = new ClipboardJS('#red-title-btn')

    clipboard.on('success', e => {

      Toast.open('已成功复制到粘贴板')

      //  释放内存

      clipboard.destroy()

    })

    clipboard.on('error', e => {

      // 不支持复制
      console.log(e);

      Toast.open('该浏览器不支持复制')

      // 释放内存

      clipboard.destroy()

    })
  }, 1000, { trailing: true }), [])

  const handleCopyText = useCallback(throttle((e) => {
    if (!title) {
      Toast.open('请输入标题')
      return
    }
    var clipboard = new ClipboardJS('#red-text-btn')

    clipboard.on('success', e => {

      Toast.open('已成功复制到粘贴板')

      //  释放内存

      clipboard.destroy()

    })

    clipboard.on('error', e => {

      // 不支持复制

      Toast.open('该浏览器不支持复制')

      // 释放内存

      clipboard.destroy()

    })
  }, 1000, { trailing: true }), [])

  const handleJumpToCheck = useCallback(throttle((e) => {
    Taro.navigateTo({
      url: 'pages/article/check',
    })
  }, 1000, { trailing: true }), [])


  return (
    <div className='text-edit'>
      <Toast id="toast" />
      <Navbar>
        <Navbar.Title>笔记编辑</Navbar.Title>
        <Navbar.NavRight onClick={() => store.show_template = true}> 使用模板 </Navbar.NavRight>
      </Navbar>
      <Field align="center" rightIcon={20 - title.length}>
        <Input
          value={title}
          className="red-text-title"
          maxlength={20}
          onInput={e => {
            store.title = e.detail.value
          }}
          placeholder="请输入标题" />
      </Field>
      <Field align="center">
        {/* <Textarea
          value={text}
          className='red-text-area'
          onChange={handleTextAreaChange}
          limit={1000}
          placeholder="请输入/粘贴笔记内容"
        /> */}
        <div className='w100'>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: '1px solid #ebedf0' }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={editerHtml}
            onCreated={setEditor}
            onChange={editor => handleTextAreaChange(editor.getHtml())}
            mode="default"
            style={{ height: '400px', overflowY: 'hidden' }}
          />
        </div>

      </Field>

      <Field align="center">
        <Input onInput={e => { store.formated_text = e.detail.value }} placeholder="请输入段落分割符" />
        <Button shape="round" onClick={handleClick} size="small" color="primary">
          插入
        </Button>
      </Field>
      <div className='tips'>
        此功能会将输入的段落分隔符插入到每个段落的上面一行
      </div>

      <Popup open={show_template} placement="right" style={{ height: '100%' }} >
        <NoteTemplate />
      </Popup>
      <FixedView position="bottom">
        <Flex className='p16'>
          <Flex.Item span={6}>
            <IconButton
              id="red-title-btn"
              data-clipboard-text={title}
              onClick={handleCopyTitle} icon={<OrdersOutlined />}><span className='icon-btn-text'>复制标题</span></IconButton>
          </Flex.Item>
          <Flex.Item span={6}>
            <IconButton
              id="red-text-btn"
              data-clipboard-text={editerHtml}
              onClick={handleCopyText} icon={<Description />}><span className='icon-btn-text'>复制正文</span></IconButton>
          </Flex.Item>
          <Flex.Item span={6}>
            <IconButton
              id="red-text-btn"
              data-clipboard-text={editerHtml}
              onClick={handleJumpToCheck} icon={<WarnOutlined />}><span className='icon-btn-text'>检测</span></IconButton>
          </Flex.Item>
          <Flex.Item span={6}>
            <Button style={{ width: '100%' }} shape="round" disabled color="primary">
              预览
            </Button>
          </Flex.Item>
        </Flex>
      </FixedView>


    </div>

  );
}
export default observer(Index)

