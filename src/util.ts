/** 是否为android */
export const isAndroid =
  window.navigator.userAgent.toLowerCase().indexOf('android') > -1

/** 是否是ios */
export const isIOS = !!window.navigator.userAgent.match(
  /\(i[^;]+;( U;)? CPU.+Mac OS X/
)


const selectText = (textbox: any, startIndex: number, stopIndex: number) => {
  if (textbox.createTextRange) {
    const range = textbox.createTextRange()
    range.collapse(true)
    range.moveStart('character', startIndex)
    range.moveEnd('character', stopIndex - startIndex)
    range.select()
  } else {
    textbox.setSelectionRange(startIndex, stopIndex)
    textbox.focus()
  }
}

export const copy = (str: string) => {
  if (isAndroid) {
    const currentInput = document.createElement('input')
    currentInput.value = str
    document.body.appendChild(currentInput)
    currentInput.select()
    document.execCommand('copy')
    document.body.removeChild(currentInput)
    if (document.execCommand('copy')) {
      console.log('复制成功')
    } else {
      console.log('复制失败')
    }
  }
  if (isIOS) {
    const textString = str.toString()
    let input: HTMLInputElement | null = document.querySelector('#copy-input')
    if (!input) {
      input = document.createElement('input')
      input.id = 'copy-input'
      input.readOnly = true
      input.style.position = 'absolute'
      input.style.top = '-100px'
      input.style.left = '-1000px'
      input.style.zIndex = '-1000'
      document.body.appendChild(input)
    }

    input.value = textString
    selectText(input, 0, textString.length)
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      console.log('复制成功')
    } else {
      console.log('复制失败')
    }
    input.blur()
    document.body.removeChild(input)
  }
}