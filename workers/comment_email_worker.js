const queue=require('../config/kue');

const commentMailer=require('../mailers/comment_mailer');

queue.process('emails',function(job,done){
    console.log('Comment Mailer is working on the job:',job.data);
    
    commentMailer.newComment(job.data);
    done();

});