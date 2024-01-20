
// access value
fetch('/emails/inbox')
.then(response => response.json())
.then(emails => {
    // Print emails
    console.log(emails);

    // ... do something else with emails ...
});

//get emails
fetch('/emails/100')
.then(response => response.json())
.then(email => {
    // Print email
    console.log(email);

    // ... do something else with email ...
});

// post emails
fetch('/emails', {
  method: 'POST',
  body: JSON.stringify({
      recipients: 'baz@example.com',
      subject: 'Meeting time',
      body: 'How about we meet tomorrow at 3pm?'
  })
})
.then(response => response.json())
.then(result => {
    // Print result
    console.log(result);
});

// put vhange atribute from archieved to true
fetch('/emails/100', {
  method: 'PUT',
  body: JSON.stringify({
      archived: true
  })
})

 // Log the form data
 console.log("Recipient:", recipient);
 console.log("Subject:", subject);
 console.log("Body:", body);

 // Add your fetch code here to send the data to the server if needed
 fetch('/emails', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     recipients: recipient,
     subject: subject,
     body: body,
   }),
 })
   .then(response => response.json())
   .then(result => {
     // Handle the response if needed
     console.log(result);
   });

   
   const recipient = document.getElementById("compose-recipients").value;
   const subject = document.getElementById("compose-subject").value;
   const body = document.getElementById("compose-body").value;