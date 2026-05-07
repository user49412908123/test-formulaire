const form = document.getElementById("orderForm");
const summary = document.getElementById("selectionSummary");
const confirmationMessage = document.getElementById("confirmationMessage");
const productInputs = document.querySelectorAll('input[name="product"]');
const dateInput = document.querySelector('input[name="date"]');

if (dateInput) {
  const today = new Date();
  const isoDate = today.toISOString().split("T")[0];
  dateInput.min = isoDate;
  dateInput.value = isoDate;
}

const updateSummary = () => {
  const selectedProduct = document.querySelector('input[name="product"]:checked');
  summary.textContent = selectedProduct ? selectedProduct.value : "Aucune sélection";
};

productInputs.forEach((input) => {
  input.addEventListener("change", updateSummary);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const extras = formData.getAll("extras");
  const customerName = formData.get("name");
  const product = formData.get("product");
  const date = formData.get("date");
  const deliveryMethod = formData.get("deliveryMethod");

  const extrasText = extras.length ? ` Options: ${extras.join(", ")}.` : "";

  confirmationMessage.textContent =
    `Merci ${customerName}. Votre demande pour "${product}" le ${date} en mode ${deliveryMethod} a bien été préparée.${extrasText}`;
});

updateSummary();
