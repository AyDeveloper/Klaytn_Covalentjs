const covalentjs = require('covalentjs');


const form = document.querySelector('.form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const userAddr = form.userAddr.value
    getTokenAssets(userAddr);
})

async function getTokenAssets(addr) {
		const result = await covalentjs.classA.getTokenBalancesForAddress(8217, addr, { nft: true });
		console.log(result.data.items);
        
        if (result.data.items.length > 0) {
            displayItem(result.data.items);
        } else {
            alert("No assets found")
        }
}


function displayItem(n) {
    const tbody = document.querySelector(".tbody");
    const thead = document.querySelector(".thead");
    for (let i = 0; i < n.length; i++) {
        thead.style.visibility = "visible";
        tbody.innerHTML += `
                <tr>
                        <td class="tdImg">${i + 1}</td>
                        <td><h2>${n[i].contract_ticker_symbol}</h2></td>
                        <td><p> ${formatValue(n[i].balance, n[i].contract_decimals).toFixed(2)}</p></td>
                        <td><p>${checkTokenType(n[i].type)}</p></td>
                </tr>
        `
        setTimeout(() => {
            thead.style.visibility = "hidden";
            tbody.innerHTML =  `` 
        }, 10000);
    }   
}

function formatValue(value, decimal) {
    return value / Math.pow(10, decimal);
}


function checkTokenType(type) {
    if(type == "cryptocurrency") {
        return "Fungible Tokens(FT)"
    } else if (type == "dust"){
        return "Fungible Tokens(FT)"
    } else {
        return "Non-Fungible Tokens(NFT)"
    }
}




