document.addEventListener("DOMContentLoaded", () => {
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

	const nextToScreen3Button = document.getElementById("nextToScreen3");
	if (nextToScreen3Button) {
		nextToScreen3Button.addEventListener("click", () => {
			selectedWordsScreen2 = getSelectedWords("wordGrid");
			showScreen("screen3");
			populateSelectedWords("selectedWords", selectedWordsScreen2);
		});
	} else {
		console.error('Element with ID "nextToScreen3" not found.');
	}

	document.getElementById("nextToScreen4").addEventListener("click", () => {
		selectedWordsScreen3 = getSelectedWords("selectedWords");
		showScreen("screen4");
		populateSelectedWords("finalWords", selectedWordsScreen3, false);
	});

	document.getElementById("doneButton").addEventListener("click", (event) => {
		event.preventDefault(); // Prevent default form submission
		const identity = document.getElementById("identityInput").value.trim();
		const action = document.getElementById("actionInput").value.trim();
		const reward = document.getElementById("rewardInput").value.trim();

		if (identity && action && reward) {
			const formData = {
				identity,
				action,
				reward,
			};
			writeToFile(formData);
			displaySummary(formData); // Display the summary on the last page
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
		const categories = {
			Sociaal: [
				"Mentoren",
				"Diepe vriendschappen",
				"Loyaliteit",
				"Sterke Romantiek",
				"Acceptatie",
				"Betekenis",
				"Forgiveness",
				"Non-Judgemental",
				"Hechte vriendengroep",
				"Wederzijdse relaties",
				"Emotionele connectie",
				"Sense of belonging",
				"Spanning en drama",
			],
			"Karakters en Identiteit": [
				"Duidelijke rol in leven",
				"Sterke persoonlijkheid",
				"Persoonlijke groei",
				"Moed",
				"Talent",
				"Kledingstijl",
				"Belangrijk zijn voor anderen",
				"Respectabel",
				"Inspirerend",
				"Sympathiek",
				"Loyaal",
				"Een levensdoel hebben",
				"Sterke vaardigheden",
				"Zelfvertrouwen in acties",
				"Vrij in uiting",
				"Een goede mindset",
				"Lichamelijk fit",
				"Discipline",
				"De hobbies",
				"Zekerheid in acties",
			],
			Wereld: [
				"Gevoel van avontuur",
				"Magie",
				"Mysterie",
				"Geen bureaucratie",
				"Een gevoel van thuis",
				"Living and breathing",
				"Spannende omgeving",
				"Geen bureaucratie",
				"Diepe kennis en betekenis",
				"Een gevoel van thuis",
				"Living and breathing",
				"De natuur",
				"De muziek",
				"De schoonheid",
				"De filosofie",
				"Culturele verwachtingen",
				"Duidelijke principes",
			],
		};

		Object.entries(categories).forEach(([category, words]) => {
			const categoryHeader = document.createElement("h2");
			categoryHeader.textContent = category;
			grid.appendChild(categoryHeader);

			const categoryContainer = document.createElement("div");
			categoryContainer.classList.add("categoryContainer");

			words.forEach((word) => {
				const button = document.createElement("button");
				button.textContent = word;
				button.classList.add("wordButton");
				button.addEventListener("click", () =>
					button.classList.toggle("selected")
				);
				categoryContainer.appendChild(button);
			});

			grid.appendChild(categoryContainer);
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
		document.getElementById("identityInput").value = ""; // Clear identity input
		document.getElementById("actionInput").value = ""; // Clear action input
		document.getElementById("rewardInput").value = ""; // Clear reward input
		document.getElementById("wordGrid").innerHTML = "";
		populateWordGrid();
	}

	function writeToFile(data) {
		fetch("https://formsubmit.co/ajax/postescapism@hotmail.com", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => console.log("Form submitted:", data))
			.catch((error) => console.error("Error submitting form:", error));
	}

	function displaySummary({ identity, action, reward }) {
		const screen5 = document.getElementById("screen5");
		const summary = document.createElement("div");
		summary.innerHTML = `
			<p><strong>Jouw identiteit:</strong> ${identity}</p>
			<p><strong>Jouw actie:</strong> ${action}</p>
			<p><strong>Jouw beloning:</strong> ${reward}</p>
		`;
		screen5.insertBefore(summary, screen5.querySelector("button"));
	}

	// Initialize word grid on page load
	populateWordGrid();
});
