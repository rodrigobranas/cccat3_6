import Cpf from "../src/Cpf"

test("Deve validar um cpf", function () {
    const cpf = new Cpf("847.903.332-05");
    expect(cpf.value).toBe("847.903.332-05");
});

test("Não deve validar um cpf", function () {
    expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});
