document.addEventListener("DOMContentLoaded", () => {
	let selectedWordsScreen2 = [];
	let selectedWordsScreen3 = [];

	// Event listeners for navigation buttons
	document.getElementById("reflectButton").addEventListener("click", () => {
		transitionScreens("screen1", "screen2");
	});

	document.getElementById("nextToScreen3").addEventListener("click", () => {
		selectedWordsScreen2 = getSelectedWords("wordGrid");
		transitionScreens("screen2", "screen3");
		populateSelectedWords("selectedWords", selectedWordsScreen2);
	});

	document.getElementById("nextToScreen4").addEventListener("click", () => {
		selectedWordsScreen3 = getSelectedWords("selectedWords");
		transitionScreens("screen3", "screen4");
		populateSelectedWords("finalWords", selectedWordsScreen3, false);
	});

	document.getElementById("doneButton").addEventListener("click", (event) => {
		event.preventDefault();
		const formData = getFormData();
		if (formData) {
			writeToFile(formData);
			displaySummary(formData);
			transitionScreens("screen4", "screen5");
		}
	});

	document.getElementById("backToStart").addEventListener("click", () => {
		transitionScreens("screen5", "screen1");
		resetSelections();
	});

	// Helper functions
	function transitionScreens(fromScreenId, toScreenId) {
		document.getElementById(fromScreenId).classList.add("hidden");
		setTimeout(() => {
			document.getElementById(fromScreenId).style.display = "none";
			const toScreen = document.getElementById(toScreenId);
			toScreen.style.display = "flex";
			setTimeout(() => toScreen.classList.remove("hidden"), 50);
		}, 500);
	}

	function populateWordGrid() {
		const grid = document.getElementById("wordGrid");
		const categories = {
			Social: [
				"Mentors",
				"Deep friendships",
				"Loyalty",
				"Strong romance",
				"Acceptance",
				"Forgiveness",
				"Non-judgmental",
				"Close friend group",
				"Mutual relationships",
				"Emotional connection",
				"Sense of belonging",
				"Excitement and drama",
			],
			"Characters and Identity": [
				"Clear role in life",
				"Strong personality",
				"Personal growth",
				"Courage",
				"Talent",
				"Clothing style",
				"Being important and valuable to others",
				"Respectable",
				"Inspiring",
				"Sympathetic",
				"Loyal",
				"Strong skills",
				"Confidence in actions",
				"Free in expression",
				"A good mindset",
				"Physically fit",
				"Discipline",
				"The hobbies",
			],
			World: [
				"Sense of adventure",
				"Magic",
				"Mystery",
				"No bureaucracy",
				"A sense of home",
				"Living and breathing",
				"Exciting environment",
				"Deep knowledge and meaning",
				"The nature",
				"The music",
				"The beauty",
				"The philosophy",
				"Cultural expectations",
				"Clear principles",
			],
		};

		Object.entries(categories).forEach(([category, words]) => {
			const categoryHeader = document.createElement("h2");
			categoryHeader.textContent = category;
			grid.appendChild(categoryHeader);

			const categoryContainer = document.createElement("div");
			categoryContainer.classList.add("categoryContainer");

			words.forEach((word) => {
				const button = createWordButton(word);
				categoryContainer.appendChild(button);
			});

			const customInput = createCustomInput(categoryContainer);
			categoryContainer.appendChild(customInput);
			grid.appendChild(categoryContainer);
		});
	}

	function createWordButton(word) {
		const button = document.createElement("button");
		button.textContent = word;
		button.classList.add("wordButton");
		button.addEventListener("click", () => button.classList.toggle("selected"));
		return button;
	}

	function createCustomInput(container) {
		const input = document.createElement("input");
		input.type = "text";
		input.placeholder = "other...";
		input.classList.add("customWordInput");

		input.addEventListener("blur", () => {
			const value = input.value.trim();
			if (value) {
				const button = createWordButton(value);
				container.insertBefore(button, input);
				input.value = "";
			}
			// Ensure the input remains visible even if left empty
			if (
				!container.querySelector(".customWordInput:not([value=''])") &&
				!input.value.trim()
			) {
				input.value = ""; // Reset the input if necessary
			}
		});

		return input;
	}

	function populateSelectedWords(containerId, words, selectable = true) {
		const container = document.getElementById(containerId);
		container.innerHTML = "";
		words.forEach((word) => {
			const button = createWordButton(word);
			if (!selectable) button.disabled = true;
			container.appendChild(button);
		});
	}

	function getSelectedWords(containerId) {
		const container = document.getElementById(containerId);
		const selectedButtons = Array.from(
			container.querySelectorAll(".wordButton.selected")
		).map((button) => button.textContent);
		const customInputs = Array.from(
			container.querySelectorAll(".customWordInput")
		)
			.map((input) => input.value.trim())
			.filter((value) => value);
		return [...selectedButtons, ...customInputs];
	}

	function getFormData() {
		const identity = document.getElementById("identityInput").value.trim();
		const action = document.getElementById("actionInput").value.trim();
		const reward = document.getElementById("rewardInput").value.trim();
		if (identity && action && reward) {
			return { identity, action, reward };
		}
		return null;
	}

	function resetSelections() {
		selectedWordsScreen2 = [];
		selectedWordsScreen3 = [];
		document.getElementById("identityInput").value = "";
		document.getElementById("actionInput").value = "";
		document.getElementById("rewardInput").value = "";
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
		screen5.innerHTML = `
			<h1>Good luck with your goal!</h1>
			<div>
				<p><strong>Your identity:</strong> ${identity}</p>
				<p><strong>Your action:</strong> ${action}</p>
				<p><strong>Your reward:</strong> ${reward}</p>
			</div>
			<button class="nextPageButtons" id="backToStart">Back to start</button>
		`;
		document.getElementById("backToStart").addEventListener("click", () => {
			transitionScreens("screen5", "screen1");
			resetSelections();
		});
	}

	// Initialize word grid on page load
	populateWordGrid();
});
