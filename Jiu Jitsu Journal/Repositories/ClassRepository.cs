﻿using System;
using System.Collections.Generic;
using Jiu_Jitsu_Journal.Models;
using Microsoft.Extensions.Configuration;

namespace Jiu_Jitsu_Journal.Repositories
{
    public class ClassRepository : BaseRepository, IClassRepository
    {
        public ClassRepository(IConfiguration configuration) : base(configuration) { }

        public List<Class> GetAll()
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                SELECT c.Id, c.Notes, c.TypeOfClass, c.Date, c.Duration, c.UserProfileId, 
                    u.FullName AS FullName
                FROM Class c
                JOIN UserProfile u ON c.UserProfileId = u.Id
                ORDER BY c.Date ASC
            ";
            var reader = cmd.ExecuteReader();
            var classes = new List<Class>();
            while (reader.Read())
            {
                classes.Add(new Class()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Notes = reader.GetString(reader.GetOrdinal("Notes")),
                    TypeOfClass = reader.GetString(reader.GetOrdinal("TypeOfClass")),
                    Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                    Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    UserProfile = new UserProfile()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                        FullName = reader.GetString(reader.GetOrdinal("FullName"))
                    }
                });
            }
            reader.Close();
            return classes;
        }

        public void Add(Class classInstance)
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                INSERT INTO Class (Notes, TypeOfClass, Date, Duration, UserProfileId)
                VALUES (@notes, @typeOfClass, @date, @duration, @userProfileId);
            ";
            cmd.Parameters.AddWithValue("@notes", classInstance.Notes);
            cmd.Parameters.AddWithValue("@typeOfClass", classInstance.TypeOfClass);
            cmd.Parameters.AddWithValue("@date", classInstance.Date);
            cmd.Parameters.AddWithValue("@duration", classInstance.Duration);
            cmd.Parameters.AddWithValue("@userProfileId", classInstance.UserProfileId);

            cmd.ExecuteNonQuery();
        }

        public List<Class> GetClassesForUserInRange(int userProfileId, DateTime startDate, DateTime endDate)
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
            SELECT c.Id, c.Notes, c.TypeOfClass, c.Date, c.Duration, c.UserProfileId, 
                u.DisplayName AS InstructorName
            FROM Class c
            JOIN UserProfile u ON c.UserProfileId = u.Id
            WHERE c.UserProfileId = @userProfileId
            AND c.Date >= @startDate AND c.Date <= @endDate
            ORDER BY c.Date ASC
        ";
            cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
            cmd.Parameters.AddWithValue("@startDate", startDate);
            cmd.Parameters.AddWithValue("@endDate", endDate);

            var reader = cmd.ExecuteReader();
            var classes = new List<Class>();
            while (reader.Read())
            {
                classes.Add(new Class()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Notes = reader.GetString(reader.GetOrdinal("Notes")),
                    TypeOfClass = reader.GetString(reader.GetOrdinal("TypeOfClass")),
                    Date = reader.GetDateTime(reader.GetOrdinal("Date")),
                    Duration = reader.GetInt32(reader.GetOrdinal("Duration")),
                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    UserProfile = new UserProfile()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                        FullName = reader.GetString(reader.GetOrdinal("FullName"))
                    }
                });
            }
            reader.Close();
            return classes;
        }
    }
}