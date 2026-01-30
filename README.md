# SIG FMS - Fleet Management System Web Frontend

A modern, responsive web application for managing government fleet assets and vehicle oversight. Built with Next.js 16, this application provides comprehensive fleet management capabilities including vehicle tracking, maintenance scheduling, driver management, and real-time reporting.

## Environments

- **Development/Testing**: [test.fmis.rebays.com.sb](https://test.fmis.rebays.com.sb)
- **Staging**: [staging.fmis.rebays.com.sb](https://staging.fmis.rebays.com.sb)
- **Production**: [fmis.rebays.com.sb](https://fmis.rebays.com.sb)

## Features

### Core Functionality
- **Dashboard Overview**: Real-time fleet statistics, utilization charts, and priority alerts
- **Vehicle Management**: Complete CRUD operations for fleet vehicles with detailed specifications
- **Driver Management**: Driver profiles, assignments, and performance tracking
- **Maintenance Tracking**: Scheduled and unscheduled maintenance records and service history
- **Live Map Integration**: Real-time vehicle location tracking and mapping
- **Reporting System**: Comprehensive reports on fleet utilization, costs, and performance
- **Settings Management**: System configuration and user preferences

### Technical Features
- **Authentication**: Secure login with social providers (Google, GitHub) and session management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live vehicle status and alerts
- **GraphQL Integration**: Efficient data fetching with generated TypeScript types
- **Docker Deployment**: Containerized deployment with multi-stage builds
- **Infrastructure as Code**: Terraform configurations for AWS deployment

## Tech Stack

### Frontend Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Recharts** - Data visualization

### Authentication & Security
- **Better Auth** - Authentication library with JWT support

### Data & API
- **GraphQL** - Query language for APIs
- **GraphQL Codegen** - Type-safe GraphQL operations

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking

### Deployment
- **Docker** - Containerization
- **Terraform** - Infrastructure as Code (AWS)
- **Node.js 20 Alpine** - Production runtime

## Prerequisites

- **Node.js** 20.x or later
- **npm** or **yarn** package manager
- **Docker** (for containerized deployment)
- **AWS CLI** (for Terraform deployment)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fleet-ms-web-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with required environment variables:
   ```env
   # Authentication
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000

   # GraphQL API
   GRAPHQL_ENDPOINT=http://localhost:8080

   # Auth Backend
   AUTH_BACKEND_URL=http://localhost:4444
   ```

4. **Generate GraphQL Types**
   ```bash
   npm run codegen
   ```

## Development

1. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

2. **Linting**
   ```bash
   npm run lint
   ```

3. **Type Checking**
   Run TypeScript compiler for type checking:
   ```bash
   npx tsc --noEmit
   ```

## Building and Deployment

### Local Build
```bash
npm run build
npm run start
```

### Docker Deployment

1. **Build Docker Image**
   ```bash
   npm run docker:build
   ```

2. **Run Container**
   ```bash
   npm run docker:run
   ```

3. **Standalone Production Build**
   ```bash
   npm run standalone:start
   ```

### AWS Deployment with Terraform

The project includes Terraform configurations for deploying to AWS EC2 instances.

1. **Navigate to Terraform directory**
   ```bash
   cd terraform/dev/ec2
   ```

2. **Initialize Terraform**
   ```bash
   terraform init
   ```

3. **Plan deployment**
   ```bash
   terraform plan -var-file=terraform.tfvars
   ```

4. **Apply deployment**
   ```bash
   terraform apply -var-file=terraform.tfvars
   ```

## Project Structure

```
fleet-ms-web-fe/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── drivers/              # Driver management
│   │   ├── livemap/              # Live vehicle tracking
│   │   ├── maintenance/          # Maintenance records
│   │   ├── reports/              # Reporting dashboard
│   │   ├── settings/             # System settings
│   │   └── vehicles/             # Vehicle management
│   ├── actions/                  # Server actions
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── better-auth/                  # Authentication configuration
├── components/                   # Reusable UI components
│   ├── auth/                     # Authentication components
│   └── dashboard/                # Dashboard-specific components
├── modules/                      # Feature modules
│   ├── asset-management/         # Vehicle/asset management
│   │   ├── api/                  # GraphQL operations
│   │   ├── components/           # Feature components
│   │   ├── hooks/                # Custom hooks
│   │   ├── types/                # TypeScript types
│   │   └── utils/                # Utility functions
│   └── overview/                 # Dashboard overview
├── public/                       # Static assets
├── terraform/                    # Infrastructure as Code
│   ├── dev/                      # Development environment
│   └── prod/                     # Production environment
├── codegen.ts                    # GraphQL codegen config
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.mjs           # Tailwind CSS config
└── tsconfig.json                 # TypeScript configuration
```

## API Integration

### GraphQL Schema
The application integrates with a GraphQL API running on `http://localhost:8080` in development. GraphQL operations are defined in `.graphql` files within each module's `api/` directory.

### Authentication Backend
Authentication is handled by a separate backend service running on `http://localhost:4444`, using Better Auth for secure session management.

### Code Generation
GraphQL types and operations are automatically generated using GraphQL Codegen:
```bash
npm run codegen
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow the existing ESLint configuration
- Use TypeScript for all new code
- Maintain consistent naming conventions
- Write meaningful commit messages

## License

This project is proprietary software. All rights reserved.