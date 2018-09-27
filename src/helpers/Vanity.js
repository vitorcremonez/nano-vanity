/*
import * as nanocurrency from "nanocurrency";
import nacl from "tweetnacl/nacl";

class Vanity {
    uint8_hex (uint8) {
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

    generateSeed() {
        return this.uint8_hex(nacl.randomBytes(32));
    }

    findWallet(prefix, onAttemptIntervalTimes) {
        let generated_prefix = null;
        let seed = null;
        let secret_key = null;
        let public_key = null;
        let public_address = null;
        let attempts = 0;

        do {
            attempts++;
            seed = this.generateSeed();
            secret_key = nanocurrency.deriveSecretKey(seed, 0);
            public_key = nanocurrency.derivePublicKey(secret_key);
            public_address = nanocurrency.deriveAddress(public_key);
            generated_prefix = public_address.substring(5, 5 + prefix.length);

            if (attempts%1000 === 0) {
                onAttemptIntervalTimes(attempts);
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
}
*/

function timedCount() {
    postMessage('xxx');
}

timedCount();
