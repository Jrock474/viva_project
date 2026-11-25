
<h1 align="center">Viva Payments Dashboard</h1>

A frontend technical challenge built with Next.js, React, and TypeScript to display and manage payment records through a simple, responsive interface.

## Purpose

The purpose of this project is to retrieve and display payment records for June 14 and June 28, 2024, using Viva's provided API.

The interface is based on the provided Figma design.

## Technologies

- Next.js
- React
- TypeScript
- CSS
- REST API

## Functionality

- Display payment records in a table.
- Filter payments by June 14, June 28, or All Dates.
- Refresh payment data for the selected date.
- Format payment dates and currency.
- Retrieve payments using cursor-based pagination.
- Use Next.js API routes to handle authenticated requests.

## Development

### Getting Started

1. Fork or clone this repository.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project's root directory:

   ```env
   API_BASE_URL=your_api_base_url
   API_TOKEN=your_api_token
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

### API Integration

The application uses a Next.js API route to communicate with the provided payments endpoint.

Each request returns a payment record and a pagination token.

The application begins with `continuationToken=START` and continues requesting records until the API returns `paginationToken=END`.

When All Dates is selected, payments for both supported dates are retrieved and combined.

### Known Limitation

During development, the provided API began returning `403 Forbidden`, including when accessed directly through Postman.

This prevented full verification of the live API integration.

## What I Learned

- Working with cursor-based pagination.
- Handling authenticated API requests using Next.js.
- Managing filtering and refreshing through React state.
- Translating a Figma design into a functional interface.

