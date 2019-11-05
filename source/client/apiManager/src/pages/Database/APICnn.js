import axios from 'axios'

class API {
  getData = () => {
    return axios
      .get('http://localhost:4000/users')
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
      .post('http://localhost:4000/key',data)
      .then(res=>{
        return res.data;
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  forgotpassword = (data) => {
    return axios
      .post('http://localhost:4000/forgotpassword',data)
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
    .post('http://localhost:4000/users',
    {
      id: 0,
      account : data.account,
      password: data.password,
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar
    })
    .then(function(response){
      if (response.status === 201 && response != null) {
       console.log('created');
      } else {
        throw new Error('Empty data')
      }
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

  delkey = (id)=>{
    return axios
    .delete(`http://localhost:4000/keys/${id}`)
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
}


export default API;