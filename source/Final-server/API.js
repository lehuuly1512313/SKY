
class SOA{
      CnnTrans = (key,eng)=>{
        var today = new Date();
        var date = today.getDate() +"/"+parseInt(today.getMonth()+1)+"/"+today.getFullYear()+"-"+today.getHours()+":"+today.getMinutes();
        return axios
          .post('https://back-end-services-soa.herokuapp.com/translate',
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
