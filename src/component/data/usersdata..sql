
CREATE TABLE users
(
  id INT
  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR
  (45),
  email VARCHAR
  (45),
  password VARCHAR
  (445),
  usertype VARCHAR
  (45),
  phone VARCHAR
  (45),
  address VARCHAR
  (445),
  exp VARCHAR
  (50),
  active VARCHAR
  (45)
);

  -- Insert data into the users table
  INSERT INTO users
    (id, name, email, password, usertype, phone, address, exp, active)
  VALUES
    (1, 'all', 'all@gmail.com', '$2b$10$n/EZkwbbVKVpPHw4b0qYJOLsDTdBOkBTE1wUo4gw0a1LfsVRp2MV2', 'user', '12345', '12345', 'empty', ''),
    (2, 'ali', 'ali@gmil.com', '$2b$10$63iZ.g0jIL3nz16SPTzCEuEOCdWfqPoOezNqWHotJQy/45krKTDdO', 'worker', '1234', 'wekd', 'Repair', ''),
    (3, 'ahmed', 'ali@gmil.com', '$2b$10$sNL8S./3yc38L43g3hWdzeTpWzXRaoU3/F9YLYAoHs5CTEtXqy8r.', 'worker', '123', 'jakerta', 'Repair', ''),
    (4, 'mohmed', 'qw@gmail.com', '$2b$10$LBPcGGxAqAHvDNrGbwATY.ul1xtAkwDFF17baB3Y1UWDdDVhd6ZKi', 'worker', '12345', 'jakerta', 'Install', ''),
    (6, 'kk', 'kk@gmail.com', '$2b$10$hf3/D7b9zTeDK9zF40yW3ObEmeBPSV6vlhG.uRb5p874Ipi1r9.Ze', 'worker', '1234', 'jogja', 'Repair', ''),
    (7, 'mohsen', 'awf@gmail.com', '$2b$10$Ezu1UQRg2b6ZEQtyLpnha.gUBl9f5wvQk4v.e5a7OlY9TGvdL7Mbi', 'worker', '123456789', 'jogja', 'Install', ''),
    (8, 'oli', 'ae@gmail.com', '$2b$10$dDDHtQZFYKwE/1r8U4GyUOkFhasHKg2yWofJAggCy.LQJW/jjlG6e', 'worker', '123', 'jakerta', '', ''),
    (9, 'wedj', 'jwedj@gmi.com', '$2b$10$1/bpIMIyAXsAbKkS5Wi8HO8KUbqHwT6KYpvgI0KGesVSpVdxtHt2S', 'worker', '123', 'jakerta', 'Renovate', ''),
    (10, 'mmmm', 'mmmm@gmai.com', '$2b$10$Eva3u4vNoYIjCBEPGVFySu9F.uBwFWYzaCmU5lwNY8imWi4kG9Wg.', 'worker', '1234', 'jakerta', 'Renovate', ''),
    (11, 'qa', 'qq@gmail.com', '$2b$10$ouPjqqsa40KGqNfvjiTuN.zwM2PKJNv6tduXwMjOtRl1wHcUB69py', 'user', '1234', 'jogja', 'empty', ''),
    (13, 'klk', 'ahhh@gmail.com', '$2b$10$G7x4K93lrqZRZG255Li5G.K9vaxEVoKOrgX.4Cke1G.A4kM6AsQCm', 'user', '1234', 'solo', 'empty', ''),
    (14, 'molo', 'koko@gmial.com', '$2b$10$XbSWBHypKgqeoxnDK09IieMmGp27697KVnD6/yTvVfHR/gJD5csEW', 'worker', 'o009090', 'solo', 'Renovate', 'active'),
    (15, 'ahmed ali', 'wew@gmail.com', '$2b$10$lLDO2SN1OPp/bvbNyJbep.0hgx/nTzN.kJolQmHB9iel1ThHdvW.i', 'worker', '1234567', 'jogja', 'Renovate', 'active'),
    (16, 'dheya', 'dheya77@gmail.com', '$2b$10$1bO9opjs8vs1ZxImHjRCHejk2QFs0B0l2HziOYFYTQLkaNN4Ge3cK', 'worker', '12345678', 'solo', 'Repair', 'nonactive');