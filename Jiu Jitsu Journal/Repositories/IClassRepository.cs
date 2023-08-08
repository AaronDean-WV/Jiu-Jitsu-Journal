using System.Collections.Generic;
using Jiu_Jitsu_Journal.Models;

namespace Jiu_Jitsu_Journal.Repositories
{
    public interface IClassRepository
    {
        List<Class> GetAll();
        void Add(Class Class);
     
    }
}
