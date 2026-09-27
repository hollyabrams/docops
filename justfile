# Start the local development server
run:
    npm run dev

# Install dependencies
install:
    npm install

# Run linting
lint:
    npm run lint

# Create a production build
build:
    npm run build

# Run all validation checks
check: lint build

# Remove generated Next.js files
clean:
    rm -rf .next
