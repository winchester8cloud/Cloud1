IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[dogWalkers]'))
BEGIN
  CREATE TABLE [dbo].[dogWalkers] (
   [ID] INT NOT NULL PRIMARY KEY,
  [NAME] NCHAR(100),
  [EMAIL] NCHAR(100),
  [TOWN] NCHAR(100),
  [POSTCODE] NCHAR(100)
  );
END;