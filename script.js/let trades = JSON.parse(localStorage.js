let trades = JSON.parse(localStorage.getItem('trades')) || [];

document.addEventListener('DOMContentLoaded', () => {
    loadTrades();
});

document.getElementById('tradeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const tradeDate = document.getElementById('tradeDate').value;
    const asset = document.getElementById('asset').value.toUpperCase();
    const tradeType = document.getElementById('tradeType').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseFloat(document.getElementById('quantity').value);

    if (!tradeDate || !asset || !tradeType || isNaN(price) || isNaN(quantity)) {
        alert('Please fill in all fields with valid data.');
        return;
    }

    const trade = {
        id: Date.now(),
        date: tradeDate,
        asset: asset,
        type: tradeType,
        price: price,
        quantity: quantity
    };
    trades.push(trade);
    saveTrades();
    addTradeToTable(trade);
    e.target.reset();
});

function loadTrades() {
    const tbody = document.getElementById('tradeList');
    tbody.innerHTML = '';
    trades.forEach(trade => addTradeToTable(trade));
}

function addTradeToTable(trade) {
    const tbody = document.getElementById('tradeList');
    const row = document.createElement('tr');
    row.setAttribute('data-id', trade.id);
    row.innerHTML = `
        <td>${trade.date}</td>
        <td>${trade.asset}</td>
        <td>${trade.type}</td>
        <td>$${trade.price.toFixed(2)}</td>
        <td>${trade.quantity}</td>
        <td><button class="delete" onclick="confirmDeleteTrade(${trade.id})">Delete</button></td>
    `;
    tbody.appendChild(row);
}

function saveTrades() {
    localStorage.setItem('trades', JSON.stringify(trades));
}

function confirmDeleteTrade(id) {
    if (confirm('Are you sure you want to delete this trade?')) {
        deleteTrade(id);
    }
}

function deleteTrade(id) {
    trades = trades.filter(trade => trade.id !== id);
    saveTrades();
    loadTrades();
}

// Optional: Add sorting functionality
document.getElementById('sortTrades').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    trades.sort((a, b) => {
        if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'asset') return a.asset.localeCompare(b.asset);
        if (sortBy === 'type') return a.type.localeCompare(b.type);
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'quantity') return a.quantity - b.quantity;
    });
    loadTrades();
});
}