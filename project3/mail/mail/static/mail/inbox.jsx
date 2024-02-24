// get the container inside emails-view
const container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  document.querySelector('#compose-form').addEventListener('submit', submit_email)

  // By default, load the inbox
  load_mailbox('inbox');
  
});


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
};


function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  
  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

};


 //                            My own functions                                \\
// <--------------------------------------------------------------------------> \\

function renderEmails() {
  // Fetch emails from the API
  fetch(`/emails/inbox`)
    .then(response => response.json())
    .then(emails => {
      // Display all emails
      const mails = document.querySelector("#emails-view");

      const local = localStorage.getItem('stored');
      const savedEmails = JSON.parse(local);

      // Clear the innerHTML before adding new content
      mails.innerHTML = `
        <h1>Inbox</h1> 
        <h4>All Emails</h4>` ;

      // Loop through the saved emails
      emails.forEach(saved => {
        const recipients = saved.recipients;
        const subject = saved.subject;
        const body = saved.body;
        const timestamp = saved.timestamp;
        const sender = saved.sender;
        const email_id = uuidv4();
        const sent_status = saved.status;

        // Create HTML elements for each email and append them to the container
        if (!saved.read) {
          mails.innerHTML += `
            <div class="email-container">
              <div class="email-header read">
                <a class="heading-email">${sender} ${subject}</a>
                <a class="time">${timestamp}</a>
                <button class="show">Show</button>
              </div>
            </div>`;
        } else {
          mails.innerHTML += `
            <div class="email-container">
              <div class="email-header">
                <a class="heading-email">${sender} ${subject}</a>
                <a class="time">${timestamp}</a>
                <button class="show">Show</button>
              </div>
            </div>`;
        }

        const full = document.querySelector('.show');
        const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

        full.addEventListener('click', () => {
          fetch(`/emails/${saved.id}`, {
            method: 'PUT',
            body: JSON.stringify({ read: true })
          })

          // Displaying email details
          mails.innerHTML = '';

          mails.innerHTML += `
            <form id="compose-form">
              <div class="form-group">
                From: <input disabled class="form-control" value="${sender}">
              </div>
              <div class="form-group">
                To: <input id="compose-recipients" disabled class="form-control" value="${recipients}">
              </div>
              <div class="form-group">
                <input disabled class="form-control" id="compose-subject" placeholder="${subject}">
              </div>
              <textarea disabled class="form-control" id="compose-body" placeholder="Body">${body}</textarea>
              <button id="m-sub">Reply</button>
            </form>`;

          // Assuming you want to handle the reply button for each email
          const replyButtons = document.querySelector('#m-sub');
          replyButtons.addEventListener('click', () => {
            // reply layout
            mails.innerHTML = '';

            mails.innerHTML += `
              <form id="compose-form">
                <div class="form-group">
                  From: <input disabled class="form-control" value="${sender}">
                </div>
                <div class="form-group">
                  To: <input id="compose-recipients" disabled class="form-control" value="${recipients}">
                </div>
                <div class="form-group">
                  <input class="form-control" id="compose-subject" placeholder="Subject">
                </div>
                <textarea class="form-control" id="compose-body" placeholder="Body"></textarea>
                <input type="submit" class="btn btn-primary" id="m-sub"/>
              </form>`;

            // Displaying email details
            const main = document.querySelector('#m-sub');
            main.addEventListener('click', () => {
              const r_sub = document.querySelector('#compose-subject').value;
              const r_body = document.querySelector('#compose-body').value;
              const r_recipient = document.querySelector('#compose-recipients').value;
              const r_sender = document.querySelector('#value').value;
              // store data into local_storage
              const replies = JSON.parse(localStorage.getItem('stored_replies')) || {};

              const info = {
                id: email_id,
                sender: r_sender,
                recipients: r_recipient,
                subject: r_sub,
                body: r_body,
                timestamp: timestamp,
                read: true,
                archived: false
              };

              // Add the new email to the existing array
              replies[email_id] = info;

              // Save the updated array back to localStorage
              localStorage.setItem('stored_replies', JSON.stringify(replies));

              console.log(replies)
              // display success mail
              mails.innerHTML = '';
              mails.innerHTML += `
                <h1>Your response was sent!</h1>
                <hr></hr>
                <a> You successfully replied to : ${recipients} at ${timestamp}</a>
                <p>Go back to the main page</p>
                <button class="show" id="reply-btn">Click here to go back</button>
              </div>`;
            });
          })
        });
      });
    });
}


// archive
function archive() {
  fetch('/emails/archive')
      .then(response => response.json())
      .then(emails => {
          const mails = document.querySelector("#emails-view");
          const local = localStorage.getItem('stored');
          const savedEmails = JSON.parse(local);
          mails.innerHTML = `
              <h1>Archive</h1> 
              <h4>All archived Emails</h4>
          `;
          emails.forEach(saved => {
              if(saved.archive){
                mails.innerHTML += `
                  <div class="email-container">
                      <div class="email-header">
                          <a class="heading-email">${saved.recipients} ${saved.subject}</a>
                          <a class="time">${saved.timestamp}</a>
                          <button class="show">Show</button>
                          <button id="m-sub">Re-archive</button>
                      </div>
                  </div>`;
                const full = document.querySelector('.show');
                const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
                full.addEventListener('click', () => {
                    fetch(`/emails/${saved.email_id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrfToken
                        },
                        body: JSON.stringify({ read: true })
                    })
                    .then(response => response.json());
                    mails.innerHTML = '';
                    mails.innerHTML += `
                      <form id="compose-form">
                      <div class="form-group">
                      From: <input disabled class="form-control" value="${saved.sender}">
                      </div>
                      <div class="form-group">
                          To: <input id="compose-recipients" disabled class="form-control" value="${saved.recipients}">
                      </div>
                      <div class="form-group">
                          <input disabled class="form-control" id="compose-subject" placeholder="${saved.subject}">
                      </div>
                      <textarea disabled class="form-control" id="compose-body" placeholder="Body">${saved.body}</textarea>
                      <button id="m-sub">Re-archive</button>
                  </form>`;
                    const main = document.querySelector(`#m-sub`);
                    main.addEventListener('click', () => {
                        mails.innerHTML = '';
                        mails.innerHTML += `
                            <h1>Your Mail is re-archived!</h1>
                            <hr></hr>
                                <a> You successfully rearchived your Mail</a>
                                <p>Go back to the inbox page</p>
                                <button class="show" id="m-sub">Click here to go back</button>`;
                        fetch(`/emails/${saved.email_id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRFToken': csrfToken
                            },
                            body: JSON.stringify({
                                archived: true
                            })
                        });
                    });
                    
                    document.querySelector(`#${saved.email_id}-reply-btn`).addEventListener('click', () =>{
                        load_mailbox('inbox')
                    });
                });
              }
              else{
                mails.innerHTML =`<h1>No archived mails</h1>`
              }
          });
      });
}

// sent
function sended_emails() {
  const email_id = uuidv4();
  // Fetch emails from the API
  fetch('/emails/sent')
      .then(response => response.json())
      .then(emails => {
          const mails = document.querySelector("#emails-view");
          const local = localStorage.getItem('stored');
          const savedEmails = JSON.parse(local);
          mails.innerHTML = `
              <h1>Sented Emails</h1> 
              <h4>All Emails that were sented</h4>
          `;

          emails.forEach(saved => {
              if (saved.sender) {
                  // Append the email content instead of overwriting the entire HTML
                  mails.innerHTML += `
                      <div class="email-container">
                          <div class="email-header">
                              <a class="heading-email">${saved.sender} ${saved.subject}</a>
                              <a class="time">${saved.timestamp}</a>
                              <button class="show">Show</button>
                          </div>
                      </div>`;
              }
          });

          // Display a message if there are no sent emails
          if (!mails.innerHTML.includes('<div class="email-container">')) {
              mails.innerHTML = `<h1>You didn't send any mail</h1>`;
          }

          // Move the rendering of the detailed email outside the forEach loop
          const full = document.querySelectorAll('.show');
          full.forEach((button, index) => {
              button.addEventListener('click', () => {
                  const saved = emails[index];
                  mails.innerHTML = '';
                  mails.innerHTML += `
                      <form id="compose-form">
                          <div class="form-group">
                              From: <input disabled class="form-control" value="${saved.sender}">
                          </div>
                          <div class="form-group">
                              To: <input id="compose-recipients" disabled class="form-control" value="${saved.recipients}">
                          </div>
                          <div class="form-group">
                              <input disabled class="form-control" id="compose-subject" placeholder="${saved.subject}">
                          </div>
                          <textarea disabled class="form-control" id="compose-body" placeholder="${saved.body}"></textarea>
                          <button id="m-sub">reply</button>
                      </form>`;

                      const replyButtons = document.querySelector('#m-sub');
            replyButtons.addEventListener('click', () => {
              // reply layout
              mails.innerHTML = '';
              
              mails.innerHTML += `
              <form id="compose-form">
                <div class="form-group">
                From: <input disabled class="form-control" value="${saved.sender}">

                </div>
                <div class="form-group">
                    To: <input id="compose-recipients" disabled class="form-control" value="${saved.recipients}">
                </div>
                <div class="form-group">
                    <input class="form-control" id="compose-subject" placeholder="Subject">
                </div>
                <textarea class="form-control" id="compose-body" placeholder="Body"></textarea>
                <input type="submit" class="btn btn-primary" id="m-sub"/>
            </form>
              `;

              // Displaying email details
              const main = document.querySelector('#m-sub');
              main.addEventListener('click', () => {
                const currentDate = new Date();
                const timestamp = currentDate.toString();
                // display success mail
                mails.innerHTML = '';
                mails.innerHTML += `
                <h1 id="load">Your response was sent!</h1>
                <hr></hr>
                  <a> You successfully replied to : ${saved.recipients} at ${timestamp}</a>
                  <p>Go back to the main page</p>
                  <button class="show" onclick="load_mailbox('inbox')">Click here to go back</button>
                </div>`;
              });

                  // Rest of your detailed email rendering logic
                  fetch(`/emails/${saved.id}`, {
                      method: 'PUT',
                      body: JSON.stringify({ read: true })
                  })
                      .then(response => response.json())
                      .then(response => {
                          console.log(response);
                      });
              });
          });
      });
  })
}


// submit mails
function submit_email() {
  event.preventDefault(); // Prevent the default form submission

  const email_id = uuidv4();
  const currentDate = new Date();

  const senderElement = document.getElementById('username');
  const sender = senderElement ? senderElement.innerText : '';

  const timestamp = currentDate.toString();
  const recipient = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // Fetch request to add the email data to the inbox array
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      body: body,
      recipients: recipient,
      subject: subject
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      // Retrieve existing emails from localStorage
      let ara = JSON.parse(localStorage.getItem('stored')) || [];

      const newEmail = {
        id: email_id,
        sender: sender,
        recipients: recipient,
        subject: subject,
        body: body,
        timestamp: timestamp,
        read: false,
        archived: false
      };
    
      // Add the new email to the existing array
      ara.push(newEmail);
    
      // Save the updated array back to localStorage
      localStorage.setItem('stored', JSON.stringify(ara));
    
      // show emails in console via loadEmails function
      loadEmailsFromLocalStorage()
      load_mailbox('sent');
    });
}

// Example of loading emails from localStorage
function loadEmailsFromLocalStorage() {
  const ara = JSON.parse(localStorage.getItem('stored')) || [];
  console.log(ara);
}

// dropdown button
function toggleDropdown() {
  
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
}