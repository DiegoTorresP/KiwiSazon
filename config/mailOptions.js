const transporter = require("./transporter")


const sendEmail = (recipient) => {
    const mailOptions = {
      from: 'libritomxdev@gmail.com',
      to: recipient,
      subject: ` Bienvenido a KiwiSazon @${recipient} `,
      html:  ` 
      <head>
          <style>
              * {
                  box-sizing: border-box;
              }
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
              }
      
              #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
              }
      
              p {
                  line-height: inherit
              }
      
              .desktop_hide,
              .desktop_hide table {
                  mso-hide: all;
                  display: none;
                  max-height: 0px;
                  overflow: hidden;
              }
      
              .image_block img+div {
                  display: none;
              }
      
              @media (max-width:660px) {
      
                  .desktop_hide table.icons-inner,
                  .social_block.desktop_hide .social-table {
                      display: inline-block !important;
                  }
      
                  .icons-inner {
                      text-align: center;
                  }
      
                  .icons-inner td {
                      margin: 0 auto;
                  }
      
                  .image_block img.big,
                  .row-content {
                      width: 100% !important;
                  }
      
                  .mobile_hide {
                      display: none;
                  }
      
                  .stack .column {
                      width: 100%;
                      display: block;
                  }
      
                  .mobile_hide {
                      min-height: 0;
                      max-height: 0;
                      max-width: 0;
                      overflow: hidden;
                      font-size: 0px;
                  }
      
                  .desktop_hide,
                  .desktop_hide table {
                      display: table !important;
                      max-height: none !important;
                  }
              }
          </style>
      </head>
      
      <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;" width="100%">
              <tbody>
                  <tr>
                      <td>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                              role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c;" width="100%">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table align="center" border="0" cellpadding="0" cellspacing="0"
                                              class="row-content stack" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1aa19c; color: #000000; width: 640px;"
                                              width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                          width="100%">
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="divider_block block-1" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div align="center" class="alignment">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                              width="100%">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;">
                                                                                      <span> </span></td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                              role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table align="center" border="0" cellpadding="0" cellspacing="0"
                                              class="row-content stack" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;"
                                              width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                          width="100%">
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="image_block block-1" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-bottom:25px;padding-top:22px;width:100%;padding-right:0px;padding-left:0px;">
                                                                      <div align="center" class="alignment"
                                                                          style="line-height:10px"><img alt="I'm an image"
                                                                              src="https://storage.googleapis.com/kiwisazonp.appspot.com/users/1789LOGO.jpg?GoogleAccessId=firebase-adminsdk-b8gdk%40kiwisazonp.iam.gserviceaccount.com&Expires=16730344800&Signature=o7McJKHqzZnXSvi%2B07BHZZpTMhwvG1UwSoxlNtVIQCQ%2BF%2FVJFnQ%2FfLy3nnOGVWP3G9NHcmU%2FDmNrHlNLmEKo30xWXrxLwtT%2FHKBMazCYRqu80cLLSoRxOcNVPEAw8h4HGxOrb98pif%2BH5jxlCdeEu0mfxoStTd7%2Fd5cw2VZhiegF%2Btqrrt0w13Rau7mG7OMtURIiWER9xe9M4hhzspxHXJwe1PbtGnHvtsdCHPgUfHtLqwwJaLDtI4thl3vgmjUpI0OhldbIYYNt%2FaZbYjnougkgeVM7HNkZzKoTfDs3sAm8QO%2FmdKaghihUQirtpt6tBjUJXEDM0AJR54AkF9Z1Bw%3D%3D"
                                                                              style="display: block; height: auto; border: 0; width: 149px; max-width: 100%;"
                                                                              title="I'm an image" width="149" /></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table align="center" border="0" cellpadding="0" cellspacing="0"
                                              class="row-content stack" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 640px;"
                                              width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                          width="100%">
                                                          <table border="0" cellpadding="20" cellspacing="0"
                                                              class="divider_block block-1" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div align="center" class="alignment">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                              width="100%">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;">
                                                                                      <span> </span></td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table align="center" border="0" cellpadding="0" cellspacing="0"
                                              class="row-content stack" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;"
                                              width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                          width="100%">
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="divider_block block-1" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-bottom:12px;padding-top:60px;">
                                                                      <div align="center" class="alignment">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                              width="100%">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;">
                                                                                      <span> </span></td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="image_block block-2" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-left:40px;padding-right:40px;width:100%;">
                                                                      <div align="center" class="alignment"
                                                                          style="line-height:10px"><img alt="I'm an image"
                                                                              class="big" src="https://lh3.googleusercontent.com/pw/AMWts8C3acoukYWhBNs7f6-hDcEkVj6T4vv8a0kJtYhdev_ZscWsNBSri7jBbxZ0H8-pnRkaBF6ycws_9pr-ai3idkFLpzoILgh0rLb0URjqC2RpTkdfLRzVIK7XxM7bPTYgWwzJa8k9Vs7-UiDdMFLVX1E=w630-h480-no?authuser=0"
                                                                              style="display: block; height: auto; border: 0; width: 352px; max-width: 100%;"
                                                                              title="I'm an image" width="352" /></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="divider_block block-3" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad" style="padding-top:50px;">
                                                                      <div align="center" class="alignment">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                              width="100%">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;">
                                                                                      <span> </span></td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="text_block block-4" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                      <div style="font-family: sans-serif">
                                                                          <div class=""
                                                                              style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                              <p
                                                                                  style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;">
                                                                                  <span
                                                                                      style="font-size:30px;color:#2b303a;"><strong>Verify
                                                                                          Your Email Account</strong></span>
                                                                              </p>
                                                                          </div>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="text_block block-5" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                      <div style="font-family: sans-serif">
                                                                          <div class=""
                                                                              style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
                                                                              <p
                                                                                  style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;">
                                                                                  <span style="color:#808389;font-size:15px;">
                                                                                      Gracias por registrarte en BarrArt. Para verificar su correo electrónico y activar su cuenta.
                                                                                      Si no ha solicitado este registro, ignore este correo electrónico.
                                                                                  </span></p>
                                                                          </div>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="button_block block-6" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
                                                                      <div align="center" class="alignment">
                                                                          <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:203px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1aa19c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
                                                                          <a href="{{href_value}}"
                                                                              style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1aa19c;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;cursor: pointer;">
                                                                              <span
                                                                                  style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span
                                                                                      style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Confirm
                                                                                          Your Email</strong></span></span>
                                                                          </a>
                                                                          <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="divider_block block-7" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-bottom:12px;padding-top:60px;">
                                                                      <div align="center" class="alignment">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                              width="100%">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;">
                                                                                      <span> </span></td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table align="center" border="0" cellpadding="0" cellspacing="0"
                                              class="row-content stack" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 640px;"
                                              width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                          width="100%">
                                                          <table border="0" cellpadding="20" cellspacing="0"
                                                              class="divider_block block-1" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div align="center" class="alignment">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                              width="100%">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;">
                                                                                      <span> </span></td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table align="center" border="0" cellpadding="0" cellspacing="0"
                                              class="row-content stack" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2b303a; color: #000000; width: 640px;"
                                              width="640">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                          width="100%">
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="divider_block block-1" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div align="center" class="alignment">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                              width="100%">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;">
                                                                                      <span> </span></td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="image_block block-2" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="width:100%;padding-right:0px;padding-left:0px;">
                                                                      <div align="center" class="alignment"
                                                                          style="line-height:10px"><img alt="I'm an image"
                                                                              class="big" src="https://lh3.googleusercontent.com/pw/AMWts8ALp4mY9jZDvpXFgZukACL3GMmVXYh0bNZmchiZ7pzcNARH2nd_645Pto5TVWyGO31gxfYDRN7NHPAMMuWhAL3lPmpvOMuL13epiUY4MAs5YVkEMQtK2Y3MezYb1vSIW64EgsQB-3-vsjojVP0tS54=w640-h140-no"
                                                                              style="display: block; height: auto; border: 0; width: 640px; max-width: 100%;"
                                                                              title="I'm an image" width="640" /></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="image_block block-3" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-top:40px;width:100%;padding-right:0px;padding-left:0px;">
                                                                      <div align="center" class="alignment"
                                                                          style="line-height:10px"></div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          
      
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="divider_block block-6" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
                                                                      <div align="center" class="alignment">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                              width="100%">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;">
                                                                                      <span> </span></td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                              class="text_block block-7" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                              width="100%">
                                                              <tr>
                                                                  <td class="pad"
                                                                      style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
                                                                      <div style="font-family: sans-serif">
                                                                          <div class=""
                                                                              style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                              <p
                                                                                  style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 16.8px;">
                                                                                  <span
                                                                                      style="color:#95979c;font-size:12px;">Companify
                                                                                      Copyright © 2020</span></p>
                                                                          </div>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          
                      </body>
      `,
    };
  
    return transporter.sendMail(mailOptions);
  };
  
  module.exports = { sendEmail };