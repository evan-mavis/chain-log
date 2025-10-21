import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Goals() {
  return (
    <Card className="gap-0 rounded-xl sm:w-[55%]">
      <CardHeader className="text-popover-foreground border-b">
        <CardTitle className="text-base font-semibold">
          Your Active Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <dl className="divide-y">
          <div className="grid grid-cols-[8rem_1fr] items-start gap-4 px-6 py-3">
            <dt className="text-muted-foreground">Long-term</dt>
            <dd>Break into a big-tech or high profile startup.</dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] items-start gap-4 px-6 py-3">
            <dt className="text-muted-foreground">Short-term</dt>
            <dd>Build an app using Next.js and Postgres.</dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] items-start gap-4 px-6 py-3">
            <dt className="text-muted-foreground">Daily</dt>
            <dd>Do 3 LeetCode problems minimum.</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
