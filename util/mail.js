// Account activation
const configureSidemail = require("sidemail");
const baseUrl = 'http://localhost:5000'

async function accountActivation(user) {
    console.log(user)
    // Create Sidemail instance and set your API key.
    const sidemail = configureSidemail({
        apiKey: "knbjswLkpRJsDCVhpyYqjbpYGphPxUyUtPfBuFQW",
    });

    // Send "Account activation" to yourself.
    await sidemail.sendEmail({
        fromName: "Harissa",
        fromAddress: "anything@harissa-zkt.via.sidemail.net",
        toAddress: user.email,
        templateName: "Account activation",
        templateProps: {
            project_name: "Replace with real value",
            url: `${baseUrl}/api/user/confirmations/${user._id}`,
        },
    });

}


// Canceled subscription



async function canceledSubscription() {

    // Create Sidemail instance and set your API key.
    const sidemail = configureSidemail({
        apiKey: "knbjswLkpRJsDCVhpyYqjbpYGphPxUyUtPfBuFQW",
    });

    // Send "Canceled subscription" to yourself.
    await sidemail.sendEmail({
        fromName: "Harissa",
        fromAddress: "anything@harissa-zkt.via.sidemail.net",
        toAddress: "alaminprogramerr@gmail.com",
        templateName: "Canceled subscription",
        templateProps: {
            project_name: "Replace with real value",
            date: "Replace with real value",
            my_name: "Replace with real value",
        },
    });

}
// Password reset


async function passwordReset() {
    // Create Sidemail instance and set your API key.
    const sidemail = configureSidemail({
        apiKey: "knbjswLkpRJsDCVhpyYqjbpYGphPxUyUtPfBuFQW",
    });

    // Send "Password reset" to yourself.
    await sidemail.sendEmail({
        fromName: "Harissa",
        fromAddress: "anything@harissa-zkt.via.sidemail.net",
        toAddress: "alaminprogramerr@gmail.com",
        templateName: "Password reset",
        templateProps: {
            project_name: "Replace with real value",
            url: "Replace with real value",
        },
    });
}



// Receipt

async function recept() {

    // Create Sidemail instance and set your API key.
    const sidemail = configureSidemail({
        apiKey: "knbjswLkpRJsDCVhpyYqjbpYGphPxUyUtPfBuFQW",
    });

    // Send "Receipt" to yourself.
    await sidemail.sendEmail({
        fromName: "Harissa",
        fromAddress: "anything@harissa-zkt.via.sidemail.net",
        toAddress: "alaminprogramerr@gmail.com",
        templateName: "Receipt",
        templateProps: {
            url: "Replace with real value",
            invoiceItems: "Replace with real value",
            description: "Replace with real value",
            price: "Replace with real value",
        },
    });

}
// Subscription payment failed
async function subscriptionPaymentFailed() {

    // Create Sidemail instance and set your API key.
    const sidemail = configureSidemail({
        apiKey: "knbjswLkpRJsDCVhpyYqjbpYGphPxUyUtPfBuFQW",
    });

    // Send "Subscription payment failed" to yourself.
    await sidemail.sendEmail({
        fromName: "Harissa",
        fromAddress: "anything@harissa-zkt.via.sidemail.net",
        toAddress: "alaminprogramerr@gmail.com",
        templateName: "Subscription payment failed",
        templateProps: {
            url: "Replace with real value",
            project_name: "Replace with real value",
        },
    });

}
// Welcome
async function welcome() {

    // Create Sidemail instance and set your API key.
    const sidemail = configureSidemail({
        apiKey: "knbjswLkpRJsDCVhpyYqjbpYGphPxUyUtPfBuFQW",
    });

    // Send "Welcome" to yourself.
    await sidemail.sendEmail({
        fromName: "Harissa",
        fromAddress: "anything@harissa-zkt.via.sidemail.net",
        toAddress: "alaminprogramerr@gmail.com",
        templateName: "Welcome",
        templateProps: {
            my_name: "Replace with real value",
            project_name: "Replace with real value",
        },
    });
}
module.exports = {
    accountActivation,
    canceledSubscription,
    passwordReset,
    recept,
    subscriptionPaymentFailed,
    welcome
}


// this are  all the methods are ready  ,  we can  use  them  while required . 