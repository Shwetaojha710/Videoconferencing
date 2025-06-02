const meeting = require('../../models/meeting');
const roomparticipants = require('../../models/roomparticipants')
const Helper = require("./../../helper/helper");
const nodemailer = require('nodemailer');


exports.createmeeting = async (req, res) => {
  try {
    const { title, description, start_time, end_time,start_date, end_date,  location,meeting_link ,email_id,type} = req.body;

       // Validate required fields
    // if (!title || !description || !start_time || !end_time || !location || !meeting_link || !email_id) {
    //   return Helper.response("failed", "Missing required fields", null, res, 400);
    // }
    // Create a new meeting
    const emailArray = Array.isArray(email_id) ? email_id : [email_id];
    const meetingCreate = await meeting.create({
      title,
      description,
      start_time,
      end_time,
      location,
      email_id: emailArray, 
      type,
      end_date,
      start_date,
      meeting_link:meeting_link,
      created_by:req.users?.id
    });
    // console.log(email_id)
    // return false
    // if(meetingCreate){
    //     const link = `http://192.168.23.96:5001/reset-password/`;
    //       const sendMail = Helper.mail(email_id[0], "MEETING JOIN", `<!DOCTYPE html>
    //   <html lang="en">
      
    //   <head>
    //       <meta charset="utf-8">
    //       <meta name="viewport" content="width=device-width">
    //       <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //       <meta name="x-apple-disable-message-reformatting">
    //       <title></title>
      
    //       <link href="https://fonts.googleapis.com/css?family=Roboto:400,600" rel="stylesheet" type="text/css">
      
      
      
    //       <style>
    //           html,
    //           body {
    //               margin: 0 auto !important;
    //               padding: 0 !important;
    //               height: 100% !important;
    //               width: 100% !important;
    //               font-family: 'Roboto', sans-serif !important;
    //               font-size: 14px;
    //               margin-bottom: 10px;
    //               line-height: 24px;
    //               color: #8094ae;
    //               font-weight: 400;
    //           }
      
    //           * {
    //               -ms-text-size-adjust: 100%;
    //               -webkit-text-size-adjust: 100%;
    //               margin: 0;
    //               padding: 0;
    //           }
      
    //           table,
    //           td {
    //               mso-table-lspace: 0pt !important;
    //               mso-table-rspace: 0pt !important;
    //           }
      
    //           table {
    //               border-spacing: 0 !important;
    //               border-collapse: collapse !important;
    //               table-layout: fixed !important;
    //               margin: 0 auto !important;
    //           }
      
    //           table table table {
    //               table-layout: auto;
    //           }
      
    //           a {
    //               text-decoration: none;
    //           }
      
    //           img {
    //               -ms-interpolation-mode: bicubic;
    //           }
    //       </style>
      
    //   </head>
      
    //   <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f5f6fa;">
    //       <center style="width: 100%; background-color: #f5f6fa;">
    //           <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f6fa">
    //               <tr>
    //                   <td style="padding: 40px 0;">
    //                       <table style="width:100%;max-width:620px;margin:0 auto;">
    //                           <tbody>
    //                               <tr>
    //                                   <td style="text-align: center; padding-bottom:25px">
    //                                       <a href="#"><img style="height: 60px"
    //                                               src="https://pgich.demoquaeretech.in/static/media/newlogo.292c3397102e1527715f.png"
    //                                               alt="logo"></a>
      
    //                                   </td>
    //                               </tr>
    //                           </tbody>
    //                       </table>
    //                       <table style="width:100%;max-width:620px;margin:0 auto;background-color:#ffffff;">
    //                           <tbody>
    //                               <tr>
    //                                   <td style="text-align:center;padding: 30px 30px 15px 30px;">
    //                                       <h2 style="font-size: 18px; color: #6576ff; font-weight: 600; margin: 0;">Reset
    //                                           Password</h2>
    //                                   </td>
    //                               </tr>
    //                               <tr>
    //                                   <td style="text-align:center;padding: 0 30px 20px">
    //                                       <p style="margin-bottom: 10px;">Hi, ${title}</p>
    //                                       <p style="margin-bottom: 25px;">Click On The link blow to reset tour password.</p>
    //                                       <a href=`+ link + `
    //                                           style="background-color:#6576ff;border-radius:4px;color:#ffffff;display:inline-block;font-size:13px;font-weight:600;line-height:44px;text-align:center;text-decoration:none;text-transform: uppercase; padding: 0 25px">Reset
    //                                           Password</a>
    //                                   </td>
    //                               </tr>
    //                               <tr>
    //                                   <td style="text-align:center;padding: 20px 30px 40px">
    //                                       <p>If you did not make this request, please contact us or ignore this message.</p>
    //                                       <p style="margin: 0; font-size: 13px; line-height: 22px; color:#9ea8bb;">This is an
    //                                           automatically generated email please do not reply to this email. If you face any
    //                                           issues, please contact us at care@pgich.com</p>
    //                                   </td>
    //                               </tr>
    //                           </tbody>
    //                       </table>
      
    //                   </td>
    //               </tr>
    //           </table>
    //       </center>
    //   </body>
      
    //   </html>`)
    //       if (sendMail) {
    //         Helper.response("Success", "Link has been sent on your email", sendMail, res, 200);
    //       }
    // }

    // Return a successful response
    return Helper.response("success", "Meeting Created Successfully", meetingCreate, res, 201);
  } catch (error) {
    // Log the error and return a failed response
    console.error(error);
    return Helper.response("failed", error.message, null, res, 500);
  }
};

exports.meetinglist = async (req, res) => {
  try {
    let meetingdata;
    if(req.body.type){
     meetingdata=await meeting.findAll({
      where:{
        type:req.body?.type
      },
      order:[["createdAt","desc"]]
    })
    }else{
       meetingdata=await meeting.findAll({
        order:[["createdAt","desc"]]
        })
    }

    if(meetingdata.length>0){
      return Helper.response("success","Meeting List",meetingdata,res,200)
    }else{
      return Helper.response("success","No Meeting Found",[],res,200)
    }
  } catch (error) {
    console.error(error);
    return Helper.response("success",error.message,"Internal Server Error",res,200)
  }
};

exports.joinmeeting = async (req, res) => {
  try {
    const obj = req.body;
    const joined_at = new Date();
    const joinmeeting = await roomparticipants.create({
      room_id: obj.meeting_id,
      user_id: obj.user_id,
      joined_at: joined_at,
    
    });
    if (joinmeeting) {
     return Helper.response("success", "Employee Joined successfully", {}, res, 200);
    } else {
     return Helper.response("failed", "Failed to Employee Joined", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
  }
};

// Function to handle user joining a meeting
const joinMeetingsocket = async (socket, data, io) => {
  try {
    console.log("hello",data)
    const { meeting_id, user_id } = data;
    const joined_at = new Date();

    console.log(`User ${socket.id} joined meeting ${meeting_id}`);

    // Save participant data to the database
    const joinmeeting = await roomparticipants.create({
      room_id: meeting_id,
      user_id: user_id,
      joined_at: joined_at,
    });

    console.log(`User ${user_id} saved in DB for meeting ${meeting_id}`);

    // Join the Socket.IO room
    socket.join(meeting_id);
    
    // Notify others in the meeting room
    io.to(meeting_id).emit("meeting-joined", { user_id, meeting_id });
   
    if (joinmeeting) {
      Helper.response("success", "Employee Joined successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to Employee Joined", {}, res, 200);
    }


  } catch (error) {
    console.error("Error saving participant:", error);
  }
};

// Function to handle user leave a meeting
const leaveMeetingsocket = async (socket, data, io) => {
  try {
    const { meeting_id, user_id } = data;
    const left_at = new Date();

    console.log(`User ${socket.id} joined meeting ${meeting_id}`);

    // Save participant data to the database
    const leavemeeting =  await roomparticipants.update(
      { left_at: left_at },
      { where: { room_id: meeting_id, user_id: user_id } }
    );
    console.log(`User ${user_id} saved in DB for meeting ${meeting_id}`);

    // Join the Socket.IO room
      socket.leave(data);
      io.to(data).emit("meeting-left", `User ${socket.id} left`);
  
    if (leavemeeting) {
      Helper.response("success", "User Leave successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to User Leave", {}, res, 200);
    }


  } catch (error) {
    console.error("Error saving participant:", error);
  }
};

// module.exports={joinMeetingsocket,leaveMeetingsocket}

