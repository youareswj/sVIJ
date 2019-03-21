import axios from 'axios'

//获取列表数据
export function base (url, param, callback) {
   axios.get(url, {
    params: param
  }).then(res=>{
     callback(res)
  }).catch(function (error){
    console.log(error)
  })
}

//获取xml数据项值
export function dealxml (xml, tgname) {
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
export function toJson (str) {
  const s = dealxml(str)
  const obj = eval('(' + s + ')')
  return obj
}
//歌词滚动
export function lyricing(){
  const speed = 0.5   //滚动速度
  let topnum = 0

}

