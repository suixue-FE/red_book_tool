import React, { useCallback, useEffect, useState } from 'react';
import { Button, Textarea, Flex, Input, Field, Navbar, Popup, Toast, FixedView } from "@taroify/core"
import { Description, OrdersOutlined, WarnOutlined } from "@taroify/icons"
import { observer } from 'mobx-react'
import throttle from 'lodash/throttle'
import NoteTemplate from './template'
import store from './store';

import IconButton from '../../components/IconButton'
import ClipboardJS from 'clipboard'

import ArticleEditer from '@/pages/article/Editer'

import './index.less'
 


function Index() {
  const { title, show_template } = store;


  return (
    <div className='text-edit'>
      <Toast id='toast' />
      <Navbar>
        <Navbar.Title>笔记编辑</Navbar.Title>
        <Navbar.NavRight onClick={() => store.show_template = true}> 使用模板 </Navbar.NavRight>
      </Navbar>
      <Field align='center' rightIcon={20 - title.length}>
        <Input
          value={title}
          className='red-text-title'
          maxlength={20}
          onInput={e => {
            store.title = e.detail.value
          }}
          placeholder='请输入标题'
        />
      </Field>
      <ArticleEditer />
      <Popup open={show_template} placement='right' style={{ height: '100%' }} >
        <NoteTemplate />
      </Popup>
      
    </div>

  );
}
export default observer(Index)

