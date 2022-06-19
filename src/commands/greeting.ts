const arg = process.argv.slice(2).filter(arg => arg.startsWith('--username')).toString();
const finalIndex = arg.indexOf('=');

export const name = arg.slice(finalIndex + 1)

export const greeting = async () => {
   process.stdout.write(`Welcome to the CRUD \n`);
}