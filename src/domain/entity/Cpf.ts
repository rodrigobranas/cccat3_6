export default class Cpf {
    CPF_VALID_LENGTH = 11;
    FACTOR_FIRST_VERIFIER_DIGIT = 10;
    FACTOR_SECOND_VERIFIER_DIGIT = 11;
    value: string;

    constructor (value: string) {
        if (!this.validate(value)) throw new Error("Invalid cpf");
        this.value = value;
    }

    validate (rawCpf: string) {
        if (!rawCpf) return false;
        const cpf = this.cleanCpf(rawCpf);
        if (cpf.length !== this.CPF_VALID_LENGTH) return false;
        if (this.areAllDigitsEqual(cpf)) return false;
        const firstVerifierDigit = this.calculateDigit(cpf, this.FACTOR_FIRST_VERIFIER_DIGIT);
        const secondVerifierDigit = this.calculateDigit(cpf, this.FACTOR_SECOND_VERIFIER_DIGIT);
        const verifierDigit = this.extractVerifierDigit(cpf);  
        const calculatedVerifiedDigit = `${firstVerifierDigit}${secondVerifierDigit}`;  
        return verifierDigit === calculatedVerifiedDigit;
    }

    cleanCpf (cpf: string) {
        return cpf.replace(/\D/g, "");
    }

    areAllDigitsEqual (cpf: string) {
        const [firstDigit] = cpf;
        return [...cpf].every(c => c === firstDigit);
    }

    calculateDigit (cpf: string, factor: number) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const rest = total%11;
        return (rest < 2) ? 0 : (11 - rest);
    }

    extractVerifierDigit (cpf: string) {
        return cpf.slice(9);
    }
}
