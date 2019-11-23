import axios from 'axios'

class API {
  getData = () => {
    return axios
      .get('https://back-end-services-soa.herokuapp.com/users')
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
      .post('https://back-end-services-soa.herokuapp.com/key',data)
      .then(res=>{
        return res.data;
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  forgotpassword = (data) => {
    return axios
      .post('https://back-end-services-soa.herokuapp.com/forgotpassword',data)
      .then(res=>{
        return res.data;
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  changepassword = (data) =>{
    return axios
    .post('https://back-end-services-soa.herokuapp.com/changepassword',data)
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
    .post('https://back-end-services-soa.herokuapp.com/users',data)
    .then(res=>{
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    out_of_date = ()=>{
    return axios
    .post('https://back-end-services-soa.herokuapp.com/check-out-of-date')
    .then(res=>{
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  SendMail = (data)=>{
    return axios
    .post("https://back-end-services-soa.herokuapp.com/send-mail",
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
    .post("https://back-end-services-soa.herokuapp.com/send-mail-contacts",
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
    .get(`https://back-end-services-soa.herokuapp.com/get-keys/${data.id}`)
    .then(res=>{
      return res.data;
    })
    .catch(function(err){
      console.log(err);
    })
  }

  putdata = (data)=>{
    return axios
    .put(`https://back-end-services-soa.herokuapp.com/users`,data)
    .then(res=>{
      return res.data;
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  delkey = (id)=>{
    return axios
    .delete(`https://back-end-services-soa.herokuapp.com/keys/${id}`)
    .then(res=>{
      return res.data;
    })
    .catch(function(err){
      console.log(err);
    })
  }

  avatar = ()=>{
    return axios
    .get("https://back-end-services-soa.herokuapp.com/avatar")
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  facebook_google = (data)=>{
    return axios
    .post("https://back-end-services-soa.herokuapp.com/facebook_google",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  getIDfacebook_google = (data)=>{
    return axios
    .get(`https://back-end-services-soa.herokuapp.com/facebook_google/${data.account}`)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  Recreatekey = (data)=>{
    return axios
    .post("https://back-end-services-soa.herokuapp.com/register-key-again",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }
}


export default API;