=USE [master]

IF db_id('Tabloid') IS NULl
  CREATE DATABASE [Journal]
GO

USE [Journal]
GO

DROP TABLE IF EXISTS [PreviousWeeks];
DROP TABLE IF EXISTS [WeeklyReport];
DROP TABLE IF EXISTS [Class];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [BeltRank];
GO

CREATE TABLE [USerProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FullName] nvarchar(20) NOT NULL,
  [Email] nvarchar(50) NOT NULL,
  [BeltRankId] integer NOT NULL,
  [StartDate] date NOT NULL,
  [WeeklyClassGoal] integer NOT NULL,
  [WeeklyRollGoal] integer NOT NULL,
)

CREATE TABLE [BeltRank] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Color] nvarchar(20) NOT NULL,
  [img] varbinary(max) NOT NULL
)

CREATE TABLE [Class] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Date] date NOT NULL,
  [Time] time NOT NULL,
  [Duration] integer NOT NULL,
  [Notes] nvarchar(1000) NOT NULL,
  [UserId] integer NOT NULL,
  [TypeOfClass] nvarchar(20) NOT NULL
)

CREATE TABLE [WeeklyReport] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Date] date NOT NULL,
  [UserId] integer NOT NULL,
  [ClassId] integer NOT NULL,
  [TotalClasses] integer NOT NULL,
  [TotalRolls] integer NOT NULL,
)

CREATE TABLE [PreviousWeeks] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Date] date NOT NULL,
  [UserId] integer NOT NULL,
  [ClassId] integer NOT NULL,
  [TotalClasses] integer NOT NULL,
  [TotalRolls] integer NOT NULL,
)
