using Jiu_Jitsu_Journal.Models;

namespace Jiu_Jitsu_Journal.Models
{
    public class UserProfile
    {
    public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string ImageLocation { get; set; }
        public int BeltRankId { get; set; }
        public BeltRank BeltRank { get; set; }

        public int WeeklyClassGoal { get; set; }
        public int WeeklyRollGoal { get; set; }

    }
}


//[Id] integer PRIMARY KEY IDENTITY,

//[FullName] nvarchar(20) NOT NULL,

//[Email] nvarchar(50) NOT NULL,

//[BeltRankId] integer NOT NULL,

//[StartDate] date NOT NULL,

//[WeeklyClassGoal] integer NOT NULL,

//[WeeklyRollGoal] integer NOT NULL,