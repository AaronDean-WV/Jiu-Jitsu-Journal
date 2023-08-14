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
                SELECT c.Id, c.Notes, c.TypeOfClass, c.Date, c.rollCount  
                FROM BjjClass c
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

                });
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
                INSERT INTO BjjClass (Notes, TypeOfClass, Date, RollCount)
                VALUES (@notes, @typeOfClass, @date, @rollCount);
            ";
            cmd.Parameters.AddWithValue("@notes", classInstance.Notes);
            cmd.Parameters.AddWithValue("@typeOfClass", classInstance.TypeOfClass);
            cmd.Parameters.AddWithValue("@date", classInstance.Date);
            cmd.Parameters.AddWithValue("@rollCount", classInstance.RollCount);


            cmd.ExecuteNonQuery();
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
SELECT Id, Notes, TypeOfClass, Date, RollCount
FROM BjjClass
WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            bjjClass = new BjjClass()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                TypeOfClass = DbUtils.GetString(reader, "TypeOfClass"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                RollCount = DbUtils.GetInt(reader, "RollCount"),
                            };
                        }
                    }
                }
            }
            return bjjClass;
        }
    }
}
