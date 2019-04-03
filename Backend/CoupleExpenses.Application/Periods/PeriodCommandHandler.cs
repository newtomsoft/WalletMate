﻿using System;
using System.Threading;
using System.Threading.Tasks;
using CoupleExpenses.Application.Core;
using CoupleExpenses.Domain.Common.Events;
using CoupleExpenses.Domain.Common.Exceptions;
using CoupleExpenses.Domain.Periods;
using CoupleExpenses.Domain.Periods.Events;

namespace CoupleExpenses.Application.Periods
{
    public class PeriodCommandHandler : 
        ICommandHandler<CreatePeriod>, 
        ICommandHandler<AddSpending>,
        ICommandHandler<ChangeSpending>,
        ICommandHandler<AddRecipe>,
        ICommandHandler<ChangeRecipe>,
        ICommandHandler<RemoveOperation>
    {
        private readonly IEventBroker _eventBroker;

        public PeriodCommandHandler(IEventBroker eventBroker)
        {
            _eventBroker = eventBroker ?? throw new ArgumentNullException(nameof(eventBroker));
        }

        public async Task Handle(CreatePeriod command, CancellationToken cancellationToken)
        {
            PeriodCreator periodCreator;

            try
            {
                periodCreator = await _eventBroker.GetAggregate<PeriodCreator>(a => a is PeriodCreated);
            }
            catch (AggregateNotFoundException)
            {
                periodCreator = new PeriodCreator(History.Empty);
            }

            var period = periodCreator.Create(command.PeriodName);
            await _eventBroker.Publish(period.UncommittedEvents);
        }

        public Task Handle(AddSpending notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task Handle(ChangeSpending notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task Handle(AddRecipe notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task Handle(ChangeRecipe notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task Handle(RemoveOperation notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}