// your_jsx_file.jsx
import React from 'react';
import { compose_email, load_mailbox } from './inbox';

function send(mailbox) {
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-compose-body').value;
    const recipient = document.querySelector('#compose-recipients').value;
  
    document.querySelector('#sent').onsubmit = false;
  
    if (document.querySelector('#sent').onsubmit) {
      // The condition above is enough to check if onsubmit is truthy.
      // Assuming you want to check if subject, body, and recipient have values,
      // you can modify the condition as follows:
      if (subject && body && recipient) {
        document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    
      }
    }
}
  
function archieved_emails(mailbox){
      //get emails
      fetch('/emails/100')
      .then(response => response.json())
      .then(email => {
        // Print email
        console.log(email);
  
        // Update HTML with the received email
        document.getElementById('compose-recipients').value = email.sender;
        document.getElementById('compose-subject').value = email.subject;
        document.getElementById('compose-body').value = email.body;
  
        // ... do something else with email ...
        document.addEventListener('').display(email.body, email.sender, email.subject)
        document.DOCUMENT_FRAGMENT_NODE
    });
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
    });
}

// inbox.js

export function compose_email() {
    // Function code here
}
  
  export function load_mailbox(mailbox) {
    // Function code here
}
  