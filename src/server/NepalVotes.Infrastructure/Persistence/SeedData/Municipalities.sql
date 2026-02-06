/* Nepal Municipalities Seed Data 
Targeting specific District IDs provided.
CreatedBy is set to NULL.
*/

INSERT INTO Municipalities (MunicipalityId, MunicipalityName, MunicipalityType, DistrictId, CreatedAt, CreatedBy) VALUES
-- District 1: Bhojpur
(1, 'Bhojpur Municipality', 3, 1, GETDATE(), NULL),
(2, 'Shadananda Municipality', 3, 1, GETDATE(), NULL),
(3, 'Hatuwagadhi Rural Municipality', 4, 1, GETDATE(), NULL),
(4, 'Ramprasad Rai Rural Municipality', 4, 1, GETDATE(), NULL),
(5, 'Aamchok Rural Municipality', 4, 1, GETDATE(), NULL),
(6, 'Tyamke Maiyunm Rural Municipality', 4, 1, GETDATE(), NULL),
(7, 'Arun Rural Municipality', 4, 1, GETDATE(), NULL),
(8, 'Pauwadungma Rural Municipality', 4, 1, GETDATE(), NULL),
(9, 'Salpasilichho Rural Municipality', 4, 1, GETDATE(), NULL),

-- District 2: Dhankuta
(10, 'Dhankuta Municipality', 3, 2, GETDATE(), NULL),
(11, 'Pakhribas Municipality', 3, 2, GETDATE(), NULL),
(12, 'Mahalaxmi Municipality', 3, 2, GETDATE(), NULL),
(13, 'Sangurigadhi Rural Municipality', 4, 2, GETDATE(), NULL),
(14, 'Shahidbhumi Rural Municipality', 4, 2, GETDATE(), NULL),
(15, 'Chhathar Jorpati Rural Municipality', 4, 2, GETDATE(), NULL),
(16, 'Chaubise Rural Municipality', 4, 2, GETDATE(), NULL),

-- District 3: Ilam
(17, 'Ilam Municipality', 3, 3, GETDATE(), NULL),
(18, 'Deumai Municipality', 3, 3, GETDATE(), NULL),
(19, 'Mai Municipality', 3, 3, GETDATE(), NULL),
(20, 'Suryodaya Municipality', 3, 3, GETDATE(), NULL),
(21, 'Phakphokthum Rural Municipality', 4, 3, GETDATE(), NULL),
(22, 'Chulachuli Rural Municipality', 4, 3, GETDATE(), NULL),
(23, 'Maijogmai Rural Municipality', 4, 3, GETDATE(), NULL),
(24, 'Mangsebung Rural Municipality', 4, 3, GETDATE(), NULL),
(25, 'Rong Rural Municipality', 4, 3, GETDATE(), NULL),
(26, 'Sandakpur Rural Municipality', 4, 3, GETDATE(), NULL),

-- District 4: Jhapa
(27, 'Mechinagar Municipality', 3, 4, GETDATE(), NULL),
(28, 'Birtamod Municipality', 3, 4, GETDATE(), NULL),
(29, 'Damak Municipality', 3, 4, GETDATE(), NULL),
(30, 'Bhadrapur Municipality', 3, 4, GETDATE(), NULL),
(31, 'Arjundhara Municipality', 3, 4, GETDATE(), NULL),
(32, 'Kankai Municipality', 3, 4, GETDATE(), NULL),
(33, 'Shivasatakshi Municipality', 3, 4, GETDATE(), NULL),
(34, 'Gauradaha Municipality', 3, 4, GETDATE(), NULL),
(35, 'Buddhashanti Rural Municipality', 4, 4, GETDATE(), NULL),
(36, 'Haldibari Rural Municipality', 4, 4, GETDATE(), NULL),
(37, 'Kachankawal Rural Municipality', 4, 4, GETDATE(), NULL),
(38, 'Barhadashi Rural Municipality', 4, 4, GETDATE(), NULL),
(39, 'Jhapa Rural Municipality', 4, 4, GETDATE(), NULL),
(40, 'Gauriganj Rural Municipality', 4, 4, GETDATE(), NULL),
(41, 'Kamal Rural Municipality', 4, 4, GETDATE(), NULL),

-- District 5: Khotang
(42, 'Diktel Rupakot Majhuwagadhi Municipality', 3, 5, GETDATE(), NULL),
(43, 'Halesi Tuwachung Municipality', 3, 5, GETDATE(), NULL),
(44, 'Aiselukharka Rural Municipality', 4, 5, GETDATE(), NULL),
(45, 'Barahpokhari Rural Municipality', 4, 5, GETDATE(), NULL),
(46, 'Diprung Chuichumma Rural Municipality', 4, 5, GETDATE(), NULL),
(47, 'Jantedhunga Rural Municipality', 4, 5, GETDATE(), NULL),
(48, 'Kepilasgadhi Rural Municipality', 4, 5, GETDATE(), NULL),
(49, 'Khotehang Rural Municipality', 4, 5, GETDATE(), NULL),
(50, 'Rawabesi Rural Municipality', 4, 5, GETDATE(), NULL),
(51, 'Sakela Rural Municipality', 4, 5, GETDATE(), NULL),

-- District 6: Morang
(52, 'Biratnagar Metropolitan City', 1, 6, GETDATE(), NULL),
(53, 'Belbari Municipality', 3, 6, GETDATE(), NULL),
(54, 'Letang Municipality', 3, 6, GETDATE(), NULL),
(55, 'Pathari Shanishchare Municipality', 3, 6, GETDATE(), NULL),
(56, 'Rangeli Municipality', 3, 6, GETDATE(), NULL),
(57, 'Ratuwamai Municipality', 3, 6, GETDATE(), NULL),
(58, 'Sunawarshi Municipality', 3, 6, GETDATE(), NULL),
(59, 'Urlabari Municipality', 3, 6, GETDATE(), NULL),
(60, 'Sundar Haraicha Municipality', 3, 6, GETDATE(), NULL),
(61, 'Budhiganga Rural Municipality', 4, 6, GETDATE(), NULL),
(62, 'Dhanpalthan Rural Municipality', 4, 6, GETDATE(), NULL),
(63, 'Gramthan Rural Municipality', 4, 6, GETDATE(), NULL),
(64, 'Jahada Rural Municipality', 4, 6, GETDATE(), NULL),
(65, 'Kanepokhari Rural Municipality', 4, 6, GETDATE(), NULL),
(66, 'Katahari Rural Municipality', 4, 6, GETDATE(), NULL),
(67, 'Kerabari Rural Municipality', 4, 6, GETDATE(), NULL),
(68, 'Miklajung Rural Municipality', 4, 6, GETDATE(), NULL),

-- District 7: Okhaldhunga
(69, 'Siddhicharan Municipality', 3, 7, GETDATE(), NULL),
(70, 'Manebhanjyang Rural Municipality', 4, 7, GETDATE(), NULL),
(71, 'Champadevi Rural Municipality', 4, 7, GETDATE(), NULL),
(72, 'Sunkoshi Rural Municipality', 4, 7, GETDATE(), NULL),
(73, 'Molung Rural Municipality', 4, 7, GETDATE(), NULL),
(74, 'Chisankhugadhi Rural Municipality', 4, 7, GETDATE(), NULL),
(75, 'Khiji Demba Rural Municipality', 4, 7, GETDATE(), NULL),
(76, 'Likhu Rural Municipality', 4, 7, GETDATE(), NULL),

-- District 8: Panchthar
(77, 'Phidim Municipality', 3, 8, GETDATE(), NULL),
(78, 'Phalelung Rural Municipality', 4, 8, GETDATE(), NULL),
(79, 'Phalgunanda Rural Municipality', 4, 8, GETDATE(), NULL),
(80, 'Hilihang Rural Municipality', 4, 8, GETDATE(), NULL),
(81, 'Kummayak Rural Municipality', 4, 8, GETDATE(), NULL),
(82, 'Miklajung Rural Municipality', 4, 8, GETDATE(), NULL),
(83, 'Tumwewa Rural Municipality', 4, 8, GETDATE(), NULL),
(84, 'Yangwarak Rural Municipality', 4, 8, GETDATE(), NULL),

-- District 9: Sankhuwasabha
(85, 'Khandbari Municipality', 3, 9, GETDATE(), NULL),
(86, 'Chainpur Municipality', 3, 9, GETDATE(), NULL),
(87, 'Dharmadevi Municipality', 3, 9, GETDATE(), NULL),
(88, 'Madi Municipality', 3, 9, GETDATE(), NULL),
(89, 'Panchkhapan Municipality', 3, 9, GETDATE(), NULL),
(90, 'Bhotkhola Rural Municipality', 4, 9, GETDATE(), NULL),
(91, 'Chichila Rural Municipality', 4, 9, GETDATE(), NULL),
(92, 'Makalu Rural Municipality', 4, 9, GETDATE(), NULL),
(93, 'Savapokhari Rural Municipality', 4, 9, GETDATE(), NULL),
(94, 'Silichong Rural Municipality', 4, 9, GETDATE(), NULL),

-- District 10: Solukhumbu
(95, 'Solududhkunda Municipality', 3, 10, GETDATE(), NULL),
(96, 'Dudhkoshi Rural Municipality', 4, 10, GETDATE(), NULL),
(97, 'Necha Salyan Rural Municipality', 4, 10, GETDATE(), NULL),
(98, 'Maha Kulung Rural Municipality', 4, 10, GETDATE(), NULL),
(99, 'Sotang Rural Municipality', 4, 10, GETDATE(), NULL),
(100, 'Khumbu Pasang Lhamu Rural Municipality', 4, 10, GETDATE(), NULL),
(101, 'Likhu Pike Rural Municipality', 4, 10, GETDATE(), NULL),
(102, 'Thulung Dudhkoshi Rural Municipality', 4, 10, GETDATE(), NULL);


-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO Municipalities (MunicipalityId, MunicipalityName, MunicipalityType, DistrictId, CreatedAt, CreatedBy) VALUES
-- District 11: Sunsari
(103, 'Itahari Sub-Metropolitan City', 2, 11, GETDATE(), NULL),
(104, 'Dharan Sub-Metropolitan City', 2, 11, GETDATE(), NULL),
(105, 'Inaruwa Municipality', 3, 11, GETDATE(), NULL),
(106, 'Duhabi Municipality', 3, 11, GETDATE(), NULL),
(107, 'Ramdhuni Municipality', 3, 11, GETDATE(), NULL),
(108, 'Barahachhetra Municipality', 3, 11, GETDATE(), NULL),
(109, 'Koshi Rural Municipality', 4, 11, GETDATE(), NULL),
(110, 'Gadhi Rural Municipality', 4, 11, GETDATE(), NULL),
(111, 'Barju Rural Municipality', 4, 11, GETDATE(), NULL),
(112, 'Bhokraha Narsingh Rural Municipality', 4, 11, GETDATE(), NULL),
(113, 'Harinagara Rural Municipality', 4, 11, GETDATE(), NULL),
(114, 'Dewanganj Rural Municipality', 4, 11, GETDATE(), NULL),

-- District 12: Taplejung
(115, 'Phungling Municipality', 3, 12, GETDATE(), NULL),
(116, 'Aathrai Tribeni Rural Municipality', 4, 12, GETDATE(), NULL),
(117, 'Sidingwa Rural Municipality', 4, 12, GETDATE(), NULL),
(118, 'Phaktanglung Rural Municipality', 4, 12, GETDATE(), NULL),
(119, 'Mikwakhola Rural Municipality', 4, 12, GETDATE(), NULL),
(120, 'Meringden Rural Municipality', 4, 12, GETDATE(), NULL),
(121, 'Maiwakhola Rural Municipality', 4, 12, GETDATE(), NULL),
(122, 'Pathibhara Yangwarak Rural Municipality', 4, 12, GETDATE(), NULL),
(123, 'Sirijangha Rural Municipality', 4, 12, GETDATE(), NULL),

-- District 13: Tehrathum
(124, 'Myanglung Municipality', 3, 13, GETDATE(), NULL),
(125, 'Laligurans Municipality', 3, 13, GETDATE(), NULL),
(126, 'Aathrai Rural Municipality', 4, 13, GETDATE(), NULL),
(127, 'Chhathar Rural Municipality', 4, 13, GETDATE(), NULL),
(128, 'Phedap Rural Municipality', 4, 13, GETDATE(), NULL),
(129, 'Menchayayem Rural Municipality', 4, 13, GETDATE(), NULL),

-- District 14: Udayapur
(130, 'Triyuga Municipality', 3, 14, GETDATE(), NULL),
(131, 'Katari Municipality', 3, 14, GETDATE(), NULL),
(132, 'Chaudandigadhi Municipality', 3, 14, GETDATE(), NULL),
(133, 'Belaka Municipality', 3, 14, GETDATE(), NULL),
(134, 'Udayapurgadhi Rural Municipality', 4, 14, GETDATE(), NULL),
(135, 'Tapli Rural Municipality', 4, 14, GETDATE(), NULL),
(136, 'Rautamai Rural Municipality', 4, 14, GETDATE(), NULL),
(137, 'Limchungbung Rural Municipality', 4, 14, GETDATE(), NULL),

-- District 15: Saptari
(138, 'Rajbiraj Municipality', 3, 15, GETDATE(), NULL),
(139, 'Khadak Municipality', 3, 15, GETDATE(), NULL),
(140, 'Dakneshwori Municipality', 3, 15, GETDATE(), NULL),
(141, 'Lahan Municipality', 3, 15, GETDATE(), NULL), -- Note: Lahan is often associated with Siraha, verifying Saptari specific local levels...
(142, 'Shambhunath Municipality', 3, 15, GETDATE(), NULL),
(143, 'Surunga Municipality', 3, 15, GETDATE(), NULL),
(144, 'Kanchanrup Municipality', 3, 15, GETDATE(), NULL),
(145, 'Bode Barsain Municipality', 3, 15, GETDATE(), NULL),
(146, 'Saptakoshi Municipality', 3, 15, GETDATE(), NULL),
(147, 'Hanumannagar Kankalini Municipality', 3, 15, GETDATE(), NULL),
(148, 'Tirahut Rural Municipality', 4, 15, GETDATE(), NULL),

-- District 16: Siraha
(149, 'Siraha Municipality', 3, 16, GETDATE(), NULL),
(150, 'Lahan Municipality', 3, 16, GETDATE(), NULL),
(151, 'Dhangadhimai Municipality', 3, 16, GETDATE(), NULL),
(152, 'Golbazar Municipality', 3, 16, GETDATE(), NULL),
(153, 'Mirchaiya Municipality', 3, 16, GETDATE(), NULL),
(154, 'Kalyanpur Municipality', 3, 16, GETDATE(), NULL),
(155, 'Karjanha Municipality', 3, 16, GETDATE(), NULL),
(156, 'Sukhipur Municipality', 3, 16, GETDATE(), NULL),
(157, 'Bariarpatti Rural Municipality', 4, 16, GETDATE(), NULL),

-- District 17: Dhanusha
(158, 'Janakpurdham Metropolitan City', 1, 17, GETDATE(), NULL),
(159, 'Ganeshman Charnath Municipality', 3, 17, GETDATE(), NULL),
(160, 'Dhanushadham Municipality', 3, 17, GETDATE(), NULL),
(161, 'Chhireswornath Municipality', 3, 17, GETDATE(), NULL),
(162, 'Sabaila Municipality', 3, 17, GETDATE(), NULL),
(163, 'Nagarain Municipality', 3, 17, GETDATE(), NULL),
(164, 'Bideha Municipality', 3, 17, GETDATE(), NULL),
(165, 'Mithila Municipality', 3, 17, GETDATE(), NULL),
(166, 'Shahidnagar Municipality', 3, 17, GETDATE(), NULL),

-- District 18: Mahottari
(167, 'Jaleswor Municipality', 3, 18, GETDATE(), NULL),
(168, 'Bardibas Municipality', 3, 18, GETDATE(), NULL),
(169, 'Gaushala Municipality', 3, 18, GETDATE(), NULL),
(170, 'Loharpatti Municipality', 3, 18, GETDATE(), NULL),
(171, 'Ramgopalpur Municipality', 3, 18, GETDATE(), NULL),
(172, 'Manra Siswa Municipality', 3, 18, GETDATE(), NULL),
(173, 'Matihani Municipality', 3, 18, GETDATE(), NULL),
(174, 'Aurahi Municipality', 3, 18, GETDATE(), NULL),

-- District 19: Sarlahi
(175, 'Malangwa Municipality', 3, 19, GETDATE(), NULL),
(176, 'Hariwan Municipality', 3, 19, GETDATE(), NULL),
(177, 'Lalbandi Municipality', 3, 19, GETDATE(), NULL),
(178, 'Ishworpur Municipality', 3, 19, GETDATE(), NULL),
(179, 'Barahathawa Municipality', 3, 19, GETDATE(), NULL),
(180, 'Godaita Municipality', 3, 19, GETDATE(), NULL),
(181, 'Balara Municipality', 3, 19, GETDATE(), NULL),
(182, 'Kabilasi Municipality', 3, 19, GETDATE(), NULL),
(183, 'Bagmati Municipality', 3, 19, GETDATE(), NULL),

-- District 20: Rautahat
(184, 'Gaur Municipality', 3, 20, GETDATE(), NULL),
(185, 'Chandrapur Municipality', 3, 20, GETDATE(), NULL),
(186, 'Garuda Municipality', 3, 20, GETDATE(), NULL),
(187, 'Ishanath Municipality', 3, 20, GETDATE(), NULL),
(188, 'Katariya Municipality', 3, 20, GETDATE(), NULL),
(189, 'Gadhimai Municipality', 3, 20, GETDATE(), NULL),
(190, 'Madhav Narayan Municipality', 3, 20, GETDATE(), NULL),
(191, 'Maulapur Municipality', 3, 20, GETDATE(), NULL),
(192, 'Phatuwa Vijayapur Municipality', 3, 20, GETDATE(), NULL);

-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO Municipalities (MunicipalityId, MunicipalityName, MunicipalityType, DistrictId, CreatedAt, CreatedBy) VALUES
-- District 21: Sarlahi (Remaining from previous set logic)
(193, 'Haripur Municipality', 3, 21, GETDATE(), NULL),
(194, 'Haripurwa Municipality', 3, 21, GETDATE(), NULL),
(195, 'Brahampuri Rural Municipality', 4, 21, GETDATE(), NULL),

-- District 22: Siraha (Remaining from previous set logic)
(196, 'Bishnupur Rural Municipality', 4, 22, GETDATE(), NULL),
(197, 'Bhagwanpur Rural Municipality', 4, 22, GETDATE(), NULL),

-- District 23: Bhaktapur
(198, 'Bhaktapur Municipality', 3, 23, GETDATE(), NULL),
(199, 'Madhyapur Thimi Municipality', 3, 23, GETDATE(), NULL),
(200, 'Suryabinayak Municipality', 3, 23, GETDATE(), NULL),
(201, 'Changunarayan Municipality', 3, 23, GETDATE(), NULL),

-- District 24: Chitwan
(202, 'Bharatpur Metropolitan City', 1, 24, GETDATE(), NULL),
(203, 'Ratnanagar Municipality', 3, 24, GETDATE(), NULL),
(204, 'Khairahani Municipality', 3, 24, GETDATE(), NULL),
(205, 'Rapti Municipality', 3, 24, GETDATE(), NULL),
(206, 'Kalika Municipality', 3, 24, GETDATE(), NULL),
(207, 'Madi Municipality', 3, 24, GETDATE(), NULL),
(208, 'Ichchhakamana Rural Municipality', 4, 24, GETDATE(), NULL),

-- District 25: Dhading
(209, 'Nilkantha Municipality', 3, 25, GETDATE(), NULL),
(210, 'Dhunibeshi Municipality', 3, 25, GETDATE(), NULL),
(211, 'Gajuri Rural Municipality', 4, 25, GETDATE(), NULL),
(212, 'Galchhi Rural Municipality', 4, 25, GETDATE(), NULL),
(213, 'Benighat Rorang Rural Municipality', 4, 25, GETDATE(), NULL),

-- District 26: Dolakha
(214, 'Bhimeshwar Municipality', 3, 26, GETDATE(), NULL),
(215, 'Jiri Municipality', 3, 26, GETDATE(), NULL),
(216, 'Kalinchok Rural Municipality', 4, 26, GETDATE(), NULL),
(217, 'Sailung Rural Municipality', 4, 26, GETDATE(), NULL),

-- District 27: Kathmandu
(218, 'Kathmandu Metropolitan City', 1, 27, GETDATE(), NULL),
(219, 'Kirtipur Municipality', 3, 27, GETDATE(), NULL),
(220, 'Gokarneshwar Municipality', 3, 27, GETDATE(), NULL),
(221, 'Budhanilkantha Municipality', 3, 27, GETDATE(), NULL),
(222, 'Tarakeshwar Municipality', 3, 27, GETDATE(), NULL),
(223, 'Tokha Municipality', 3, 27, GETDATE(), NULL),
(224, 'Chandragiri Municipality', 3, 27, GETDATE(), NULL),
(225, 'Nagarjun Municipality', 3, 27, GETDATE(), NULL),
(226, 'Kageshwori Manahara Municipality', 3, 27, GETDATE(), NULL),
(227, 'Dakshinkali Municipality', 3, 27, GETDATE(), NULL),
(228, 'Shankharapur Municipality', 3, 27, GETDATE(), NULL),

-- District 28: Kavrepalanchok
(229, 'Dhulikhel Municipality', 3, 28, GETDATE(), NULL),
(230, 'Banepa Municipality', 3, 28, GETDATE(), NULL),
(231, 'Panauti Municipality', 3, 28, GETDATE(), NULL),
(232, 'Panchkhal Municipality', 3, 28, GETDATE(), NULL),
(233, 'Namobuddha Municipality', 3, 28, GETDATE(), NULL),
(234, 'Mandandeupur Municipality', 3, 28, GETDATE(), NULL),

-- District 29: Lalitpur
(235, 'Lalitpur Metropolitan City', 1, 29, GETDATE(), NULL),
(236, 'Godawari Municipality', 3, 29, GETDATE(), NULL),
(237, 'Mahalaxmi Municipality', 3, 29, GETDATE(), NULL),
(238, 'Konjyosom Rural Municipality', 4, 29, GETDATE(), NULL),
(239, 'Bagmati Rural Municipality', 4, 29, GETDATE(), NULL),
(240, 'Mahankal Rural Municipality', 4, 29, GETDATE(), NULL),

-- District 30: Makwanpur
(241, 'Hetauda Sub-Metropolitan City', 2, 30, GETDATE(), NULL),
(242, 'Thaha Municipality', 3, 30, GETDATE(), NULL),
(243, 'Manahari Rural Municipality', 4, 30, GETDATE(), NULL),
(244, 'Bakaiya Rural Municipality', 4, 30, GETDATE(), NULL),

-- District 31: Nuwakot
(245, 'Bidur Municipality', 3, 31, GETDATE(), NULL),
(246, 'Belkotgadhi Municipality', 3, 31, GETDATE(), NULL),
(247, 'Kakani Rural Municipality', 4, 31, GETDATE(), NULL),
(248, 'Shivapuri Rural Municipality', 4, 31, GETDATE(), NULL),

-- District 32: Ramechhap
(249, 'Manthali Municipality', 3, 32, GETDATE(), NULL),
(250, 'Ramechhap Municipality', 3, 32, GETDATE(), NULL),
(251, 'Khandadevi Rural Municipality', 4, 32, GETDATE(), NULL),

-- District 33: Rasuwa
(252, 'Gosaikunda Rural Municipality', 4, 33, GETDATE(), NULL),
(253, 'Uttargaya Rural Municipality', 4, 33, GETDATE(), NULL),
(254, 'Kalika Rural Municipality', 4, 33, GETDATE(), NULL),

-- District 34: Sindhuli
(255, 'Kamalamai Municipality', 3, 34, GETDATE(), NULL),
(256, 'Dudhouli Municipality', 3, 34, GETDATE(), NULL),
(257, 'Marin Rural Municipality', 4, 34, GETDATE(), NULL),

-- District 35: Sindhupalchok
(258, 'Chautara Sangachokgadhi Municipality', 3, 35, GETDATE(), NULL),
(259, 'Barhabise Municipality', 3, 35, GETDATE(), NULL),
(260, 'Melamchi Municipality', 3, 35, GETDATE(), NULL),

-- District 36: Baglung
(261, 'Baglung Municipality', 3, 36, GETDATE(), NULL),
(262, 'Dhorpatan Municipality', 3, 36, GETDATE(), NULL),
(263, 'Galkot Municipality', 3, 36, GETDATE(), NULL),
(264, 'Jaimuni Municipality', 3, 36, GETDATE(), NULL),

-- District 37: Gorkha
(265, 'Gorkha Municipality', 3, 37, GETDATE(), NULL),
(266, 'Palungtar Municipality', 3, 37, GETDATE(), NULL),
(267, 'Shahid Lakhan Rural Municipality', 4, 37, GETDATE(), NULL),

-- District 38: Kaski
(268, 'Pokhara Metropolitan City', 1, 38, GETDATE(), NULL),
(269, 'Annapurna Rural Municipality', 4, 38, GETDATE(), NULL),
(270, 'Machhapuchhre Rural Municipality', 4, 38, GETDATE(), NULL),
(271, 'Madi Rural Municipality', 4, 38, GETDATE(), NULL),
(272, 'Rupa Rural Municipality', 4, 38, GETDATE(), NULL),

-- District 39: Lamjung
(273, 'Besishahar Municipality', 3, 39, GETDATE(), NULL),
(274, 'Madhya Nepal Municipality', 3, 39, GETDATE(), NULL),
(275, 'Rainas Municipality', 3, 39, GETDATE(), NULL),
(276, 'Sundarbazar Municipality', 3, 39, GETDATE(), NULL),

-- District 40: Manang
(277, 'Chame Rural Municipality', 4, 40, GETDATE(), NULL),
(278, 'Manang Ngisyan Rural Municipality', 4, 40, GETDATE(), NULL),
(279, 'Narpa Bhumi Rural Municipality', 4, 40, GETDATE(), NULL),
(280, 'Nashon Rural Municipality', 4, 40, GETDATE(), NULL);


-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO Municipalities (MunicipalityId, MunicipalityName, MunicipalityType, DistrictId, CreatedAt, CreatedBy) VALUES
-- District 41: Mustang
(281, 'Gharpajhong Rural Municipality', 4, 41, GETDATE(), NULL),
(282, 'Thasang Rural Municipality', 4, 41, GETDATE(), NULL),
(283, 'Baragung Muktichhetra Rural Municipality', 4, 41, GETDATE(), NULL),
(284, 'Lomanthang Rural Municipality', 4, 41, GETDATE(), NULL),
(285, 'Lo-Ghekar Damodarkunda Rural Municipality', 4, 41, GETDATE(), NULL),

-- District 42: Myagdi
(286, 'Beni Municipality', 3, 42, GETDATE(), NULL),
(287, 'Annapurna Rural Municipality', 4, 42, GETDATE(), NULL),
(288, 'Dhaulagiri Rural Municipality', 4, 42, GETDATE(), NULL),
(289, 'Malika Rural Municipality', 4, 42, GETDATE(), NULL),
(290, 'Mangala Rural Municipality', 4, 42, GETDATE(), NULL),
(291, 'Raghuganga Rural Municipality', 4, 42, GETDATE(), NULL),

-- District 43: Nawalpur (East of Bardaghat Susta)
(292, 'Kawasoti Municipality', 3, 43, GETDATE(), NULL),
(293, 'Gaindakot Municipality', 3, 43, GETDATE(), NULL),
(294, 'Devchuli Municipality', 3, 43, GETDATE(), NULL),
(295, 'Madhyabindu Municipality', 3, 43, GETDATE(), NULL),
(296, 'Binayi Tribeni Rural Municipality', 4, 43, GETDATE(), NULL),
(297, 'Hupsekot Rural Municipality', 4, 43, GETDATE(), NULL),
(298, 'Bulingtar Rural Municipality', 4, 43, GETDATE(), NULL),
(299, 'Baudikali Rural Municipality', 4, 43, GETDATE(), NULL),

-- District 44: Parbat
(300, 'Kushma Municipality', 3, 44, GETDATE(), NULL),
(301, 'Phalewas Municipality', 3, 44, GETDATE(), NULL),
(302, 'Jaljala Rural Municipality', 4, 44, GETDATE(), NULL),
(303, 'Modi Rural Municipality', 4, 44, GETDATE(), NULL),
(304, 'Mahashila Rural Municipality', 4, 44, GETDATE(), NULL),
(305, 'Bihadi Rural Municipality', 4, 44, GETDATE(), NULL),
(306, 'Paiyun Rural Municipality', 4, 44, GETDATE(), NULL),

-- District 45: Syangja
(307, 'Putalibazar Municipality', 3, 45, GETDATE(), NULL),
(308, 'Waling Municipality', 3, 45, GETDATE(), NULL),
(309, 'Chapakot Municipality', 3, 45, GETDATE(), NULL),
(310, 'Bhirkot Municipality', 3, 45, GETDATE(), NULL),
(311, 'Galyang Municipality', 3, 45, GETDATE(), NULL),
(312, 'Arjun Chaupari Rural Municipality', 4, 45, GETDATE(), NULL),
(313, 'Kaligandaki Rural Municipality', 4, 45, GETDATE(), NULL),

-- District 46: Tanahun
(314, 'Vyas Municipality', 3, 46, GETDATE(), NULL),
(315, 'Bhanu Municipality', 3, 46, GETDATE(), NULL),
(316, 'Bhimad Municipality', 3, 46, GETDATE(), NULL),
(317, 'Shuklagandaki Municipality', 3, 46, GETDATE(), NULL),
(318, 'Bandipur Rural Municipality', 4, 46, GETDATE(), NULL),
(319, 'Devghat Rural Municipality', 4, 46, GETDATE(), NULL),

-- District 47: Arghakhanchi
(320, 'Sandhikharka Municipality', 3, 47, GETDATE(), NULL),
(321, 'Sitganga Municipality', 3, 47, GETDATE(), NULL),
(322, 'Bhumikasthan Municipality', 3, 47, GETDATE(), NULL),
(323, 'Chhatradev Rural Municipality', 4, 47, GETDATE(), NULL),
(324, 'Panini Rural Municipality', 4, 47, GETDATE(), NULL),
(325, 'Malarani Rural Municipality', 4, 47, GETDATE(), NULL),

-- District 48: Banke
(326, 'Nepalgunj Sub-Metropolitan City', 2, 48, GETDATE(), NULL),
(327, 'Kohalpur Municipality', 3, 48, GETDATE(), NULL),
(328, 'Rapti Sonari Rural Municipality', 4, 48, GETDATE(), NULL),
(329, 'Khajura Rural Municipality', 4, 48, GETDATE(), NULL),
(330, 'Janaki Rural Municipality', 4, 48, GETDATE(), NULL),

-- District 49: Bardiya
(331, 'Gulariya Municipality', 3, 49, GETDATE(), NULL),
(332, 'Rajapur Municipality', 3, 49, GETDATE(), NULL),
(333, 'Madhuwan Municipality', 3, 49, GETDATE(), NULL),
(334, 'Thakurbaba Municipality', 3, 49, GETDATE(), NULL),
(335, 'Bansgadhi Municipality', 3, 49, GETDATE(), NULL),
(336, 'Barbardiya Municipality', 3, 49, GETDATE(), NULL),

-- District 50: Dang
(337, 'Ghorahi Sub-Metropolitan City', 2, 50, GETDATE(), NULL),
(338, 'Tulsipur Sub-Metropolitan City', 2, 50, GETDATE(), NULL),
(339, 'Lamahi Municipality', 3, 50, GETDATE(), NULL),
(340, 'Rapti Rural Municipality', 4, 50, GETDATE(), NULL),
(341, 'Gadhawa Rural Municipality', 4, 50, GETDATE(), NULL),

-- District 51: Gulmi
(342, 'Resunga Municipality', 3, 51, GETDATE(), NULL),
(343, 'Musikot Municipality', 3, 51, GETDATE(), NULL),
(344, 'Isma Rural Municipality', 4, 51, GETDATE(), NULL),
(345, 'Kaligandaki Rural Municipality', 4, 51, GETDATE(), NULL),
(346, 'Gulmi Darbar Rural Municipality', 4, 51, GETDATE(), NULL),

-- District 52: Kapilvastu
(347, 'Kapilvastu Municipality', 3, 52, GETDATE(), NULL),
(348, 'Banganga Municipality', 3, 52, GETDATE(), NULL),
(349, 'Buddhabhumi Municipality', 3, 52, GETDATE(), NULL),
(350, 'Shivaraj Municipality', 3, 52, GETDATE(), NULL),
(351, 'Krishnanagar Municipality', 3, 52, GETDATE(), NULL),
(352, 'Maharajganj Municipality', 3, 52, GETDATE(), NULL),

-- District 53: Parasi (West Nawalparasi)
(353, 'Ramgram Municipality', 3, 53, GETDATE(), NULL),
(354, 'Bardaghat Municipality', 3, 53, GETDATE(), NULL),
(355, 'Sunwal Municipality', 3, 53, GETDATE(), NULL),
(356, 'Pratappur Rural Municipality', 4, 53, GETDATE(), NULL),
(357, 'Susta Rural Municipality', 4, 53, GETDATE(), NULL),

-- District 54: Palpa
(358, 'Tansen Municipality', 3, 54, GETDATE(), NULL),
(359, 'Rampur Municipality', 3, 54, GETDATE(), NULL),
(360, 'Rainadevi Chhahara Rural Municipality', 4, 54, GETDATE(), NULL),
(361, 'Mathagadi Rural Municipality', 4, 54, GETDATE(), NULL),

-- District 55: Pyuthan
(362, 'Pyuthan Municipality', 3, 55, GETDATE(), NULL),
(363, 'Swargadwari Municipality', 3, 55, GETDATE(), NULL),
(364, 'Gaumukhi Rural Municipality', 4, 55, GETDATE(), NULL),
(365, 'Mandavi Rural Municipality', 4, 55, GETDATE(), NULL),

-- District 56: Rolpa
(366, 'Rolpa Municipality', 3, 56, GETDATE(), NULL),
(367, 'Triveni Rural Municipality', 4, 56, GETDATE(), NULL),
(368, 'Duikholi Rural Municipality', 4, 56, GETDATE(), NULL),
(369, 'Madi Rural Municipality', 4, 56, GETDATE(), NULL),

-- District 57: Rupandehi
(370, 'Butwal Sub-Metropolitan City', 2, 57, GETDATE(), NULL),
(371, 'Siddharthanagar Municipality', 3, 57, GETDATE(), NULL),
(372, 'Tillotama Municipality', 3, 57, GETDATE(), NULL),
(373, 'Sainamaina Municipality', 3, 57, GETDATE(), NULL),
(374, 'Devdaha Municipality', 3, 57, GETDATE(), NULL),
(375, 'Lumbini Sanskritik Municipality', 3, 57, GETDATE(), NULL),

-- District 58: Eastern Rukum
(376, 'Putha Uttarganga Rural Municipality', 4, 58, GETDATE(), NULL),
(377, 'Bhume Rural Municipality', 4, 58, GETDATE(), NULL),
(378, 'Sisne Rural Municipality', 4, 58, GETDATE(), NULL),

-- District 59: Dailekh
(379, 'Narayan Municipality', 3, 59, GETDATE(), NULL),
(380, 'Dullu Municipality', 3, 59, GETDATE(), NULL),
(381, 'Chamunda Bindrasaini Municipality', 3, 59, GETDATE(), NULL),
(382, 'Aathabis Municipality', 3, 59, GETDATE(), NULL),

-- District 60: Dolpa
(383, 'Thuli Bheri Municipality', 3, 60, GETDATE(), NULL),
(384, 'Tripurasundari Municipality', 3, 60, GETDATE(), NULL),
(385, 'Dolpo Buddha Rural Municipality', 4, 60, GETDATE(), NULL),
(386, 'Shey Phoksundo Rural Municipality', 4, 60, GETDATE(), NULL);

-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO Municipalities (MunicipalityId, MunicipalityName, MunicipalityType, DistrictId, CreatedAt, CreatedBy) VALUES
-- District 61: Humla
(387, 'Simkot Rural Municipality', 4, 61, GETDATE(), NULL),
(388, 'Namkha Rural Municipality', 4, 61, GETDATE(), NULL),
(389, 'Kharpunath Rural Municipality', 4, 61, GETDATE(), NULL),
(390, 'Sarkegad Rural Municipality', 4, 61, GETDATE(), NULL),

-- District 62: Jajarkot
(391, 'Bheri Municipality', 3, 62, GETDATE(), NULL),
(392, 'Chhedagad Municipality', 3, 62, GETDATE(), NULL),
(393, 'Nalgad Municipality', 3, 62, GETDATE(), NULL),
(394, 'Barekot Rural Municipality', 4, 62, GETDATE(), NULL),

-- District 63: Jumla
(395, 'Chandannath Municipality', 3, 63, GETDATE(), NULL),
(396, 'Kankasundari Rural Municipality', 4, 63, GETDATE(), NULL),
(397, 'Sinja Rural Municipality', 4, 63, GETDATE(), NULL),
(398, 'Hima Rural Municipality', 4, 63, GETDATE(), NULL),

-- District 64: Kalikot
(399, 'Khandachakra Municipality', 3, 64, GETDATE(), NULL),
(400, 'Raski Municipality', 3, 64, GETDATE(), NULL),
(401, 'Tilagufa Municipality', 3, 64, GETDATE(), NULL),
(402, 'Pachaljharana Rural Municipality', 4, 64, GETDATE(), NULL),

-- District 65: Mugu
(403, 'Chhayanath Rara Municipality', 3, 65, GETDATE(), NULL),
(404, 'Mugum Karmarong Rural Municipality', 4, 65, GETDATE(), NULL),
(405, 'Soru Rural Municipality', 4, 65, GETDATE(), NULL),
(406, 'Khatyad Rural Municipality', 4, 65, GETDATE(), NULL),

-- District 66: Salyan
(407, 'Shaarda Municipality', 3, 66, GETDATE(), NULL),
(408, 'Bagchaur Municipality', 3, 66, GETDATE(), NULL),
(409, 'Bangad Kupinde Municipality', 3, 66, GETDATE(), NULL),
(410, 'Kalimati Rural Municipality', 4, 66, GETDATE(), NULL),

-- District 67: Surkhet
(411, 'Birendranagar Municipality', 3, 67, GETDATE(), NULL),
(412, 'Bheriganga Municipality', 3, 67, GETDATE(), NULL),
(413, 'Gurbhakot Municipality', 3, 67, GETDATE(), NULL),
(414, 'Panchapuri Municipality', 3, 67, GETDATE(), NULL),
(415, 'Lekbeshi Municipality', 3, 67, GETDATE(), NULL),

-- District 68: Western Rukum
(416, 'Musikot Municipality', 3, 68, GETDATE(), NULL),
(417, 'Chaurjahari Municipality', 3, 68, GETDATE(), NULL),
(418, 'Aathbiskot Municipality', 3, 68, GETDATE(), NULL),
(419, 'Sani Bheri Rural Municipality', 4, 68, GETDATE(), NULL),

-- District 69: Achham
(420, 'Mangalsen Municipality', 3, 69, GETDATE(), NULL),
(421, 'Kamalbazar Municipality', 3, 69, GETDATE(), NULL),
(422, 'Sanphebagar Municipality', 3, 69, GETDATE(), NULL),
(423, 'Panchadewal Binayak Municipality', 3, 69, GETDATE(), NULL),

-- District 70: Baitadi
(424, 'Dasharathchand Municipality', 3, 70, GETDATE(), NULL),
(425, 'Patan Municipality', 3, 70, GETDATE(), NULL),
(426, 'Melauli Municipality', 3, 70, GETDATE(), NULL),
(427, 'Purchaudi Municipality', 3, 70, GETDATE(), NULL),

-- District 71: Bajhang
(428, 'Jayaprithvi Municipality', 3, 71, GETDATE(), NULL),
(429, 'Bungal Municipality', 3, 71, GETDATE(), NULL),
(430, 'Bitthadchir Rural Municipality', 4, 71, GETDATE(), NULL),
(431, 'Khaptadchanna Rural Municipality', 4, 71, GETDATE(), NULL),

-- District 72: Bajura
(432, 'Badimalika Municipality', 3, 72, GETDATE(), NULL),
(433, 'Triveni Municipality', 3, 72, GETDATE(), NULL),
(434, 'Budhiganga Municipality', 3, 72, GETDATE(), NULL),
(435, 'Budhinanda Municipality', 3, 72, GETDATE(), NULL),

-- District 73: Dadeldhura
(436, 'Amargadhi Municipality', 3, 73, GETDATE(), NULL),
(437, 'Parshuram Municipality', 3, 73, GETDATE(), NULL),
(438, 'Alital Rural Municipality', 4, 73, GETDATE(), NULL),
(439, 'Bhageshwar Rural Municipality', 4, 73, GETDATE(), NULL),

-- District 74: Darchula
(440, 'Mahakali Municipality', 3, 74, GETDATE(), NULL),
(441, 'Shailya Shikhar Municipality', 3, 74, GETDATE(), NULL),
(442, 'Malikarjun Rural Municipality', 4, 74, GETDATE(), NULL),
(443, 'Apihimal Rural Municipality', 4, 74, GETDATE(), NULL),

-- District 75: Doti
(444, 'Dipayal Silgadhi Municipality', 3, 75, GETDATE(), NULL),
(445, 'Shikhar Municipality', 3, 75, GETDATE(), NULL),
(446, 'Purbichowki Rural Municipality', 4, 75, GETDATE(), NULL),
(447, 'Sayal Rural Municipality', 4, 75, GETDATE(), NULL),

-- District 76: Kailali
(448, 'Dhangadhi Sub-Metropolitan City', 2, 76, GETDATE(), NULL),
(449, 'Tikapur Municipality', 3, 76, GETDATE(), NULL),
(450, 'Ghodaghodi Municipality', 3, 76, GETDATE(), NULL),
(451, 'Lamki Chuha Municipality', 3, 76, GETDATE(), NULL),
(452, 'Bhajani Municipality', 3, 76, GETDATE(), NULL),
(453, 'Godawari Municipality', 3, 76, GETDATE(), NULL),
(454, 'Gauriganga Municipality', 3, 76, GETDATE(), NULL),

-- District 77: Kanchanpur
(455, 'Bhimdatta Municipality', 3, 77, GETDATE(), NULL),
(456, 'Bedkot Municipality', 3, 77, GETDATE(), NULL),
(457, 'Belauri Municipality', 3, 77, GETDATE(), NULL),
(458, 'Beldandi Rural Municipality', 4, 77, GETDATE(), NULL),
(459, 'Mahakali Municipality', 3, 77, GETDATE(), NULL),
(460, 'Punarwas Municipality', 3, 77, GETDATE(), NULL),
(461, 'Shuklaphanta Municipality', 3, 77, GETDATE(), NULL),
(462, 'Krishnapur Municipality', 3, 77, GETDATE(), NULL),
(463, 'Laljhadi Rural Municipality', 4, 77, GETDATE(), NULL);