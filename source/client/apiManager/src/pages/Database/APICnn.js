import axios from 'axios'

class API {
  getData = () => {
    return axios
      .get('http://localhost:4000/users')
      .then(function(response) {
          var data = response.data
          return data
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  GenKey = (data) => {
    return axios
      .post('http://localhost:4000/key-time-out',data)
      .then(res=>{
        return res.data;
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  forgotpassword = (data) => {
    return axios
      .post('http://localhost:4000/forgotpassword-time-out',data)
      .then(res=>{
        return res.data;
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  changepassword = (data) =>{
    return axios
    .post('http://localhost:4000/changepassword',data)
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
    .post('http://localhost:4000/users-time-out',data)
    .then(res=>{
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    out_of_date = ()=>{
    return axios
    .post('http://localhost:4000/check-out-of-date')
    .then(res=>{
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  SendMail = (data)=>{
    return axios
    .post("http://localhost:4000/send-mail",
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
    .post("http://localhost:4000/send-mail-contacts",
    {
      email: data.email,
      from: data.from,
      content: data.content,
      name: data.name,
      phone: data.phone,
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
    .get(`http://localhost:4000/get-keys/${data.id}`)
    .then(res=>{
      return res.data;
    })
    .catch(function(err){
      console.log(err);
    })
  }

  putdata = (data)=>{
    return axios
    .put(`http://localhost:4000/users`,data)
    .then(res=>{
      return res.data;
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  delkey = (id,data)=>{
    return axios
    .post(`http://localhost:4000/keys/${id}`,data)
    .then(res=>{
      return res.data;
    })
    .catch(function(err){
      console.log(err);
    })
  }

  avatar = ()=>{
    return axios
    .get("http://localhost:4000/avatar")
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  facebook_google = (data)=>{
    return axios
    .post("http://localhost:4000/facebook_google",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  login = (data)=>{
    return axios
    .post("http://localhost:4000/log-in",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }




  check_public_key = (data)=>{
    return axios
    .post("http://localhost:4000/check-admin-public-key",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  login_admin = (data)=>{
    return axios
    .post("http://localhost:4000/log-in-admin",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }
  fbgglogin = (data)=>{
    return axios
    .post("http://localhost:4000/fb-gg-login",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  getIDfacebook_google = (data)=>{
    return axios
    .get(`http://localhost:4000/facebook_google/${data.account}`)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  Recreatekey = (data)=>{
    return axios
    .post("http://localhost:4000/register-key-again-time-out",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  Changekey = (data)=>{
    return axios
    .post("http://localhost:4000/change-key-value-time-out",data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  deluser = (data)=>{
    return axios
    .post(`http://localhost:4000/users-delete`,data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  admindelkey = (data)=>{
    return axios
    .post(`http://localhost:4000/keys-delete`,data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  getallmail = ()=>{
    return axios
    .post(`http://localhost:4000/mails`)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  getallkey = ()=>{
    return axios
    .post(`http://localhost:4000/keys`)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  deletemail = (data)=>{
    return axios
    .post(`http://localhost:4000/delete-mail`,data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })
  }

  deletlistemail = (data)=>{
    return axios
    .post(`http://localhost:4000/delete-mails`,data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })

    
  }

  readed = (data)=>{
    return axios
    .post(`http://localhost:4000/readed`,data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })

    
  }

  getemail = (data)=>{
    return axios
    .post(`http://localhost:4000/getmail`,data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })

    
  }

  sendreply = (data)=>{
    return axios
    .post(`http://localhost:4000/send-reply`,data)
    .then(res=>{
      return res.data
    })
    .catch(err=>{
      console.log(err);
    })

    
  }
}


export default API;