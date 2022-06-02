const nodemailer = require("nodemailer");

//database ile sayfa arasındaki bağlantıyı sağlar
exports.getIndexPage = (req, res) => {
    console.log(req.session.userıd);
    res.render('index', {
        page_name: "index"
    })
}

exports.getAboutPage = (req, res) => {
    res.render('about', {
        page_name: "about"
    })
}

exports.getRegisterPage = (req, res) => {
    res.render('register', {
        page_name: "register"
    })
}



exports.getLoginPage = (req, res) => {
    res.render('login', {
        page_name: "login"
    })
}


exports.getContact = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact',
    });
};

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
      page_name: 'contact',
    });
  };
  
  exports.sendEmail = async (req, res) => {
  
    const outputMessage = `
    
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `
    console.log(outputMessage);
    console.log("-------");

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'email',
          pass: 'passw'
      }
  });
console.log("-------");
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <email>', 
    to: "email", 
    subject: "Hello ✔", 
    text: "Hello world?",
    html: outputMessage
  });
  console.log("-------");

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.redirect('contact');
    res.end()
  };