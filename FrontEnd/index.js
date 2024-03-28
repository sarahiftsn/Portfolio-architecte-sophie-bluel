
/******Variables******/
const gallery = document.querySelector(".gallery")
const filterButtons = document.querySelectorAll(".filtres button");

/*fonction qui retourne le tableau des works*/
async function getWorks(){
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

/* Affichages des works dans le dom*/
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

//*********Affichage des boutons par catégorie*/
//récupérer les catégories
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
   return await response.json();
}  
getCategories();

async function displayCategoriesButtons() {
    const categories = await getCategories();
    console.log(categories);

    // Vérifie si l'élément avec la classe "filtres" existe
    const filtres = document.querySelector(".filtres");
    if (filtres) {
        // Si filtres existe, ajoute les boutons de catégorie
        categories.forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category.name;
            btn.id = category.id;
            filtres.appendChild(btn);
        });
    } else {
        // Si filtres est null, affiche un message d'erreur
        console.error("Aucun élément avec la classe 'filtres' n'a été trouvé.");
    }
}

displayCategoriesButtons();



