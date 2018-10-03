function main() {
    const nanocurrency = require('nanocurrency');
    const nacl = require('tweetnacl');
    let attempts = 0;
    let nextUpdate = 0;
    let lastAttempts = 0;
    let aps = 0;
    let start = 0;
    let finished = 0;
    let elapsed = 0;

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

    function hex_uint8 (hex) {
        let length = (hex.length / 2) | 0;
        let uint8 = new Uint8Array(length);
        for (let i = 0; i < length; i++) uint8[i] = parseInt(hex.substr(i * 2, 2), 16);
        return uint8;
    }

    function generateSeed() {
        return uint8_hex(nacl.randomBytes(32));
    }

    function findWallet(prefix) {
        let generated_prefix = null;
        let seed = null;
        let secret_key = null;
        let public_key = null;
        let public_address = null;
        let now = null;

        start = Date.now();

        do {
            attempts++;
            now = Date.now();
            seed = generateSeed();
            secret_key = nanocurrency.deriveSecretKey(seed, 0);
            public_key = nanocurrency.derivePublicKey(secret_key); //FIXME: bottleneck
            public_address = nanocurrency.deriveAddress(public_key);
            generated_prefix = public_address.substring(5, 5 + prefix.length);
            if (now > nextUpdate) {
                aps = attempts - lastAttempts;
                lastAttempts = attempts;
                nextUpdate = now + 1000;
                elapsed = ((now-start)/1000);
                postMessage({
                    action:'update',
                    attempts:attempts,
                    aps:aps,
                    elapsed:elapsed,
                    average_aps:attempts/elapsed,
                });
            }
        } while (generated_prefix !== prefix);

        finished = Date.now();

        return {
            seed,
            secret_key,
            public_key,
            public_address,
        };
    }

    addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        if (event.data.action === 'start') {
            const prefix = event.data.params.prefix;
            const wallet = findWallet(prefix);
            elapsed = (finished-start)/1000;
            postMessage({
                action:'finished',
                wallet:wallet,
                attempts:attempts,
                aps:aps,
                elapsed:elapsed,
                average_aps:attempts/elapsed,
            });
        }
    })
}

main();
