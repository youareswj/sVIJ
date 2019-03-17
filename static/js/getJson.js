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
export {getJson}

