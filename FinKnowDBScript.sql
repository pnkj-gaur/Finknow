USE [master]
GO
/****** Object:  Database [QDoubt]    Script Date: 5/21/2021 4:08:09 PM ******/
CREATE DATABASE [QDoubt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QDoubt', FILENAME = N'C:\Users\Pankaj.gaur\QDoubt.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'QDoubt_log', FILENAME = N'C:\Users\Pankaj.gaur\QDoubt_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [QDoubt] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QDoubt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QDoubt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QDoubt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QDoubt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QDoubt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QDoubt] SET ARITHABORT OFF 
GO
ALTER DATABASE [QDoubt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QDoubt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QDoubt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QDoubt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QDoubt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QDoubt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QDoubt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QDoubt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QDoubt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QDoubt] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QDoubt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QDoubt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QDoubt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QDoubt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QDoubt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QDoubt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QDoubt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QDoubt] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [QDoubt] SET  MULTI_USER 
GO
ALTER DATABASE [QDoubt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QDoubt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QDoubt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QDoubt] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [QDoubt] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [QDoubt] SET QUERY_STORE = OFF
GO
USE [QDoubt]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [QDoubt]
GO
/****** Object:  Table [dbo].[authentication]    Script Date: 5/21/2021 4:08:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[authentication](
	[username] [varchar](50) NOT NULL,
	[token] [varchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comment]    Script Date: 5/21/2021 4:08:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comment](
	[comment] [varchar](200) NOT NULL,
	[sol_id] [numeric](18, 0) NOT NULL,
	[comment_id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
 CONSTRAINT [PK_comment] PRIMARY KEY CLUSTERED 
(
	[comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[query]    Script Date: 5/21/2021 4:08:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[query](
	[query_id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[title] [varchar](500) NOT NULL,
	[description] [text] NOT NULL,
	[date] [datetime] NOT NULL,
	[username] [varchar](50) NOT NULL,
	[category] [varchar](50) NOT NULL,
 CONSTRAINT [PK_query] PRIMARY KEY CLUSTERED 
(
	[query_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[readlater]    Script Date: 5/21/2021 4:08:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[readlater](
	[username] [varchar](50) NOT NULL,
	[query_id] [numeric](18, 0) NOT NULL,
	[rl_id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_readlater] PRIMARY KEY CLUSTERED 
(
	[rl_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[solution]    Script Date: 5/21/2021 4:08:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[solution](
	[sol_id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[solution] [text] NOT NULL,
	[username] [varchar](50) NOT NULL,
	[query_id] [numeric](18, 0) NOT NULL,
 CONSTRAINT [PK_solution] PRIMARY KEY CLUSTERED 
(
	[sol_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[up_vote]    Script Date: 5/21/2021 4:08:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[up_vote](
	[sol_id] [numeric](18, 0) NOT NULL,
	[user_name] [varchar](50) NOT NULL,
	[vote_id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_up_vote] PRIMARY KEY CLUSTERED 
(
	[vote_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 5/21/2021 4:08:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[authentication]  WITH CHECK ADD  CONSTRAINT [FK_authentication_user] FOREIGN KEY([username])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[authentication] CHECK CONSTRAINT [FK_authentication_user]
GO
ALTER TABLE [dbo].[comment]  WITH CHECK ADD  CONSTRAINT [FK_comment_solution] FOREIGN KEY([username])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[comment] CHECK CONSTRAINT [FK_comment_solution]
GO
ALTER TABLE [dbo].[query]  WITH CHECK ADD  CONSTRAINT [FK_query_user] FOREIGN KEY([username])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[query] CHECK CONSTRAINT [FK_query_user]
GO
ALTER TABLE [dbo].[readlater]  WITH CHECK ADD  CONSTRAINT [FK_readlater_query] FOREIGN KEY([query_id])
REFERENCES [dbo].[query] ([query_id])
GO
ALTER TABLE [dbo].[readlater] CHECK CONSTRAINT [FK_readlater_query]
GO
ALTER TABLE [dbo].[readlater]  WITH CHECK ADD  CONSTRAINT [FK_readlater_user] FOREIGN KEY([username])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[readlater] CHECK CONSTRAINT [FK_readlater_user]
GO
ALTER TABLE [dbo].[solution]  WITH CHECK ADD  CONSTRAINT [FK_solution_query] FOREIGN KEY([query_id])
REFERENCES [dbo].[query] ([query_id])
GO
ALTER TABLE [dbo].[solution] CHECK CONSTRAINT [FK_solution_query]
GO
ALTER TABLE [dbo].[solution]  WITH CHECK ADD  CONSTRAINT [FK_solution_user] FOREIGN KEY([username])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[solution] CHECK CONSTRAINT [FK_solution_user]
GO
ALTER TABLE [dbo].[up_vote]  WITH CHECK ADD  CONSTRAINT [FK_up_vote_solution] FOREIGN KEY([sol_id])
REFERENCES [dbo].[solution] ([sol_id])
GO
ALTER TABLE [dbo].[up_vote] CHECK CONSTRAINT [FK_up_vote_solution]
GO
ALTER TABLE [dbo].[up_vote]  WITH CHECK ADD  CONSTRAINT [FK_up_vote_user] FOREIGN KEY([user_name])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[up_vote] CHECK CONSTRAINT [FK_up_vote_user]
GO
USE [master]
GO
ALTER DATABASE [QDoubt] SET  READ_WRITE 
GO
