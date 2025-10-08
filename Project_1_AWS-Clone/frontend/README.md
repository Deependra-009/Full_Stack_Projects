# AWS Clone - Cloud Management Console

A modern React-based AWS clone application with RDS (Relational Database Service) functionality.

## Features

- **RDS Database Management**: Create and manage PostgreSQL and MySQL database instances
- **Modern UI**: AWS-inspired design with Tailwind CSS
- **State Management**: Redux Toolkit with TypeScript
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live database status monitoring

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AWS-Clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Integration

The application expects a backend API with the following endpoints:

### RDS Endpoints

- `POST /api/rds/databases` - Create a new database instance
- `GET /api/rds/databases` - Get all database instances
- `GET /api/rds/databases/:id` - Get a specific database instance
- `DELETE /api/rds/databases/:id` - Delete a database instance

### Request/Response Format

**Create Database Request:**
```json
{
  "dbType": "postgres",
  "dbName": "my-database",
  "username": "admin",
  "password": "secure-password"
}
```

**Database Instance Response:**
```json
{
  "id": 14,
  "dbType": "postgres",
  "dbName": "my-database",
  "username": "admin",
  "password": "secure-password",
  "host": "localhost",
  "port": 46761,
  "connectionUrl": "jdbc:postgres://localhost:46761/my-database",
  "status": "RUNNING",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── RDS/            # RDS-specific components
│       ├── RDSPage.tsx
│       ├── CreateDatabaseForm.tsx
│       └── DatabaseList.tsx
├── store/              # Redux store
│   ├── store.ts        # Store configuration
│   └── rdsSlice.ts     # RDS state management
├── services/           # API services
│   └── rdsApi.ts       # RDS API client
├── types/              # TypeScript types
│   └── rds.ts          # RDS type definitions
├── hooks/              # Custom hooks
│   └── redux.ts        # Redux hooks
└── App.tsx             # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
