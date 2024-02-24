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
        mails.innerHTML = '';
  
        // Loop through the saved emails
        savedEmails.forEach(saved => {
          const recipients = saved.recipient;
          const subject = saved.subject;
          const body = saved.body;
          const timestamp = saved.timestamp;
          const sender = saved.sender;
          const email_id = uuidv4();
          const sent_status = saved.status;
  
          // Create HTML elements for each email and append them to the container
          mails.innerHTML += `
            <div class="email-container">
              <div class="email-header">
                <a class="heading-email">${recipients} ${subject}</a>
                <a class="time">${timestamp}</a>
                <button class="show">Show</button>
              </div>
            </div>`;
        });
  
        // Now only get the emails where the sender has the same name (e.g., drzatilla@gmail.com)
        const filteredEmails = savedEmails.filter(email => email.sender === sender);
  
        // Create HTML elements for each filtered email and append them to the container
        filteredEmails.forEach(filteredEmail => {
          const recipients = filteredEmail.recipient;
          const subject = filteredEmail.subject;
          const timestamp = filteredEmail.timestamp;
  
          mails.innerHTML += `
            <div class="email-container">
              <h1>Inbox</h1>
              <div class="email-header">
                <a class="heading-email">${recipients} ${subject}</a>
                <a class="time">${timestamp}</a>
                <button class="show">Show</button>
              </div>
            </div>`;
        });
      });
  }