// your_jsx_file.jsx
import React from 'react';
import React from 'react';
import ReactDOM, { render } from 'react-dom';


document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#archieve-view').style.display = 'block';
  document.querySelector('#sent-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

function mails_sended(mailbox) {
    // Assuming .btn.btn-primary is a form element
    document.querySelector('.btn.btn-primary').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the form from submitting
  
      // Assuming you want to get the data from the form
      const formData = new FormData(this);
      const sender = formData.get('sender'); // Change 'sender' to the actual name attribute of your input
      
      // Assuming you want to create a Mails component and render it
      function Mails(props) {
        fetch('/emails/inbox')
        .then(response => response.json())
        .then(email => {
            // Print email
            console.log(email);

            // ... do something else with email ...
        });
       const [formData, sender]  = react.useState()
        
        return (
          <div>
            <h1>FROM: {props.sender}!</h1>
            <br></br>
            <h1>TO: {props.recipient}</h1>
            <br></br>
            <h1>Subject: {props.subject}!</h1>
            <br></br>
            <p>Body: {props.body}</p>
          </div>
        );
      }
      
      // Assuming you have an element with the id 'mailsContainer' to render the Mails component
      const mailbox = document.getElementById('mailbox');
      const mailsProps = {
        sender: sender,
        subject: formData.get('subject'), // Change 'subject' to the actual name attribute of your input
        body: formData.get('body'), // Change 'body' to the actual name attribute of your input
      };
  
      // Render the Mails component
      mailbox.innerHTML = '';
      mailbox.appendChild(Mails(mailsProps));

      var mail = document.createElement("div");
      var sender = document.createElement('h5');
      var subject = document.createElement('p');
      var body = document.createElement('p');
      var time = document.createElement('p');

      const element = document.createElement('div');
      element.innerHTML = 'This is the content of the div.';
      element.addEventListener('click', function() {
      console.log('This element has been clicked!')
    });
  document.querySelector('#container').append(element);
  });
}

function archive() {
  document.querySelector('#archived').onclick = function() {
    render("achieve.html");
    let body;

    document.getElementById("m-sub").onsubmit = function(){
      recipient = document.getElementById("compose-recipients").value;
      subject = document.getElementById("compose-subject").value;
      body = document.getElementById("compose-body").value;
      document.getElementById("Textar").textContent = `Hello ${body}, ${recipient}, ${subject}`;
    };

    fetch('/emails/100', {
      method: 'PUT',
      body: JSON.stringify({
          archived: true
      })
    })

  };
}

document.getElementById("compose-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  const recipient = document.getElementById("compose-recipients").value;
  const subject = document.getElementById("compose-subject").value;
  const body = document.getElementById("compose-body").value;

  // Now you can use these variables for further processing or send them to the server
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

    // Assuming you want to render the Mails component after submitting the form
    const mailbox = document.getElementById('mailbox');
    const mailsProps = {
      sender: result.sender, // Replace with the actual property from your server response
      recipient: result.recipient, // Replace with the actual property from your server response
      subject: result.subject, // Replace with the actual property from your server response
      body: result.body, // Replace with the actual property from your server response
    };

    // Render the Mails component
    mailbox.innerHTML = '';
    mailbox.appendChild(Mails(mailsProps)); // Ensure you have the Mails function defined in your code
  });
});

function Mails(props) {
  // Assuming you want to create a Mails component and render it
  return (
    <div>
      <h1>FROM: {props.sender}!</h1>
      <br></br>
      <h1>TO: {props.recipient}</h1>
      <br></br>
      <h1>Subject: {props.subject}!</h1>
      <br></br>
      <p>Body: {props.body}</p>
    </div>
  );
}
