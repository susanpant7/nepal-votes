SET IDENTITY_INSERT Provinces ON;

-- 1. PROVINCES (All 7)
INSERT INTO Provinces (ProvinceId, ProvinceName, CreatedAt, CreatedBy) VALUES
(1,'Koshi Province', GETDATE(), NULL),
(2,'Madhesh Province', GETDATE(), NULL),
(3,'Bagmati Province', GETDATE(), NULL),
(4,'Gandaki Province', GETDATE(), NULL),
(5,'Lumbini Province', GETDATE(), NULL),
(6,'Karnali Province', GETDATE(), NULL),
(7,'Sudurpashchim Province', GETDATE(), NULL);

SET IDENTITY_INSERT Provinces OFF;

-- 2. DISTRICTS (All 77)
-- Koshi Province (ID: 1)
INSERT INTO Districts (DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
('Bhojpur', 1, GETDATE(), NULL), ('Dhankuta', 1, GETDATE(), NULL), ('Ilam', 1, GETDATE(), NULL),
('Jhapa', 1, GETDATE(), NULL), ('Khotang', 1, GETDATE(), NULL), ('Morang', 1, GETDATE(), NULL),
('Okhaldhunga', 1, GETDATE(), NULL), ('Panchthar', 1, GETDATE(), NULL), ('Sankhuwasabha', 1, GETDATE(), NULL),
('Solukhumbu', 1, GETDATE(), NULL), ('Sunsari', 1, GETDATE(), NULL), ('Taplejung', 1, GETDATE(), NULL),
('Tehrathum', 1, GETDATE(), NULL), ('Udayapur', 1, GETDATE(), NULL);

-- Madhesh Province (ID: 2)
INSERT INTO Districts (DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
('Bara', 2, GETDATE(), NULL), ('Dhanusha', 2, GETDATE(), NULL), ('Mahottari', 2, GETDATE(), NULL),
('Parsa', 2, GETDATE(), NULL), ('Rautahat', 2, GETDATE(), NULL), ('Saptari', 2, GETDATE(), NULL),
('Sarlahi', 2, GETDATE(), NULL), ('Siraha', 2, GETDATE(), NULL);

-- Bagmati Province (ID: 3)
INSERT INTO Districts (DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
('Bhaktapur', 3, GETDATE(), NULL), ('Chitwan', 3, GETDATE(), NULL), ('Dhading', 3, GETDATE(), NULL),
('Dolakha', 3, GETDATE(), NULL), ('Kathmandu', 3, GETDATE(), NULL), ('Kavrepalanchok', 3, GETDATE(), NULL),
('Lalitpur', 3, GETDATE(), NULL), ('Makwanpur', 3, GETDATE(), NULL), ('Nuwakot', 3, GETDATE(), NULL),
('Ramechhap', 3, GETDATE(), NULL), ('Rasuwa', 3, GETDATE(), NULL), ('Sindhuli', 3, GETDATE(), NULL),
('Sindhupalchok', 3, GETDATE(), NULL);

-- Gandaki Province (ID: 4)
INSERT INTO Districts (DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
('Baglung', 4, GETDATE(), NULL), ('Gorkha', 4, GETDATE(), NULL), ('Kaski', 4, GETDATE(), NULL),
('Lamjung', 4, GETDATE(), NULL), ('Manang', 4, GETDATE(), NULL), ('Mustang', 4, GETDATE(), NULL),
('Myagdi', 4, GETDATE(), NULL), ('Nawalpur', 4, GETDATE(), NULL), ('Parbat', 4, GETDATE(), NULL),
('Syangja', 4, GETDATE(), NULL), ('Tanahun', 4, GETDATE(), NULL);

-- Lumbini Province (ID: 5)
INSERT INTO Districts (DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
('Arghakhanchi', 5, GETDATE(), NULL), ('Banke', 5, GETDATE(), NULL), ('Bardiya', 5, GETDATE(), NULL),
('Dang', 5, GETDATE(), NULL), ('Gulmi', 5, GETDATE(), NULL), ('Kapilvastu', 5, GETDATE(), NULL),
('Parasi', 5, GETDATE(), NULL), ('Palpa', 5, GETDATE(), NULL), ('Pyuthan', 5, GETDATE(), NULL),
('Rolpa', 5, GETDATE(), NULL), ('Rupandehi', 5, GETDATE(), NULL), ('Eastern Rukum', 5, GETDATE(), NULL);

-- Karnali Province (ID: 6)
INSERT INTO Districts (DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
('Dailekh', 6, GETDATE(), NULL), ('Dolpa', 6, GETDATE(), NULL), ('Humla', 6, GETDATE(), NULL),
('Jajarkot', 6, GETDATE(), NULL), ('Jumla', 6, GETDATE(), NULL), ('Kalikot', 6, GETDATE(), NULL),
('Mugu', 6, GETDATE(), NULL), ('Salyan', 6, GETDATE(), NULL), ('Surkhet', 6, GETDATE(), NULL),
('Western Rukum', 6, GETDATE(), NULL);

-- Sudurpashchim Province (ID: 7)
INSERT INTO Districts (DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
('Achham', 7, GETDATE(), NULL), ('Baitadi', 7, GETDATE(), NULL), ('Bajhang', 7, GETDATE(), NULL),
('Bajura', 7, GETDATE(), NULL), ('Dadeldhura', 7, GETDATE(), NULL), ('Darchula', 7, GETDATE(), NULL),
('Doti', 7, GETDATE(), NULL), ('Kailali', 7, GETDATE(), NULL), ('Kanchanpur', 7, GETDATE(), NULL);
