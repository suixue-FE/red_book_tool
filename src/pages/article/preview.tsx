import { observer } from 'mobx-react';
import { Swiper } from "@taroify/core"
import * as React from 'react';

import './preview.less'
import img1 from '@/img/1.jpeg'
const title = '想疯狂安利给全宇宙的治愈书单❗️'
const containerText = `今天为大家带来的面试题解答又是最常见的问题- xxx
🌈

答题套路要有，第一句话一定要先说“是什么”，这很重要！而这道题就回答：
        
🌈
       
——
如果大家还有什么想问的，或者想要面试题库、简历优化的话直接去图1里的小助手联系我吧～`

function Preview() {
  return (
    <div className='text-preview'>
      <div className='preview-image'>
        <Swiper className='preview-swiper'>
          <Swiper.Indicator />
          <Swiper.Item>
            <img className='swiper-image' src={img1} alt='' />
          </Swiper.Item>
        </Swiper>
      </div>
      <div className='preview-title'>{title}</div>
      <div className='preview-container'>{containerText}</div>
    </div>
  );
}
export default observer(Preview)
