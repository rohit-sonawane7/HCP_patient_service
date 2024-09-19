import shortid from 'shortid';

export function generateShortUniqueId(): string {
  const randomId = shortid.generate(); // Generate a short unique ID
  const currentDate = Math.floor(Date.now() / 1000); // Get the current date in seconds

  return `${randomId}_${currentDate}`;
}
