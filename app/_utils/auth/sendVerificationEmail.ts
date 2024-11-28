import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.BASE_URL}/login/verify-account?token=${token}`;
  const logo = `${process.env.BASE_URL}/src/assets/clean-me.fw.png`;
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            font-family: Arial, sans-serif;
            background-color: #2B2D42;
            margin: 0;
            padding: 20px;
            height: 100%;
          }
          .email-container {
            max-width: 600px;
            margin: 0px auto;
            background-color: #2B2D42;
            padding: 20px;
           
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 220px;
          }
          .content {
            text-align: center;
            color: #fff;
          }
          .content a {
            display: inline-block;
            margin: 10px 0px;
            padding: 10px 20px;
            background-color: #0C5E10FF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          .content a:hover {
            background-color: #0C9213FF;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <a href="${process.env.BASE_URL}"><img src="${logo}" alt="CleanMe" /></a>
          </div>
          <div class="content">
            <p>Potvrdite svoju adresu e-pošte klikom na dugme ispod:</p>
            <a href="${verificationUrl}">Aktivirajte nalog</a>
            <p>Ako Vi niste otvorili ovaj nalog, možete da zanemarite ovu e-poruku.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: '"CleanMe" <cleanme@e-seo.info>',
    to: email,
    subject: "CleanMe - Aktivacija naloga",
    html: emailHtml,
  });
};
