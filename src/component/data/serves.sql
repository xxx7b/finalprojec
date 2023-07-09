-- Table creation
CREATE TABLE serves
(
    id INT
    AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR
    (45),
  phoneNumber VARCHAR
    (45),
  address VARCHAR
    (445),
  repairType VARCHAR
    (45),
  payment VARCHAR
    (45),
  additionalInfo VARCHAR
    (300),
  state TINYINT,
  workername VARCHAR
    (45),
  orderstate VARCHAR
    (45)
);

    -- Data insertion
    INSERT INTO orders
        (name, phoneNumber, address, repairType, payment, additionalInfo, state, workername, orderstate)
    VALUES
        ('dheya', '+966571254910', 'Saudi Arabia ,Riyadh 12965 , Abdullah Bin Al - Zubair , Al - Uraija Al - Gharbia', 'hous', 'caird', 'pleas', 0, 'wedj', 'inprogress'),
        ('dheya', '123456', 'ekfdnk', 'hous', 'shpee', 'ne d', 0, 'mohsen', 'rejected'),
        ('klk', '+966571254910', 'Saudi Arabia ,Riyadh 12965 , Abdullah Bin Al - Zubair , Al - Uraija Al - Gharbia', 'car', 'shpee', 'nqnsndc', 1, 'molo', 'rejected'),
        ('klk', '234567', 'nkendkf', 'car', 'shpee', 'wernkf', 0, 'molo', 'inprogress'),
        ('klk', '+966571254910', 'Saudi Arabia ,Riyadh 12965 , Abdullah Bin Al - Zubair , Al - Uraija Al - Gharbia', 'hous', 'caird', 'wnedinfv', 0, 'molo', 'inprogress');
