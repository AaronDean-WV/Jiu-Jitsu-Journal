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
        private readonly IBjjClassRepository _bjjClassRepository;
        //private readonly WeeklyReportGenerator _weeklyReportGenerator; 

        public ClassController(IBjjClassRepository bjjClassRepository)
        {
            _bjjClassRepository = bjjClassRepository;
            //_weeklyReportGenerator = weeklyReportGenerator;
        }

        [HttpGet]
        public IActionResult GetAllClasses()
        {
            var bjjClasses = _bjjClassRepository.GetAll();
            return Ok(bjjClasses);
        }

        [HttpPost]
        public IActionResult AddClass([FromBody] BjjClass bjjClassInstance)
        {
            
            _bjjClassRepository.Add(bjjClassInstance);
            return Ok();
        }
        [HttpGet("{id}")]
        public IActionResult GetByClassId(int id)
        {
            var bjjClass = _bjjClassRepository.GetByClassId(id);
            if (bjjClass == null)
            {
                return NotFound();
            }
            return Ok(bjjClass);
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
