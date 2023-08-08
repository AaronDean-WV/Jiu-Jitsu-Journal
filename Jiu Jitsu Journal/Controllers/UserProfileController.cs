using Microsoft.AspNetCore.Mvc;
using Jiu_Jitsu_Journal.Models;
using Jiu_Jitsu_Journal.Repositories;

namespace Jiu_Jitsu_Journal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IBeltRankRepository _beltRankRepository;

        public UserProfileController(IUserProfileRepository userProfileRepository, IBeltRankRepository beltRankRepository)
        {
            _userProfileRepository = userProfileRepository;
            _beltRankRepository = beltRankRepository;
        }

        // GET: api/UserProfile
        [HttpGet]
        public IActionResult GetAll()
        {
            var userProfiles = _userProfileRepository.GetAll();
            return Ok(userProfiles);
        }

        // GET: api/UserProfile/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        // POST: api/UserProfile
        [HttpPost]
        public IActionResult Add(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(nameof(GetById), new { id = userProfile.Id }, userProfile);
        }

        // PUT: api/UserProfile/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, UserProfile userProfile)
        {
            var existingUserProfile = _userProfileRepository.GetById(id);
            if (existingUserProfile == null)
            {
                return NotFound();
            }
            userProfile.Id = id;
            _userProfileRepository.Update(userProfile);
            return NoContent();
        }

        // DELETE: api/UserProfile/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingUserProfile = _userProfileRepository.GetById(id);
            if (existingUserProfile == null)
            {
                return NotFound();
            }
            _userProfileRepository.Delete(id);
            return NoContent();
        }
    }
}
