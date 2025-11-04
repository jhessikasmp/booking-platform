export const calculateEndTime = (start: Date, duration: number): Date =>
  new Date(start.getTime() + duration * 60000);
