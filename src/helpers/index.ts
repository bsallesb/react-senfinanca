export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value,
  );

export const timestampToDate = (time: number): string =>
  new Date(time).toLocaleDateString();

export const currencyToFloat = (value: string): number =>
  parseFloat(value.replaceAll('.', '').replaceAll(',', '.'));

export const floatToLocaleDecimal = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
