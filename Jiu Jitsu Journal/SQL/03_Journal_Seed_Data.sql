USE [Journal];

-- Enable identity insert
SET IDENTITY_INSERT [BjjClass] ON;

-- Insert record into BjjClass table
INSERT INTO [BjjClass] ([Id], [Date], [Notes], [RollCount], [TypeOfClass], [UserProfileId])
VALUES (2, '2020-01-01', 'Today i learned the head and arm choke, and got my first stripe on my white belt', 1, 'Gi', 1);
INSERT INTO [BjjClass] ([Id], [Date], [Notes], [RollCount], [TypeOfClass], [UserProfileId])
VALUES (3, '2023-01-01', 'Learned the armbar', 1, 'Gi', 1);



