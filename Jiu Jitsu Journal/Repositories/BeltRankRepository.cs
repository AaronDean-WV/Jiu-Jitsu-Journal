using Jiu_Jitsu_Journal.Models;
using Jiu_Jitsu_Journal.Utils;

namespace Jiu_Jitsu_Journal.Repositories
{
    public class BeltRankRepository : BaseRepository, IBeltRankRepository
    {
        public BeltRankRepository(IConfiguration configuration) : base(configuration) { }
        public BeltRank? GetBeltRankById(int id)
        {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        SELECT Id, Rank, Img
                        FROM BeltRank
                        WHERE Id = @id";
                        DbUtils.AddParameter(cmd, "@id", id);
                        var reader = cmd.ExecuteReader();
                        BeltRank beltRank = null;
                        if (reader.Read())
                        {
                            beltRank = new BeltRank()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Rank = DbUtils.GetString(reader, "Rank"),
                                Img = DbUtils.GetString(reader, "Img"),
                            };
                        }
                        reader.Close();
                        return beltRank;
                    }
                }
            }
        }
    }

