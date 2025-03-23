# USCIS Trends App

The USCIS Trends App connects to the USCIS API to retrieve case status information using receipt numbers. This application is designed to streamline the process of tracking case statuses.

## Prerequisites

To run this application, you will need the following dependencies:

- **MongoDB**: Used for storing application data.
- **HashiCorp Vault**: Used for securely managing secrets and sensitive information.
- **Redis**: Used for caching and improving performance.

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/uscis-trends-app.git
    cd uscis-trends-app/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    - Set up MongoDB connection details.
    - Configure HashiCorp Vault for secrets management.
    - Set up Redis connection details.

4. Start the application:
    ```bash
    npm start
    ```

## Features

- Connects to the USCIS API to fetch case status by receipt number.
- Stores data in MongoDB for persistence.
- Utilizes Redis for caching to improve response times.
- Secures sensitive information using HashiCorp Vault.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For questions or support, please contact [your-email@example.com].  