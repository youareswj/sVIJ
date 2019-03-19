import axios from 'axios'

//获取列表数据
function getJson (url, param, callbak) {
  axios.get(url, {
    params: param
  }).then(res => {
    callbak(res)
  }).catch(error => {
    console.log(error)
  })
}

//获取xml数据项值
function dealxml (xml, tgname) {
  const xmlel = new DOMParser()
  const str = xml.toString()
  const result = xmlel.parseFromString(str, 'text/xml')
  const items = result.getElementsByTagName(tgname)
  const desc = []
  for (let i = 0; i < items.length; i++) {
    desc.push(items[i].textContent)
  }
  return desc
}

//xml转json格式
function toJson (str) {
  const s = dealxml(str)
  const obj = eval('(' + s + ')')
  return obj
}

export {getJson, dealxml}

