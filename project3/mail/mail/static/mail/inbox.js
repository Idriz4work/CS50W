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


function show_pages(){
    document.querySelectorAll('div').forEach(div => { // the => is NOT ARROW/POINTER its a shorthand for making a FUNCTION
      div.style.display = 'none';
    })
    document.querySelector('#send-view').style.display = 'block';

    document.querySelectorAll('.btn btn-sm btn-outline-primary').forEach(botton{
        botton.onclick = function(){
        showpage(this.dataset.page);}
    })
}

function scroll(mailbox){
  window.onscroll = () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
      document.querySelector('body').style.background = 'white';
    }
    else{
      document.querySelector('body').style.background = '#333';
    }
  }
}

// When back arrow is clicked, show previous section
window.onpopstate = function(event) {
  console.log(event.state.section);
  showSection(event.state.section);
}

function showSection(section) {
  fetch(`/sections/${section}`)
  .then(response => response.text())
  .then(text => {
      console.log(text);
      document.querySelector('#content').innerHTML = text;
  });

}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('button').forEach(button => {
      button.onclick = function() {
          const section = this.dataset.section;

          // Add the current state to the history
          history.pushState({section: section}, "", `section${section}`);
          showSection(section);
      };
  });
});