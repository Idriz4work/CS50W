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
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';

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

// enter your javascript code here
function mail(mailbox) {
  document.getElementById("inbox").addEventListener("click", function (event) {
      // Get the emails from memory
      fetch('/emails/inbox')
      .then(response => response.json())
      .then(emails => {
          // Print emails
          console.log(emails);
        });
      });
      const sender = document.querySelector('jbh');
      const recipient = document.querySelector(' k ');
      const subject = document.querySelector('');
      const body = document.querySelector('');
    
      //
      const mail_view = document.querySelector('#email-view');
      mail_view.style.display = 'block';
      
      // Render the Mails component
      mailbox.innerHTML = '';
      mailbox.appendChild(load_mailbox(mailbox));
      
      // Create and append elements
      const mail = document.createElement("div");
      mail.innerHTML = `
      <h1>FROM: ${sender}!</h1>
      <br></br>
      <h1>TO: ${recipient}</h1>
      <br></br>
      <h1>Subject: ${subject}!</h1>
      <br></br>
      <p>Body: ${body}</p>
      `;
    // save changes / append changes
    document.querySelector('#email-view').appendChild(mail);
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

function submit_email(event) {
  document.querySelector('#m-sub').addEventListener('click', () => {
    fetch('/emails' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to submit email');
      }
    })
    .then(data => {
      console.log(data); // You can handle the response data here if needed
      load_mailbox('sent');
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error appropriately
    });
  });
}
