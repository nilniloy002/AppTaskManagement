# Laravel React  Task Management App

## Installation 
Make sure you have the environment set up properly. You will need PHP8.1, composer, and Node.js.

1. Download the project (or clone using GIT)/ git clone https://github.com/nilniloy002/AppTaskManagement.git
2. Copy `.env.example` into `.env` and configure database credentials
3. Navigate to the project's root directory using terminal
4. Run `composer install`
5. Set the encryption key by executing `php artisan key:generate --ansi`
6. Run migrations `php artisan migrate`
7. Start local server by executing `php artisan serve`
8. Open new terminal and navigate to the `react` folder
9. Copy `react/.env.example` into `.env` and adjust the `VITE_API_BASE_URL` parameter
9. Run `npm install`
10. Run `npm run dev` to start the vite server for React
