import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";

export default function WidgetPage() {
  const embedCode = `<script src="https://docuquota.com/widget.js" data-id="YOUR_UNIQUE_ID" async defer></script>`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Widget Integration</h1>
        <p className="text-muted-foreground">
          Embed the DocuQuota widget on your website to allow clients to upload documents directly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Embed Code</CardTitle>
          <CardDescription>
            Copy and paste this code into the `<head>` or `<body>` section of your website's HTML.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-secondary p-4 rounded-md font-code text-sm">
            <pre className="overflow-x-auto">
              <code>{embedCode}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => navigator.clipboard.writeText(embedCode)}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Preview</CardTitle>
             <CardDescription>This is a preview of how the widget will appear on your site.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8 bg-secondary/50 rounded-lg">
             <div className="fixed bottom-8 right-8">
                <Button className="rounded-full w-16 h-16 bg-primary shadow-lg hover:bg-primary/90 transition-transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary-foreground"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
