
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

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
