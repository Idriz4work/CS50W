document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#about').addEventListener('click', () => render_about());
    document.querySelector('#projects').addEventListener('click', () => render_projects());
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);
  
    document.querySelector('#compose-form').addEventListener('submit', submit_email)
  
    // By default, load the inbox
    load_mailbox('inbox');
    
  });

function render_about(){
   const content = document.querySelector('.content');
    content.innerHTML =
    `<h1>Za real zorilla is back </h1>`
}

function render_projects(){
    const project = document.querySelector('.projects-view');
    project.innerHTML = `<h1>Projects</h1>
        <h2>Mail</h2>`
}