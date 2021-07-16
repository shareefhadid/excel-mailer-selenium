const MailListener = require("mail-listener2-updated");
const path = require("path");
const mailScanner = require("./pythonChildProcess")


module.exports = function () {
  const mailListener = new MailListener({
    username: "ocrscraper@gmail.com",
    password: "cd2X54$97Vf40%4e",
    host: "imap.gmail.com",
    port: 993, // imap port
    tls: true,
    connTimeout: 10000, // Default by node-imap
    authTimeout: 5000, // Default by node-imap,
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "INBOX", // mailbox to monitor
    searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
    markSeen: true, // all fetched email willbe marked as seen and not fetched next time
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
    attachments: true, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: path.join(__dirname, "attachments/") } // specify a download directory for attachments
  });

  mailListener.start(); // start listening

  mailListener.on("server:connected", function () {
    console.log("imapConnected");
  });

  mailListener.on("server:disconnected", function () {
    console.log("imapDisconnected");
  });

  mailListener.on("error", function (err) {
    console.log(err);
  });

  mailListener.on("mail", async function (mail, seqno, attributes) {
    // do something with mail object including attachments
    const attachmentPaths = mail.attachments.map(({path}) => path)
    console.log("mail attachments:", attachmentPaths)
    OCROutput = await mailScanner(attachmentPaths)
    console.log(OCROutput)
  });
}