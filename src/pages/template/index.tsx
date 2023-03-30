import React from 'react';
import { View } from '@tarojs/components'
import { Flex, Button, Input, Field, Navbar, Cell } from "@taroify/core"
import { Cross } from "@taroify/icons"
import { observer } from 'mobx-react'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import store from '../index/store';

// import './index.less'
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';

const fixed_templates = [
  {
    group: '个人',
    notes: [
      {
        title: '前端每日一题——',
        text: `今天为大家带来的面试题解答又是最常见的问题- xxx
🌈

答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
        
🌈
       
——
如果大家还有什么想问的，或者想要面试题库、简历优化的话直接去图1里的小助手联系我吧～`,
      }

    ]
  },
  {
    group: '好物',
    notes: [
      {
        title: '可爱好物分享',
        text: `今天又是给大家带来可爱好物的一天~
💙 
迪士尼米老鼠耳机
小耳朵姐妹的福音！

💙 
XX吹风机
高颜值+环保材料，双倍快乐

💙
复古手链
天上星变成钻石，跌落在一片湛蓝湖海
ㅤ
关注我，解锁更多好物哦~
`,

      },
      {
        title: '今日高颜值家居分享',
        text:
          `🌟 来分享一组最近买到的高颜值好物，让家里变得更温馨~
🍁 
🍂 
🍁 
🍂 
🍁 
ㅤ
🌿 让小细节点缀生活，让我们的生活更幸福~
`,
      }

    ]
  },
]
function NoteTemplate() {
  // const { formated_text, text, title, show_template } = store;
  const [editor] = useLexicalComposerContext();

  const setArticleByNote = (note) => {
    store.title = note.title
    // store.text = note.text
    
    // note.text
    console.log(11112,editor);
    console.log(editor);
    
    editor.update(() => {
      // editor.clear()
      const rootNode = $getRoot();
      rootNode.clear()
      const insertNode = $createParagraphNode()
      const insertText = $createTextNode().setTextContent(note.text || ' ')
      insertNode.append(insertText)
      rootNode.append(insertNode)
      
      // const selection = $getSelection();
      // if ($isRangeSelection(selection)) {
      //   $selectAll(selection);
      //   selection?.getNodes().forEach((node) => {
      //     if (node?.getType() === "paragraph" && node?.getTextContent()) {
      //       const insertNode = $createParagraphNode()
      //       const insertText = $createTextNode().setTextContent(store.formated_text || ' ')
      //       insertNode.append(insertText)
      //       node?.insertBefore(insertNode)
      //     }
      //   });
      //   $setSelection(null);
      // }
    });
    store.show_template = false
  };
  return (
    <View className='note_template'>
      <Button variant='text' color='default' onClick={() => store.show_template = false}><Cross /></Button>
      {fixed_templates.map(template => {
        return <Cell.Group key={template.group} title={template?.group} inset>
          {template?.notes?.map(note => {
            return <div key={note.title} className='note_part'>
              <Flex align='center'>
                <Flex.Item className='note_title' span={18}>{note.title}</Flex.Item>
                <Flex.Item span={6}>
                  <Button variant='text' color='primary'
                    onClick={() => setArticleByNote(note)}
                  >使用</Button>
                </Flex.Item>
              </Flex>

              <div className='note_text' >
                {note.text}
              </div>
            </div>
          })}

        </Cell.Group>
      })}

    </View>


  );
}
export default observer(NoteTemplate)

