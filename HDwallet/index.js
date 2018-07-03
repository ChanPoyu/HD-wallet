const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');
const ethTx = require('ethereumjs-tx');
const Web3 = require('web3');
var fs = require('fs')


const mnemonic = bip39.generateMnemonic(); //generates string
console.log("mnemonic phrases are : " + mnemonic);

const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer
console.log("seed is : " + seed.toString('hex'));

const root = hdkey.fromMasterSeed(seed);
const masterPrivateKey = root.privateKey.toString('hex');
console.log("masterprivateKey is : " + masterPrivateKey);

const privatekey = [];
const publickey = [];
const password = [];

const n = 15;

for (var i = 0;  i < n;  i++){
  var wallet_path = "m/44'/60'/0'/0/" + i;
  var addrNode = root.derive(wallet_path); //line 1
  var pubKey = ethUtil.privateToPublic(addrNode._privateKey);
  var addr = ethUtil.publicToAddress(pubKey).toString('hex');
  var address = ethUtil.toChecksumAddress(addr);
  privatekey[i] = addrNode._privateKey.toString('hex');
  publickey[i] = address;
  password[i] = "pass" + i;
}

fs.writeFileSync( "privatekey.txt" , privatekey );
fs.writeFileSync( "password.txt" , password );

console.log("===publickeys===");
for (var i = 0; i < n; i++){
  console.log("(" + i + ")" + publickey[i]);
}

console.log("\n");

console.log("===privatekeys===");
for (var i = 0; i < n; i++){
  console.log("(" + i + ")" + privatekey[i].toString('hex'));
}


/*
const params = {
  nonce: '0x0',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x00',
  chainId: '15'
};



const tx = new ethTx(params);
//Signing the transaction with the correct private key
tx.sign(addrNode._privateKey);
const serializedTx = tx.serialize()

const web3 = new Web3(
   new Web3.providers.HttpProvider('http://localhost:8545')
);
//Verify connection is successful
web3.eth.net.isListening()
   .then(() => console.log('is connected'))
   .catch(e => console.log('Wow. Something went wrong'));

web3.eth.sendSignedTransaction(
   `0x${serializedTx.toString('hex')}`,
   (error, result) => {
      if (error) { console.log(`Error: ${error}`); }
      else { console.log(`Result: ${result}`); }
   }
);
*/
