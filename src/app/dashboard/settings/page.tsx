import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie sua conta e as configurações do aplicativo.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" defaultValue="Usuário Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" defaultValue="admin@bubblechat.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar Alterações</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Gerencie como você recebe notificações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Notificações por E-mail</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receba um e-mail para novas interações importantes.
                </span>
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="webhook-notifications" className="flex flex-col space-y-1">
                <span>Notificações via Webhook</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Envie um webhook para eventos do chat.
                </span>
              </Label>
              <Switch id="webhook-notifications" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar Preferências</Button>
          </CardFooter>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>API & Webhooks</CardTitle>
            <CardDescription>Gerencie chaves de API e endpoints de webhook para integrações.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Chave de API</Label>
              <div className="flex items-center gap-2">
                <Input id="api-key" readOnly value="bc_***************************" />
                <Button variant="outline">Gerar Novamente</Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="webhook-url">URL do Webhook</Label>
              <Input id="webhook-url" placeholder="https://api.exemplo.com/webhook" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Atualizar Webhook</Button>
          </CardFooter>
        </Card>

    </div>
  );
}
