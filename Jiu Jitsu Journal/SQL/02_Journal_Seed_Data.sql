USE [Journal];
GO

set identity_insert [UserProfile] on
insert into [UserProfile] ([Id], [FullName], [Email],  [WeeklyClassGoal], [WeeklyRollGoal]) values (1, 'John Doe', 'jd@email.com',  3, 10);
set identity_insert [UserProfile] off;


 











