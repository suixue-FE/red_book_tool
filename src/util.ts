/** 是否为android */
export const isAndroid =
  window.navigator.userAgent.toLowerCase().indexOf('android') > -1

/** 是否是ios */
export const isIOS = !!window.navigator.userAgent.match(
  /\(i[^;]+;( U;)? CPU.+Mac OS X/
)

/**
 * 处理关键词标红
 * @param {string} sourceStr 文本
 * @param {string[]} keywordArr 关键词数组
 * @return {string} resultStr 返回的 HTML string
 */
export function disposeKeyWord(sourceStr: string = '', keywordArr: any[] = []) {
  if (sourceStr?.length > 1100 || keywordArr?.length > 1100) {

  }
  let resultStr: any = ''; // 最终返回的字符串html
  const getReplaceStr = (str: string) => `<span class="danger-color">${str}</span>`;
  let indexArr: number[] = []; // 需要标红的字的下标数组
  keywordArr.forEach((keyword: string) => {
    let filterStr = sourceStr;
    let stopFlag = false;
    while (!stopFlag && filterStr && keyword) {
      const index = filterStr.indexOf(keyword); // 返回匹配的第一个字符的下标
      if (index === -1) stopFlag = true;
      else {
        keyword.split('').forEach((s: string, i: number) => {
          indexArr.push(index + Number(i));
        });
        // 替换第一个字符为空格，防止再次匹配
        //（例1：['你好', '你好呀'] 为关键词，文本中有 ’你好呀‘ 时，’你好呀‘ 三个字都要标红）
        //（例2：['真好', '好人'] 为关键词，文本中有 ’真好人‘ 时，’真好人‘ 三个字都要标红）
        //（例3：['大大'] 为关键词，文本中有 ’大大大‘ 时，’大大大‘ 三个字都要标红）
        filterStr = filterStr.substring(0, index) + ' ' + filterStr.substring(index + 1);
      }
    }
  });
  indexArr = Array.from(new Set(indexArr)); // 去重
  // 标红
  sourceStr.split('').forEach((char: string, charIndex: number) => {
    resultStr += indexArr.includes(charIndex) ? getReplaceStr(char) : char;
  });
  return resultStr;
}