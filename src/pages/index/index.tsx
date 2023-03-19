import React, { useCallback } from 'react';
import { View } from '@tarojs/components'
import { Button, Textarea, Input, Field, Navbar } from "@taroify/core"
import { observer } from 'mobx-react'
import { throttle } from 'lodash'
import store from './store';
import './index.less'

function Index() {
  const { formated_text, text, title } = store;

  function handleClick() {
    const lines = text.split('');

    let regex = /\n/g; // 使用正则表达式 /\n/g 匹配所有的换行符
    let match: RegExpExecArray | null;
    let indices: number[] = [];
    while ((match = regex.exec(text)) !== null) {
      indices.push(match.index);
    }

    indices?.forEach((val, index) => {
      if (indices?.[index + 1] && indices?.[index + 1] !== val + 1) {
        // if (lines[val + 1]?.length > 10) {
        lines[val] = `\n${formated_text}\n`
        // }
      }
    })

    let _text = lines.join('');
    store.formatText(_text)
  }

  const handleTextAreaChange = useCallback(throttle((e) => {
    store.text = e.detail.value
  }, 500, { trailing: true }), [])


  return (
    <View className='text-edit'>
      <Navbar title="笔记编辑"></Navbar>
      <Field align="center" rightIcon={20 - title.length}>
        <Input className="red-text-title"
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
    </View>

  );
}
export default observer(Index)

