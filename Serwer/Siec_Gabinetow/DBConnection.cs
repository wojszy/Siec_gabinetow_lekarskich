using System;
using Oracle.ManagedDataAccess.Client;

namespace Siec_Gabinetow
{
    public class DBConnection
    {
        public static void Connect(string conString)
        {
            using (OracleConnection con = new OracleConnection(conString))
            {
                using (OracleCommand cmd = con.CreateCommand())
                {
                    try
                    {
                        OracleConfiguration.TnsAdmin = @"Wallet_DB202201162011";
                        OracleConfiguration.WalletLocation = @"Wallet_DB202201162011";
                        con.Open();
                        Console.WriteLine("Successfully connected to Oracle Autonomous Database");
                        cmd.CommandText = "SELECT BANNER FROM V$VERSION";
                        OracleDataReader reader = cmd.ExecuteReader();
                        reader.Read();
                        Console.WriteLine("Connected to " + reader.GetString(0));
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }

                }
            }
        }

    }
}