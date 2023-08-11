USE [Journal];

-- Enable identity insert
SET IDENTITY_INSERT [BjjClass] ON;

-- Insert record into BjjClass table
INSERT INTO [BjjClass] ([Id], [Date], [Notes], [RollCount], [TypeOfClass])
VALUES (2, '2020-01-01', 'notes', 1, 'Gi');


