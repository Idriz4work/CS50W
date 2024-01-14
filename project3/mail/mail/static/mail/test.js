
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