export const formatDate = (date: Date): string =>
  date.toLocaleString('pt-BR');

export const calculateEndTime = (start: Date, duration: number): Date =>
  new Date(start.getTime() + duration * 60000);
