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
const loged = window.sessionStorage.loged; // Récupère le statut de connexion depuis le sessionStorage
const logout = document.querySelector("header nav .logout");
const modifierModals = document.querySelector(".inactive");
const  containerModals =document.querySelector(".containerModals");
const xMarks = document.querySelector(".fa-xmark");


if (loged == "true") {
  // Si l'utilisateur est connecté
 
  logout.textContent = "Logout";
 

  logout.addEventListener("click", () => {
    // Ajoute un écouteur d'événement au bouton de déconnexion
    window.sessionStorage.loged = false; // Met à jour le statut de connexion dans le sessionStorage
    window.location.href = "./logout.html"; // Redirige vers la page de déconnexion
  });
 
}
// afficher le button modifier si utilisateur connecté
if (loged == "true") {
  // Si l'utilisateur est connecté 
  modifierModals.style.display="flex";
//lorsque l'utilsateur clique sur l'icone la modale s'ouvre
  modifierModals.addEventListener("click", () => {
    containerModals.style.display="flex";

 });
 // Lorsque l'utilisateur clique en dehors de la modal, la fermer
window.onclick = function(event) {
  if (event.target == containerModals) {
    containerModals.style.display = "none";
  }
}
 
 xMarks.addEventListener("click",()=> {
  containerModals.style.display ="none";
 });
} else {
  // Si l'utilisateur n'est pas connecté, masquer le bouton modifier
  modifierModals.style.display = "none";
}


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