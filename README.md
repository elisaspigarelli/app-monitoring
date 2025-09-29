# App Monitoring

This Angular application implements a simple Monitoring Dashboard for machine learning model predictions, featuring data visualization and filtering capabilities.

## Features
The application includes the following core functionalities:
- Navigation bar with two main sections: Predictions and Monitoring
- Predictions: Displays a comprehensive table of all prediction records.
    - The table is ordered from most recent to oldest
    - Includes a Model ID filter to display predictions for a specific model only
- Monitoring: Provides visual insights into model performance:
    - Graph 1: Errors over time (based on predictions with status != 200)
    - Graph 2: Average response time per day
    - Easy toggle between the two graphs
    - Includes a time filter to view data for a specific date range

## Project Structure

The project repository is organized as follows:
```sh
/app-models-monitoring
│
├── /public/input-data
│   └── data.json                       # Mock data simulating API responses
├── /src
│   └── index.html                      # Main HTML file
│   └──/app
│      └──app.component.ts              # Root app component (.scss and .html included)
│      └──app.route.ts                  # App routing configuration
│      └──app.config.ts                 # App configiguration
│      └── /components                  # All application components
│          └── /base                           # abstract component for prediction e monitoring
│          └── /graph                          # component for rendering charts
│          └── /monitoring                     # component for monitoring features
│          └── /predictions                    # component for predictions features
│          └── /welcome-page                   # component for welcome page
│      └── /services                    # All application services 
│      └── /shared                      # Shared utilities, such as utils.js
│      └── /models                      # TypeScript interfaces and data modelsc
├── README.md                           # This file
```

## Tech Stack

- [Angular](https://angular.io/)
- [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1
- [Angular Material](https://material.angular.io/)
- TypeScript
- Charting library ([Chart.js](https://www.chartjs.org/), [ngx-charts](https://swimlane.github.io/ngx-charts/))

## Future Improvements

Here are some planned enhancements for future development:
- Connect the application to a real backend API
- Implement global error handling and warning UI
- Add authentication with role-based access (admin/analyst)
- Add unit and integration tests (using Jasmine + Karma)
- Make the layout fully responsive for mobile devices
- Improve accessibility using Angular Material's accessibility tools

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.