const utilityOptions = document.querySelector("#utility-options");
const calculatorForm = document.querySelector("#calculator-form");
const fieldsContainer = document.querySelector("#fields");
const message = document.querySelector("#message");

const utilities = {
	"1": {
		fields: [
			{ id: "celsius", label: "Temperatura en Celsius", unit: "°C", step: "any", placeholder: "Ej. 25" },
		],
	},
	"2": {
		fields: [
			{ id: "price", label: "Precio", unit: "$", step: "any", min: "0", placeholder: "Ej. 1000" },
			{ id: "tax", label: "Porcentaje de IVA", unit: "%", step: "any", min: "0", placeholder: "Ej. 16" },
		],
	},
	"3": {
		fields: [
			{ id: "grade", label: "Nota", unit: "pts", step: "any", min: "0", max: "100", placeholder: "Ej. 85" },
		],
	},
};

function renderFields(option) {
	let selectedUtility;

	switch (option) {
		case "1":
			selectedUtility = utilities["1"];
			break;
		case "2":
			selectedUtility = utilities["2"];
			break;
		case "3":
			selectedUtility = utilities["3"];
			break;
		default:
			selectedUtility = null;
	}

	fieldsContainer.replaceChildren();
	message.hidden = true;
	message.className = "message";

	if (!selectedUtility) {
		calculatorForm.hidden = true;
		return;
	}

	selectedUtility.fields.forEach((field) => {
		const wrapper = document.createElement("div");
		wrapper.className = "input-group";

		const label = document.createElement("label");
		label.className = "field-label";
		label.htmlFor = field.id;
		label.textContent = field.label;

		const inputWrap = document.createElement("div");
		inputWrap.className = "input-wrap";

		const input = document.createElement("input");
		input.id = field.id;
		input.name = field.id;
		input.type = "number";
		input.step = field.step;
		input.placeholder = field.placeholder;
		input.required = true;
		if (field.min !== undefined) input.min = field.min;
		if (field.max !== undefined) input.max = field.max;

		const unit = document.createElement("span");
		unit.className = "input-unit";
		unit.textContent = field.unit;

		inputWrap.append(input, unit);
		wrapper.append(label, inputWrap);
		fieldsContainer.append(wrapper);
	});

	calculatorForm.hidden = false;
	fieldsContainer.querySelector("input")?.focus();
}

function calculate(option, values) {
	switch (option) {
		case "1": {
			const fahrenheit = (values.celsius * 9) / 5 + 32;
			return {
				title: `${formatNumber(fahrenheit)} °F`,
				detail: `${formatNumber(values.celsius)} °C convertidos a Fahrenheit`,
			};
		}
		case "2": {
			const total = values.price * (1 + values.tax / 100);
			return {
				title: formatCurrency(total),
				detail: `Precio final con ${formatNumber(values.tax)}% de IVA`,
			};
		}
		case "3": {
			let letter;
			if (values.grade >= 90) letter = "A";
			else if (values.grade >= 80) letter = "B";
			else if (values.grade >= 70) letter = "C";
			else if (values.grade >= 60) letter = "D";
			else letter = "F";

			return {
				title: `Nota ${letter}`,
				detail: `${formatNumber(values.grade)} puntos · escala de 0 a 100`,
			};
		}
		default:
			return null;
	}
}

function formatNumber(value) {
	return new Intl.NumberFormat("es-MX", { maximumFractionDigits: 2 }).format(value);
}

function formatCurrency(value) {
	return new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "MXN",
		maximumFractionDigits: 2,
	}).format(value);
}

utilityOptions.addEventListener("change", (event) => {
	if (event.target.matches('input[name="utility"]')) renderFields(event.target.value);
});

calculatorForm.addEventListener("submit", (event) => {
	event.preventDefault();

	if (!calculatorForm.reportValidity()) return;

	const formData = new FormData(calculatorForm);
	const values = Object.fromEntries(
		[...formData.entries()].map(([key, value]) => [key, Number(value)]),
	);

	const selectedOption = utilityOptions.querySelector('input[name="utility"]:checked')?.value;
	const result = calculate(selectedOption, values);
	if (!result) return;

	message.replaceChildren();
	const detail = document.createElement("span");
	detail.className = "result-detail";
	detail.textContent = result.detail;
	const title = document.createElement("strong");
	title.className = "result-value";
	title.textContent = result.title;
	message.append(detail, title);
	message.className = "message message-result";
	message.hidden = false;
});

calculatorForm.addEventListener("input", (event) => {
	message.hidden = true;
});
