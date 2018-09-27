import * as nanocurrency from "nanocurrency";
import nacl from "tweetnacl/nacl";

export default () => {
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
        return hex;
    }

    function generateSeed() {
        return uint8_hex(nacl.randomBytes(32));
    }

    function findWallet(prefix, onAttemptIntervalTimes) {
        let generated_prefix = null;
        let seed = null;
        let secret_key = null;
        let public_key = null;
        let public_address = null;
        let attempts = 0;

        do {
            attempts++;
            seed = generateSeed();
            secret_key = nanocurrency.deriveSecretKey(seed, 0);
            public_key = nanocurrency.derivePublicKey(secret_key);
            public_address = nanocurrency.deriveAddress(public_key);
            generated_prefix = public_address.substring(5, 5 + prefix.length);

            if (attempts%1000 === 0) {
                setTimeout(() => onAttemptIntervalTimes(attempts), 100);
            }
        } while (generated_prefix !== prefix);

        alert(attempts);

        return {
            seed,
            secret_key,
            public_key,
            public_address,
        };
    }

    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        if (!event) return;
        //const vanity = new Vanity();
        console.log(findWallet(event.data));
        //const wallet = vanity.findWallet(e.data);
        postMessage(event.data);
    })
}

/*


export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        console.log('inside vanity', e);
        let x = 0;
        for (let i = 0; i < 1000000000; i++) {
            x++;
            if (i%66666666 === 0){
                //postMessage('refresh' + i);
            }
        }

        postMessage('ola mundo: ' + x);
    })
}
*/