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

    // Assuming the following HTML structure inside "achieve.html"
    // Adjust it according to your needs.
    let htmlContent = `
      <div>
        <h1>FROM: {sender}!</h1>
        <br><h1>TO: ${recipient}</h1><br><h1>Subject: ${subject}!</h1><br><p>Body: ${body}</p>
      </div>
    `;

    // Replace the content of a specific element with the HTML content
    document.getElementById("your-target-element-id").innerHTML = htmlContent;
  };
}
