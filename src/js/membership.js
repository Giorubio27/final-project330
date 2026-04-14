import { qs, setLocalStorage, loadHeaderFooter } from "./utils/utils.mjs";

const membership_price = 25.00;
const tax_rate = 0.08;

async function initMembershipForm() {
    await loadHeaderFooter();

    const form = qs("#membership-form");
    const subtotalElement = qs("#subtotal");
    const taxElement = qs("#tax");
    const totalElement = qs("#orderTotal");

    const taxAmount = membership_price * tax_rate;
    const totalAmount = membership_price + taxAmount;

    subtotalElement.textContent = `$${membership_price.toFixed(2)}`;
    taxElement.textContent = `$${taxAmount.toFixed(2)}`;
    totalElement.textContent = `$${totalAmount.toFixed(2)}`;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const orderSummary = {
            name: `${formData.get("fname")} ${formData.get("lname")}`,
            email: formData.get("email"),
            address: `${formData.get("street")}, ${formData.get("city")}, ${formData.get("state")}`,
            total: totalAmount,
            date: new Date().toLocaleDateString()
        };

        setLocalStorage("octagon_membership", orderSummary);

        qs(".membership-signup").innerHTML = `
        <div class="success-message">
        <h2>Welcome to the Inner Circle!</h2>
        <p>Thank you, ${orderSummary.name}. Your membership is now active. </p>
        <a href="../index.html" class="button">Back to Home</a>
        `;
    });


}

initMembershipForm();