CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    customerId INT NOT NULL,
    totalAmount INT NOT NULL,
    status VARCHAR(10) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    saleId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    unitPrice INT NOT NULL,
    discount INT
)