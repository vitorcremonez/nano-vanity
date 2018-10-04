import * as nanocurrency from 'nanocurrency';
import nacl from 'tweetnacl/nacl';

function uint8_hex (uint8) {
    let hex = "";
    let aux = null;
    for (let i = 0; i < uint8.length; i++)
    {
        aux = uint8[i].toString(16).toUpperCase();
        if(aux.length === 1)
            aux = '0'+aux;
        hex += aux;
        aux = '';
    }
    return(hex);
}

class NanoGenerator {
    generateWallet = () => {
        let wallet = {};
        wallet.seed = uint8_hex(nacl.randomBytes(32));
        wallet.secret_key = nanocurrency.deriveSecretKey(wallet.seed, 0);
        wallet.public_key = nanocurrency.derivePublicKey(wallet.secret_key);
        wallet.public_address = nanocurrency.deriveAddress(wallet.public_key);
        return wallet;
    }
}

export default NanoGenerator;
