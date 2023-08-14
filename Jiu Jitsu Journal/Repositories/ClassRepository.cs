using System;
using System.Collections.Generic;
using Jiu_Jitsu_Journal.Models;
using Microsoft.Extensions.Configuration;
using Jiu_Jitsu_Journal.Utils;
using System.Reflection.Metadata.Ecma335;

namespace Jiu_Jitsu_Journal.Repositories
{
    public class BjjClassRepository : BaseRepository, IBjjClassRepository
    {
        public BjjClassRepository(IConfiguration configuration) : base(configuration) { }

        public List<BjjClass> GetAll()
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                SELECT c.Id, c.Notes, c.TypeOfClass, c.Date, c.rollCount, c.UserProfileId, up.FullName, up.Email, up.WeeklyClassGoal, up.WeeklyRollGoal  
                FROM BjjClass c
                JOIN UserProfile up ON c.UserProfileId = up.Id
                ORDER BY c.Date ASC
            ";
            var reader = cmd.ExecuteReader();
            var bjjClasses = new List<BjjClass>();
            while (reader.Read())
            {
                bjjClasses.Add(new BjjClass()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Notes = reader.GetString(reader.GetOrdinal("Notes")),
                    TypeOfClass = reader.GetString(reader.GetOrdinal("TypeOfClass")),
                    Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                    RollCount = reader.GetInt32(reader.GetOrdinal("RollCount")),
                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    UserProfile = new UserProfile()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                        FullName = reader.GetString(reader.GetOrdinal("FullName")),
                        Email = reader.GetString(reader.GetOrdinal("Email")),
                        WeeklyClassGoal = reader.GetInt32(reader.GetOrdinal("WeeklyClassGoal")),
                        WeeklyRollGoal = reader.GetInt32(reader.GetOrdinal("WeeklyRollGoal"))
                    }
                }
                );
            }
            reader.Close();
            return bjjClasses;
        }

        public void Add(BjjClass classInstance)
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                INSERT INTO BjjClass (Notes, TypeOfClass, Date, RollCount, UserProfileId)
                OUTPUT INSERTED.ID
                VALUES (@notes, @typeOfClass, @date, @rollCount,@UserProfileId);
            ";
            cmd.Parameters.AddWithValue("@notes", classInstance.Notes);
            cmd.Parameters.AddWithValue("@typeOfClass", classInstance.TypeOfClass);
            cmd.Parameters.AddWithValue("@date", classInstance.Date);
            cmd.Parameters.AddWithValue("@rollCount", classInstance.RollCount);
            cmd.Parameters.AddWithValue("@UserProfileId", classInstance.UserProfileId);

            classInstance.Id = (int)cmd.ExecuteScalar();


            //cmd.ExecuteNonQuery();
        }
        public BjjClass GetByClassId(int id)
        {
            BjjClass bjjClass = null;
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
SELECT c.Id AS ClassId, c.Notes, c.TypeOfClass, c.Date, c.RollCount, c.UserProfileId AS UserProfileId, up.FullName, up.Email, up.WeeklyClassGoal, up.WeeklyRollGoal
FROM BjjClass c
JOIN UserProfile up ON c.UserProfileId = up.Id
WHERE c.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            bjjClass = new BjjClass()
                            {
                                Id = DbUtils.GetInt(reader, "ClassId"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                TypeOfClass = DbUtils.GetString(reader, "TypeOfClass"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                RollCount = DbUtils.GetInt(reader, "RollCount"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FullName = DbUtils.GetString(reader, "FullName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    WeeklyClassGoal = DbUtils.GetInt(reader, "WeeklyClassGoal"),
                                    WeeklyRollGoal = DbUtils.GetInt(reader, "WeeklyRollGoal")
                                }
                            };
                        }
                    }
                }
            }
            return bjjClass;
        }
        public List<BjjClass> GetClassesByUserId(int userId)
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
        SELECT c.Id AS ClassId, c.Notes, c.TypeOfClass, c.Date, c.RollCount, c.UserProfileId AS UserProfileId, up.FullName, up.Email, up.WeeklyClassGoal, up.WeeklyRollGoal
        FROM BjjClass c
        JOIN UserProfile up ON c.UserProfileId = up.Id
        WHERE c.UserProfileId = @UserId
        ORDER BY c.Date ASC";
            cmd.Parameters.AddWithValue("@UserId", userId);

            var reader = cmd.ExecuteReader();
            var bjjClasses = new List<BjjClass>();

            while (reader.Read())
            {
                bjjClasses.Add(new BjjClass()
                {
                    Id = DbUtils.GetInt(reader, "ClassId"),
                    Notes = DbUtils.GetString(reader, "Notes"),
                    TypeOfClass = DbUtils.GetString(reader, "TypeOfClass"),
                    Date = DbUtils.GetDateTime(reader, "Date"),
                    RollCount = DbUtils.GetInt(reader, "RollCount"),
                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                    UserProfile = new UserProfile()
                    {
                        Id = DbUtils.GetInt(reader, "UserProfileId"),
                        FullName = DbUtils.GetString(reader, "FullName"),
                        Email = DbUtils.GetString(reader, "Email"),
                        WeeklyClassGoal = DbUtils.GetInt(reader, "WeeklyClassGoal"),
                        WeeklyRollGoal = DbUtils.GetInt(reader, "WeeklyRollGoal")
                    }
                });
            }

            reader.Close();
            return bjjClasses;
        }



    }
}

