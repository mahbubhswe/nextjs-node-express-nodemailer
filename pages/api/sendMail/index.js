import nodemailer from "nodemailer";
import nc from "next-connect";
const handler = nc();
handler.post((req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mahbubgid@gmail.com",
      pass: "bmwfeufbpchgamhk",
    },
  });

  const details = {
    from: "mahbubgid@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
  };

  transporter.sendMail(details, (error) => {
    if (error) {
      res.send("Failed to send your mail");
    } else {
      res.send("Message has been sent successfully");
    }
  });
});
export default handler;
