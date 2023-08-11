USE [master]

IF db_id('Journal') IS NULl
  CREATE DATABASE [Journal]
GO

USE [Journal]
GO


DROP TABLE IF EXISTS [BjjClass];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [BeltRank];
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FullName] nvarchar(20) NOT NULL,
  [Email] nvarchar(50) NOT NULL,
  [WeeklyClassGoal] integer NOT NULL,
  [WeeklyRollGoal] integer NOT NULL,


)



CREATE TABLE [BJJClass] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Date] date NOT NULL,
  [Notes] nvarchar(1000) NOT NULL,
  [RollCount] integer NOT NULL,
  [TypeOfClass] nvarchar(20) NOT NULL,


)

CREATE TABLE [BeltRank] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Rank] nvarchar(20) NOT NULL,
  [img] nvarchar(1000) NOT NULL
)

