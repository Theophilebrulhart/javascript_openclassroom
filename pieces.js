
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

function pageGenerator(pieces)
{
	for (let i = 0; i < pieces.length; i++)
	{
		const article	= pieces[i];

		const sectionFiches		= document.querySelector(".fiches");
		const articleElem 		= document.createElement("article");

		const elemImg 	= document.createElement("img");
		elemImg.src		= article.image;
		const elemName	= document.createElement("h2");
		elemName.innerText	= article.nom;
		const elemPrize	= document.createElement("p");
		elemPrize.innerText = `Prix : ${article.prix} Francs (${article.prix < 35 ? "$" : "$$$"})`;
		const elemCategory	= document.createElement("p");
		elemCategory.innerText = article.categorie ?? "aucune categorie";
		
		sectionFiches.appendChild(articleElem);
		articleElem.appendChild(elemImg);
		articleElem.appendChild(elemName);
		articleElem.appendChild(elemPrize);
		articleElem.appendChild(elemCategory);
			
	}
}

pageGenerator(pieces);

const btnSort = document.querySelector(".btn-trier");

btnSort.addEventListener("click", function ()
{
	const pieceOrdered = Array.from(pieces);
	pieceOrdered.sort(function(a, b)
	{
		return (a.prix - b.prix);
	});
	console.log(pieces);
	document.querySelector(".fiches").innerHTML = "";
	pageGenerator(pieceOrdered);
});

const btnFilter = document.querySelector(".btn-filtrer");

btnFilter.addEventListener("click", function()
{
	const piecesFiltred = pieces.filter(function(piece)
	{
		return piece.prix <= 35;
	});
	console.log(piecesFiltred);
	document.querySelector(".fiches").innerHTML = "";
	pageGenerator(piecesFiltred);
});

const mapName = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--)
{
	if (pieces[i].prix > 35)
		mapName.splice(i, 1);
}

const abordable = document.createElement('ul');
for (let i = 0; i < mapName.length; i++)
{
	const abordableName = document.createElement('li');
	abordableName.innerText = mapName[i];
	abordable.appendChild(abordableName)
}
document.querySelector('.abordables')
	.appendChild(abordable)

const prixRange = document.querySelector('#prix-max');
prixRange.addEventListener('input', function() 
{
	const piecesFiltred = pieces.filter(function(piece)
	{
		return piece.prix <= prixRange.value;
	});
	console.log(piecesFiltred);
	document.querySelector(".fiches").innerHTML = "";
	pageGenerator(piecesFiltred);
});

