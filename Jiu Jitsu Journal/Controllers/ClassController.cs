using Microsoft.AspNetCore.Mvc;
using Jiu_Jitsu_Journal.Models;
using Jiu_Jitsu_Journal.Repositories;
using Jiu_Jitsu_Journal.Services; // Import the WeeklyReportGenerator service namespace

namespace Jiu_Jitsu_Journal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassRepository _classRepository;
        private readonly WeeklyReportGenerator _weeklyReportGenerator; // Add the WeeklyReportGenerator service

        public ClassController(IClassRepository classRepository, WeeklyReportGenerator weeklyReportGenerator)
        {
            _classRepository = classRepository;
            _weeklyReportGenerator = weeklyReportGenerator; // Inject the WeeklyReportGenerator service
        }

        [HttpGet]
        public IActionResult GetAllClasses()
        {
            var classes = _classRepository.GetAll();
            return Ok(classes);
        }

        [HttpPost]
        public IActionResult AddClass([FromBody] Class classInstance)
        {
            // You can add validation or other business logic here if needed.
            _classRepository.Add(classInstance);
            return Ok();
        }

        [HttpGet("weekly-report/{userProfileId}")]
        public IActionResult GenerateWeeklyReport(int userProfileId, [FromQuery] string startDate, [FromQuery] string endDate)
        {
            // Convert the startDate and endDate strings to DateTime objects
            if (!DateTime.TryParse(startDate, out var startDateTime) || !DateTime.TryParse(endDate, out var endDateTime))
            {
                return BadRequest("Invalid date format. Please use the format: YYYY-MM-DD");
            }

            // Call the WeeklyReportGenerator service to generate the report
            var report = _weeklyReportGenerator.GenerateWeeklyReportForUser(userProfileId, startDateTime, endDateTime);
            return Ok(report);
        }
    }
}
