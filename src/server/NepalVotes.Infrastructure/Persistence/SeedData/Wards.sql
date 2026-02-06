/* Nepal Wards Seed Data 
Targeting 2 Wards for each of the 38 previously created Municipalities.
CreatedBy is set to NULL.
*/

SET IDENTITY_INSERT Wards ON;

-- KOSHI PROVINCE
-- Jhapa (Dist 11) | Mun 101, 102
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (501, 'Birtamod Ward 1', 1, 101, 3, GETDATE(), NULL), (502, 'Birtamod Ward 2', 2, 101, 3, GETDATE(), NULL),
       (503, 'Damak Ward 1', 1, 102, 3, GETDATE(), NULL), (504, 'Damak Ward 2', 2, 102, 3, GETDATE(), NULL);

-- Sunsari (Dist 18) | Mun 103, 104
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (505, 'Itahari Ward 1', 1, 103, 3, GETDATE(), NULL), (506, 'Itahari Ward 2', 2, 103, 3, GETDATE(), NULL),
       (507, 'Dharan Ward 1', 1, 104, 3, GETDATE(), NULL), (508, 'Dharan Ward 2', 2, 104, 3, GETDATE(), NULL);

-- Dhankuta (Dist 9) | Mun 105, 106
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (509, 'Dhankuta Ward 1', 1, 105, 3, GETDATE(), NULL), (510, 'Dhankuta Ward 2', 2, 105, 3, GETDATE(), NULL),
       (511, 'Pakhribas Ward 1', 1, 106, 3, GETDATE(), NULL), (512, 'Pakhribas Ward 2', 2, 106, 3, GETDATE(), NULL);

-- Morang (Dist 13) | Mun 107, 108
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (513, 'Biratnagar Ward 1', 1, 107, 3, GETDATE(), NULL), (514, 'Biratnagar Ward 2', 2, 107, 3, GETDATE(), NULL),
       (515, 'Belbari Ward 1', 1, 108, 3, GETDATE(), NULL), (516, 'Belbari Ward 2', 2, 108, 3, GETDATE(), NULL);


-- MADHESH PROVINCE
-- Dhanusha (Dist 23) | Mun 109, 110
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (517, 'Janakpur Ward 1', 1, 109, 4, GETDATE(), NULL), (518, 'Janakpur Ward 2', 2, 109, 4, GETDATE(), NULL),
       (519, 'Ganeshman Ward 1', 1, 110, 4, GETDATE(), NULL), (520, 'Ganeshman Ward 2', 2, 110, 4, GETDATE(), NULL);

-- Mahottari (Dist 24) | Mun 111, 112
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (521, 'Jaleshwar Ward 1', 1, 111, 4, GETDATE(), NULL), (522, 'Jaleshwar Ward 2', 2, 111, 4, GETDATE(), NULL),
       (523, 'Bardibas Ward 1', 1, 112, 4, GETDATE(), NULL), (524, 'Bardibas Ward 2', 2, 112, 4, GETDATE(), NULL);

-- Parsa (Dist 25) | Mun 113, 114
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (525, 'Birgunj Ward 1', 1, 113, 4, GETDATE(), NULL), (526, 'Birgunj Ward 2', 2, 113, 4, GETDATE(), NULL),
       (527, 'Pokhariya Ward 1', 1, 114, 4, GETDATE(), NULL), (528, 'Pokhariya Ward 2', 2, 114, 4, GETDATE(), NULL);

-- Saptari (Dist 27) | Mun 115, 116
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (529, 'Rajbiraj Ward 1', 1, 115, 4, GETDATE(), NULL), (530, 'Rajbiraj Ward 2', 2, 115, 4, GETDATE(), NULL),
       (531, 'Kanchanrup Ward 1', 1, 116, 4, GETDATE(), NULL), (532, 'Kanchanrup Ward 2', 2, 116, 4, GETDATE(), NULL);

-- Sarlahi (Dist 28) | Mun 117, 118
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (533, 'Malangwa Ward 1', 1, 117, 4, GETDATE(), NULL), (534, 'Malangwa Ward 2', 2, 117, 4, GETDATE(), NULL),
       (535, 'Lalbandi Ward 1', 1, 118, 4, GETDATE(), NULL), (536, 'Lalbandi Ward 2', 2, 118, 4, GETDATE(), NULL);


-- BAGMATI PROVINCE
-- Bhaktapur (Dist 30) | Mun 119, 120
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (537, 'Bhaktapur Ward 1', 1, 119, 1, GETDATE(), NULL), (538, 'Bhaktapur Ward 2', 2, 119, 1, GETDATE(), NULL),
       (539, 'Thimi Ward 1', 1, 120, 1, GETDATE(), NULL), (540, 'Thimi Ward 2', 2, 120, 1, GETDATE(), NULL);

-- Chitwan (Dist 31) | Mun 121, 122
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (541, 'Bharatpur Ward 1', 1, 121, 4, GETDATE(), NULL), (542, 'Bharatpur Ward 2', 2, 121, 4, GETDATE(), NULL),
       (543, 'Ratnanagar Ward 1', 1, 122, 4, GETDATE(), NULL), (544, 'Ratnanagar Ward 2', 2, 122, 4, GETDATE(), NULL);

-- Kathmandu (Dist 34) | Mun 123, 124
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (545, 'KMC Ward 1', 1, 123, 1, GETDATE(), NULL), (546, 'KMC Ward 2', 2, 123, 1, GETDATE(), NULL),
       (547, 'Budhanilkantha Ward 1', 1, 124, 2, GETDATE(), NULL), (548, 'Budhanilkantha Ward 2', 2, 124, 2, GETDATE(), NULL);

-- Lalitpur (Dist 36) | Mun 125, 126
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (549, 'LMC Ward 1', 1, 125, 1, GETDATE(), NULL), (550, 'LMC Ward 2', 2, 125, 1, GETDATE(), NULL),
       (551, 'Godawari Ward 1', 1, 126, 1, GETDATE(), NULL), (552, 'Godawari Ward 2', 2, 126, 1, GETDATE(), NULL);


-- GANDAKI PROVINCE
-- Kaski (Dist 45) | Mun 127, 128
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (553, 'Pokhara Ward 1', 1, 127, 5, GETDATE(), NULL), (554, 'Pokhara Ward 2', 2, 127, 5, GETDATE(), NULL),
       (555, 'Annapurna Ward 1', 1, 128, 5, GETDATE(), NULL), (556, 'Annapurna Ward 2', 2, 128, 5, GETDATE(), NULL);

-- Syangja (Dist 52) | Mun 129, 130
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (557, 'Putalibazar Ward 1', 1, 129, 5, GETDATE(), NULL), (558, 'Putalibazar Ward 2', 2, 129, 5, GETDATE(), NULL),
       (559, 'Waling Ward 1', 1, 130, 5, GETDATE(), NULL), (560, 'Waling Ward 2', 2, 130, 5, GETDATE(), NULL);


-- LUMBINI PROVINCE
-- Dang (Dist 57) | Mun 131, 132
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (561, 'Ghorahi Ward 1', 1, 131, 6, GETDATE(), NULL), (562, 'Ghorahi Ward 2', 2, 131, 6, GETDATE(), NULL),
       (563, 'Tulsipur Ward 1', 1, 132, 6, GETDATE(), NULL), (564, 'Tulsipur Ward 2', 2, 132, 6, GETDATE(), NULL);

-- Rupandehi (Dist 64) | Mun 133, 134
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (565, 'Butwal Ward 1', 1, 133, 6, GETDATE(), NULL), (566, 'Butwal Ward 2', 2, 133, 6, GETDATE(), NULL),
       (567, 'Siddharthanagar Ward 1', 1, 134, 6, GETDATE(), NULL), (568, 'Siddharthanagar Ward 2', 2, 134, 6, GETDATE(), NULL);


-- KARNALI PROVINCE
-- Dolpa (Dist 67) | Mun 135, 136
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (569, 'Thuli Bheri Ward 1', 1, 135, 8, GETDATE(), NULL), (570, 'Thuli Bheri Ward 2', 2, 135, 8, GETDATE(), NULL),
       (571, 'Tripurasundari Ward 1', 1, 136, 8, GETDATE(), NULL), (572, 'Tripurasundari Ward 2', 2, 136, 8, GETDATE(), NULL);

-- Jajarkot (Dist 69) | Mun 137, 138
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (573, 'Bheri Ward 1', 1, 137, 8, GETDATE(), NULL), (574, 'Bheri Ward 2', 2, 137, 8, GETDATE(), NULL),
       (575, 'Chhedagad Ward 1', 1, 138, 8, GETDATE(), NULL), (576, 'Chhedagad Ward 2', 2, 138, 8, GETDATE(), NULL);


-- SUDURPASHCHIM PROVINCE
-- Dadeldhura (Dist 80) | Mun 139, 140
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (577, 'Amargadhi Ward 1', 1, 139, 7, GETDATE(), NULL), (578, 'Amargadhi Ward 2', 2, 139, 7, GETDATE(), NULL),
       (579, 'Parshuram Ward 1', 1, 140, 7, GETDATE(), NULL), (580, 'Parshuram Ward 2', 2, 140, 7, GETDATE(), NULL);

-- Kailali (Dist 83) | Mun 141, 142
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (581, 'Dhangadhi Ward 1', 1, 141, 7, GETDATE(), NULL), (582, 'Dhangadhi Ward 2', 2, 141, 7, GETDATE(), NULL),
       (583, 'Tikapur Ward 1', 1, 142, 7, GETDATE(), NULL), (584, 'Tikapur Ward 2', 2, 142, 7, GETDATE(), NULL);

-- Kanchanpur (Dist 84) | Mun 143, 144
INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
       (585, 'Bhimdatta Ward 1', 1, 143, 7, GETDATE(), NULL), (586, 'Bhimdatta Ward 2', 2, 143, 7, GETDATE(), NULL),
       (587, 'Bedkot Ward 1', 1, 144, 7, GETDATE(), NULL), (588, 'Bedkot Ward 2', 2, 144, 7, GETDATE(), NULL);





-- --------------------------------------------------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO Wards (WardId, WardName, WardNumber, MunicipalityId, ConstituencyId, CreatedAt, CreatedBy) VALUES
-- Damak Municipality (ID: 29) - 10 Wards
(1, 'Ward 1', 1, 29, NULL, GETDATE(), NULL),
(2, 'Ward 2', 2, 29, NULL, GETDATE(), NULL),
(3, 'Ward 3', 3, 29, NULL, GETDATE(), NULL),
(4, 'Ward 4', 4, 29, NULL, GETDATE(), NULL),
(5, 'Ward 5', 5, 29, NULL, GETDATE(), NULL),
(6, 'Ward 6', 6, 29, NULL, GETDATE(), NULL),
(7, 'Ward 7', 7, 29, NULL, GETDATE(), NULL),
(8, 'Ward 8', 8, 29, NULL, GETDATE(), NULL),
(9, 'Ward 9', 9, 29, NULL, GETDATE(), NULL),
(10, 'Ward 10', 10, 29, NULL, GETDATE(), NULL),

-- Dharan Sub-Metropolitan City (ID: 104) - 20 Wards
(11, 'Ward 1', 1, 104, NULL, GETDATE(), NULL),
(12, 'Ward 2', 2, 104, NULL, GETDATE(), NULL),
(13, 'Ward 3', 3, 104, NULL, GETDATE(), NULL),
(14, 'Ward 4', 4, 104, NULL, GETDATE(), NULL),
(15, 'Ward 5', 5, 104, NULL, GETDATE(), NULL),
(16, 'Ward 6', 6, 104, NULL, GETDATE(), NULL),
(17, 'Ward 7', 7, 104, NULL, GETDATE(), NULL),
(18, 'Ward 8', 8, 104, NULL, GETDATE(), NULL),
(19, 'Ward 9', 9, 104, NULL, GETDATE(), NULL),
(20, 'Ward 10', 10, 104, NULL, GETDATE(), NULL),
(21, 'Ward 11', 11, 104, NULL, GETDATE(), NULL),
(22, 'Ward 12', 12, 104, NULL, GETDATE(), NULL),
(23, 'Ward 13', 13, 104, NULL, GETDATE(), NULL),
(24, 'Ward 14', 14, 104, NULL, GETDATE(), NULL),
(25, 'Ward 15', 15, 104, NULL, GETDATE(), NULL),
(26, 'Ward 16', 16, 104, NULL, GETDATE(), NULL),
(27, 'Ward 17', 17, 104, NULL, GETDATE(), NULL),
(28, 'Ward 18', 18, 104, NULL, GETDATE(), NULL),
(29, 'Ward 19', 19, 104, NULL, GETDATE(), NULL),
(30, 'Ward 20', 20, 104, NULL, GETDATE(), NULL),

-- Kathmandu Metropolitan City (ID: 218) - 32 Wards
(31, 'Ward 1', 1, 218, NULL, GETDATE(), NULL),
(32, 'Ward 2', 2, 218, NULL, GETDATE(), NULL),
(33, 'Ward 3', 3, 218, NULL, GETDATE(), NULL),
(34, 'Ward 4', 4, 218, NULL, GETDATE(), NULL),
(35, 'Ward 5', 5, 218, NULL, GETDATE(), NULL),
(36, 'Ward 6', 6, 218, NULL, GETDATE(), NULL),
(37, 'Ward 7', 7, 218, NULL, GETDATE(), NULL),
(38, 'Ward 8', 8, 218, NULL, GETDATE(), NULL),
(39, 'Ward 9', 9, 218, NULL, GETDATE(), NULL),
(40, 'Ward 10', 10, 218, NULL, GETDATE(), NULL),
(41, 'Ward 11', 11, 218, NULL, GETDATE(), NULL),
(42, 'Ward 12', 12, 218, NULL, GETDATE(), NULL),
(43, 'Ward 13', 13, 218, NULL, GETDATE(), NULL),
(44, 'Ward 14', 14, 218, NULL, GETDATE(), NULL),
(45, 'Ward 15', 15, 218, NULL, GETDATE(), NULL),
(46, 'Ward 16', 16, 218, NULL, GETDATE(), NULL),
(47, 'Ward 17', 17, 218, NULL, GETDATE(), NULL),
(48, 'Ward 18', 18, 218, NULL, GETDATE(), NULL),
(49, 'Ward 19', 19, 218, NULL, GETDATE(), NULL),
(50, 'Ward 20', 20, 218, NULL, GETDATE(), NULL),
(51, 'Ward 21', 21, 218, NULL, GETDATE(), NULL),
(52, 'Ward 22', 22, 218, NULL, GETDATE(), NULL),
(53, 'Ward 23', 23, 218, NULL, GETDATE(), NULL),
(54, 'Ward 24', 24, 218, NULL, GETDATE(), NULL),
(55, 'Ward 25', 25, 218, NULL, GETDATE(), NULL),
(56, 'Ward 26', 26, 218, NULL, GETDATE(), NULL),
(57, 'Ward 27', 27, 218, NULL, GETDATE(), NULL),
(58, 'Ward 28', 28, 218, NULL, GETDATE(), NULL),
(59, 'Ward 29', 29, 218, NULL, GETDATE(), NULL),
(60, 'Ward 30', 30, 218, NULL, GETDATE(), NULL),
(61, 'Ward 31', 31, 218, NULL, GETDATE(), NULL),
(62, 'Ward 32', 32, 218, NULL, GETDATE(), NULL),

-- Kirtipur Municipality (ID: 219) - 10 Wards
(63, 'Ward 1', 1, 219, NULL, GETDATE(), NULL),
(64, 'Ward 2', 2, 219, NULL, GETDATE(), NULL),
(65, 'Ward 3', 3, 219, NULL, GETDATE(), NULL),
(66, 'Ward 4', 4, 219, NULL, GETDATE(), NULL),
(67, 'Ward 5', 5, 219, NULL, GETDATE(), NULL),
(68, 'Ward 6', 6, 219, NULL, GETDATE(), NULL),
(69, 'Ward 7', 7, 219, NULL, GETDATE(), NULL),
(70, 'Ward 8', 8, 219, NULL, GETDATE(), NULL),
(71, 'Ward 9', 9, 219, NULL, GETDATE(), NULL),
(72, 'Ward 10', 10, 219, NULL, GETDATE(), NULL),

-- Gokarneshwar Municipality (ID: 220) - 9 Wards
(73, 'Ward 1', 1, 220, NULL, GETDATE(), NULL),
(74, 'Ward 2', 2, 220, NULL, GETDATE(), NULL),
(75, 'Ward 3', 3, 220, NULL, GETDATE(), NULL),
(76, 'Ward 4', 4, 220, NULL, GETDATE(), NULL),
(77, 'Ward 5', 5, 220, NULL, GETDATE(), NULL),
(78, 'Ward 6', 6, 220, NULL, GETDATE(), NULL),
(79, 'Ward 7', 7, 220, NULL, GETDATE(), NULL),
(80, 'Ward 8', 8, 220, NULL, GETDATE(), NULL),
(81, 'Ward 9', 9, 220, NULL, GETDATE(), NULL),

-- Budhanilkantha Municipality (ID: 221) - 13 Wards
(82, 'Ward 1', 1, 221, NULL, GETDATE(), NULL),
(83, 'Ward 2', 2, 221, NULL, GETDATE(), NULL),
(84, 'Ward 3', 3, 221, NULL, GETDATE(), NULL),
(85, 'Ward 4', 4, 221, NULL, GETDATE(), NULL),
(86, 'Ward 5', 5, 221, NULL, GETDATE(), NULL),
(87, 'Ward 6', 6, 221, NULL, GETDATE(), NULL),
(88, 'Ward 7', 7, 221, NULL, GETDATE(), NULL),
(89, 'Ward 8', 8, 221, NULL, GETDATE(), NULL),
(90, 'Ward 9', 9, 221, NULL, GETDATE(), NULL),
(91, 'Ward 10', 10, 221, NULL, GETDATE(), NULL),
(92, 'Ward 11', 11, 221, NULL, GETDATE(), NULL),
(93, 'Ward 12', 12, 221, NULL, GETDATE(), NULL),
(94, 'Ward 13', 13, 221, NULL, GETDATE(), NULL),

-- Nagarjun Municipality (ID: 225) - 10 Wards
(95, 'Ward 1', 1, 225, NULL, GETDATE(), NULL),
(96, 'Ward 2', 2, 225, NULL, GETDATE(), NULL),
(97, 'Ward 3', 3, 225, NULL, GETDATE(), NULL),
(98, 'Ward 4', 4, 225, NULL, GETDATE(), NULL),
(99, 'Ward 5', 5, 225, NULL, GETDATE(), NULL),
(100, 'Ward 6', 6, 225, NULL, GETDATE(), NULL),
(101, 'Ward 7', 7, 225, NULL, GETDATE(), NULL),
(102, 'Ward 8', 8, 225, NULL, GETDATE(), NULL),
(103, 'Ward 9', 9, 225, NULL, GETDATE(), NULL),
(104, 'Ward 10', 10, 225, NULL, GETDATE(), NULL),

-- Lalitpur Metropolitan City (ID: 235) - 29 Wards
(105, 'Ward 1', 1, 235, NULL, GETDATE(), NULL),
(106, 'Ward 2', 2, 235, NULL, GETDATE(), NULL),
(107, 'Ward 3', 3, 235, NULL, GETDATE(), NULL),
(108, 'Ward 4', 4, 235, NULL, GETDATE(), NULL),
(109, 'Ward 5', 5, 235, NULL, GETDATE(), NULL),
(110, 'Ward 6', 6, 235, NULL, GETDATE(), NULL),
(111, 'Ward 7', 7, 235, NULL, GETDATE(), NULL),
(112, 'Ward 8', 8, 235, NULL, GETDATE(), NULL),
(113, 'Ward 9', 9, 235, NULL, GETDATE(), NULL),
(114, 'Ward 10', 10, 235, NULL, GETDATE(), NULL),
(115, 'Ward 11', 11, 235, NULL, GETDATE(), NULL),
(116, 'Ward 12', 12, 235, NULL, GETDATE(), NULL),
(117, 'Ward 13', 13, 235, NULL, GETDATE(), NULL),
(118, 'Ward 14', 14, 235, NULL, GETDATE(), NULL),
(119, 'Ward 15', 15, 235, NULL, GETDATE(), NULL),
(120, 'Ward 16', 16, 235, NULL, GETDATE(), NULL),
(121, 'Ward 17', 17, 235, NULL, GETDATE(), NULL),
(122, 'Ward 18', 18, 235, NULL, GETDATE(), NULL),
(123, 'Ward 19', 19, 235, NULL, GETDATE(), NULL),
(124, 'Ward 20', 20, 235, NULL, GETDATE(), NULL),
(125, 'Ward 21', 21, 235, NULL, GETDATE(), NULL),
(126, 'Ward 22', 22, 235, NULL, GETDATE(), NULL),
(127, 'Ward 23', 23, 235, NULL, GETDATE(), NULL),
(128, 'Ward 24', 24, 235, NULL, GETDATE(), NULL),
(129, 'Ward 25', 25, 235, NULL, GETDATE(), NULL),
(130, 'Ward 26', 26, 235, NULL, GETDATE(), NULL),
(131, 'Ward 27', 27, 235, NULL, GETDATE(), NULL),
(132, 'Ward 28', 28, 235, NULL, GETDATE(), NULL),
(133, 'Ward 29', 29, 235, NULL, GETDATE(), NULL),

-- Pokhara Metropolitan City (ID: 268) - 33 Wards
(134, 'Ward 1', 1, 268, NULL, GETDATE(), NULL),
(135, 'Ward 2', 2, 268, NULL, GETDATE(), NULL),
(136, 'Ward 3', 3, 268, NULL, GETDATE(), NULL),
(137, 'Ward 4', 4, 268, NULL, GETDATE(), NULL),
(138, 'Ward 5', 5, 268, NULL, GETDATE(), NULL),
(139, 'Ward 6', 6, 268, NULL, GETDATE(), NULL),
(140, 'Ward 7', 7, 268, NULL, GETDATE(), NULL),
(141, 'Ward 8', 8, 268, NULL, GETDATE(), NULL),
(142, 'Ward 9', 9, 268, NULL, GETDATE(), NULL),
(143, 'Ward 10', 10, 268, NULL, GETDATE(), NULL),
(144, 'Ward 11', 11, 268, NULL, GETDATE(), NULL),
(145, 'Ward 12', 12, 268, NULL, GETDATE(), NULL),
(146, 'Ward 13', 13, 268, NULL, GETDATE(), NULL),
(147, 'Ward 14', 14, 268, NULL, GETDATE(), NULL),
(148, 'Ward 15', 15, 268, NULL, GETDATE(), NULL),
(149, 'Ward 16', 16, 268, NULL, GETDATE(), NULL),
(150, 'Ward 17', 17, 268, NULL, GETDATE(), NULL),
(151, 'Ward 18', 18, 268, NULL, GETDATE(), NULL),
(152, 'Ward 19', 19, 268, NULL, GETDATE(), NULL),
(153, 'Ward 20', 20, 268, NULL, GETDATE(), NULL),
(154, 'Ward 21', 21, 268, NULL, GETDATE(), NULL),
(155, 'Ward 22', 22, 268, NULL, GETDATE(), NULL),
(156, 'Ward 23', 23, 268, NULL, GETDATE(), NULL),
(157, 'Ward 24', 24, 268, NULL, GETDATE(), NULL),
(158, 'Ward 25', 25, 268, NULL, GETDATE(), NULL),
(159, 'Ward 26', 26, 268, NULL, GETDATE(), NULL),
(160, 'Ward 27', 27, 268, NULL, GETDATE(), NULL),
(161, 'Ward 28', 28, 268, NULL, GETDATE(), NULL),
(162, 'Ward 29', 29, 268, NULL, GETDATE(), NULL),
(163, 'Ward 30', 30, 268, NULL, GETDATE(), NULL),
(164, 'Ward 31', 31, 268, NULL, GETDATE(), NULL),
(165, 'Ward 32', 32, 268, NULL, GETDATE(), NULL),
(166, 'Ward 33', 33, 268, NULL, GETDATE(), NULL),

-- Bhaktapur Municipality (ID: 198) - 10 Wards
(167, 'Ward 1', 1, 198, NULL, GETDATE(), NULL),
(168, 'Ward 2', 2, 198, NULL, GETDATE(), NULL),
(169, 'Ward 3', 3, 198, NULL, GETDATE(), NULL),
(170, 'Ward 4', 4, 198, NULL, GETDATE(), NULL),
(171, 'Ward 5', 5, 198, NULL, GETDATE(), NULL),
(172, 'Ward 6', 6, 198, NULL, GETDATE(), NULL),
(173, 'Ward 7', 7, 198, NULL, GETDATE(), NULL),
(174, 'Ward 8', 8, 198, NULL, GETDATE(), NULL),
(175, 'Ward 9', 9, 198, NULL, GETDATE(), NULL),
(176, 'Ward 10', 10, 198, NULL, GETDATE(), NULL);