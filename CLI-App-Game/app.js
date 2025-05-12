import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let users = [];
let currentUser = null;

// Baca data pengguna dari file JSON
async function loadUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.log('Tidak ada file users.json. Akan dibuat file baru.');
  }
}

async function saveUsers() {
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
  // tulis code di sini
  console.clear()
  console.log('\n')
  console.log(chalk.blue.bold("--- Login ---"))

  const username = await question(chalk.yellow('Username: '));
  const password = await question(chalk.yellow('Password: '));

  await loadUsers()
  const user = users.find(e => e.username === username && e.password === password )

  if(user) {
    currentUser = username
    console.log(chalk.green('Login successful!'));
    console.log(chalk.cyan(`Welcome back, ${username}!`));
    await mainMenu()
  } else {
    console.log(chalk.red('Invalid username or password.'));
    await startMenu()
  }
}

async function register() {
  // tulis code di sini
  console.clear()
  console.log('\n')
  console.log(chalk.blue.bold("--- Register ---"))

  const username = await question(chalk.yellow('Username: '));
  const password = await question(chalk.yellow('Password: '));

  await loadUsers()
  if (users.some(e => e.username === username)) {
    console.log(chalk.red('Username already exists.'));
  } else {
    users.push({
      username,
      password,
      highestScore: null
    })
    await saveUsers(users)
    console.log(chalk.green('Registration successful!'));
  }
}

async function startMenu() {
  // tulis code di sini
  while(true){
    console.log('\n')
    console.log(chalk.yellow("--- Guessing Game ---"))
    console.log("1. Login")
    console.log("2. Register")
    console.log("3. Keluar")
    console.log('\n')
    const option = await question(chalk.blue('Pilih opsi: '));

    switch(option) {

      case "1":
        await login()
        break
      
      case "2":
        await register()
        break
      
      case "3":
        console.log(chalk.green('Goodbye!'));
        rl.close();
        process.exit(0)
      
      default: 
        console.log(chalk.red('Invalid option. Please try again.'));
    }
  }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
  // tulis code di sini
  while(true){
    console.log('\n')
    console.log(chalk.yellow("--- Main Menu ---"))
    console.log("1. Mulai Game")
    console.log("2. Lihat Papan Skor")
    console.log("3. Logout")
    console.log('\n')
    const option = await question(chalk.blue('Pilih opsi: '));

    switch(option) {

      case "1":
        await playGame()
        break

      case "2":
        await showLeaderboard()
        break

      case "3":
        await logout()
        return

      default: 
        console.log(chalk.red('Invalid option. Please try again.'));
    }
  }
}

async function logout(){
  console.clear();
  console.log(chalk.blue.bold('--- Logout ---'));
  const username = await question(chalk.yellow('Enter your username: '));

  if(currentUser === username) {
    currentUser = null
    console.log(chalk.green(`${username} has been logged out.`));  
    await startMenu()
  } else {
    console.log(chalk.red('User not found or not logged in.'));
    await mainMenu()
  }

}

async function showLeaderboard() {
  // tulis code di sini
  await loadUsers()
  const activeUser = users.filter(e => e.highestScore !== null)
  
  activeUser.sort((a,b) => a.highestScore - b.highestScore)

  console.clear()
  console.log('\n')
  console.log(chalk.yellow("--- Papan Skor (Top 10) ---"))
  activeUser.forEach((topUser, i) => {
    if (i > 9 ) {
      return
    } 
    console.log(`${i + 1}. ${topUser.username}: ${topUser.highestScore} percobaan`)
  })
}

async function playGame() {
  // tulis code di sini
}

async function makeGuess() {

}


// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();