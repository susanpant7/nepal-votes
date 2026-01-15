-- insert dummy media file

INSERT INTO [NepalVotes].[dbo].[MediaFiles]
(MediaFileId, Content, ContentType, FileName, Size, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
    (1, 0x, 'image/png', 'nep_congress.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (2, 0x, 'image/png', 'cpn_uml.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (3, 0x, 'image/png', 'cpn_maoist_centre.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (4, 0x, 'image/png', 'cpn_unified_socialist.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (5, 0x, 'image/png', 'janata_samajbadi.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (6, 0x, 'image/png', 'loktantrik_samajwadi.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (7, 0x, 'image/png', 'rastriya_prajatantra.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (8, 0x, 'image/png', 'rastriya_swatantra.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (9, 0x, 'image/png', 'janamat_party.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (10, 0x, 'image/png', 'rastriya_janamorcha.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (11, 0x, 'image/png', 'nepal_workers_peasants.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (12, 0x, 'image/png', 'nepal_majdoor_kisan.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (13, 0x, 'image/png', 'peoples_progressive.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (14, 0x, 'image/png', 'madhesi_janadhikar.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (15, 0x, 'image/png', 'national_unity_democratic.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (16, 0x, 'image/png', 'nepal_nationalist.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (17, 0x, 'image/png', 'nepal_inclusive.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (18, 0x, 'image/png', 'united_nepal_democratic.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (19, 0x, 'image/png', 'gandhian_party.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4),
    (20, 0x, 'image/png', 'ujyaalo_nepal.png', 0, GETUTCDATE(), 4, GETUTCDATE(), 4);

INSERT INTO [NepalVotes].[dbo].[PoliticalParties]
(PoliticalPartyId, PoliticalPartyName, PartyLeaderId, SymbolMediaFileId, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
    (1,'Nepali Congress',4, 1,GETUTCDATE(),4,GETUTCDATE(),4),
    (2,'Communist Party of Nepal (UML)',116, 2,GETUTCDATE(),4,GETUTCDATE(),4),
    (3,'Communist Party of Nepal (Maoist Centre)',117, 3,GETUTCDATE(),4,GETUTCDATE(),4),
    (4,'Communist Party of Nepal (Unified Socialist)',118, 4,GETUTCDATE(),4,GETUTCDATE(),4),
    (5,'Janata Samajbadi Party, Nepal',119, 5,GETUTCDATE(),4,GETUTCDATE(),4),
    (6,'Loktantrik Samajwadi Party, Nepal',120, 6,GETUTCDATE(),4,GETUTCDATE(),4),
    (7,'Rastriya Prajatantra Party',121, 7,GETUTCDATE(),4,GETUTCDATE(),4),
    (8,'Rastriya Swatantra Party',122, 8,GETUTCDATE(),4,GETUTCDATE(),4),
    (9,'Janamat Party',123, 9,GETUTCDATE(),4,GETUTCDATE(),4),
    (10,'Rastriya Janamorcha',124, 10,GETUTCDATE(),4,GETUTCDATE(),4),
    (11,'Nepal Workers and Peasants Party',125, 11,GETUTCDATE(),4,GETUTCDATE(),4),
    (12,'Nepal Majdoor Kisan Party',126, 12,GETUTCDATE(),4,GETUTCDATE(),4),
    (13,'People''s Progressive Party',127, 13,GETUTCDATE(),4,GETUTCDATE(),4),
    (14,'Madhesi Janadhikar Forum Madhes',128, 14,GETUTCDATE(),4,GETUTCDATE(),4),
    (15,'National Unity Party (Democratic)',129, 15,GETUTCDATE(),4,GETUTCDATE(),4),
    (16,'Nepal Nationalist Party',130, 16,GETUTCDATE(),4,GETUTCDATE(),4),
    (17,'Nepal Inclusive Party',131, 17,GETUTCDATE(),4,GETUTCDATE(),4),
    (18,'United Nepal Democratic Party',132, 18,GETUTCDATE(),4,GETUTCDATE(),4),
    (19,'Gandhian Party Nepal',133, 19,GETUTCDATE(),4,GETUTCDATE(),4),
    (20,'Ujyaalo Nepal Party',134, 20,GETUTCDATE(),4,GETUTCDATE(),4);

