using System.Net;
using System.Threading.Tasks;
using CoupleExpenses.Infrastructure.Tests.Assets;
using FluentAssertions;
using Xunit;

namespace CoupleExpenses.Infrastructure.Tests
{
    public class FakeServerShould
    {
        [Fact]
        public async Task Call_authenticate_with_success()
        {
            using (var server = new FakeServer())
            {
                var reponse = await server.Authenticate("aurelien", "0f46f2fb6f5a91c79e86acc5da7df95176b4e4c7");
                reponse.Should().BeTrue();
            }
        }

        [Fact]
        public async Task Add_new_period_with_authenticated_user()
        {
            using (var server = new FakeServer())
            {
                await server.Authenticate("aurelien", "0f46f2fb6f5a91c79e86acc5da7df95176b4e4c7");
                var response = await server.CreatePeriod(1, 2000);
                response.Should().Be(HttpStatusCode.OK);
            }
        }

        [Fact]
        public async Task Get_all_operation()
        {
            using (var server = new FakeServer())
            {
                await server.Authenticate("aurelien", "0f46f2fb6f5a91c79e86acc5da7df95176b4e4c7");
                var operations = await server.GetAllOperations();
                operations.Should().NotBeEmpty();
            }
        }
    }
}