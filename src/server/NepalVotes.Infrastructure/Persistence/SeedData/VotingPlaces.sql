/* Nepal Voting Places Seed Data 
   Targeting 2 Voting Places for each of the 76 Wards (IDs 501 - 576).
   CreatedBy is set to NULL.
*/
SET IDENTITY_INSERT VotingPlaces ON;

-- KOSHI PROVINCE (Jhapa, Sunsari, Dhankuta, Morang)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
-- Birtamod (Wards 501, 502)
('Birtamod Secondary School, Ward 1', 501, GETDATE(), NULL), ('Ward 1 Community Building', 501, GETDATE(), NULL),
('Saraswati Mavisha, Ward 2', 502, GETDATE(), NULL), ('Birtamod Health Post Center', 502, GETDATE(), NULL),
-- Damak (Wards 503, 504)
('Damak Campus South Wing', 503, GETDATE(), NULL), ('Himalaya Secondary School', 503, GETDATE(), NULL),
('Model Secondary School, Damak', 504, GETDATE(), NULL), ('Damak Municipality Hall', 504, GETDATE(), NULL),
-- Itahari (Wards 505, 506)
('Janta Higher Secondary School', 505, GETDATE(), NULL), ('Itahari Hospital Premises', 505, GETDATE(), NULL),
('Kasturi College Block A', 506, GETDATE(), NULL), ('Ward 2 Public Library', 506, GETDATE(), NULL),
-- Dharan (Wards 507, 508)
('BP Koirala Institute North Gate', 507, GETDATE(), NULL), ('Shanti Niketan School', 507, GETDATE(), NULL),
('Public High School Dharan', 508, GETDATE(), NULL), ('Dharan Sabha Griha', 508, GETDATE(), NULL),
-- Dhankuta (Wards 509, 510)
('Dhankuta Multiple Campus', 509, GETDATE(), NULL), ('Gokundeshwar School', 509, GETDATE(), NULL),
('Bhasha Primary School', 510, GETDATE(), NULL), ('District Post Office Hall', 510, GETDATE(), NULL),
-- Biratnagar (Wards 513, 514)
('Adarsha Higher Secondary School', 513, GETDATE(), NULL), ('Biratnagar City Hall', 513, GETDATE(), NULL),
('Sagarmatha Secondary School', 514, GETDATE(), NULL), ('Morang District Court Area', 514, GETDATE(), NULL);

-- BAGMATI PROVINCE (Kathmandu, Lalitpur, Bhaktapur, Chitwan)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
-- Kathmandu (Wards 545, 546)
('Nandi Secondary School, Naxal', 545, GETDATE(), NULL), ('City Hall (Rashtriya Sabha Griha)', 545, GETDATE(), NULL),
('Siddhartha Vanasthali Institute', 546, GETDATE(), NULL), ('Padmodaya Secondary School', 546, GETDATE(), NULL),
-- Budhanilkantha (Wards 547, 548)
('Budhanilkantha School Gate 2', 547, GETDATE(), NULL), ('Ward 1 Ward Office Building', 547, GETDATE(), NULL),
('Ganeshman Singh Memorial Hospital', 548, GETDATE(), NULL), ('Deurali Public School', 548, GETDATE(), NULL),
-- Lalitpur (Wards 549, 550)
('Patan High School', 549, GETDATE(), NULL), ('Lalitpur Metropolitan Building', 549, GETDATE(), NULL),
('Adarsha Kanya Niketan', 550, GETDATE(), NULL), ('Pulchowk Engineering Campus', 550, GETDATE(), NULL),
-- Bharatpur (Wards 541, 542)
('Chitwan High School, Bharatpur', 541, GETDATE(), NULL), ('Bharatpur Hospital Block B', 541, GETDATE(), NULL),
('Birendra Multiple Campus', 542, GETDATE(), NULL), ('Bharatpur Ward 2 Community Hall', 542, GETDATE(), NULL);

-- GANDAKI PROVINCE (Kaski, Syangja)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
-- Pokhara (Wards 553, 554)
('Pokhara Exhibition Centre', 553, GETDATE(), NULL), ('Gandaki Boarding School', 553, GETDATE(), NULL),
('Prithvi Narayan Campus Block C', 554, GETDATE(), NULL), ('Kaski District Administration Office', 554, GETDATE(), NULL),
-- Waling (Wards 559, 560)
('Waling Multiple Campus', 559, GETDATE(), NULL), ('Purna Amrit Secondary School', 559, GETDATE(), NULL),
('Waling Primary Health Center', 560, GETDATE(), NULL), ('Ward 2 Agriculture Office', 560, GETDATE(), NULL);

-- LUMBINI PROVINCE (Dang, Rupandehi)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
-- Butwal (Wards 565, 566)
('Butwal Multiple Campus', 565, GETDATE(), NULL), ('Kanti Secondary School', 565, GETDATE(), NULL),
('Lumbini Provincial Hospital Premises', 566, GETDATE(), NULL), ('Butwal Public Library', 566, GETDATE(), NULL),
-- Ghorahi (Wards 561, 562)
('Mahendra Multiple Campus Ghorahi', 561, GETDATE(), NULL), ('Padmodaya Public Mavisha', 561, GETDATE(), NULL),
('Ghorahi Ward 2 Primary School', 562, GETDATE(), NULL), ('Dang District Post Office', 562, GETDATE(), NULL);

-- SUDURPASHCHIM PROVINCE (Dadeldhura, Kailali, Kanchanpur)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
-- Dhangadhi (Wards 581, 582)
('Kailali Multiple Campus', 581, GETDATE(), NULL), ('Dhangadhi City Hall', 581, GETDATE(), NULL),
('Seti Provincial Hospital Hall', 582, GETDATE(), NULL), ('Dhangadhi Ward 2 Office', 582, GETDATE(), NULL),
-- Bhimdatta (Wards 585, 586)
('Siddhanath Multiple Campus', 585, GETDATE(), NULL), ('Bhimdatta Municipality Ground', 585, GETDATE(), NULL),
('Adarsha Vidya Niketan', 586, GETDATE(), NULL), ('Mahakali Hospital Area', 586, GETDATE(), NULL);

-- Pakhribas (511-512), Belbari (515-516), Janakpur (517-518), Ganeshman (519-520)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
('Jalpa Devi Secondary School', 511, GETDATE(), NULL), ('Pakhribas Health Post', 511, GETDATE(), NULL),
('Belbari Model School', 515, GETDATE(), NULL), ('Shree Kali Devi School', 515, GETDATE(), NULL),
('Janaki Mandir Secondary School', 517, GETDATE(), NULL), ('Dhanusha District Hospital Hall', 517, GETDATE(), NULL),
('Ganeshman Memorial Ward Office', 519, GETDATE(), NULL), ('Charnath Basic School', 519, GETDATE(), NULL);

-- Jaleshwar (521-522), Bardibas (523-524), Birgunj (525-526), Pokhariya (527-528)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
('Jaleshwar Nath Mavisha', 521, GETDATE(), NULL), ('Mahottari Court Premises', 521, GETDATE(), NULL),
('Bardibas Health Center', 523, GETDATE(), NULL), ('Gaurishankar School', 523, GETDATE(), NULL),
('Birgunj Nursing Campus', 525, GETDATE(), NULL), ('Tri-Juddha High School', 525, GETDATE(), NULL),
('Pokhariya Ward Office 1', 527, GETDATE(), NULL), ('Siddartha Basic School', 527, GETDATE(), NULL);

-- Rajbiraj (529-530), Kanchanrup (531-532), Malangwa (533-534), Lalbandi (535-536)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
('Raj Devi School', 529, GETDATE(), NULL), ('Saptari District Library', 529, GETDATE(), NULL),
('Kanchanrup Health Post', 531, GETDATE(), NULL), ('Shanti Niketan School', 531, GETDATE(), NULL),
('Malangwa Town Hall', 533, GETDATE(), NULL), ('Sarlahi District Post Office', 533, GETDATE(), NULL),
('Lalbandi Multiple Campus', 535, GETDATE(), NULL), ('Shree Durga Secondary School', 535, GETDATE(), NULL);

-- Bhaktapur/Thimi (537-540), Lalitpur/Godawari (551-552), Kaski/Annapurna (555-556)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
('Bhaktapur Durbar Square Hall', 537, GETDATE(), NULL), ('Padma Secondary School', 537, GETDATE(), NULL),
('Madhyapur Thimi Hospital', 539, GETDATE(), NULL), ('Adarsha Azad School', 539, GETDATE(), NULL),
('Godawari Botanical Garden Office', 551, GETDATE(), NULL), ('Kitini Secondary School', 551, GETDATE(), NULL),
('Annapurna Rural Office', 555, GETDATE(), NULL), ('Machhapuchhre School', 555, GETDATE(), NULL);

-- Putalibazar (557-558), Tulsipur (563-564), Siddharthanagar (567-568)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
('Putalibazar Municipality Hall', 557, GETDATE(), NULL), ('Syangja Health Center', 557, GETDATE(), NULL),
('Tulsipur Airport Area School', 563, GETDATE(), NULL), ('Dang District Police Office Hall', 563, GETDATE(), NULL),
('Lumbini Sanskrit University', 567, GETDATE(), NULL), ('Siddharthanagar Ward 1 Center', 567, GETDATE(), NULL);

-- Dolpa/Jajarkot (569-576), Dadeldhura (577-580), Kailali (583-584), Kanchanpur (587-588)
INSERT INTO VotingPlaces (VotingPlaceAddress, WardId, CreatedAt, CreatedBy) VALUES
('Thuli Bheri Ward Office', 569, GETDATE(), NULL), ('Dolpa District Hospital', 569, GETDATE(), NULL),
('Bheri Mavisha Jajarkot', 573, GETDATE(), NULL), ('Jajarkot Red Cross Building', 573, GETDATE(), NULL),
('Amargadhi Fort Area School', 577, GETDATE(), NULL), ('Dadeldhura Post Office', 577, GETDATE(), NULL),
('Tikapur Park Area School', 583, GETDATE(), NULL), ('Kailali Ward 1 Health Post', 583, GETDATE(), NULL),
('Bedkot Municipality Office', 587, GETDATE(), NULL), ('Shree Bhanu Secondary School', 587, GETDATE(), NULL);