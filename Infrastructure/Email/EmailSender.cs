using Microsoft.Extensions.Configuration;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;

namespace Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public void SendEmail(string userEmail, string userName, string emailSubject, string msg) {
            
            var client = new TransactionalEmailsApi();

            SendSmtpEmailSender From = new SendSmtpEmailSender(_config["Brevo:SenderName"], _config["Brevo:SenderEmail"]);

            SendSmtpEmailTo receiver1 = new SendSmtpEmailTo(userEmail, userName);
            List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
            To.Add(receiver1);

            string TextContent = msg;
            string Subject = emailSubject;

            var sendSmtpEmail = new SendSmtpEmail(From, To, null, null, null, TextContent, Subject);
            CreateSmtpEmail result = client.SendTransacEmail(sendSmtpEmail);
        }
    }
}