function calculateEMI() {
  const P = parseFloat(document.getElementById("amount").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const years = parseFloat(document.getElementById("years").value);

  if (!P || !annualRate || !years) {
    alert("Fill all fields");
    return;
  }

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  document.getElementById("emi").innerText = emi.toFixed(2);
  document.getElementById("interest").innerText = totalInterest.toFixed(2);
  document.getElementById("total").innerText = totalPayment.toFixed(2);
}