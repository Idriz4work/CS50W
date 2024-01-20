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
  document.getElementById("m-sub").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Render the Mails component
    mailbox.innerHTML = '';
    mailbox.appendChild(load_mailbox(mailbox));

    // Create and append elements
    const mail = document.createElement("div");
    const sendi = document.createElement('h5');
    const subjects = document.createElement('p');
    const bodys = document.createElement('p');
    const time = document.createElement('p');

    const element = document.createElement('div');
    element.innerHTML = 'This is the content of the div.';
    element.addEventListener('click', function () {
      console.log("Recipient:", recipient);
      console.log("Subject:", subject);
      console.log("Body:", body);
      console.log('This element has been clicked!');
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