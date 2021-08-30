using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using finknow_services.Controllers;
using finknow_services.Models;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;

namespace Finknow_Tests
{
    class SolutionTest
    {

        [Test]
        public void GetSolution()
        {

            QDoubtContext fc = new QDoubtContext();
            SolutionsController sc = new SolutionsController(fc);

            dynamic sol = sc.GetSolutions();
            Assert.IsNotNull(sol);

        }




        [Test]
        [TestCase(2)]
        [TestCase(5)]
        [TestCase(3)]
        public void PutSolution(int id)
        {

            QDoubtContext fc = new QDoubtContext();
            SolutionsController sc = new SolutionsController(fc);

            Solution sol = new Solution();

            sol.SolId = id;

            object x = sc.PutSolution(sol.SolId, sol);

            Assert.NotNull(x);
        }
            [Test]
        public void GetSolByQuery()
        {

            QDoubtContext fc = new QDoubtContext();
            SolutionsController sc = new SolutionsController(fc);


            
            dynamic x = sc.GetSolnByQuery(2);

           
            Assert.That(x, Has.Exactly(1).Items);


        }

        [Test]
        public void GetSolByQueryCount()
        {

            QDoubtContext fc = new QDoubtContext();
            SolutionsController sc = new SolutionsController(fc);



            dynamic x = sc.GetSolnByQuery(2);


            Assert.That(x, Is.Unique);


        }

        [Test]
        public void DeleteSolution()
        {

            QDoubtContext fc = new QDoubtContext();
            SolutionsController sc = new SolutionsController(fc);

            Solution sol = new Solution();

            object x = sc.DeleteSolution(sol.SolId);

            Assert.NotNull(x);

        }
    }
}
