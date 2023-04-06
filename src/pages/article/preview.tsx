import img1 from '@/img/1.jpeg'
import { observer } from 'mobx-react';
import { Swiper, Navbar } from "@taroify/core"
import { useState } from 'react';

import './preview.less'


const title = '想疯狂安利给全宇宙的治愈书单❗️'
const containerText = `今天为大家带来的面试题解答又是最常见的问题- xxx
🌈





答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
        
🌈
       
——
如果大家还有什么想问的，或者想要面试题库、简历优化的话直接去图1里的小助手联系我吧～`


function formatText() {
  const textArray = containerText.split(/\r|\n/g)
  let res: string[] = []
  let prev = ''
  for (const curr of textArray) {
    const currTrim = curr.replace(/^\s+|\s+$/g, '')
    if (currTrim || prev) {
      res.push(curr)
    }
    prev = curr
  }
  return res
}

function Preview() {
  const [value, setValue] = useState(0)
  return (
    <div className='text-preview'>
      <Navbar fixed>
        <Navbar.NavLeft>预览</Navbar.NavLeft>
      </Navbar>
      <div className='preview-image'>
        <div className='preview-indicator'>{value + 1}/2</div>
        <Swiper className='preview-swiper' onChange={setValue}>
          <Swiper.Indicator />
          <Swiper.Item>
            <img className='swiper-image' src={img1} alt='' />
          </Swiper.Item>
          <Swiper.Item>
            <img className='swiper-image' src={img1} alt='' />
          </Swiper.Item>
        </Swiper>
      </div>
      <div className='preview-content'>
        <div className='preview-title'>{title}</div>

        <div className='preview-container'>{
          formatText().map((arg, index) => {
            return <p key={index}>{arg}</p>
          })}</div>
      </div>
    </div>
  );
}
export default observer(Preview)
