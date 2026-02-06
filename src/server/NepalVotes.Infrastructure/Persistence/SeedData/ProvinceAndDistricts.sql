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
INSERT INTO Districts (DistrictId, DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
(1, 'Bhojpur', 1, GETDATE(), NULL), (2, 'Dhankuta', 1, GETDATE(), NULL), (3, 'Ilam', 1, GETDATE(), NULL),
(4, 'Jhapa', 1, GETDATE(), NULL), (5, 'Khotang', 1, GETDATE(), NULL), (6, 'Morang', 1, GETDATE(), NULL),
(7, 'Okhaldhunga', 1, GETDATE(), NULL), (8, 'Panchthar', 1, GETDATE(), NULL), (9, 'Sankhuwasabha', 1, GETDATE(), NULL),
(10, 'Solukhumbu', 1, GETDATE(), NULL), (11, 'Sunsari', 1, GETDATE(), NULL), (12, 'Taplejung', 1, GETDATE(), NULL),
(13, 'Tehrathum', 1, GETDATE(), NULL), (14, 'Udayapur', 1, GETDATE(), NULL);

-- Madhesh Province (ID: 2)
INSERT INTO Districts (DistrictId, DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
(15, 'Bara', 2, GETDATE(), NULL), (16, 'Dhanusha', 2, GETDATE(), NULL), (17, 'Mahottari', 2, GETDATE(), NULL),
(18, 'Parsa', 2, GETDATE(), NULL), (19, 'Rautahat', 2, GETDATE(), NULL), (20, 'Saptari', 2, GETDATE(), NULL),
(21, 'Sarlahi', 2, GETDATE(), NULL), (22, 'Siraha', 2, GETDATE(), NULL);

-- Bagmati Province (ID: 3)
INSERT INTO Districts (DistrictId, DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
(23, 'Bhaktapur', 3, GETDATE(), NULL), (24, 'Chitwan', 3, GETDATE(), NULL), (25, 'Dhading', 3, GETDATE(), NULL),
(26, 'Dolakha', 3, GETDATE(), NULL), (27, 'Kathmandu', 3, GETDATE(), NULL), (28, 'Kavrepalanchok', 3, GETDATE(), NULL),
(29, 'Lalitpur', 3, GETDATE(), NULL), (30, 'Makwanpur', 3, GETDATE(), NULL), (31, 'Nuwakot', 3, GETDATE(), NULL),
(32, 'Ramechhap', 3, GETDATE(), NULL), (33, 'Rasuwa', 3, GETDATE(), NULL), (34, 'Sindhuli', 3, GETDATE(), NULL),
(35, 'Sindhupalchok', 3, GETDATE(), NULL);

-- Gandaki Province (ID: 4)
INSERT INTO Districts (DistrictId, DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
(36, 'Baglung', 4, GETDATE(), NULL), (37, 'Gorkha', 4, GETDATE(), NULL), (38, 'Kaski', 4, GETDATE(), NULL),
(39, 'Lamjung', 4, GETDATE(), NULL), (40, 'Manang', 4, GETDATE(), NULL), (41, 'Mustang', 4, GETDATE(), NULL),
(42, 'Myagdi', 4, GETDATE(), NULL), (43, 'Nawalpur', 4, GETDATE(), NULL), (44, 'Parbat', 4, GETDATE(), NULL),
(45, 'Syangja', 4, GETDATE(), NULL), (46, 'Tanahun', 4, GETDATE(), NULL);

-- Lumbini Province (ID: 5)
INSERT INTO Districts (DistrictId, DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
(47, 'Arghakhanchi', 5, GETDATE(), NULL), (48, 'Banke', 5, GETDATE(), NULL), (49, 'Bardiya', 5, GETDATE(), NULL),
(50, 'Dang', 5, GETDATE(), NULL), (51, 'Gulmi', 5, GETDATE(), NULL), (52, 'Kapilvastu', 5, GETDATE(), NULL),
(53, 'Parasi', 5, GETDATE(), NULL), (54, 'Palpa', 5, GETDATE(), NULL), (55, 'Pyuthan', 5, GETDATE(), NULL),
(56, 'Rolpa', 5, GETDATE(), NULL), (57, 'Rupandehi', 5, GETDATE(), NULL), (58, 'Eastern Rukum', 5, GETDATE(), NULL);

-- Karnali Province (ID: 6)
INSERT INTO Districts (DistrictId, DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
(59, 'Dailekh', 6, GETDATE(), NULL), (60, 'Dolpa', 6, GETDATE(), NULL), (61, 'Humla', 6, GETDATE(), NULL),
(62, 'Jajarkot', 6, GETDATE(), NULL), (63, 'Jumla', 6, GETDATE(), NULL), (64, 'Kalikot', 6, GETDATE(), NULL),
(65, 'Mugu', 6, GETDATE(), NULL), (66, 'Salyan', 6, GETDATE(), NULL), (67, 'Surkhet', 6, GETDATE(), NULL),
(68, 'Western Rukum', 6, GETDATE(), NULL);

-- Sudurpashchim Province (ID: 7)
INSERT INTO Districts (DistrictId, DistrictName, ProvinceId, CreatedAt, CreatedBy) VALUES
(69, 'Achham', 7, GETDATE(), NULL), (70, 'Baitadi', 7, GETDATE(), NULL), (71, 'Bajhang', 7, GETDATE(), NULL),
(72, 'Bajura', 7, GETDATE(), NULL), (73, 'Dadeldhura', 7, GETDATE(), NULL), (74, 'Darchula', 7, GETDATE(), NULL),
(75, 'Doti', 7, GETDATE(), NULL), (76, 'Kailali', 7, GETDATE(), NULL), (77, 'Kanchanpur', 7, GETDATE(), NULL);
