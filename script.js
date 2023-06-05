let budget = document.getElementById("budget");
let balance = document.getElementById("balanceVal");
let desc = document.getElementById("description");
let expense = document.getElementById("expense");
let date = document.getElementById("date");
let expenseVal = document.getElementById("expenseVal");
let total = document.getElementById("total");
let expenseList = document.getElementById("expenseList");

let amount;
let totalExpense = 0;
let budAmount;
let exp = [desc, expenseVal, date];

expenseList.addEventListener("click", removeExpense);

// Update Budget
let addBudget = () => {
    amount = Number(budget.value);
    if (isNaN(amount) || amount <= 0 || amount == '') {
        budget.classList.add("error");
    }
    else {
        total.innerText = "$ " + amount;
        balance.innerText = "$ " + amount;
        budget.classList.remove("error");
    }
};

// Add Expense in Table and Subtract Value from Balance
let addExpense = () => {
    if (isNaN(Number(expenseVal.value)) || Number(expenseVal.value) <= 0 || expenseVal.value == '' || date.value === '' || desc.value == "") {
        exp.forEach((e) => {
            e.classList.add("error");
        });
    }

    else {
        amount = Number(amount) - Number(expenseVal.value);
        totalExpense += Number(expenseVal.value);
        budAmount = totalExpense;
        expense.innerText = "$ " + String(totalExpense);
        balance.innerText = "$ " + String(amount);
        let tr = document.createElement("tr");
        tr.id = expenseVal.value;
        expenseList.appendChild(tr);
        exp.forEach((e) => {
            let td = document.createElement("td");
            td.innerText = e.value;
            tr.appendChild(td);
            if (exp.indexOf(e) == 2) {
                let td = document.createElement("td");
                tr.appendChild(td);
                var btn = document.createElement("div");
                btn.className = "removebtn";
                btn.innerText = "X";
                td.appendChild(btn);
            }
        });

        // Clearing & Adjusting Values.
        exp.forEach((e) => {
            e.classList.remove("error");
            e.value = "";
        });
    }
};

function removeExpense(event) {
    if (event.target.classList.contains("removebtn")) {
        // Remove Expense List
        let row = event.target.parentNode.parentNode;
        let expVal = Number(row.id);
        row.remove();

        // Update Remaining Balance
        amount += expVal;
        balance.innerText = "$ " + String(amount);
        budAmount -= expVal;
        expense.innerText = "$ " + String(budAmount);
    }
}