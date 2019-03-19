import axios from 'axios'

function getJson(url,param,callbak) {
  axios.get(url,{
    params:param
  }).then(res=>{
     callbak(res);
  }).catch(error=>{
    console.log(error);
  })
}
function loadXMLDoc(xmlFile){
  var xmlDoc;
  try{
    //Internet Explorer 可以使用其原生方法加载 XML
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  }catch(e){
    try{
      //Firefox 也有标准方法,但可能造成其他浏览器报错,故省略
      //使用 XMLHttpRequest 替代,适用于大部分浏览器
      var xmlHttp=new XMLHttpRequest() ;
      xmlHttp.open("GET",xmlFile,false) ;
      xmlHttp.send(null) ;
      return xmlHttp.responseXML;
    }catch(e){
      return null;
    }
  }
  xmlDoc.async=false;
  xmlDoc.load(xmlFile);
  return xmlDoc;
}

export {getJson,loadXMLDoc}

