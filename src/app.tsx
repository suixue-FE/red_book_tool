import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { SafeArea } from "@taroify/core"
import './app.less'


class App extends Component<PropsWithChildren> {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (<>
      <View>
        {this.props.children}
      </View>
      <SafeArea position="bottom" />
    </>


    )
  }
}

export default App
