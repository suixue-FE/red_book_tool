import * as React from 'react';
import { View, Textarea, Text, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import store from './store';
import './index.less'


// type PageStateProps = {
//   store: {
//     counterStore: {
//       counter: number,
//       increment: Function,
//       decrement: Function,
//       incrementAsync: Function
//     }
//   }
// }

// interface Index {
//   props: PageStateProps;
// }

// @inject('store')
// @observer
// class Index extends Component<PropsWithChildren> {
//   componentDidMount() { }

//   componentWillUnmount() { }

//   componentDidShow() { }

//   componentDidHide() { }

//   increment = () => {
//     const { counterStore } = this.props.store
//     counterStore.increment()
//   }

//   decrement = () => {
//     const { counterStore } = this.props.store
//     counterStore.decrement()
//   }

//   incrementAsync = () => {
//     const { counterStore } = this.props.store
//     counterStore.incrementAsync()
//   }

//   render() {
//     const { counterStore: { counter } } = this.props.store
//     return (
//       <View className='index'>
//         {/* <Button onClick={this.increment}>+</Button>
//         <Button onClick={this.decrement}>-</Button>
//         <Button onClick={this.incrementAsync}>Add Async</Button>
//         <Text>{counter}</Text>
//         <Textarea
//           style='background:#fff;width:100%;min-height:80px;padding:0 30rpx;'
//           autoHeight /> */}
//       </View>
//     )
//   }
// }
// import * as React from 'react';
// import { View, NavigationBar, Textarea } from '@tarojs/components'



function Index() {
  const { formated_text,text } = store;
  return (
    <View className='index'>
      <h5>笔记格式化</h5>
      <Textarea
        // value={text}
        style='background:#fff;width:100%;height:200px;padding:0 30rpx;border: 1px'
        onInput={e=>{
          console.log(999);
          
          store.text = e.detail.value}
        }
      />
      <Button type='primary' onClick={()=>{
        console.log(text);
        
        store.formatText(text)
      }}>格式化</Button>
      <Text>{formated_text}</Text>
    </View>
  );
}
export default observer(Index)
