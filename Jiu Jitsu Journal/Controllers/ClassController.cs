using Microsoft.AspNetCore.Mvc;
using Jiu_Jitsu_Journal.Models;
using Jiu_Jitsu_Journal.Repositories;
//using Jiu_Jitsu_Journal.Services; 

namespace Jiu_Jitsu_Journal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassRepository _classRepository;
        //private readonly WeeklyReportGenerator _weeklyReportGenerator; 

        public ClassController(IClassRepository classRepository)
        {
            _classRepository = classRepository;
            //_weeklyReportGenerator = weeklyReportGenerator;
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
            
            _classRepository.Add(classInstance);
            return Ok();
        }

        //[HttpGet("weekly-report/{userProfileId}")]
        //public IActionResult GenerateWeeklyReport(int userProfileId, [FromQuery] string startDate, [FromQuery] string endDate)
        //{
            
        //    if (!DateTime.TryParse(startDate, out var startDateTime) || !DateTime.TryParse(endDate, out var endDateTime))
        //    {
        //        return BadRequest("Invalid date format. Please use the format: YYYY-MM-DD");
        //    }

           
        //    var report = _weeklyReportGenerator.GenerateWeeklyReportForUser(userProfileId, startDateTime, endDateTime);
        //    return Ok(report);
        //}
    }
}
