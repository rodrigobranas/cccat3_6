export default class MoneyService {
	static formatMoney (amount) {
		return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL"}).format(amount);
	}
}