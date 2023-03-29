import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React,{ useState,useEffect, Children, useCallback } from "react";
import { $selectAll } from '@lexical/selection';

import {
  $getSelection,
  $getTextContent,
  $isRangeSelection,
  $setSelection
} from 'lexical';
import { Button, Dialog, FixedView, Flex, Input, Toast } from "@taroify/core";
import store from "@/pages/index/store";
import { observer } from "mobx-react";
import IconButton from "@/components/IconButton";
import { Description, OrdersOutlined, WarnOutlined } from "@taroify/icons";
import throttle from "lodash/throttle";
import ClipboardJS from "clipboard";
import "./index.less"

export default observer(function ToolbarPlugin(props){
  const { editer_str, title } = store;

  const handleCopyTitle = useCallback(throttle((e) => {
    if (!title) {
      Toast.open('标题未输入')
      return
    }
    var clipboard = new ClipboardJS('#red-title-btn',{
      text: function() {
          return title
      }
  })
    
    clipboard.on('success', e => {

      Toast.success('复制成功！')

      //  释放内存
      clipboard.destroy()
    })

    clipboard.on('error', e => {

      // 不支持复制
      Toast.fail('当前环境不支持复制')

      clipboard.destroy()
    })
  }, 1000, { trailing: true }), [title])

  const handleCopyText = useCallback(throttle((e) => {
    if (!editer_str) {
      Toast.open('笔记正文未输入')
      return
    }
    var clipboard = new ClipboardJS('#red-text-btn',{
      text: function() {
          return editer_str
      }
  })

    clipboard.on('success', e => {

      Toast.success('复制成功！')

      //  释放内存
      clipboard.destroy()
    })

    clipboard.on('error', e => {

      // 不支持复制
      Toast.fail('当前环境不支持复制')

      clipboard.destroy()
    })
  }, 1500, { trailing: true }), [editer_str])


  const handleJumpToCheck = useCallback(throttle((e) => {
    // Taro.navigateTo({
    //   url: 'pages/article/check',
    // })
  }, 1000, { trailing: true }), [])


  
  return (
    <>
    <Toast id='toast' />
    <FixedView className='bottom-buttons' position='bottom'>
        <Flex className='p16'>
          <Flex.Item span={6}>
            <IconButton
              id='red-title-btn'
              data-clipboard-text={title}
              onClick={handleCopyTitle} icon={<OrdersOutlined />}
            ><span className='icon-btn-text'>复制标题</span></IconButton>
          </Flex.Item>
          <Flex.Item span={6}>
            <IconButton
              id='red-text-btn'
              onClick={handleCopyText} icon={<Description />}
            ><span className='icon-btn-text'>复制正文</span></IconButton>
          </Flex.Item>
          <Flex.Item span={6}>
            <IconButton
              onClick={handleJumpToCheck} icon={<WarnOutlined />}
            ><span className='icon-btn-text'>检测</span></IconButton>
          </Flex.Item>
          <Flex.Item span={6}>
            <Button style={{ width: '100%' }} shape='round' disabled color='primary'>
              预览
            </Button>
          </Flex.Item>
        </Flex>
      </FixedView>
    </>
    
  );
})
