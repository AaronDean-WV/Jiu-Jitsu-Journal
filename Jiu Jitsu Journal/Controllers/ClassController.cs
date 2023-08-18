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
        private readonly IUserProfileRepository _userProfileRepository;

        public ClassController(IBjjClassRepository bjjClassRepository)
        {
            _bjjClassRepository = bjjClassRepository;
          
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
        [HttpGet("GetByUserId/{id}")]
        public IActionResult GetClassesByUserId(int id)
        {
            var bjjClasses = _bjjClassRepository.GetClassesByUserId(id);
            if (bjjClasses == null)
            {
                return NotFound();
            }
            return Ok(bjjClasses);
        }
    }
}

