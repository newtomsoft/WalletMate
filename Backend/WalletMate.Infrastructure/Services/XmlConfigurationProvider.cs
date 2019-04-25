﻿using System.Collections.Generic;
using System.IO;
using System.Reflection;
using WalletMate.Domain.Common;
using WalletMate.Infrastructure.Dto;

namespace WalletMate.Infrastructure.Services
{
    public class XmlConfigurationProvider : IConfigurationProvider
    {   
        private IReadOnlyList<User> _users;

        public XmlConfigurationProvider(string configurationFile = null)
        {
            if (configurationFile.IsEmpty())
            {
                var currentDirectory = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
                configurationFile = Path.Combine(currentDirectory, "Users.config");
            }

            if (!File.Exists(configurationFile))
            {
                CreateDefaultConfiguration();
                throw new FileNotFoundException("La configuration des utilisateurs n'a pas été trouvée. Un fichier a été généré pour que vous puissiez l'éditer");
            }

            var configuration = ConfigurationDeserializer.Deserialize(configurationFile);
            _users = configuration.GetUsersWithDecryptedPassword();

            void CreateDefaultConfiguration()
            {
                var config = new WalletMateConfiguration();
                config.FirstPair = new User("FirstUserName", "");
                config.SecondPair = new User("SecondUserName", "");
                config.Operator = new User("OperatorUserName", "");
                Xml.SaveTo(configurationFile, config);
            }
        }

        public IReadOnlyList<User> GetUsers()
        {
            return _users;
        }
    }
}