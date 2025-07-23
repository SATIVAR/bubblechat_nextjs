import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const quotations = [
  { id: "Q-001", client: "Innovate Inc.", date: "2023-10-26", amount: "$1,250.00", status: "Accepted" },
  { id: "Q-002", client: "Synergy Corp.", date: "2023-10-24", amount: "$3,400.00", status: "Pending" },
  { id: "Q-003", client: "Global Solutions", date: "2023-10-22", amount: "$800.50", status: "Draft" },
  { id: "Q-004", client: "Tech-Forward", date: "2023-10-21", amount: "$5,600.00", status: "Declined" },
  { id: "Q-005", client: "Innovate Inc.", date: "2023-10-18", amount: "$2,100.00", status: "Accepted" },
];


export default function HistoryPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Accepted":
        return "default";
      case "Pending":
        return "secondary";
      case "Declined":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Quotation History</h1>
        <p className="text-muted-foreground">
          Review and manage all past quotations generated.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Quotations</CardTitle>
          <CardDescription>A list of your most recent quotations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>{quote.client}</TableCell>
                  <TableCell>{quote.date}</TableCell>
                  <TableCell>{quote.amount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(quote.status) as any}>{quote.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
