import config from "../config/config.js";
import nodemailer from "nodemailer";

const sendEmail = (to, subject, html) => {
  // return new Promise(function (resolve, reject) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: config.email.user, // generated ethereal user
      pass: config.email.pass, // generated ethereal password
    },
  });

  let mailOptions = {
    from: config.email.user, // sender address
    to: to, // list of receivers
    subject: subject + " - " + to, // Subject line
    html: html, //html body
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log("error::", error);
      // resolve({ delivered: false, status: "Fail", info: info });
      return { error: error, delivered: false, status: "Fail" };
    } else {
      // resolve({ delivered: true, status: "ok", info: info });
      return { error: error, delivered: true, status: "ok" };
    }
  });
  // });
};

export default sendEmail;
