import { Problem } from "@prisma/client";
import { formatDate } from "../helpers/helpers";

const logo = `${process.env.BASE_URL}/ecoglasnik.png`;

export const emailHtml = (
  url: string,
  emailText: string,
  buttonText: string
) => {
  return `
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
            text-decoration: none!important;
          }
          .note {
            margin-top: 20px;
            color: #A1A4BEFF;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <a href="${process.env.BASE_URL}"><img src="${logo}" alt="ECOGLASNIK" /></a>
          </div>
          <div class="content">
            <p>${emailText}</p>
            <a href="${url}">${buttonText}</a>
            <p class="note">Ako Vi niste otvorili ovaj nalog, možete da zanemarite ovu e-poruku.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const emailToOrganisationHtml = (problem: Problem) => {
  const { position } = problem;
  const { lat, lng } = position as { lat: number; lng: number };

  return `
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
            color: #fff;
             line-height: 1.2;
          }
          .content a {
            color: #ffffff;
            text-decoration: underline !important;
          }

          .content a:hover {
            text-decoration: underline;
          }

          .content p{ margin-bottom: 10px;   line-height: 1.2;}

        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <a href="${
              process.env.BASE_URL
            }"><img src="${logo}" alt="ECOGLASNIK" /></a>
          </div>
          <div class="content">
            <p>Poštovani, na platofrmi ECOGLASNIK dana ${formatDate(
              problem.createdAt.toString()
            )} prijavljen je komunalni problem iz Vaše nadležnosti:</p>
            <p>Detalje problema možete pogledati <a href="${
              process.env.BASE_URL
            }/problems/${
    problem.id
  }/?lat=${lat}&lng=${lng}">OVDE</a><br /><br /></p>
            <p>Za sve dodatne detalje i informacije stojimo Vam na raspolaganju.<br /><br />
            Hvala,<br />Vaš <a href="${process.env.BASE_URL}">ECOGLASNIK</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};
