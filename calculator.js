const billTotal = document.getElementById('billTotal');
const tipPercentage = document.getElementById('tipPercentage');
const tipRange = document.getElementById('tipRange');
const tipAmount = document.getElementById('tipAmount');
const totalBill = document.getElementById('totalBill');

// Function to calculate tip and update the fields
function calculateTip() {
    const billValue = parseFloat(billTotal.value);
    const tipValue = parseInt(tipRange.value);
    
    if (!isNaN(billValue)) {
        const tip = (billValue * tipValue) / 100;
        const total = billValue + tip;

        tipPercentage.value = tipValue;
        tipAmount.value = tip.toFixed(2);
        totalBill.value = total.toFixed(2);
    }
}

// Event listeners for input and change events
billTotal.addEventListener('input', calculateTip);
tipRange.addEventListener('input', calculateTip);

// Initial calculation
calculateTip();
