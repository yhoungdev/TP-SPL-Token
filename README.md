# Solana Token Manager

A React-based web application for managing Solana tokens, built with Vite, TypeScript, and Shadcn UI.

## Features

- Create new tokens on Solana's devnet
- Mint tokens to addresses
- Transfer tokens between addresses
- Burn tokens
- Delegate token authority

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Solana Web3.js
- Solana SPL Token

## Key Packages

- @solana/web3.js: Solana's JavaScript API
- @solana/spl-token: Solana Program Library token management
- @vitejs/plugin-react-swc: Fast React plugin for Vite using SWC
- vite-plugin-node-stdlib-browser: Node.js stdlib polyfill for Vite
- tailwindcss: Utility-first CSS framework
- @radix-ui/react-label: Accessible label component
- @radix-ui/react-separator: Flexible separator component

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```
3. Run the development server:
   ```
   bun run dev
   ```

## Usage

1. Initialize the connection to Solana devnet
2. Create a new token
3. Use the form to mint, transfer, burn, or delegate tokens
4. View transaction results in the Solana Explorer (devnet)

## Note

This project interacts with the Solana devnet. Ensure you have a devnet account with SOL for transactions.

## License

[MIT License](LICENSE)
