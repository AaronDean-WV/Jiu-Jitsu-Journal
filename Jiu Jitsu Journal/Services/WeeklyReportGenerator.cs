using System;
using System.Collections.Generic;
using Jiu_Jitsu_Journal.Models;
using Jiu_Jitsu_Journal.Repositories;

namespace Jiu_Jitsu_Journal.Services
{
    public class WeeklyReportGenerator
    {
        private readonly IClassRepository _classRepository;

        public WeeklyReportGenerator(IClassRepository classRepository)
        {
            _classRepository = classRepository;
        }

        public string GenerateWeeklyReportForUser(int userProfileId, DateTime startDate, DateTime endDate)
        {
            var userClasses = _classRepository.GetClassesForUserInRange(userProfileId, startDate, endDate);
            if (userClasses.Count == 0)
            {
                return "No classes found for the given week.";
            }

            // Group classes by day
            var classesByDay = new Dictionary<DateTime, List<Class>>();
            foreach (var userClass in userClasses)
            {
                var classDate = userClass.Date.Date; // Considering only the date, ignoring time
                if (!classesByDay.ContainsKey(classDate))
                {
                    classesByDay[classDate] = new List<Class>();
                }
                classesByDay[classDate].Add(userClass);
            }

            // Generate the report
            var report = "Weekly Report for User\n\n";
            foreach (var (day, classes) in classesByDay)
            {
                report += $"{day:yyyy-MM-dd}\n";
                foreach (var userClass in classes)
                {
                    report += $" - {userClass.TypeOfClass} at {userClass.Date:HH:mm}\n";
                    // Add more class details if needed
                }
                report += "\n";
            }

            return report;
        }
    }
}
