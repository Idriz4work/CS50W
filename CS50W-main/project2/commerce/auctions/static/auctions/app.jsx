document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#casual').addEventListener('click', () => load_mailbox('casual'));
    document.querySelector('#buisness').addEventListener('click', () => load_mailbox('buisness'));
    document.querySelector('#designer').addEventListener('click', () => load_mailbox('designer'));
    document.querySelector('#index').addEventListener('click',() => load_mailbox('index'));
  
    document.querySelector('#sub-article').addEventListener('submit', submit_article)
  
    // By default, load the inbox
    load_mailbox('index');
    
});

function load_mailbox() {
    // Show the mailbox and hide other views
    document.querySelector('.info').style.display = 'none';
    document.querySelector('#view').style.display = 'block';
}

function renderIndex(){
    const items = document.querySelector('#view');
    items.innerHTML = ``
}

function designer() {
    const items = document.querySelector('#view');
    const info = document.querySelector('.info');

    info.innerHTML = 
    `<h1>Hello there</h1>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>`;
   
    items.innerHTML = `
        <section class="designer-items">
            <ul>
                <li>
                    <img src="https://th.bing.com/th/id/OIP.V74teWs7YtYkQZoTFkl1FAHaHa?rs=1&pid=ImgDetMain" alt="" />
                    <a href="">Louis Vuitton Jacket</a>
                    PRICE: 2000$
                </li>
                <hr />
                <li>
                    <img src="https://i.etsystatic.com/17687258/r/il/fa5655/2754106348/il_1588xN.2754106348_gwpb.jpg" alt="" />
                    <a href="">Yohji Yamamoto Jacket</a>
                    PRICE: 800$
                </li>
                <hr />
                <li>
                    <img src="https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/bb/P00486090.jpg" alt="" />
                    <a href="">Vetements Jacket</a>
                    PRICE: 1800$
                </li>
            </ul>
        </section>`;
}


function casual(){

    const items = document.querySelector('#view');
            items.innerHTML = `
            <hr>
            <section class="designer-items">
                <div className="container">
                    <ul>
                        <li><a href=""></a></li>
                        <li><a href=""></a></li>
                        <li><a href=""></a></li>
                        <li><a href=""></a></li>
                        <li><a href=""></a></li>
                    </ul>
                </div>

            </section>`    

   
}


function buisness(){
    const items = document.querySelector('#view');
    items.innerHTML = '';
        
    items.innerHTML += `
    <section class="designer-items">
        
            
    </section>`

}

function watchlist (){
    const items = document.querySelector('#view');
}

function submit_article(){
    const items = document.querySelector('#view');
}

function categories(){
    const items = document.querySelector('#view');
    items.innerHTML = ''
}