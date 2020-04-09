const mysql = require('mysql');

const express = require('express');

const app = express();

const bodyparser = require('body-parser');

var cors = require('cors');

const morgan =  require('morgan');

app.use(morgan('dev'));

const request = require('request');

const nodemailer = require('nodemailer');

app.use(cors())

app.use(bodyparser.json());

var mysqlCNN = mysql.createConnection({
    host : 'db4free.net',
    user: 'lehuuly313',
    password: '123456789',
    database: 'sounddecoration',
    multipleStatements: true
});

mysqlCNN.connect((err) =>{
    if(!err)
        console.log("cnn db server");
    else
        console.log("error!: " + JSON.stringify(err, undefined,2))
})
app.listen(process.env.PORT||4000);

app.get("/", (req,res)=>{
    res.send("đây là trang chủ")
})

app.get('/users', (req,res)=>{    
    mysqlCNN.query("SELECT * FROM manuser", (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


app.get('/users/:idusers', (req,res) =>{
    mysqlCNN.query(`SELECT * FROM manuser WHERE id = ${req.params.idusers}`, (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.post('/keys-delete', (req,res) =>{
    console.log(req.body);
    mysqlCNN.query(`SELECT * FROM admin WHERE public_key = '${req.body.public_key}'`, (err,rows,fields)=>{
        if(!err)
        {
            if(rows[0])
            {
            mysqlCNN.query(`DELETE FROM mankey_count WHERE id = ${req.body.id}`, (err,rows,fields)=>{
                if(!err)
                {
                    res.send("Delete succesfully");
                }
                else{
                    console.log(err);
                    res.send("error");
                }
            }) 
            }
            else
            {
                res.send("public key is incorect");
            }

        }
        else{
            console.log(err);
            res.send("error");
        }
    })
    
})

app.post('/users-delete', (req,res) =>{
    console.log(req.body);
    mysqlCNN.query(`SELECT * FROM admin WHERE public_key = '${req.body.public_key}'`, (err,rows,fields)=>{
        if(!err)
        {
            if(rows[0])
            {
            mysqlCNN.query(`DELETE FROM manuser WHERE id = ${req.body.id}`, (err,rows,fields)=>{
                if(!err)
                {
                    res.send("Delete succesfully");
                }
                else{
                    console.log(err);
                    res.send("error");
                }
            }) 
            }
            else
            {
                res.send("public key is incorect");
            }

        }
        else{
            console.log(err);
            res.send("error");
        }
    })
    
})



app.post("/facebook_google", (req,res)=>{
    var emp = req.body;
    console.log(emp);
    var sql = `SET @id = '${0}';SET @name = '${emp.name}';SET @account = '${emp.account}';SET @password = '${emp.password}';\
    SET @avatar = '${emp.avatar}';SET @numofbank = '${emp.numofbank}';SET @email = '${emp.email}';SET @phone = '${emp.phone}';\
    CALL facebook_google_insert(@id,@name,@account,@password,@avatar,@numofbank,@email,@phone);`;
    mysqlCNN.query(sql, (err,rows,fields)=>{
        if(!err)
        {
            res.send("sucessfully");
        }
        else{
            console.log(err);
        }       
    })
})

app.get("/facebook_google/:id",(req,res)=>{
    var emp = req.body;
    mysqlCNN.query(`SELECT * FROM manuser WHERE account = '${req.params.id}'`,(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
})

app.put('/users', async (req,res)=>{
    var emp = req.body;
    console.log(emp);
    try{
        mysqlCNN.query(`SELECT * FROM manuser WHERE id = ${emp.id}`, (err,rows,fields)=>{
            if(!err)
            {
                console.log(rows[0].name)
                var name = emp.name? emp.name: rows[0].name;
                var account = emp.account? emp.account: rows[0].account;
                var password = emp.password? emp.password: rows[0].password;
                var avatar = emp.avatar? emp.avatar: rows[0].avatar;
                var numofbank = emp.numofbank? emp.numofbank: rows[0].numofbank;
                var email = emp.email? emp.email: rows[0].email;
                var phone = emp.phone? emp.phone: rows[0].phone;

                var sql = `SET @id = '${emp.id}';SET @name = '${name}';SET @account = '${account}';SET @password = '${password}';\
                SET @avatar = '${avatar}';SET @numofbank = '${numofbank}';SET @email = '${email}';SET @phone = '${phone}';\
                CALL user_insert_edit(@id,@name,@account,@password,@avatar,@numofbank,@email,@phone);`;
                mysqlCNN.query(sql, (err,rows,fields)=>{
                    if(!err)
                    {
                        res.send('Updated successfully');
                    }
                    else{
                        console.log(err);
                    }       
                })
            }
            else
            {
                console.log(err);
            }
        })

    }
    catch(err){
        console.log(err)
    }
    
})


app.patch('/users', (req,res)=>{
    var emp = req.body;
    try{
        mysqlCNN.query(`SELECT * FROM manuser WHERE id = ${emp.id}`, (err,rows,fields)=>{
            if(!err)
            {
                console.log(rows[0].name)
                var name = emp.name? emp.name: rows[0].name;
                var account = emp.account? emp.account: rows[0].account;
                var password = emp.password? emp.password: rows[0].password;
                var avatar = emp.avatar? emp.avatar: rows[0].avatar;
                var numofbank = emp.numofbank? emp.numofbank: rows[0].numofbank;
                var email = emp.email? emp.email: rows[0].email;
                var phone = emp.phone? emp.phone: rows[0].phone;

                var sql = `SET @id = '${emp.id}';SET @name = '${name}';SET @account = '${account}';SET @password = '${password}';\
                SET @avatar = '${avatar}';SET @numofbank = '${numofbank}';SET @email = '${email}';SET @phone = '${phone}';\
                CALL user_insert_edit(@id,@name,@account,@password,@avatar,@numofbank,@email,@phone);`;
                mysqlCNN.query(sql, (err,rows,fields)=>{
                    if(!err)
                    {
                        res.send('Updated successfully');
                    }
                    else{
                        console.log(err);
                    }       
                })
            }
            else
            {
                console.log(err);
            }
        })

    }
    catch(err){
        console.log(err)
    }
    
})

s4 = ()=>{
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

randomkey = ()=>
  {
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  }


var msg = "";
var waiting = false;
var key_validation = "";
var password = "";

app.get("/check-validation",(req,res)=>{
    console.log(key_validation);
    res.send(key_validation);
})

app.post("/validation", (req,res)=>{
    if(waiting)
       { 
            msg = req.body.msg;
            password = req.body.password
            waiting = false;
       }
    res.send(msg);
})

app.post('/key',(req,res)=>{
    var emp = req.body;
    console.log(emp);
    key_validation = randomkey();
    console.log(key_validation);
    const html = `http://localhost:3006/validation-key/${key_validation}`
    if(emp.msg === "waiting")
    {
        waiting = true;
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            service: 'gmail',
            auth: {
                user: "vtowapi@gmail.com", 
                pass: "0917644229" 
            }
        });
    
         transporter.sendMail({
            from: 'vtowapi@gmail.com', 
            to: req.body.email, 
            subject: 'Chứng thực tạo key', 
            text: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! dưới đây là đường link dùng để chứng thực\n" + html,
        },(err,info)=>{
            if(err)
                console.log(err);
            else
            {
                var set = setInterval(()=>{
                    if(msg === "sucessfully")
                    {
                        clearInterval(set);
                        res.send("sent");
                        msg = "";
                    }
                },1000)
            }
        });
    }
    if(emp.method === 'get-key')
    {
        console.log(emp);
        var key = randomkey();
        key = key + emp.start + emp.user;
        var today = new Date();
        var date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear() + "-" + today.getHours()+ ":" +today.getMinutes();
                mysqlCNN.query(`SELECT * FROM manbank where id = '${emp.card}'`,async (err,rowsb,fields)=>{
                    if(!err)
                    {
                        if(rowsb[0].Money > emp.cost)
                        {
                            var sql = `SET @id = '${emp.id}';SET @value = '${key}';SET @type = '${emp.type}';SET @user = '${emp.user}';SET @start = '${date}';SET @count = '${0}';SET @last = 'NULL';SET @source = 'NULL';SET @status = 'can use';\
                            CALL key_count_insert_edit(@id,@value,@type,@user,@start,@count,@last,@source,@status);`;
                            console.log(sql);
                            await mysqlCNN.query(sql, (err,rows,fields)=>{
                                if(!err)
                                {
                                    res.send(key);
                                }
                                else{
                                        console.log(err);
                                    }
                                })
                                var sql2 = `SET @id = '${emp.card}'; SET @Money = '${rowsb[0].Money - emp.cost}';\
                                CALL bank_change_money(@id,@Money);`
                            await  mysqlCNN.query(sql2, (err,rowsds, fields)=>{
                                    if(!err)
                                    {
                                        console.log(sql2);
                                    }
                                    else
                                    {
                                        console.log(err);
                                    }
                        })
                            var subject = "Thông báo";
                            var text = "";
                            if(emp.type === "Free")
                            {
                                text = "Chào bạn!\n API key của bạn đã tạo thành công\nBạn có thê trải nghiệm nó\nNhưng bạn chỉ được gọi key này khoảng 1000 lần\nXin chân thành cảm ơn bạn đã sự dụng dịch vụ của chúng tôi"
                            }
                            else if(emp.type === "Unlimited")
                            {
                                text = `Chào bạn!\n API key gói ${emp.type} của bạn đã được tạo thành công\nGói này được tính phí là 1$/1000 lần gọi\nXin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi`;
                            }
                            else text = `Chào bạn!\n API key gói ${emp.type} của bạn đã được tạo thành công\nChúng tôi đã trừ số tiền ${emp.cost}USD vào tài khoản của bạn\nXin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi`;
                            await sendMail(subject,text,"",emp.email);                    
                        }
                        else
                        {
                            res.send("Your account does not have enough money")
                        }
            }
            else{
                console.log(err);
            }
        })
    }
    console.log(emp)
})


sendMail = (subject,text,html,email)=>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "vtowapi@gmail.com", 
            pass: "0917644229" 
        }
    });

     transporter.sendMail({
        from: 'vtowapi@gmail.com', 
        to: email, 
        subject, 
        text: text + " " +html,
    },(err,info)=>{
        if(err)
            console.log(err);
    });
}

app.post('/register-key-again',(req,res)=>{
    var emp = req.body;
    console.log(emp);
    key_validation = randomkey();
    console.log(key_validation);
    const html = `http://localhost:3006/register-key-again/${key_validation}`
    if(emp.msg === "waiting")
    {
        waiting = true;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "vtowapi@gmail.com", 
                pass: "0917644229" 
            }
        });
    
         transporter.sendMail({
            from: 'vtowapi@gmail.com', 
            to: req.body.email, 
            subject: 'Chứng thực gia hạn key', 
            text: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! dưới đây là đường link dùng để chứng thực\n" + html,
        },(err,info)=>{
            if(err)
                console.log(err);
            else
            {
                var set = setInterval(()=>{
                    if(msg === "sucessfully")
                    {
                        clearInterval(set);
                        res.send("sent");
                        msg = "";
                    }
                },1000)
            }
        });
    }
    if(emp.method === 'register-again')
    {
        console.log(emp);
        var today = new Date();
        var date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear() + "-" + today.getHours()+ ":" +today.getMinutes();
                mysqlCNN.query(`SELECT * FROM manbank where id = '${emp.card}'`,async (err,rowsb,fields)=>{
                    if(!err)
                    {
                        if(rowsb[0].Money > emp.cost)
                        {
                            var sql2 = `UPDATE  mankey_count SET type = '${emp.type}', status = 'can use', start ='${date}' WHERE id = ${emp.id};`
                            console.log(sql2);
                            await  mysqlCNN.query(sql2, (err,rowsds, fields)=>{
                                    if(!err)
                                    {
                                        res.send("sucessfully");
                                    }
                                    else
                                    {
                                        console.log(err);
                                    }
                        })

                         var sql3 = `SET @id = '${emp.card}'; SET @Money = '${rowsb[0].Money - emp.cost}';\
                                CALL bank_change_money(@id,@Money);`
                                console.log(sql3);
                            await  mysqlCNN.query(sql3, (err,rowsds, fields)=>{
                                    if(!err)
                                    {
                                        console.log(sql2);
                                    }
                                    else
                                    {
                                        console.log(err);
                                    }
                        })
                            var subject = "Thông báo";
                            var text = "";
                            if(emp.type === "Unlimited")
                            {
                                text = `Chào bạn!\n API key đã được gia hạn thành công với gói ${emp.type}\nGói này được tính phí là 1$/1000 lần gọi\nXin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi`;
                            }
                            else text = `Chào bạn!\n API key của bạn đã được gia hạn thành công và chuyển sang gói ${emp.type}\nChúng tôi đã trừ số tiền ${emp.cost}USD vào tài khoản của bạn\nXin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi`;
                            await sendMail(subject,text,"",emp.email);                    
                        }
                        else
                        {
                            res.send("tài khoản không đủ tiền")
                        }
            }
            else{
                console.log(err);
            }
        })
    }
    console.log(emp);
})

app.post("/forgotpassword", (req,res)=>{
    var emp = req.body;
    console.log(emp);
    key_validation = randomkey();
    console.log(key_validation);
    const html = `http://localhost:3006/forgotpassword/${key_validation}`
    if(emp.msg === "waiting")
    {
        waiting = true;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "vtowapi@gmail.com", 
                pass: "0917644229" 
            }
        });
    
         transporter.sendMail({
            from: 'vtowapi@gmail.com', 
            to: req.body.email, 
            subject: 'Chứng thực quên mật khẩu', 
            text: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! dưới đây là đường link dùng để chứng thực\n" + html,
            
        },(err,info)=>{
            if(err)
                console.log(err);
            else
            {
                var set = setInterval(()=>{
                    if(msg === "sucessfully")
                    {
                        clearInterval(set);
                        res.send("sent");
                        msg = "";
                    }
                },1000)
            }
        });
    }
    if(emp.method === 'forgot-password')
    {
        var sql = `SET @id = '${emp.id}';SET @password = '${password}';\
        CALL user_change_password(@id,@password);`;
        mysqlCNN.query(sql, (err,rows,fields)=>{
            if(!err)
            {
                console.log("successfully")
                res.send("successfully");
            }
            else{
                console.log(err);
            }
        })
        console.log(emp);
    }
})


app.post('/users', (req,res)=>{
    var emp = req.body;
    console.log(emp);
    key_validation = randomkey();
    console.log(key_validation);
    const html = `http://localhost:3006/register/${key_validation}`
    if(emp.msg === "waiting")
    {
        waiting = true;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "vtowapi@gmail.com", 
                pass: "0917644229" 
            }
        });
    
         transporter.sendMail({
            from: 'vtowapi@gmail.com', 
            to: req.body.email, 
            subject: 'Chứng thực đăng ký tài khoản', 
            text: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! dưới đây là đường link dùng để chứng thực\n" + html,
        },(err,info)=>{
            if(err)
                console.log(err);
            else
            {
                var set = setInterval(()=>{
                    if(msg === "sucessfully")
                    {
                        clearInterval(set);
                        res.send("sent");
                        msg = "";
                    }
                },1000)
            }
        });
    }
    if(emp.method === 'register')
    {
    var sql = `SET @id = '${0}';SET @name = '${emp.name}';SET @account = '${emp.account}';SET @password = '${emp.password}';\
    SET @avatar = '${emp.avatar}';SET @numofbank = '${emp.numofbank}';SET @email = '${emp.email}';SET @phone = '${emp.phone}';\
    CALL user_insert_edit(@id,@name,@account,@password,@avatar,@numofbank,@email,@phone);`
    console.log(sql);
    mysqlCNN.query(sql, (err,rows,fields)=>{
        if(!err)
        {
            res.send("successfully");
        }
        else{
            console.log(err);
        }
    })
    console.log(emp);
    }
})

app.post("/changepassword", (req,res)=>{ 
    var emp = req.body;
    var sql = `SET @id = '${emp.id}';SET @password = '${emp.password}';\
        CALL user_change_password(@id,@password);`;
        mysqlCNN.query(sql, (err,rows,fields)=>{
            if(!err)
            {
                console.log("successfully")
                res.send("successfully");
            }
            else{
                console.log(err);
            }
        })
        console.log(emp); 
})


app.post("/",(req,res)=>{
    var key = req.body.key
    var sql = `SELECT * FROM mankey  where value = '${key}';`;
    var check = false;
    mysqlCNN.query(sql, (err,rows,fields)=>{
        if(!err)
        {
            var msg = {
                check: check,
                msg: "Key Undifine"
            }
            if(rows[0])
            {
                check = true;
                var msg = {
                    check: check,
                    msg: "Connected"
                }
                res.send(msg);
            }
            else
            {
                res.send(msg);
            }
        }
        else{
            console.log(err);
        }
    })
})


app.get("/engvies/:eng", (req,res)=>{
    let word = req.params.eng;
    request({
        url: 'http://localhost:3001/engvie/' + word,
        method: 'GET',
        dataType: "json",
        timeout: 10000,
    },function(err,data,body) {
        let obj = JSON.parse(body);
        console.log(obj.vie)
        res.send(obj.vie)
    })
})


app.post("/translate", (req,res)=>{
    var key = req.body.key;
    var last = req.body.last;
    var source = req.body.source;
    var word = req.body.eng;
    console.log(req.body);
    var sql = `SELECT * FROM mankey_count where value = '${key}';`;
    var check = false;
    mysqlCNN.query(sql, (err,rows,fields)=>{
        if(!err)
        {
            var msg = {
                check: check,
                msg: "Key Undifine"
            }
            if(rows[0])
            {
                if(rows[0].status === "expired")
                {
                    var msg = {
                        check: check,
                        msg: "Key is expired"
                    }
                    res.send(msg);
                }
                else
                {
                var sql = `SET @id = '${rows[0].id}';SET @value = '';SET @type = '';SET @user = '';SET @start = '';SET @count = '${rows[0].count + 1}';SET @last = '${last}';SET @source = '${source}';SET @status = '';\
                CALL key_count_insert_edit(@id,@value,@type,@user,@start,@count,@last,@source,@status);`;
                mysqlCNN.query(sql, (err,rows,fields)=>{
                    if(!err)
                    {
                        console.log("sucessfully")
                    }
                    else{
                        console.log(err);
                    }
                })
                check = true;
                var msg = {
                    check: check,
                    msg: "Succesfully"
                }
                request({
                    url: 'https://apiengvie.herokuapp.com/engvie/' + word,
                    method: 'GET',
                    dataType: "json",
                    timeout: 10000,
                },function(err,data,body) {
                    let obj = JSON.parse(body);
                    console.log(obj.vie)
                    var msg = {
                        check: check,
                        msg: "Succesfully",
                        vie: obj.vie
                    }
                    res.send(msg);
                })
              }
            }
            else
            {
                res.send(msg);
            }
        }
        else{
            console.log(err);
        }
    })
})

app.post("/send-mail", (req,res)=>{
    console.log(req.body);
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "vtowapi@gmail.com", 
            pass: "0917644229" 
        }
    });

     transporter.sendMail({
        from: 'vtowapi@gmail.com', 
        to: req.body.email, 
        subject: 'SOA - Xác nhận tài khoản', 
        text: req.body.contain + req.body.code, 
    });

    res.send("done");
})


app.post("/send-mail-contacts", (req,res)=>{
    var emp = req.body;
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "vtowapi@gmail.com", 
            pass: "0917644229" 
        }
    });

     transporter.sendMail({
        from: req.body.email, 
        to:  'vtowapi@gmail.com', 
        subject: "Feed back from " + req.body.from, 
        text: req.body.content, 
    });

    
    console.log(emp)

    var sql = `SET @id = '${0}';SET @name = '${emp.name}';SET @email = '${emp.email}';SET @telno = '${emp.phone}';\
    SET @company = '${''}';SET @position = '${''}';SET @contents = '${emp.content}';SET @reply = '${0}'; SET @readl = '${0}';\
    CALL mail_insert(@id,@name,@email,@telno,@company,@position,@contents,@reply,@readl);`;
    mysqlCNN.query(sql, (err,rows,fields)=>{
        if(!err)
        {
            console.log("ádasdasdsad")
        }
        else{
            console.log(err);
        }       
    })

    res.send("done");
})


app.get('/get-keys/:id', (req,res) =>{

    mysqlCNN.query(`SELECT * FROM mankey_count WHERE user = ${req.params.id}`, (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.post("/keys", (req,res)=>{
    mysqlCNN.query(`select * FROM mankey_count`, (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.post("/mails", (req,res)=>{
    mysqlCNN.query(`select * FROM manmail`, (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.post('/keys/:id', (req,res) =>{
    req.setTimeout(10000);
    console.log(req.body);
    if(!req.body.bool)
    {
        res.send("not")
    }
    else
    {
    mysqlCNN.query(`DELETE FROM mankey_count WHERE id = ${req.params.id}`, (err,rows,fields)=>{
        if(!err)
        {
            res.send("done");
        }
        else{
            console.log(err);
        }
    })
}
})

app.get('/banks', (req,res)=>{
    mysqlCNN.query("SELECT * FROM manbank", (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
    
})

app.get('/banks-name', (req,res)=>{
    mysqlCNN.query("SELECT * FROM manbanks_name", (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.get("/avatar", (req,res)=>{
    mysqlCNN.query("SELECT * FROM manavatar", (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

query_update_status = (id)=>
{
    var sql = `UPDATE mankey_count SET status = 'expired' where id = ${id}`;
    mysqlCNN.query(sql,(err,rows,fields)=>{
        if(!err)
        {
            console.log('expired');
        }
        else
        {
            console.log(err);
        }
    })
}

app.post("/check-out-of-date", (req,res)=>{
    mysqlCNN.query("SELECT * FROM mankey_count", (err,rows,fields)=>{
        if(!err)
        {
            rows.map(value=>{
                if(value.type === "Free")
                {
                    if(value.count >= 100)
                    {
                        query_update_status(value.id);
                    }
                }
                if(value.type.includes('Month'))
                {
                    var date = value.start.split('/');
                    var time = date.pop();
                    var date2 = time.split('-');
                    var year = parseInt(date2[0]);
                    var month = parseInt(date.pop());
                    if(month > 12)
                    {
                        month  = month - 12;
                        year = year + 1;
                    }
                    var day = parseInt(date.pop());
                    var package = value.type.split(' ');
                    var limit = parseInt(package[0]);
                    var today = new Date();
                    var daynow = parseInt(today.getDate());
                    var monthnow =  parseInt(today.getMonth())+1;
                    var yearnow =  parseInt(today.getFullYear());

                    var month2 = month + limit;
                    if(month2 > 12)
                    {
                        month2 = month2 - 12;
                        year = year + 1;
                    }
                    var daylimit = daynow - day;
                    var monthlimit = monthnow - month2;
                    var yearlimit = yearnow - year;
                    if(daylimit >= 0 && monthlimit >= 0 && yearlimit >= 0)
                    {
                        query_update_status(value.id);
                    }
                }
            })
        }
        else{
            console.log(err);
        }
    })
    res.send("done");
})

app.post("/key-time-out", (req,res)=>{
    var emp = req.body;
    if(emp.msg === "get-key")
    {
        console.log(emp);
        var key = randomkey();
        key = key + emp.start + emp.user;
        var today = new Date();
        var date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear() + "-" + today.getHours()+ ":" +today.getMinutes();
        var sql = `SET @id = '${emp.id}';SET @value = '${key}';SET @type = '${emp.type}';SET @user = '${emp.user}';SET @start = '${date}';SET @count = '${0}';SET @last = 'NULL';SET @source = 'NULL';SET @status = 'can use';\
        CALL key_count_insert_edit(@id,@value,@type,@user,@start,@count,@last,@source,@status);`;
        console.log(sql);
        mysqlCNN.query(sql, (err,rows,fields)=>{
            if(!err)
            {
                res.send(key);
            }
            else{
                console.log(err);
            }
        })
    }
})

app.post('/register-key-again-time-out',(req,res)=>{
    req.setTimeout(10000);
    var emp = req.body;
    console.log(emp);
    if(emp.msg === "send-mail")
    {
        key_validation = randomkey();
        console.log(key_validation);
        const html = `http://localhost:3006/register-key-again/${key_validation}`
        waiting = true;
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            service: 'gmail',
            auth: {
                user: "vtowapi@gmail.com", 
                pass: "0917644229" 
            }
        });
    
         transporter.sendMail({
            from: 'vtowapi@gmail.com', 
            to: req.body.email, 
            subject: 'Chứng thực gia hạn key', 
            text: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! dưới đây là đường link dùng để chứng thực\n" + html,
        },(err,info)=>{
            if(err)
                console.log(err);
            else
            {
                res.send("sent");
            }
        });   
    }
    if(emp.msg === "waiting")
    {
        if(msg === "sucessfully")
            {
                res.send("done");
                msg = "";
            }
        else res.send("not");    
    }
    if(emp.msg === "register-again")
    {
        console.log(emp);
        var today = new Date();
        var date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear() + "-" + today.getHours()+ ":" +today.getMinutes();
        var sql2 = `UPDATE  mankey_count SET type = '${emp.type}', status = 'can use', start ='${date}' WHERE id = ${emp.id};`
        console.log(sql2);
                            mysqlCNN.query(sql2, (err,rowsds, fields)=>{
                                    if(!err)
                                    {
                                        res.send("sucessfully");
                                    }
                                    else
                                    {
                                        console.log(err);
                                    }
                        })
            }
})

app.post("/forgotpassword-time-out",(req,res)=>{
    req.setTimeout(10000);
    var emp = req.body;
    console.log(emp);
    if(emp.msg === "send-mail")
    {
        key_validation = randomkey();
        console.log(key_validation);
        const html = `http://localhost:3006/forgotpassword/${key_validation}`
        waiting = true;
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            service: 'gmail',
            auth: {
                user: "vtowapi@gmail.com", 
                pass: "0917644229" 
            }
        });
    
         transporter.sendMail({
            from: 'vtowapi@gmail.com', 
            to: req.body.email, 
            subject: 'Chứng thực quên mật khẩu', 
            text: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! dưới đây là đường link dùng để chứng thực\n" + html,
        },(err,info)=>{
            if(err)
                console.log(err);
            else
            {
                res.send("sent");
            }
        });   
    }
    if(emp.msg === "waiting")
    {
        if(msg === "sucessfully")
            {
                res.send("done");
                msg = "";
            }
        else res.send("not");    
    }
    if(emp.msg === "forgot-password")
    {
        var sql = `SET @id = '${emp.id}';SET @password = '${password}';\
        CALL user_change_password(@id,@password);`;
        mysqlCNN.query(sql, (err,rows,fields)=>{
            if(!err)
            {
                console.log("successfully")
                res.send("successfully");
            }
            else{
                console.log(err);
            }
        })
        console.log(emp);
    }
})

app.post('/users-time-out', (req,res)=>{
    req.setTimeout(10000);
    var emp = req.body;
    console.log(emp);
    if(emp.msg === "send-mail")
    {
        key_validation = randomkey();
        console.log(key_validation);
        const html = `http://localhost:3006/register/${key_validation}`
        waiting = true;
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            service: 'gmail',
            auth: {
                user: "vtowapi@gmail.com", 
                pass: "0917644229" 
            }
        });
    
         transporter.sendMail({
            from: 'vtowapi@gmail.com', 
            to: req.body.email, 
            subject: 'Chứng thực tạo tài khoản', 
            text: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! dưới đây là đường link dùng để chứng thực\n" + html,
        },(err,info)=>{
            if(err)
                console.log(err);
            else
            {
                res.send("sent");
            }
        });   
    }
    if(emp.msg === "waiting")
    {
        if(msg === "sucessfully")
            {
                res.send("done");
                msg = "";
            }
        else res.send("not");    
    }
    if(emp.msg === "register")
    {
        var sql = `SET @id = '${0}';SET @name = '${emp.name}';SET @account = '${emp.account}';SET @password = '${emp.password}';\
        SET @avatar = '${emp.avatar}';SET @numofbank = '${emp.numofbank}';SET @email = '${emp.email}';SET @phone = '${emp.phone}';\
        CALL user_insert_edit(@id,@name,@account,@password,@avatar,@numofbank,@email,@phone);`
        console.log(sql);
        mysqlCNN.query(sql, (err,rows,fields)=>{
            if(!err)
            {
                res.send("successfully");
            }
            else{
                console.log(err);
            }
        })
        console.log(emp);
    }
})

app.post('/change-key-value-time-out', (req,res)=>{
    var emp = req.body;
    if(emp.msg === "change-key")
    {
        key = randomkey();
        key = key + emp.start + emp.user;
        var sql = `UPDATE mankey_count SET value = '${key}' where id = ${emp.id}`;
        console.log(sql);
        mysqlCNN.query(sql, (err,rows,fields)=>{
            if(!err)
            {
                res.send(key);
            }
            else{
                console.log(err);
            }
        })
        console.log(emp);
    }
})

app.post("/fb-gg-login", (req,res)=>{
    var emp = req.body;
    mysqlCNN.query(`SELECT * FROM manuser WHERE account = '${emp.account}'`,(err,rows,fields)=>{
        if(!err)
        {
            if(rows[0])
            {
                res.send(rows[0]);
            }
            else
            {
                var sql = `SET @id = '${0}';SET @name = '${emp.name}';SET @account = '${emp.account}';SET @password = '${emp.password}';\
                SET @avatar = '${emp.avatar}';SET @numofbank = '${emp.numofbank}';SET @email = '${emp.email}';SET @phone = '${emp.phone}';\
                CALL facebook_google_insert(@id,@name,@account,@password,@avatar,@numofbank,@email,@phone);`;
                mysqlCNN.query(sql, (err,rows,fields)=>{
                    if(!err)
                    {
                        mysqlCNN.query(`SELECT * FROM manuser WHERE account = '${emp.account}'`,(err,rows,fields)=>{
                            if(!err)
                            {
                                res.send(rows[0]);
                            }
                            else
                            {
                                console.log(err);
                            }
                        })
                    }
                    else{
                        console.log(err);
                    }       
                })
            }
        }
        else
        {
            console.log(err);
        }
    })
})

app.post("/log-in", (req,res)=>{
    var emp = req.body;
    mysqlCNN.query(`SELECT * FROM manuser WHERE account = '${emp.account}'`,(err,rows,fields)=>{
        if(!err)
        {
            if(rows[0])
            {
                if(rows[0].password === emp.password)
                {
                    res.send(rows[0]);
                }
                else
                {
                    res.send("password is incorrect")
                }
            }
            else
            {
                res.send("Account does not exist");
            }
        }
        else
        {
            console.log(err);
        }
    })
})

app.post("/log-in-admin", (req,res)=>{
    var emp = req.body;
    mysqlCNN.query(`SELECT * FROM admin WHERE account = '${emp.account}'`,(err,rows,fields)=>{
        if(!err)
        {
            if(rows[0])
            {
                if(rows[0].password === emp.password && rows[0].public_key === emp.admin_public_key)
                {
                    res.send(rows[0]);
                }
                else
                {
                    res.send("password or public key is incorrect")
                }
            }
            else
            {
                res.send("Account does not exist");
            }
        }
        else
        {
            console.log(err);
        }
    })
})


app.get("/API.js",(req,res)=>{  
    res.sendFile(__dirname + '/API.js');
})


app.post("/delete-mail",(req,res)=>{
    console.log(req.body);
            mysqlCNN.query(`DELETE FROM manmail WHERE id = ${req.body.id}`, (err,rows,fields)=>{
                if(!err)
                {
                    res.send("Delete succesfully");
                }
                else{
                    console.log(err);
                    res.send("error");
                }
            }) 
})

app.post("/delete-mails",(req,res)=>{
    console.log(req.body);
    var emp = req.body;
    var count = 0;
    emp.map(value=>{
        mysqlCNN.query(`DELETE FROM manmail WHERE id = ${value}`, (err,rows,fields)=>{
            if(!err)
            {
                count = count + 1;
            }
            else{
                console.log(err);
                count = count - 1;
            }
        }) 
    })
    res.send("done")
})


app.post("/readed",(req,res)=>{
    console.log(req.body);
   
        mysqlCNN.query(`update manmail set readl = '1' where id = ${req.body.id}`, (err,rows,fields)=>{
            if(!err)
            {
                res.send("done")
            }
            else{
                console.log(err);
            }
        }) 
   
})


app.post("/getmail",(req,res)=>{
    console.log(req.body);
        mysqlCNN.query(`select * from manmail where id = ${req.body.id}`, (err,rows,fields)=>{
            if(!err)
            {
                res.send(rows)
            }
            else{
                console.log(err);
            }
        }) 
   
})

app.post("/send-reply", (req,res)=>{
    console.log(req.body);
   
    mysqlCNN.query(`update manmail set reply = '1' where id = ${req.body.id}`, (err,rows,fields)=>{
        if(!err)
        {
            res.send("done")
        }
        else{
            console.log(err);
        }
    }) 
    sendMail("Reply", req.body.content, '', req.body.email);
})




