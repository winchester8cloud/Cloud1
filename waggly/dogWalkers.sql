IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[dogWalkers]'))
BEGIN
  CREATE TABLE [dbo].[dogWalkers] (
  [NAME] NCHAR(100),
  [EMAIL] NCHAR(100) NOT NULL PRIMARY KEY,
  [TOWN] NCHAR(100),
  [POSTCODE] NCHAR(100)
  );
END;