import React from 'react';
import { Input, Field, Navbar, Popup, Toast } from "@taroify/core"
import { observer } from 'mobx-react'
import NoteTemplate from '@/pages/template'
import store from './store';

import ArticleEditer from '@/pages/article/Editer'

import './index.less'



function Index() {
  const { title, show_template } = store;


  return (
    <div className='text-edit'>
      <Toast id='toast' />
      <Navbar>
        <Navbar.Title>笔记编辑</Navbar.Title>
        {/* <Navbar.NavRight onClick={() => store.show_template = true}> 使用模板 </Navbar.NavRight> */}
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
     

    </div>

  );
}
export default observer(Index)

