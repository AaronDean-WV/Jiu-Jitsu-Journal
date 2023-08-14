using System.Collections.Generic;
using Jiu_Jitsu_Journal.Models;

namespace Jiu_Jitsu_Journal.Repositories
{
    public interface IBjjClassRepository
    {
        List<BjjClass> GetAll();
        void Add(BjjClass Class);
        BjjClass GetByClassId(int id);
        List<BjjClass> GetClassesByUserId(int id);
     
    }
}
