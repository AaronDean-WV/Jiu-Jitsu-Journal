USE [Journal];
GO

set identity_insert [BeltRank] on
insert into [BeltRank] ([Id], [Color], [img]) values (1, 'White','https://flyclipart.com/thumb2/bjj-white-belt-577030.png') 
insert into [BeltRank] ([Id], [Color], [img]) values (2, 'Blue','https://www.phukettopteam.com/news/wp-content/uploads/2018/12/220px-BJJ_Blue_Belt.svg_.png')
insert into [BeltRank] ([Id], [Color], [img]) values (3, 'Purple','https://clipart-library.com/new_gallery/262-2627262_bjj-purple-belt-black-belt-silhouette.png')
insert into [BeltRank] ([Id], [Color], [img]) values (4, 'Brown','https://i.ebayimg.com/images/g/fOcAAOSwRrVfNw~N/s-l400.jpg')
insert into [BeltRank] ([Id], [Color], [img]) values (5, 'Black','https://bjiujitsu.com/wp-content/uploads/2021/01/bb-512-1.png')



set identity_insert [Class] on
insert into [Class] ([Id], [Date], [Notes], [RollCount], [UserProfileId], [TypeOfClass]) values (1, '2020-01-01',  'notes', 1, 1, 'Gi')
 


set identity_insert [UserProfile] on
insert into [UserProfile] ([Id], [FullName], [Email], [BeltRankId], [StartDate], [WeeklyClassGoal], [WeeklyRollGoal]) values (1, 'John Doe', 'jd@email.com', 1, '2020-01-01', 3, 10)



set identity_insert [WeeklyReport] on 
insert into [WeeklyReport] ([Id], [Date], [UserId], [ClassId], [TotalClasses], [TotalRolls]) values (1, '2020-01-01', 1, 1, 3, 10)



set identity_insert [PreviousWeeks] on
insert into [PreviousWeeks] ([Id], [Date], [UserId], [ClassId], [TotalClasses], [TotalRolls]) values (1, '2020-01-01', 1, 1, 3, 10)





