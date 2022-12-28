const ethers = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum)

let account;

function getAccount() {
    provider.send("eth_requestAccounts", []).then(addresses => {
        console.log(addresses[0]);
        account = addresses[0];
    });
}

async function getBal() {
    return ethers.utils.formatEther(await provider.getBalance(account))
}

async function getBlock() {
    return await provider.getBlockNumber();
}

async function getGas() {
    return (await provider.getGasPrice() / 1000000000).toFixed(2);
}

async function getNetChain() {
    let net = await provider.getNetwork();
    return `Network is "${net.name}" and Chain ID is ${net.chainId}.`
}

alertBut.addEventListener("click", function() {
    alert("NO NOT THAT ONE.")
})

ethBalBut.addEventListener("click", function() {
    let str = document.getElementById("ethBal");
    getBal().then(balance => (str.textContent = (balance.toString() + " ETH")))
});

ethAddyBut.addEventListener("click", function() {
    let str = document.getElementById("ethAddress");
    str.textContent = account;
})

curBlockBut.addEventListener("click", () => {
    let str = document.getElementById("currentBlock")
    getBlock().then(block => (str.textContent = block));
})

gasPriceBut.addEventListener("click", () => {
    let str = document.getElementById("gasPrice");
    getGas().then(gas => (str.textContent = (gas + " gwei")));
    
})

chainNetBut.addEventListener("click", () => {
    let str = document.getElementById("chainAndNetwork")
    getNetChain().then(netChain => (str.textContent = netChain));
})

getAccount();