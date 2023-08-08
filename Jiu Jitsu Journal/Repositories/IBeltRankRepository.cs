using System.Collections.Generic;
using Jiu_Jitsu_Journal.Models;

namespace Jiu_Jitsu_Journal.Repositories
{
    public interface IBeltRankRepository
    {
        public BeltRank GetBeltRankById(int id);
    }
}
