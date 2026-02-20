<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NestJS Product API</title>
</head>
<body>

  <h1>NestJS Product API</h1>

  <p>
    A simple REST API built with NestJS using Clean Architecture principles and TypeORM.
  </p>

  <h2>Features</h2>
  <ul>
    <li>Create Product</li>
    <li>Get Product by ID</li>
    <li>Automatic Category creation if it does not exist</li>
    <li>Products reference Categories via foreign key</li>
  </ul>

  <h2>Database</h2>
  <ul>
    <li>MySQL</li>
    <li>TypeORM</li>
  </ul>

  <h2>Setup</h2>

  <h3>1. Install dependencies</h3>
  <pre>npm install</pre>

  <h3>2. Configure environment variables</h3>
  <p>Create a <code>.env</code> file:</p>

  <pre>
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=nest_test
  </pre>

  <h3>3. Run the application</h3>
  <pre>npm run start:dev</pre>

  <h2>Example Flow</h2>

  <p>When creating a product:</p>
  <ol>
    <li>The controller validates incoming request data.</li>
    <li>The <strong>CreateProductUseCase</strong>:
      <ul>
        <li>Checks if category exists by name.</li>
        <li>Creates category if missing.</li>
        <li>Creates product with <code>categoryId</code>.</li>
      </ul>
    </li>
    <li>Repositories persist entities.</li>
    <li>Database enforces foreign key constraints.</li>
  </ol>

</body>
</html>
