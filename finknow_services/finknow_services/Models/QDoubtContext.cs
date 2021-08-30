using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace finknow_services.Models
{
    public partial class QDoubtContext : DbContext
    {
        public QDoubtContext()
        {
        }

        public QDoubtContext(DbContextOptions<QDoubtContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Authentication> Authentications { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Query> Queries { get; set; }
        public virtual DbSet<Readlater> Readlaters { get; set; }
        public virtual DbSet<Solution> Solutions { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(localdb)\\ProjectsV13;Database= QDoubt;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Authentication>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("authentication");

                entity.Property(e => e.Token)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("token");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_authentication_user");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comment");

                entity.Property(e => e.CommentId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("comment_id");

                entity.Property(e => e.Comment1)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("comment");

                entity.Property(e => e.SolId)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("sol_id");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.Sol)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.SolId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comment_solution1");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comment_solution");
            });

            modelBuilder.Entity<Query>(entity =>
            {
                entity.ToTable("query");

                entity.Property(e => e.QueryId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("query_id");

                entity.Property(e => e.Category)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("category");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("description");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("title");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.Queries)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_query_user");
            });

            modelBuilder.Entity<Readlater>(entity =>
            {
                entity.HasKey(e => e.RlId);

                entity.ToTable("readlater");

                entity.Property(e => e.RlId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("rl_id");

                entity.Property(e => e.QueryId)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("query_id");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.Query)
                    .WithMany(p => p.Readlaters)
                    .HasForeignKey(d => d.QueryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_readlater_query");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.Readlaters)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_readlater_user");
            });

            modelBuilder.Entity<Solution>(entity =>
            {
                entity.HasKey(e => e.SolId);

                entity.ToTable("solution");

                entity.Property(e => e.SolId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("sol_id");

                entity.Property(e => e.QueryId)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("query_id");

                entity.Property(e => e.Solution1)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("solution");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.Query)
                    .WithMany(p => p.Solutions)
                    .HasForeignKey(d => d.QueryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_solution_query");

                entity.HasOne(d => d.UsernameNavigation)
                    .WithMany(p => p.Solutions)
                    .HasForeignKey(d => d.Username)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_solution_user");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username);

                entity.ToTable("user");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
