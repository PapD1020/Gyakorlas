using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoworkerController : ControllerBase
    {
        [HttpGet]
        [Route("GetCoworkerNumber")]

        public IActionResult GetCount()
        {
            using (var context = new companyContext())
            {
                try
                {
                    return StatusCode(200, context.Coworkers.Count());
                }
                catch(Exception e)
                {
                    return StatusCode(400, e.Message);
                }
            }
        }

        [HttpGet]
        [Route("GetCoworkerByEmail")]

        public IActionResult GetCoworker(string email)
        {
            using (var context = new companyContext())
            {
                try
                {
                    return StatusCode(200, context.Coworkers.Include(cw => cw.Notebooks).Include(cw => cw.Phones).FirstOrDefault(cw => cw.Email == email));
                }
                catch(Exception e)
                {
                    return StatusCode(400, "Hiba üzenet: " + e.Message);
                }
            }
        }

        [HttpPost]
        [Route("AddCoworker")]

        public IActionResult Post(Coworker coworker, string uid)
        {
            if(WebApi.Program.UID == uid)
            {
                using(var context = new companyContext())
                {
                    try
                    {
                        context.Coworkers.Add(coworker);
                        context.SaveChanges();

                        return StatusCode(201, "Sikeresen hozzáadva!");
                    }
                    catch(Exception e)
                    {
                        return BadRequest(e.Message);
                    }
                }
            }
            else
            {
                return StatusCode(401, "Nincs jogosultsága.");
            }
        }

        [HttpPut]
        [Route("UpdateCoworker")]

        public IActionResult Put(Coworker coworker, string uid)
        {
            if(WebApi.Program.UID == uid)
            {
                using(var context = new companyContext())
                {
                    try
                    {
                        context.Coworkers.Update(coworker);
                        context.SaveChanges();

                        return StatusCode(200, "Sikeresen frissítve.");
                    }
                    catch(Exception e)
                    {
                        return BadRequest(e.Message);
                    }
                }
            }
            else
            {
                return StatusCode(401, "Nincs jogosultsága.");
            }
        }

        [HttpDelete]
        [Route("DeleteCoworker")]

        public IActionResult Delete(int id, string uid)
        {
            if(WebApi.Program.UID == uid)
            {
                using(var context = new companyContext())
                {
                    try
                    {
                        Coworker coworker = new Coworker();
                        coworker.Id = id;
                        context.Coworkers.Remove(coworker);
                        context.SaveChanges();

                        return StatusCode(204, "Sikeres törlés!");
                    }
                    catch(Exception e)
                    {
                        return BadRequest(e.Message);
                    }
                }
            }
            else
            {
                return StatusCode(401, "Nincs jogosultsága!");
            }
        }
    }
}
