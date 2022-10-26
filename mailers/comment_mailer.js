const nodemailer=require('../config/nodemailer');


exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/new_comment.ejs');
    console.log('Inside newComment Mailer');

    nodemailer.transporter.sendMail({
        from:'thotasasikumarreddy@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending Mail',err);
            return;
        }
        console.log('Succussfully sent the mail',info);
        return;
    });
}