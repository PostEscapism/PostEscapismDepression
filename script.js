document.addEventListener("DOMContentLoaded", () => {
	const words = [
		"Avontuur",
		"Magie",
		"Mysterie",
		"Spannende omgeving",
		"Mentoren",
		"Diepe vriendschappen",
		"Loyaliteit",
		"Romantiek",
		"Sterke familieband",
		"Acceptatie",
		"Betekenis",
		"Forgiveness",
		"Non-Judgemental",
		"Hechte vriendengroep",
		"Emotionele connectie",
		"Sense of belonging",
		"Geen bureaucratie",
		"Moed",
		"Talent",
		"Een gevoel van thuis",
		"Culturele verwachtingen",
		"Kledingstijl",
		"dromen",
		"De natuur",
		"De filosofie",
		"Persoonlijke groei",
		"Respectabel",
		"Belangrijk zijn voor anderen",
		"Duidelijke rol in leven",
		"Lichamelijk fit",
		"Sympathiek",
		"veiligheid",
		"Discipline",
		"Sterke vaardigheden",
		"Een levensdoel hebben",
		"Erkenning",
	];

	let selectedWordsScreen2 = [];
	let selectedWordsScreen3 = [];

	document.getElementById("reflectButton").addEventListener("click", () => {
		document.getElementById("screen1").classList.add("hidden");
		setTimeout(() => {
			document.getElementById("screen1").style.display = "none";
			document.getElementById("screen2").style.display = "flex";
			setTimeout(
				() => document.getElementById("screen2").classList.remove("hidden"),
				50
			);
		}, 500);
	});

	document.getElementById("nextToScreen3").addEventListener("click", () => {
		selectedWordsScreen2 = getSelectedWords("wordGrid");
		showScreen("screen3");
		populateSelectedWords("selectedWords", selectedWordsScreen2);
	});

	document.getElementById("nextToScreen4").addEventListener("click", () => {
		selectedWordsScreen3 = getSelectedWords("selectedWords");
		showScreen("screen4");
		populateSelectedWords("finalWords", selectedWordsScreen3, false);
	});

	document.getElementById("doneButton").addEventListener("click", () => {
		const goal = document.getElementById("goalInput").value;
		if (goal.trim()) {
			writeToFile(goal);
			showScreen("screen5");
		}
	});

	document.getElementById("backToStart").addEventListener("click", () => {
		showScreen("screen1");
		resetSelections();
	});

	function showScreen(screenId) {
		const screens = document.querySelectorAll(".container");
		screens.forEach((screen) => {
			screen.classList.add("hidden");
			screen.style.display = "none";
		});
		const activeScreen = document.getElementById(screenId);
		activeScreen.style.display = "flex";
		setTimeout(() => activeScreen.classList.remove("hidden"), 50);
	}

	function populateWordGrid() {
		const grid = document.getElementById("wordGrid");
		words.forEach((word) => {
			const button = document.createElement("button");
			button.textContent = word;
			button.classList.add("wordButton");
			button.addEventListener("click", () =>
				button.classList.toggle("selected")
			);
			grid.appendChild(button);
		});
	}

	function populateSelectedWords(containerId, words, selectable = true) {
		const container = document.getElementById(containerId);
		container.innerHTML = "";
		words.forEach((word) => {
			const button = document.createElement("button");
			button.textContent = word;
			button.classList.add("wordButton");
			if (selectable) {
				button.addEventListener("click", () =>
					button.classList.toggle("selected")
				);
			} else {
				button.disabled = true;
			}
			container.appendChild(button);
		});
	}

	function getSelectedWords(containerId) {
		const container = document.getElementById(containerId);
		return Array.from(container.querySelectorAll(".wordButton.selected")).map(
			(button) => button.textContent
		);
	}

	function resetSelections() {
		selectedWordsScreen2 = [];
		selectedWordsScreen3 = [];
		document.getElementById("goalInput").value = "";
		document.getElementById("wordGrid").innerHTML = "";
		populateWordGrid();
	}

	function writeToFile(text) {
		fetch("answers.txt", {
			method: "POST",
			headers: { "Content-Type": "text/plain" },
			body: text + " ",
		});
	}

	// Initialize word grid on page load
	populateWordGrid();
});
