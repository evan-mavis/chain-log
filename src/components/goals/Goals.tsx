import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Goals() {
  return (
    <Card className="w-full gap-2 rounded-lg border-2">
      <CardHeader>
        <CardTitle className="underline">Your Active Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li>
            <span className="italic">Long-term:</span> Break into a big-tech or
            high profile startup.
          </li>
          <li>
            <span className="italic">Short-term:</span> Built and app using
            Next.js and Postgres.
          </li>
          <li>
            <span className="italic">Daily:</span> Do 3 leetcode problems
            minimum.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
