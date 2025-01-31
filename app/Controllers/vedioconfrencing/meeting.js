const meeting = require('../../Models/roomparticipants')
const Helper = require("./../../Helper/helper");

exports.joinmeeting = async (req, res) => {
  try {
    const obj = req.body;
    const joined_at = new Date();
    const joinmeeting = await meeting.create({
      room_id: obj.meeting_id,
      user_id: obj.user_id,
      joined_at: joined_at,
    
    });
    if (joinmeeting) {
      Helper.response("success", "Employee Joined successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to Employee Joined", {}, res, 200);
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
    const joinmeeting = await MeetingParticipant.create({
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
    const leavemeeting =  await meeting.update(
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

module.exports={joinMeetingsocket,leaveMeetingsocket}

