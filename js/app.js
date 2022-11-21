function displayYear (){
    let aujourdhui = new Date();
    let span = document.getElementById('copyright');

    aujourdhui = aujourdhui.getFullYear();

    return span.innerText = aujourdhui;
}

displayYear();

/**
 * PRODUITS
 */

let Produit1 = {
    categorie:"tshirt",
    couleur: "noir",
    nom: 'Tshirt noir',
    stock: 50,
    prix: 10,
    tauxTVA:20,
    prixTTC:12,
    urlImage: "img/photo-tshirt.jpg"
}

class Produit{

    constructor(nom,prix,stock,categorie,couleur,urlImage,tauxTVA){

        this.nom = nom;
        this.prix = prix;
        this.stock = stock;
        this.categorie = categorie;
        this.couleur = couleur;
        this.urlImage = urlImage;
        this.tauxTVA = tauxTVA;
        this.prixTTC = this.calculPrixTTC(this.prix,this.tauxTVA);
    }

      calculPrixTTC(prix, taux){
        let prixTTC = prix * (1+(taux/100));
        return prixTTC.toFixed(2);
    }

    checkFiltres(choixCategorie, choixCouleur, prixMax){
        if(choixCategorie !== '' && choixCategorie !== this.categorie){
            return false;
        }

        if(choixCouleur !== "" && choixCouleur !== this.couleur){
            return false;
        }

        if(prixMax !== '' && prixMax < this.prixTTC){
            return false;
        }

        return true;
    }
}

let listeProduits = [];

listeProduits.push( new Produit('Tshirt noir', 10,50,'tshirt','noir','img/tshirt-noir.jpg',20));
listeProduits.push(new Produit('Tshirt blanc',11,50,'tshirt','blanc','img/tshirt-blanc.jpg',20));
listeProduits.push(new Produit('Tshirt gris',10,50,'tshirt','gris', 'img/tshirt-gris.jpg',20));
listeProduits.push( new Produit('Tshirt orange', 11, 50, 'tshirt', 'orange', 'img/tshirt-orange.jpg', 20) );
listeProduits.push( new Produit('Chemise blanche', 21, 50, 'chemise', 'blanc', 'img/chemise-blanche.jpg', 20) );
listeProduits.push( new Produit('Chemise bleue', 22, 50, 'chemise', 'bleu', 'img/chemise-bleue.jpg', 20) );
listeProduits.push( new Produit('Chemise noire', 23, 50, 'chemise', 'noir', 'img/chemise-noire.jpg', 20) );
listeProduits.push( new Produit('Chemise rose', 24, 50, 'chemise', 'rose', 'img/chemise-rose.jpg', 20) );
listeProduits.push( new Produit('Polo rouge', 30, 50, 'polo', 'rouge', 'img/polo-rouge.jpg', 20) );
listeProduits.push( new Produit('Polo bleu', 30, 50, 'polo', 'bleu', 'img/polo-bleu.jpg', 20) );
listeProduits.push( new Produit('Polo marron', 30, 50, 'polo', 'marron', 'img/polo-marron.jpg', 20) );
listeProduits.push( new Produit('Echarpe bleue', 7, 50, 'echarpe', 'bleu', 'img/echarpe-bleue.jpg', 20) );
listeProduits.push( new Produit('Echarpe jaune', 8, 50, 'echarpe', 'jaune', 'img/echarpe-jaune.jpg', 20) );
listeProduits.push( new Produit('Echarpe noire', 9, 50, 'echarpe', 'noir', 'img/echarpe-noire.jpg', 20) );
listeProduits.push( new Produit('Echarpe verte', 9, 50, 'echarpe', 'vert', 'img/echarpe-verte.jpg', 20) );


function blocProduit(nom,prixTTC,categorie,couleur,image){
    let blocHTML = '<div class="blocProduit">';
        blocHTML += `<H3>${nom}</h3>`;
        blocHTML += `<img src=${image}>`;
        blocHTML += `<p>${categorie} - ${couleur}</p>`;
        blocHTML += `<p>${prixTTC}</p>`;
        blocHTML += `</div>`;

    return blocHTML;
}

function afficherLesProduits(){
    let filtreCategorie = document.getElementById('categorie').value;
    let filtreCouleur = document.getElementById('couleur').value;
    let filtrePrix = document.getElementById('prixMax').value;
    let contenuHTML = ""; 

    for(let produit of listeProduits){
        if(produit.checkFiltres(filtreCategorie, filtreCouleur, filtrePrix) == true ){
            contenuHTML += blocProduit(produit.nom, produit.prixTTC, produit.categorie, produit.couleur, produit.urlImage);
        }
    }
    if(contenuHTML.length < 1){
        contenuHTML = '<p>Aucun produit ne correspond à votre recherche</p>';
    }

    return document.getElementById('affichageProduits').innerHTML = contenuHTML;
}

afficherLesProduits();

let formulaire = document.getElementById('formulaireFiltres');
formulaire.addEventListener("submit",function(e){

    e.preventDefault(); 
    
    afficherLesProduits();
});

    let listeCategories = [];


    for(let produit of listeProduits){
        
        let found = listeCategories.find(item => item == produit.categorie);

        if(found == undefined){
            listeCategories.push(produit.categorie)
        }
    }

    console.log(listeCategories);


    function upperCaseFirst(string){
        return string.substring(0,1).toUpperCase() + string.substring(1);
    }


let categories = '<option></option>';

for(i=0; i < listeCategories.length; i++){

    categories += `<option value=${listeCategories[i]}>${upperCaseFirst(listeCategories[i])}</option>`
}

console.log(categories);

document.getElementById('categorie').innerHTML = categories;


let listeCouleurs = [];

for(let produit of listeProduits){
    let found = listeCouleurs.find(item => item == produit.couleur);

    if(found == undefined){
        listeCouleurs.push(produit.couleur)
    }
}
console.log(listeCouleurs);


let couleurs = "<option></option>";

for(i = 0; i < listeCouleurs.length ; i++){
    couleurs += `<option value=${listeCouleurs[i]}>${upperCaseFirst(listeCouleurs[i])}</option>`;
}

console.log(couleurs);

document.getElementById('couleur').innerHTML = couleurs;
