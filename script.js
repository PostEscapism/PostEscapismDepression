const reflections = [
	"Denk aan een moment uit een film, serie, game of boek dat je echt raakte. Wat maakte het zo betekenisvol voor jou?",
	"Welke emotie voelde je het sterkst bij je laatste film, serie, game of boek? Waar komt dat gevoel vandaan?",
	"Stel je voor dat je in de wereld van je favoriete film, serie, game of boek leeft. Wat trekt je daar zo aan?",
	"Welke eigenschappen van een personage uit je meest recent geconsumeerde film, serie, game of boek bewonder je? Hoe kun je die meer in jezelf terugbrengen?",
	"Denk aan een thema uit een verhaal dat je recent hebt beleefd. Waarom resoneert het zo met jou?",
	"Wat geeft je meest recent geconsumeerde film, serie, game of boek je, dat je misschien in het echte leven mist?",
	"Wat kun je vandaag doen om een stukje van jou meest recente film, serie, game of boek naar je eigen leven te halen?",
];

document
	.getElementById("reflectButton")
	.addEventListener("click", showReflection);
document.getElementById("backButton").addEventListener("click", goBack);

function showReflection() {
	document.getElementById("reflectionText").textContent =
		reflections[Math.floor(Math.random() * reflections.length)];
	document.getElementById("screen1").classList.add("hidden");
	setTimeout(() => {
		document.getElementById("screen1").style.display = "none";
		document.getElementById("screen2").style.display = "flex";
		setTimeout(
			() => document.getElementById("screen2").classList.remove("hidden"),
			50
		);
	}, 500);
}

function goBack() {
	document.getElementById("screen2").classList.add("hidden");
	setTimeout(() => {
		document.getElementById("screen2").style.display = "none";
		document.getElementById("screen1").style.display = "flex";
		setTimeout(
			() => document.getElementById("screen1").classList.remove("hidden"),
			50
		);
	}, 500);
}
