using Jiu_Jitsu_Journal.Models;

namespace Jiu_Jitsu_Journal.Models
{
    public class UserProfile
    {
    public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string BeltRank { get; set; }
        public int WeeklyClassGoal { get; set; }
        public int WeeklyRollGoal { get; set; }
    }
}
