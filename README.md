# BaseBot (Discord.js v14 + TypeScript)

A robust and scalable Discord bot template built with **TypeScript** and **Discord.js v14**. This project features a comprehensive handler system for commands, events, and interactive components, fully configured with linting and formatting tools.

## Features

* **Framework**: Built on Discord.js v14 and TypeScript.
* **Advanced Handlers**:
    * **Commands**: Supports Slash Commands, Prefix Commands, User Context Menus, and Message Context Menus.
    * **Components**: Handlers for Buttons, Select Menus, and Modals.
    * **Events**: Automated event loading.
* **Developer Tools**:
    * **Hot Reloading**: `nodemon` configured for auto-recompilation and restarting during development.
    * **Code Quality**: Integrated `ESLint` and `Prettier` for code consistency.
* **Configuration**: Secure environment variable management via `dotenv`.

## Prerequisites

Ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/) (Version 16.9.0 or higher is required for Discord.js v14).
* [npm](https://www.npmjs.com/) (Node Package Manager).

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd BaseBot
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Configuration

1.  **Environment Variables:**
    Rename the file `.env.example` to `.env`:

    ```bash
    mv .env.example .env
    # OR on Windows
    ren .env.example .env
    ```

2.  **Fill in your secrets:**
    Open `.env` and configure the following values:

    | Variable | Description |
    | :--- | :--- |
    | `CLIENT_TOKEN` | Your Discord Bot Token (from Developer Portal). |
    | `CLIENT_ID` | The Application ID of your bot. |
    | `GUILD_ID` | (Optional) ID of the guild for development deployment. |
    | `DEVELOPERS_ID`| Array of user IDs authorized for developer commands (e.g., `["123...", "456..."]`). |
    | `BOT_ACTIVITY_NAME` | The text displayed in the bot's status. |
    | `BOT_ACTIVITY_TYPE` | The type of activity (0=Playing, 1=Streaming, 2=Listening, 3=Watching, 4=Custom, 5=Competing). Default is 4. |
    | `BOT_ACTIVITY_STATE` | The state text (mostly for Custom status). |

    > **Note:** This bot uses `GatewayIntentBits` to load **all** intents by default. Ensure you have enabled **Privileged Gateway Intents** (Presence, Server Members, Message Content) in the [Discord Developer Portal](https://discord.com/developers/applications).

## Usage

### Development Mode

To start the bot in development mode with auto-reloading:

```bash
npm run dev
```

- This script runs `tsc` to compile your TypeScript files and uses nodemon to watch for changes in the `src/` directory, automatically restarting the bot.

### Production Mode

To build and run the bot for production:

```bash
npm run start
```

- This runs the compiled code located in the `dist/` folder.

### Code Formatting & Linting

Keep your code clean using the pre-configured scripts:

- **Lint Code**: Checks for potential errors.

```bash
npm run lint
```

- **Format Code**: Automatically fixes formatting issues using Prettier.

```bash
npm run format
```

## Project Structure

```text
BaseBot/
├── src/
│   ├── class/           # Extended Client class definition
│   ├── commands/        # Command files (Slash, Prefix, Context)
│   ├── components/      # Interaction components (Buttons, Modals, Selects)
│   ├── events/          # Event listeners
│   ├── handlers/        # Logic for loading commands/events
│   ├── config.ts        # Configuration file mapping .env variables
│   ├── functions.ts     # Utility functions
│   └── index.ts         # Entry point
├── dist/                # Compiled JavaScript files (generated on build)
├── .env                 # Environment variables (Ignored by Git)
├── package.json         # Scripts and dependencies
└── tsconfig.json        # TypeScript configuration
```

## License

This project is licensed under the KHL License.

## Author

Kirua