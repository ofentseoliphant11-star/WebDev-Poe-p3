let Open = document.getElementById('Open');
let modal_container = document.getElementById('modal_container');
let Close = document.getElementById('Close');

Open.addEventListener('click', () => {
    modal_container.classList.add('show');
});

Close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});

let contact_form = document.getElementById('contact_form');

contact_form.addEventListener('submit', (e) => {
  e.preventDefault();                      
  alert('Thanks! We\'ll get back to you soon.');
  contact_form.reset();                     
  modal_container.classList.remove('show'); 
});





document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let form = event.target;
    let data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Sends them back to index.html
            window.location.href = "enquiry.html"; 
        } else {
            alert("Oops! There was a problem submitting your form.");
        }
    }).catch(error => {
        alert("Oops! There was a network error.");
    });
});


// script.js
let openBtn = document.getElementById('Open');
let closeBtn = document.getElementById('Close');
let modalContainer = document.getElementById('modal_container');

// Open modal
openBtn.addEventListener('click', () => {
    modalContainer.classList.add('show');
});

// Close modal
closeBtn.addEventListener('click', () => {
    modalContainer.classList.remove('show');
});



