import axios from 'axios'

class API {
  getData = () => {
    return axios
      .get('http://localhost:4001/users')
      .then(function(response) {
        if (response.status === 200 && response != null) {
          var data = response.data
          return data
        } else {
          throw new Error('Empty data')
        }
      })
      .catch(function(error) {
        console.log(error)
        return [] // Return empty array in case error response.
      })
  }

  GenKey = (data) => {
    return axios
      .post('http://localhost:4002/key',data)
      .then(res=>{
        return res.data;
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  forgotpassword = (data) => {
    return axios
      .post('http://localhost:4001/forgotpassword',data)
      .then(res=>{
        return res.data;
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  changepassword = (data) =>{
    return axios
    .post('http://localhost:4001/changepassword',data)
    .then(res=>{
      return res.data;
    })
    .catch(function(error) {
      console.log(error)
    })
  }


  getDataURL = (url) =>{
    return axios
      .get(url)
      .then(function(response) {
        if (response.status === 200 && response != null) {
          var data = response.data
          return data
        } else {
          throw new Error('Empty data')
        }
      })
      .catch(function(error) {
        console.log(error)
        return [] // Return empty array in case error response.
      })
  }

  postData = (data)=>{
    return axios
    .post('http://localhost:4001/users',data)
    .then(res=>{
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    out_of_date = ()=>{
    return axios
    .post('http://localhost:4002/check-out-of-date')
    .then(res=>{
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  SendMail = (data)=>{
    return axios
    .post("http://localhost:4001/send-mail",
    {
      code : data.code,
      email: data.email,
      contain: data.contain
    })
    .then(res=>{
      return res.data
    })
    .catch(function(err)
    {
      console.log(err);
    })
  }


  SendMailContacts = (data)=>{
    return axios
    .post("http://localhost:4001/send-mail-contacts",
    {
      email: data.email,
      from: data.from,
      content: data.content
    })
    .then(res=>{
      return res.data;
    })
    .catch(function(err)
    {
      console.log(err);
    })
  }

  getKey = data=>{
    return axios
    .get(`http://localhost:4002/get-keys/${data.id}`)
    .then(res=>{
      return res.data;
    })
    .catch(function(err){
      console.log(err);
    })
  }

  putdata = (data)=>{
    return axios
    .put(`http://localhost:4001/users`,data)
    .then(res=>{
      return res.data;
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  delkey = (id)=>{
    return axios
    .delete(`http://localhost:4002/keys/${id}`)
    .then(res=>{
      return res.data;
    })
    .catch(function(err){
      console.log(err);
    })
  }

  avatar = ()=>{
    return axios
    .get("http://localhost:4001/avatar")
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  facebook_google = (data)=>{
    return axios
    .post("http://localhost:4001/facebook_google",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  getIDfacebook_google = (data)=>{
    return axios
    .get(`http://localhost:4001/facebook_google/${data.account}`)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  Recreatekey = (data)=>{
    return axios
    .post("http://localhost:4002/register-key-again",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }
}


export default API;