using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using finknow_services.Controllers;
using finknow_services.Models;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace Finknow_Tests
{
    class CommentsTest
    {
        [Test]
        public void GetCommenttype()
        {

            QDoubtContext fc = new QDoubtContext();
            CommentsController cc = new CommentsController(fc);

            object comment = cc.GetComments();

            Assert.IsInstanceOf<Task<ActionResult<IEnumerable<Comment>>>>(comment);

        }

        [Test]
        public void GetComment()
        {

            QDoubtContext fc = new QDoubtContext();
            CommentsController cc = new CommentsController(fc);

            object comment = cc.GetComments();

            Assert.IsNotNull(comment);

        }

        


        [Test]
        public void PostComment()
        {

            QDoubtContext fc = new QDoubtContext();
            CommentsController cc = new CommentsController(fc);

            Comment com = new Comment();
            var x = cc.PostComment(com);

            Assert.IsNotNull(x);

        }

        [Test]
        public void PutArcheive()
        {

            QDoubtContext fc = new QDoubtContext();
            CommentsController cc = new CommentsController(fc);

            Comment com = new Comment();

            int id = 2;
            object x = cc.PutComment(id, com);

            Assert.NotNull(x);


        }

        [Test]
        public void DeleteArcheive()
        {

            QDoubtContext fc = new QDoubtContext();
            CommentsController cc = new CommentsController(fc);

            Comment com = new Comment();

            object x = cc.DeleteComment(com.CommentId);

            Assert.NotNull(x);

        }
    }
}
