
/******Variables******/
const gallery = document.querySelector(".gallery")

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