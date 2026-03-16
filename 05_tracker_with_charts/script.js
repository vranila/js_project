let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let chart;
let editId = null;

/* Add Expense */

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (title === "" || amount === "") {
    alert("Please enter details");
    return;
  }

  const expense = {
    id: Date.now(),
    title: title,
    amount: Number(amount),
    category: category,
  };

  expenses.push(expense);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  updateChart();
  clearForm();
}

/* Display Expenses */

function displayExpenses(list = expenses) {
  const expenseList = document.getElementById("expenseList");

  expenseList.innerHTML = "";

  let total = 0;

  list.forEach((exp) => {
    total += exp.amount;

    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${exp.title} - ₹${exp.amount} (${exp.category})
      </span>

      <div class="actions">
        <button class="editBtn" onclick="editExpense(${exp.id})">
          Edit
        </button>

        <button class="updateBtn" onclick="updateExpense(${exp.id})">
          Update
        </button>

        <button class="deleteBtn" onclick="deleteExpense(${exp.id})">
          Delete
        </button>
      </div>
    `;

    expenseList.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

/* Edit Expense */

function editExpense(id) {
  const expense = expenses.find((exp) => exp.id === id);

  document.getElementById("title").value = expense.title;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("category").value = expense.category;

  editId = id;
}

/* Update Expense */

function updateExpense(id) {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (title === "" || amount === "") {
    alert("Enter updated values first");
    return;
  }

  expenses = expenses.map((exp) => {
    if (exp.id === id) {
      return {
        id: id,
        title: title,
        amount: Number(amount),
        category: category,
      };
    }
    return exp;
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  updateChart();
  clearForm();
}

/* Delete Expense */

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  updateChart();
}

/* Filter */

function filterExpenses() {
  const category = document.getElementById("filterCategory").value;

  if (category === "All") {
    displayExpenses(expenses);
    return;
  }

  const filtered = expenses.filter((exp) => exp.category === category);

  displayExpenses(filtered);
}

/* Clear Form */

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}

/* Chart */

function updateChart() {
  const categories = {};

  expenses.forEach((exp) => {
    if (categories[exp.category]) {
      categories[exp.category] += exp.amount;
    } else {
      categories[exp.category] = exp.amount;
    }
  });

  const labels = Object.keys(categories);
  const data = Object.values(categories);

  if (chart) {
    chart.destroy();
  }

  const ctx = document.getElementById("expenseChart");

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Expenses",
          data: data,
        },
      ],
    },
  });
}

/* Initial Load */

displayExpenses();
updateChart();