export const numberGenerator = () => {
  const timestampAtual = Date.now();
  const numeroAleatorio = parseInt(String(timestampAtual).slice(0, 6), 10);
  return numeroAleatorio;
};
