var commentLeft = document.getElementById('commentLeft');
var leftBtn = document.getElementById('leftBtn');
var commentRight = document.getElementById('commentRight');
var rightBtn = document.getElementById('rightBtn');
var messageLeft = document.getElementById('messageLeft');
var messageRight = document.getElementById('messageRight');

leftBtn.addEventListener("click", function(e){
	displayMessage(commentLeft, messageLeft, messageRight);
}, false);

rightBtn.addEventListener("click", function(e){
	displayMessage(commentRight, messageRight, messageLeft);
}, false);

// Envoi du message par la touche entrée
commentLeft.addEventListener("keydown", function(e){
	if (e.which === 13) {
		displayMessage(commentLeft, messageLeft, messageRight);
		statusRight.innerHTML = "";
		//e.preventdefault sert ici à empecher de poster le message avec le saut de ligne
		e.preventDefault();
	}
}, false);

commentRight.addEventListener("keydown", function(e){
	if (e.which === 13) {
		displayMessage(commentRight, messageRight, messageLeft);
		statusLeft.innerHTML = "";
		//e.preventdefault sert ici à empecher de poster le message avec le saut de ligne
		e.preventDefault();
	}
}, false);


function displayMessage(commentArea, source, target){
	if(commentArea.innerHTML == ""){
		alert("Type something before submitting your message !");
		e.preventDefault();
	}else{
		var bloc = document.createElement("div");
		bloc.className = "bloc";

		var blocMessage = document.createElement("div");
		blocMessage.innerHTML = commentArea.innerHTML;
		blocMessage.className = "blocMessage bubbleLeft animated bounceInDown";

		cloneBloc = bloc.cloneNode(true);
		cloneBloc.className = "cloneBloc";

		clone = blocMessage.cloneNode(true);
		clone.className = "blocMessage bubbleRight animated bounceInDown";
		
		bloc.appendChild(blocMessage);
		cloneBloc.appendChild(clone);
		source.appendChild(bloc);
		target.appendChild(cloneBloc);
		commentArea.innerHTML = "";
		messageLeft.scrollTop = messageLeft.scrollHeight;
		messageRight.scrollTop = messageRight.scrollHeight;
		var file = document.getElementById("fichier").value;
	}
}
/*
//Bloc pour charger les smileys au chargement de la page dans chacun des espaces dédiés
var espaceSmileyLeft = document.getElementById("espaceSmileyLeft");
var espaceSmileyRight = document.getElementById("espaceSmileyRight");

//***Appel de la fonction loadsmileys pour les 2 espaces smileys au chargement de la page***\\
window.addEventListener("load", function(e){
	loadSmileys(espaceSmileyLeft);
	loadSmileys(espaceSmileyRight);
}, false);

//***Fonction de création d'images***\\
function loadSmileys(targetedDiv){
	for (var i = 1; i < 21; i++) {
			var img = document.createElement("img");
			img.src = "images/"+i+".png";
			img.id = i;
			targetedDiv.appendChild(img);
		}
}*/


//Bloc pour traiter les smileys
var listSmileysLeft = espaceSmileyLeft.getElementsByTagName('img');
var listSmileysRight = espaceSmileyRight.getElementsByTagName('img');

function smileysHandlers(listSmileys, espaceComment){
	for (var i = 0; i < listSmileys.length; i++) {
		listSmileys[i].addEventListener("click", function(e){

			var img = document.createElement("img");
			img.src = this.src;
			espaceComment.appendChild(img);
		}, false);
	}
}

//***Utilisation de setTimeout pour laisser le temps de charger les images chargées dynamiquement et pouvoir les parcourir sans erreurs***\\
setTimeout(function(){
	smileysHandlers(listSmileysLeft, commentLeft);
	smileysHandlers(listSmileysRight, commentRight);
}, 100);

//Afficher/cacher les smileys
var mesBtns = document.getElementsByClassName('buttonSmileys');

function afficheSmiley(button, smileysArea){
	button.addEventListener("click", function(){

		if (smileysArea.style.visibility == 'visible'){
        	smileysArea.style.visibility = 'hidden';
        	button.innerHTML = "Smileys";
    	} else {
    		button.innerHTML = "Cacher";
        	smileysArea.style.visibility = 'visible';
    	}

	}, false);
}

afficheSmiley(mesBtns[0], espaceSmileyLeft);
afficheSmiley(mesBtns[1], espaceSmileyRight);

// Nombre de caractères maximum, empêche de continuer à écrire quand l'utilisateur arrive à la limite
commentLeft.addEventListener("keydown", function(e){
	checkNbchar(commentLeft, 250, e);	
}, false)

function checkNbchar(messageArea, max, e)
{   
    if(e.which != 8 && messageArea.innerHTML.length > max)
    {
       e.preventDefault();
    }
}

