let plansContainer = document.querySelector(".plans");
for(let amount=7500; amount<=100000; amount+=1500){
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="images/plan${amount}.jpg" alt="Rs ${amount} Plan">
        <h3>Rs ${amount}</h3>
        <button onclick="buyPlan(${amount})">Deposit & Buy</button>
    `;
    plansContainer.appendChild(card);
}

function buyPlan(amount){
  let user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if(!user.name) return alert("Please login first");

  user.plan = amount;
  localStorage.setItem("currentUser", JSON.stringify(user));

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let idx = users.findIndex(u=>u.email==user.email);
  if(idx>=0){ users[idx] = user; localStorage.setItem("users", JSON.stringify(users)); }

  let balance = parseInt(localStorage.getItem("adminBalance") || 0);
  balance += amount;
  localStorage.setItem("adminBalance", balance);

  alert(`Deposit of Rs ${amount} successful!`);
}
