import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'

import './app.less'


class App extends Component<PropsWithChildren> {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <View>
      {this.props.children}
      </View>
    )
  }
}

export default App
