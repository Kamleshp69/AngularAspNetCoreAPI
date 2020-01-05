using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class PolicyController : Controller
    {
        private readonly IPolicyRepository _policyRepository;
        
        public PolicyController(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }


        //TODO add methods to get/create/update/delete data from _repository
        [HttpGet]
        public IEnumerable<Policy> Get()
        {
            return _policyRepository.Get();
        }

        [HttpGet("{id}")]
        public Policy GetPolicy(int id)
        {
            return _policyRepository.GetPolicy(id);
        }


        [HttpPost]
        public IActionResult CreatePolicy([FromBody] Policy policy)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            //var policy = mapper.Map<EmployeeResource, Employee>(employeeResource);

            _policyRepository.Add(policy);

             return Ok(policy);
        }

        [HttpPut("{id}")]
        public  IActionResult UpdatePolicy(int id, [FromBody] Policy policy)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _policyRepository.Update(policy);         

            return Ok(policy);

        }
        [HttpDelete("{id}")]
        public IActionResult DeletePolicy(int id)
        {
            _policyRepository.Remove(id);
            return Ok();
        }
    }
}
