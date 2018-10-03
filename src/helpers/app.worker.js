function main() {
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
        const nacl = require('tweetnacl');
        return uint8_hex(nacl.randomBytes(32));
    }

    let attempts = 0;

    addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        const prefix = e.data;
        const nanocurrency = require('nanocurrency');
        let generated_prefix = null;
        let seed = null;
        let secret_key = null;
        let public_key = null;
        let public_address = null;


        do {
            attempts++;
            seed = generateSeed();
            secret_key = nanocurrency.deriveSecretKey(seed, 0);
            public_key = nanocurrency.derivePublicKey(secret_key);
            public_address = nanocurrency.deriveAddress(public_key);
            generated_prefix = public_address.substring(5, 5 + prefix.length);
            if (attempts%512 === 0) {
                postMessage({attempts});
            }
        } while (generated_prefix !== prefix);

        const wallet = {
            seed,
            secret_key,
            public_key,
            public_address,
        };

        postMessage({wallet:wallet, attempts:attempts});
    })
}

main();