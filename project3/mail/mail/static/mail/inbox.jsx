// your_jsx_file.jsx
import React from 'react';
import ReactDOM from 'react-dom';


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

function fetchEmailData() {
  // Replace '/emails/100' with the appropriate API endpoint
  fetch('/emails/100')
      .then(response => response.json())
      .then(email => {
          // Display email in HTML
          displayEmail(email, '#emails-view');
      })
      .catch(error => console.error('Error fetching email data:', error));
}

function renderEmails() {

  fetchEmailData();
  // Display the data that the user sent via API in JS
  const sender = localStorage.getItem('sender');
  const recipient = localStorage.getItem('recipients');
  const subject = localStorage.getItem('subject');
  const body = localStorage.getItem('body');

  // Store email data in an array
  const data = [{ sender, recipient, subject, body }];

  // Render the email in the mailbox
  const mails = document.querySelector("#email-view").value = '';
  mails.innerHTML = `
      <div>
          <h2>Your emails received / sent</h2>
          ${data.map((email, index) => `
              <div key=${index}>
                  <h1>FROM: ${email.sender}</h1>
                  <h1>TO: ${email.recipient}</h1>
                  <h1>Subject: ${email.subject}</h1>
                  <p>Body: ${email.body}</p>
              </div>`).join('')}
      </div>
  `;

  // Put mails into the div with id emails-view
  document.getElementById('emails-view').innerHTML = mails.innerHTML;
}

function mail(mailbox) {
  document.getElementById("inbox").addEventListener("click", function (event) {
      // Fetch email data
      fetchEmailData();

      // Render emails
      renderEmails();
  });  
}

function archive() {
  document.querySelector('#archived').onclick = function() {
    let body;

    fetch('/emails/100')
        .then(response => response.json())
        .then(email => {
          // Display email in HTML
            displayEmail(email, '#emails-view');
        });

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


function submit_email() {
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
