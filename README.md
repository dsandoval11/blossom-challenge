# Rick and Morty character explorer

A modern React application for exploring Rick and Morty characters with advanced filtering, favorites management, comments system and detailed character views.

## Features

- 🔍 **Advanced search & filtering**: Search by name and filter by starred characters, species, status, and gender.
- ⭐ **Favorites management**: Star your favorite characters with local storage persistence.
- 📱 **Responsive design**: Optimized for both desktop and mobile devices.
- 🗑️ **Character management**: Delete characters.
- 💬 **Comments system**: Add comments to characters with local storage.

## Screenshots
<img width="1515" height="993" alt="Captura desde 2025-08-03 13-51-17" src="https://github.com/user-attachments/assets/c740f103-a913-4601-a16f-702b4ad7d3ff" />

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Routing**: React Router Dom v7
- **State management**: Zustand
- **Data fetching**: Apollo Client + GraphQL
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite
- **Package manager**: npm

## Prerequisites

- Node.js >= 20.0.0
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd blossom-challenge
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## API integration

This application uses the **Rick and Morty GraphQL API** to fetch character data.

### API endpoint

```
https://rickandmortyapi.com/graphql
```

### Available Queries

#### Get Characters

```graphql
query GetCharacters($page: Int!, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    results {
      id
      name
      image
      species
    }
  }
}
```

**Variables:**

- `page`: Page number for pagination
- `filter`: Object containing filter criteria
  - `name`: String to search character names
  - `status`: Character status (`Alive`, `Dead`, `Unknown`)
  - `species`: Character species (`Human`, `Alien`)
  - `gender`: Character gender (`Male`, `Female`, `Unknown`)

#### Get Character by ID

```graphql
query GetCharacterById($id: ID!) {
  character(id: $id) {
    id
    name
    image
    species
    status
    gender
  }
}
```

**Variables:**

- `id`: Character ID (required)

## Application Architecture

### Project Structure

```
src/
├── pages/               # Page components
├── core/
│   ├── components/      # Reusable components
│   ├── stores/          # Zustand state management
│   ├── utils/           # Utility functions
│   └── test/            # Test utilities
├── hooks/               # Custom React hooks
├── graphql/             # GraphQL queries
├── lib/                 # Library functions
└── assets/              # Static assets (SVG icons)
```

### Local Storage

The application persists data in localStorage:

- **Favorites**: `favorites` - Array of favorite character IDs
- **Comments**: `comments_post_{characterId}` - Comments for each character
- **Removed characters**: `removed_characters` - Array of deleted character IDs

## Testing

The application includes comprehensive unit tests for key components:

```bash
# Run all tests
npm test

# Run tests with UI to view results
npm run test:ui
```

## API Documentation

For more detailed API documentation, visit:

- [Rick and Morty API Documentation](https://rickandmortyapi.com/documentation)
- [GraphQL Playground](https://rickandmortyapi.com/graphql)
