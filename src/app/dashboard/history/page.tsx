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
  { id: "Q-001", client: "Innovate Inc.", date: "2023-10-26", amount: "R$1.250,00", status: "Aceita" },
  { id: "Q-002", client: "Synergy Corp.", date: "2023-10-24", amount: "R$3.400,00", status: "Pendente" },
  { id: "Q-003", client: "Global Solutions", date: "2023-10-22", amount: "R$800,50", status: "Rascunho" },
  { id: "Q-004", client: "Tech-Forward", date: "2023-10-21", amount: "R$5.600,00", status: "Recusada" },
  { id: "Q-005", client: "Innovate Inc.", date: "2023-10-18", amount: "R$2.100,00", status: "Aceita" },
];


export default function HistoryPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Aceita":
        return "default";
      case "Pendente":
        return "secondary";
      case "Recusada":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Histórico de Cotações</h1>
        <p className="text-muted-foreground">
          Revise e gerencie todas as cotações geradas anteriormente.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cotações Recentes</CardTitle>
          <CardDescription>Uma lista das suas cotações mais recentes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID da Cotação</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
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
