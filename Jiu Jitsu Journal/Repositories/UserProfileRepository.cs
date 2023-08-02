using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Jiu_Jitsu_Journal.Models;
using Jiu_Jitsu_Journal.Utils;

namespace Jiu_Jitsu_Journal.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration config)
            : base(config) { }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (FullName, Email, StartDate, WeeklyClassGoal, WeeklyRollGoal, BeltRank)
                        VALUES (@FullName, @Email, @StartDate, @WeeklyClassGoal, @WeeklyRollGoal, @BeltRank)";

                    DbUtils.AddParameter(cmd, "@FullName", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@StartDate", userProfile.StartDate);
                    DbUtils.AddParameter(cmd, "@WeeklyClassGoal", userProfile.WeeklyClassGoal);
                    DbUtils.AddParameter(cmd, "@WeeklyRollGoal", userProfile.WeeklyRollGoal);
                    DbUtils.AddParameter(cmd, "@BeltRank", userProfile.BeltRank);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserProfile WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<UserProfile> GetAll()
        {
            List<UserProfile> userProfiles = new List<UserProfile>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FullName, Email,  StartDate, WeeklyClassGoal, WeeklyRollGoal, BeltRank
                        FROM UserProfile";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            UserProfile userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                WeeklyClassGoal = DbUtils.GetInt(reader, "WeeklyClassGoal"),
                                WeeklyRollGoal = DbUtils.GetInt(reader, "WeeklyRollGoal"),
                                BeltRank = DbUtils.GetString(reader, "BeltRank"),
                            };

                            userProfiles.Add(userProfile);
                        }
                    }
                }
            }

            return userProfiles;
        }

        public UserProfile GetById(int id)
        {
            UserProfile userProfile = null;

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FullName, Email, StartDate, WeeklyClassGoal, WeeklyRollGoal, BeltRank
                        FROM UserProfile
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                WeeklyClassGoal = DbUtils.GetInt(reader, "WeeklyClassGoal"),
                                WeeklyRollGoal = DbUtils.GetInt(reader, "WeeklyRollGoal"),
                                BeltRank = DbUtils.GetString(reader, "BeltRank"),
                            };
                        }
                    }
                }
            }

            return userProfile;
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                        SET FullName = @FullName,
                            Email = @Email,
                            StartDate = @StartDate,
                            WeeklyClassGoal = @WeeklyClassGoal,
                            WeeklyRollGoal = @WeeklyRollGoal,
                            BeltRank = @BeltRank
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@FullName", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@StartDate", userProfile.StartDate);
                    DbUtils.AddParameter(cmd, "@WeeklyClassGoal", userProfile.WeeklyClassGoal);
                    DbUtils.AddParameter(cmd, "@WeeklyRollGoal", userProfile.WeeklyRollGoal);
                    DbUtils.AddParameter(cmd, "@BeltRank", userProfile.BeltRank);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}




