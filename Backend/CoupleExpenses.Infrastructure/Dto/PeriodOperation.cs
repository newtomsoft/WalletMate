using CoupleExpenses.Application.Periods.Queries;
using CoupleExpenses.Domain.Periods.Events;
using Newtonsoft.Json;

namespace CoupleExpenses.Infrastructure.Dto
{
    public class PeriodOperation : IPeriodOperation
    {
        [JsonConstructor]
        public PeriodOperation(string periodId, int operationId, string type, string pair, double amount, string label, string operationType)
        {
            PeriodId = periodId;
            OperationId = operationId;
            Type = type;
            Pair = pair;
            Amount = amount;
            Label = label;
            OperationType = operationType;
        }

        public PeriodOperation(SpendingAdded @event)
        {
            PeriodId = @event.AggregateId;
            OperationId = @event.OperationId.Value;
            Type = "D�pense";
            Pair = @event.Pair.ToString();
            Amount = @event.Amount.Value;
            Label = @event.Label.Value;
            OperationType = @event.Type.ToString();
        }

        public PeriodOperation(RecipeAdded @event)
        {
            PeriodId = @event.AggregateId;
            OperationId = @event.OperationId.Value;
            Type = "Recette";
            Pair = @event.Pair.ToString();
            Amount = @event.Amount.Value;
            Label = @event.Label.Value;
            OperationType = @event.Type.ToString();
        }

        public string PeriodId { get; }
        public int OperationId { get; }
        public string Type { get; }        
        public string Pair{get; }           
        public double Amount{get; }
        public string Label{get; }
        public string OperationType{get; }
    }
}