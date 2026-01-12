INSERT INTO Roles (RoleName) VALUES
('VOTER'),
('ADMIN'),
('SUPER_ADMIN');

select * from VotingPlaces where VotingPlaceId = 545;
-- 1. Create the User
INSERT INTO Users (UserId, MiddleName, LastName, MobileNumber, Status, RequestDate, ApprovedDate, VotingPlaceId, ApprovedByUserId, CreatedAt)
VALUES (1,'Susan', '', 'Pant', '9846514741', 3, GETDATE(), GETDATE(), 36, NULL, GETDATE());

-- 2. Assign SUPER_ADMIN Role (Assuming RoleId 3 is SUPER_ADMIN and Susan is UserId 1)
INSERT INTO UserRoles (UsersUserId, RolesRoleId)
VALUES (1, 3);



/* Generate 1 Approved User for every Voting Place
   Prefixes: 984 (NTC) for even IDs, 980 (Ncell) for odd IDs
*/

INSERT INTO Users (FirstName, MiddleName, LastName, MobileNumber, Status, RequestDate, ApprovedDate, VotingPlaceId, ApprovedByUserId, CreatedAt, CreatedBy)
SELECT
    'User_' + CAST(VotingPlaceId AS VARCHAR),
    '',
    'Voter',
    -- Generates 10-digit Nepal mobile numbers (e.g., 9840000501 or 9800000502)
    CASE
        WHEN VotingPlaceId % 2 = 0 THEN '984' + RIGHT('0000000' + CAST(VotingPlaceId AS VARCHAR), 7)
    ELSE '980' + RIGHT('0000000' + CAST(VotingPlaceId AS VARCHAR), 7)
END,
    3,              -- Status: Approved
    GETDATE(),      -- RequestDate
    GETDATE(),      -- ApprovedDate
    VotingPlaceId, 
    4,              -- Approved by Susan Pant (UserId 1)
    GETDATE(), 
    NULL
FROM VotingPlaces
WHERE VotingPlaceId <> 36; -- Avoid duplicating Susan Pant's record

-- Assign 'VOTER' Role (RoleId 1) to all newly created users
INSERT INTO UserRoles (UsersUserId, RolesRoleId)
SELECT UserId, 1
FROM Users
WHERE UserId <> 4; -- Exclude Susan Pant (SUPER_ADMIN)

