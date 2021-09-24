console.info("App")
let uemail = '';
let uid = '';
let comentarios = []

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', (event) => {
    getComentarios();
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Cambio de estado Sesion');
      console.log(user)
      uemail = user.email;
      uid = user.uid;
      console.log('Usuario: ' + uemail)
    } else {
        console.info('Sin session')
        window.location ='login.html';
    }
});

function publicar(){
    let comentario = document.querySelector('#text-comentario');
    console.log('Publicando' ,comentario);
    comentarios.push({
        userid: uid,
        uemail: uemail,
        comentario: comentario.value
    })

    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    getComentarios();

    comentario.value = '';

}

function logout(){
    console.info("Saliendo");
    console.log('Logout')
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('Saliendo');
        window.location = 'login.html';
      }).catch((error) => {
        // An error happened.
      });
}

function login(){
    window.location = "login.html"
}


// Lee y redenriza en el HTML los comentarios
function getComentarios(){
  comentarios = JSON.parse( localStorage.getItem('comentarios'));
  listado = document.querySelector('#list-comentarios');
 

  comentarios.forEach(comentario => {
    let label = document.createElement('ion-label');
    let item =  document.createElement('ion-item');

    let autor = document.createElement('h2');
    let texto =  document.createElement('p');
    texto.innerText = comentario.comentario;
    autor.innerText = comentario.uemail;

    label.appendChild(autor)
    label.appendChild(texto)
    item.appendChild(label);

    listado.appendChild(item)

  });
}
