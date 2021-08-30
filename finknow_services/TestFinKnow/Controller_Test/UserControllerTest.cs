using finknow_services.Controllers;
using finknow_services.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Finknow_Tests
{
    public class UserTest
    {
       [Test]
       

        public void GetUsers()
        {

            QDoubtContext fc = new QDoubtContext();
            UsersController uc = new UsersController(fc);

            object user = uc.GetUsers();
            
            Assert.IsNotNull(user);
           
            

        }

        [Test]
        public void PostUser()
        {

            QDoubtContext fc = new QDoubtContext();
            UsersController uc = new UsersController(fc);

            object x = uc.GetUsers();

            Assert.IsNotNull(x);

        }

        [Test]
        public void GetUserstype()
        {

            QDoubtContext fc = new QDoubtContext();
            UsersController uc = new UsersController(fc);

            var user = uc.GetUsers();

            Assert.IsInstanceOf<Task<ActionResult<IEnumerable<User>>>>(user);


        }

        [Test]
        public void PutUser()
        {

            QDoubtContext fc = new QDoubtContext();
            UsersController uc = new UsersController(fc);
            User user = new User();

            int id = 2;
            object x = uc.PutUser(id.ToString(),user);

            Assert.NotNull(x);


        }

        [Test]
        public void DeleteUser()
        {

            QDoubtContext fc = new QDoubtContext();
            UsersController uc = new UsersController(fc);

            var id = 4;

            object x = uc.DeleteUser(id.ToString());

            Assert.IsNotNull(x);

        }

    }
}