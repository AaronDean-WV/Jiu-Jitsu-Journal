using System;
using System.Collections.Generic;
using Jiu_Jitsu_Journal.Models;
using Microsoft.Extensions.Configuration;

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
    }
}
