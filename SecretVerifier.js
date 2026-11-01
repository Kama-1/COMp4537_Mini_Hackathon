class SecretVerifier {
    constructor(secret) {
        this.secret = secret;
    }

    verify(guess) {
        if (guess === "Hello") {
            return { verify: "Hello" };
        }

        if (guess === this.secret) {
            return { verify: "Correct" };
        }

        return { verify: "Incorrect" };
    }
}

module.exports = SecretVerifier;