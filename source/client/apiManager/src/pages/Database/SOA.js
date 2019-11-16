import axios from 'axios'

class SOA{
      CnnTrans = (key,eng)=>{
        var today = new Date();
        var date = today.getDate() +"/"+parseInt(today.getMonth()+1)+"/"+today.getFullYear()+"-"+today.getHours()+":"+today.getMinutes();
        return axios
          .post('http://localhost:4002/translate',
          {
              key,
              last: date,
              source: window.location.href,
              eng
          })
          .then(res =>{
            return res.data;
          })
          .catch(function(error) {
            console.log(error)
          })
      }
}
export default SOA;