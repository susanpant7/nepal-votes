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