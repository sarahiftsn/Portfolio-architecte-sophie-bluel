/******Variables******/
const gallery = document.querySelector(".gallery");
const filterButtons = document.querySelectorAll(".filtres button");

/*fonction qui retourne le tableau des works*/
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

/* Affichage des works dans le DOM */
async function affichageWorks() {
  const works = await getWorks();
  works.forEach(work => {
    arrayWorks(work);
  });
}

async function affichageWorks() {
    const arrayWorks = await getWorks();
    const gallery = document.querySelector(".gallery"); // Déplacer la déclaration de la variable gallery à l'intérieur de la fonction
    if (gallery) { // Vérifier si gallery est défini
        arrayWorks.forEach (element => {
            const figure = document.createElement("figure");
            const img = document.createElement ("img");
            const figcaption = document.createElement("figcaption");
            img.src= element.imageUrl;
            figcaption.textContent = element.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    } else {
        console.error("Aucun élément avec la classe 'gallery' n'a été trouvé.");
    }
}

affichageWorks();

// Définir la fonction pour créer chaque élément de travail (work) dans la galerie
function arrayWorks(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  img.alt = work.title;
  figcaption.textContent = work.title;
  figure.dataset.categoryId = work.categoryId; 
  figure.classList.add("figure");
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

//*********Affichage des boutons par catégorie*************/
// récupérer les catégories
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

// Affichage des boutons de filtre par catégorie
async function displayCategoriesButtons() {
  const categories = await getCategories();
  if (categories.length > 0) {
    const filtres = document.querySelector(".filtres");
    categories.forEach(category => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
      btn.id = category.id;
      filtres.appendChild(btn);
    });
  } else {
    console.error("Aucune catégorie n'a été trouvée.");
  }
}

displayCategoriesButtons();

// Filtrer au clic sur le bouton par catégorie
async function filterCategory() {
  const works = await getWorks();
  const buttons = document.querySelectorAll(".filtres button");
  buttons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const btnId = e.target.id;
      gallery.innerHTML = "";
      if (btnId !== "0") {
        const worksByCategory = works.filter((work) => {
          return work.categoryId == btnId;
        });
        worksByCategory.forEach((work) => {
          arrayWorks(work);
        });
      } else {
        works.forEach((work) => {
          arrayWorks(work);
        });
      }
    });
  });
}

filterCategory();

// Changements quand user connecté //
document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token"); // Récupère le token depuis le sessionStorage
  const logoutBtn = document.querySelector("header nav .logout");
  const modifierModals = document.getElementById("modal");
  const  containerModals =document.querySelector(".containerModals");
  const xMarks = document.querySelector(".fa-xmark")
  const affichageAjoutmodale = document.getElementById('modal-photo');
const ajoutPhoto = document.querySelector(".ajoutphoto");
const returnModal = document.getElementById("modal-return")
const mark =document.getElementById("modal-photo-close")


  if (token) {
    // Si un token est présent dans le sessionStorage, l'utilisateur est connecté
    logoutBtn.textContent = "logout"; // Modifie le texte du bouton de déconnexion
    modifierModals.style.display = "flex";
  
    // lorsque l'utilisateur clique sur l'icone, la modale s'ouvre
    modifierModals.addEventListener("click", () => {
      containerModals.style.display = "flex";
    });
  
    // lorsque l'utilisateur clique sur la croix, fermer la modale
    xMarks.addEventListener("click", () => {
      containerModals.style.display = "none";
    });
    mark.addEventListener("click", () => {
      // Ajoute un écouteur d'événement au bouton ajouter photo
     
      affichageAjoutmodale.style.display ="none";
    
    });
    
  
    // Lorsque l'utilisateur clique en dehors de la modal, la fermer
    window.onclick = function(event) {
      if (event.target == containerModals) {
        containerModals.style.display = "none";
      }
      if (event.target ==  affichageAjoutmodale) {
        affichageAjoutmodale.style.display = "none";
      }
    };
    

  
    logoutBtn.addEventListener("click", () => {
      // Ajoute un écouteur d'événement au bouton de déconnexion
      sessionStorage.removeItem("token"); // Supprime le token du sessionStorage
      window.location.href = "./logout.html"; // Redirige vers la page de déconnexion
    });
    ajoutPhoto.addEventListener("click", () => {
      // Ajoute un écouteur d'événement au bouton ajouter photo
      containerModals.style.display = "none";
      affichageAjoutmodale.style.display ="flex";
    });
    // Faire un retour en arrière quand on clique sur la fléche
// Ajout d'un gestionnaire d'événements pour le clic sur l'icône de flèche retour
returnModal.addEventListener("click", () => {
  // Masquer la modale actuelle
  affichageAjoutmodale.style.display = "none";
  // Afficher la modale précédente
  containerModals.style.display = "flex";
});
//affichage des images dans la modale
async function affichageWorksModal() {
  const works = await getWorks();
  const galleryModal = document.querySelector(".photosmodal"); // Sélectionnez l'élément où vous voulez afficher les images dans la modale
  if (galleryModal) {
      works.forEach(work => {
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          const trashIcon = document.createElement("span");
          const trashIconInner = document.createElement("i");
          trashIconInner.classList.add("fa-solid", "fa-trash-can");
          trashIcon.appendChild(trashIconInner);
          trashIcon.classList.add("js-delete");
          trashIcon.setAttribute("data-id", work.id);
          trashIcon.addEventListener("click", (event) => deleteImage(event, work.id)); // Ajoutez un écouteur d'événement pour le clic sur l'icône de la poubelle
          img.src = work.imageUrl;
          img.alt = work.title;
          figure.appendChild(img);
          figure.appendChild(trashIcon);
          galleryModal.appendChild(figure);
      });
  } else {
      console.error("Aucun élément avec la classe 'photosmodal' n'a été trouvé.");
  }
}

// Appelez la fonction pour afficher les images dans la modale
affichageWorksModal();

// Supprimer une image
function deleteImage(event, id) {
  fetch('http://localhost:5678/api/works/' + id, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

      // Ajoutez votre en-tête d'autorisation si nécessaire
    },
  })
  .then(() => {
    const parentFigure = event.target.closest("figure");
    if (parentFigure) {
      parentFigure.remove();
      const alert = document.getElementById('alert');
      alert = "Votre photo a été supprimée avec succès";
    }
  })
  .catch((error) => {
    console.error('Erreur :', error);
  });
}
deleteImage();
  //fonction pour ajouter des projets

let galleryImage = document.getElementById("uploadedimage");
let inputFile = document.getElementById("image");
const iconeImage = document.getElementById("iModalImage");
const label = document.getElementById("label-image");
const paragraph = document.getElementById("p");


inputFile.onchange = function() {
  // Vérifie s'il y a des fichiers sélectionnés
  if (inputFile.files && inputFile.files[0]) {
    // Crée une URL pour l'image téléchargée
    const imageURL = URL.createObjectURL(inputFile.files[0]);
    // Affiche l'image téléchargée
    galleryImage.src = imageURL;
    // Affiche le paragraphe contenant les informations sur les fichiers
    galleryImage.style.display = "flex";
    label.style.display = "none";
    iconeImage.style.display = "none";
    paragraph.style.display = "none";
  } else {
    // Cache l'image et affiche le texte de remplacement si aucun fichier n'est sélectionné
    galleryImage.style.display = "none";
    label.style.display = "flex";
    iconeImage.style.display = "flex";
    paragraph.style.display = "flex";
  }
};
//Créer les catégorie
async function displayCategoryModal (){
  const select = document.getElementById("modal-photo-category")
 const categories = await getCategories ()
 categories.forEach(category =>{
  const option = document.createElement("option")
  option.value = category.id
  option.textContent = category.name
  select.appendChild(option)
 })
}
displayCategoryModal();

// title et category
// Sélectionner le formulaire avec la classe 'formm'
const form = document.querySelector(".formm");

// Ajouter un écouteur d'événements au formulaire pour l'événement 'submit'
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupérer les valeurs des champs de titre et de catégorie
  const title = document.getElementById("modal-photo-title").value;
  const category = document.getElementById("modal-photo-category").value;

  // Vérifier que les champs de titre et de catégorie ne sont pas vides
  if (title.trim() === "" || category.trim() === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const formData = new FormData(form);

  // Envoyer une requête POST à l'API avec les données de l'image, du titre et de la catégorie
  fetch('http://localhost:5678/api/works/', {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    return response.json();
  })
  .then(data => {
    // Mettre à jour l'interface utilisateur pour afficher l'image ajoutée dans la modale containerModals
    const containerModals = document.querySelector(".containerModals");
    const img = document.createElement("img");
    img.src = data.imageUrl; // Supposons que l'API renvoie l'URL de l'image ajoutée
    containerModals.appendChild(img); // Ajoutez l'image à la modale containerModals
    alert("L'image a été ajoutée avec succès.");
  })
  .catch(error => {
    console.error('Erreur :', error);
  });
});
  }
});
