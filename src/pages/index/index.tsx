import React, { useCallback } from 'react';
import { View } from '@tarojs/components'
import { Button, Textarea, Flex, Input, Field, Navbar, Popup, Toast } from "@taroify/core"
import { Description, OrdersOutlined } from "@taroify/icons"
import { observer } from 'mobx-react'
import throttle from 'lodash/throttle'
import NoteTemplate from './template'
import store from './store';

import IconButton from '../../components/IconButton'
import Footer from '../../components/Footer'
import { copy } from '../../util'
import ClipboardJS from 'clipboard'
import './index.less'

function Index() {
  const { formated_text, text, title, show_template } = store;

  function handleClick() {
    const lines = text.split('');

    let regex = /\n/g; // 使用正则表达式 /\n/g 匹配所有的换行符
    let match: RegExpExecArray | null;
    let indices: number[] = [];
    while ((match = regex.exec(text)) !== null) {
      indices.push(match.index);
    }

    indices?.forEach((val, index) => {
      if (indices?.[index + 1] && indices?.[index + 1] != val + 1) {
        if (lines?.[val + 1] != ' ') {
          lines[val] = `\n${formated_text}\n`
        }
      }
    })

    let _text = lines.join('');
    store.formatText(_text)
  }


  const handleTextAreaChange = useCallback(throttle((e) => {
    store.text = e.detail.value
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

      Toast.open('该浏览器不支持复制')

      // 释放内存

      clipboard.destroy()

    })
  }, 1000, { trailing: true }), [])

  const handleCopyText = useCallback(throttle((e) => {
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

  return (
    <View className='text-edit'>
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
        <Textarea
          value={text}
          className='red-text-area'
          onChange={handleTextAreaChange}
          limit={1000}
          placeholder="请输入/粘贴笔记内容"
        />
      </Field>

      <Field align="center">
        <Input onInput={e => { store.formated_text = e.detail.value }} placeholder="请输入段落分割符" />
        <Button shape="round" onClick={handleClick} size="small" color="primary">
          格式化
        </Button>
      </Field>
      <div className='tips'>
        ”格式化“功能会在每个段落的上面一行插入段落分割符
      </div>

      <Popup open={show_template} placement="right" style={{ height: '100%' }} >
        <NoteTemplate />
      </Popup>
      <Footer>
        <Flex>
          <Flex.Item span={6}>
            <IconButton
              id="red-title-btn"
              data-clipboard-text={title}
              onClick={handleCopyTitle} icon={<OrdersOutlined />}><span className='icon-btn-text'>复制标题</span></IconButton>
          </Flex.Item>
          <Flex.Item span={6}>
            <IconButton
              id="red-text-btn"
              data-clipboard-text={text}
              onClick={handleCopyText} icon={<Description />}><span className='icon-btn-text'>复制正文</span></IconButton>
          </Flex.Item>
          <Flex.Item span={6}></Flex.Item>
          <Flex.Item span={6}>
            <Button style={{ width: '100%' }} shape="round" disabled color="primary">
              预览
            </Button>
          </Flex.Item>
        </Flex>
      </Footer>

    </View>

  );
}
export default observer(Index)

