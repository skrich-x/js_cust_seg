// var sendgrid = require("sendgrid");
// sendgrid.initialize("sendgridAccountSid", "sendgridAuthToken");
//
// Parse.Cloud.define("mySendGridFunction", function(request, response) {
//   sendgrid.sendEmail({
//     to: "kyle.richardson@johnstonesupply.com",
//     from: "sendgrid@parse.com",
//     subject: "Hello from Cloud Code!",
//     text: "Using Parse and SendGrid is great!"
//   }, {
//     success: function(httpResponse) { response.success("Email sent!"); },
//     error: function(httpResponse) { response.error("Uh oh, something went wrong"); }
//   });
// });
var Mailgun = require('mailgun');
Mailgun.initialize('sandboxd2064f0b8f7a41cd8ec4a3b3288ae134.mailgun.org', 'pubkey-cc5d6cd3d56ff18849a5fc4de3235973');

Parse.Cloud.beforeSave("CommentObject", function(request, response) {

	var text = "Support Ticket\n" +
		"Branch: "+request.object.get("branch") + "\n"+
		"Name: "+request.object.get("customerName") + "\n"+
		"Company: "+request.object.get("companyName") + "\n"+
		"Email: "+request.object.get("customerEmail") + "\n\n"+
    "Office Phone: "+request.object.get("customerOfficePhone") + "\n\n"+
		"Mobile Phone:\n" + request.object.get("customerMobilePhone");

	Mailgun.sendEmail({
			to: "kyle.richardson@johnstonesupply.com",
			from: request.object.get("customerEmail"),
			subject: "Johnstone Support Request - " + request.object.get("companyName"),
			text: text
		}, {
		success: function(httpResponse) {
			response.success();
		},
		error: function(httpResponse) {
			console.error(httpResponse);
			response.error("Something went wrong");
		}
	});

});
